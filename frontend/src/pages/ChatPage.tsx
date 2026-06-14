import { FormEvent, useEffect, useMemo, useState } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { http } from '../api/http';
import { useAuth } from '../state/AuthContext';
import type { ChatMessage, Conversation, Employee } from '../types';
import { codeName } from '../utils/format';

function timeText(value?: string) {
  if (!value) return '';
  return value.replace('T', ' ').slice(0, 16);
}

function matchesEmployee(employee: Employee, keyword: string) {
  const normalized = keyword.trim().toLowerCase();
  if (!normalized) return true;
  return [employee.employeeCode, employee.fullName, employee.email, employee.phone]
    .filter(Boolean)
    .join(' ')
    .toLowerCase()
    .includes(normalized);
}

export function ChatPage() {
  const queryClient = useQueryClient();
  const { user } = useAuth();
  const [selectedEmployeeId, setSelectedEmployeeId] = useState('');
  const [message, setMessage] = useState('');
  const [keyword, setKeyword] = useState('');

  const { data: employees = [] } = useQuery({ queryKey: ['chat-employees'], queryFn: async () => (await http.get<Employee[]>('/chat/employees')).data });
  const { data: conversations = [] } = useQuery({ queryKey: ['chat-conversations'], queryFn: async () => (await http.get<Conversation[]>('/chat/conversations')).data });

  const selectableEmployees = useMemo(() => {
    return employees
      .filter((employee) => String(employee.id) !== String(user?.employeeId))
      .filter((employee) => matchesEmployee(employee, keyword));
  }, [employees, keyword, user?.employeeId]);

  const { data: messages = [] } = useQuery({
    queryKey: ['chat-messages', selectedEmployeeId],
    queryFn: async () => (await http.get<ChatMessage[]>(`/chat/messages?employeeId=${selectedEmployeeId}`)).data,
    enabled: Boolean(selectedEmployeeId)
  });

  const sendMutation = useMutation({
    mutationFn: async () => (await http.post('/chat/messages', { receiverEmployeeId: selectedEmployeeId, content: message })).data,
    onSuccess: () => {
      setMessage('');
      queryClient.invalidateQueries({ queryKey: ['chat-messages', selectedEmployeeId] });
      queryClient.invalidateQueries({ queryKey: ['chat-conversations'] });
    }
  });

  useEffect(() => {
    if (!selectedEmployeeId && conversations.length > 0) setSelectedEmployeeId(conversations[0].employeeId);
  }, [conversations, selectedEmployeeId]);

  function submit(e: FormEvent) {
    e.preventDefault();
    if (!selectedEmployeeId || !message.trim()) return;
    sendMutation.mutate();
  }

  const selectedEmployee = employees.find((employee) => String(employee.id) === String(selectedEmployeeId));

  return (
    <section>
      <div className="page-hero soft-hero">
        <div>
          <span className="eyebrow">Trao đổi nội bộ</span>
          <h2>Tin nhắn</h2>
          <p>Chat nhanh giữa các thành viên, hỗ trợ trao đổi các vấn đề liên quan đến công việc và chấm công.</p>
        </div>
      </div>
      <div className="chat-layout">
        <aside className="card chat-sidebar">
          <h3>Chọn nhân viên</h3>
          <input className="search-input" value={keyword} onChange={(e) => setKeyword(e.target.value)} placeholder="Tìm mã, tên, email, SĐT" />
          <div className="conversation-list">
            {conversations.map((conversation) => (
              <button key={conversation.employeeId} type="button" className={selectedEmployeeId === conversation.employeeId ? 'active' : ''} onClick={() => setSelectedEmployeeId(conversation.employeeId)}>
                <strong>{codeName(conversation.employeeCode || '', conversation.employeeName || '')}</strong>
                <span>{conversation.lastMessage || 'Chưa có tin nhắn'}</span>
              </button>
            ))}
          </div>
          <div className="employee-mini-list">
            {selectableEmployees.slice(0, 40).map((employee) => (
              <button key={String(employee.id)} type="button" onClick={() => setSelectedEmployeeId(String(employee.id))} className={selectedEmployeeId === String(employee.id) ? 'active' : ''}>
                {codeName(String(employee.employeeCode || ''), String(employee.fullName || ''))}
              </button>
            ))}
          </div>
        </aside>
        <div className="card chat-panel">
          <div className="section-title-row">
            <div>
              <h3>{selectedEmployee ? codeName(String(selectedEmployee.employeeCode || ''), String(selectedEmployee.fullName || '')) : 'Chưa chọn người nhận'}</h3>
              <p>{selectedEmployee ? 'Nội dung trao đổi được lưu trong hệ thống nội bộ.' : 'Chọn một nhân viên để bắt đầu chat.'}</p>
            </div>
          </div>
          <div className="message-list">
            {!selectedEmployeeId && <div className="empty-state">Hãy chọn người nhận ở danh sách bên trái.</div>}
            {messages.map((item) => (
              <div key={item.id} className={`message-bubble ${item.mine ? 'mine' : ''}`}>
                <span>{item.content}</span>
                <small>{timeText(item.createdAt)}</small>
              </div>
            ))}
          </div>
          <form className="message-form" onSubmit={submit}>
            <input value={message} onChange={(e) => setMessage(e.target.value)} placeholder="Nhập tin nhắn..." disabled={!selectedEmployeeId} />
            <button disabled={!selectedEmployeeId || sendMutation.isPending}>Gửi</button>
          </form>
        </div>
      </div>
    </section>
  );
}
