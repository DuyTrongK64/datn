import { FormEvent, useEffect, useMemo, useRef, useState } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { http } from '../api/http';
import { useAuth } from '../state/AuthContext';
import type { ChatMessage, Conversation, Employee } from '../types';
import { codeName } from '../utils/format';

function timeText(value?: string) {
  if (!value) return '';
  return value.replace('T', ' ').slice(0, 16);
}

function shortTime(value?: string) {
  if (!value) return '';
  return value.replace('T', ' ').slice(11, 16);
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

function initialOf(name?: string) {
  return (name || '?').slice(0, 1).toUpperCase();
}

export function ChatPage() {
  const queryClient = useQueryClient();
  const { user } = useAuth();
  const [selectedEmployeeId, setSelectedEmployeeId] = useState('');
  const [message, setMessage] = useState('');
  const [keyword, setKeyword] = useState('');
  const messageEndRef = useRef<HTMLDivElement | null>(null);

  const { data: employees = [] } = useQuery({
    queryKey: ['chat-employees'],
    queryFn: async () => (await http.get<Employee[]>('/chat/employees')).data
  });
  const { data: conversations = [] } = useQuery({
    queryKey: ['chat-conversations'],
    queryFn: async () => (await http.get<Conversation[]>('/chat/conversations')).data
  });

  const selectableEmployees = useMemo(() => {
    return employees
      .filter((employee) => String(employee.id) !== String(user?.employeeId))
      .filter((employee) => matchesEmployee(employee, keyword))
      .slice(0, 80);
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

  useEffect(() => {
    messageEndRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' });
  }, [messages.length, selectedEmployeeId]);

  function submit(e: FormEvent) {
    e.preventDefault();
    if (!selectedEmployeeId || !message.trim()) return;
    sendMutation.mutate();
  }

  const selectedEmployee = employees.find((employee) => String(employee.id) === String(selectedEmployeeId));
  const selectedConversation = conversations.find((conversation) => String(conversation.employeeId) === String(selectedEmployeeId));
  const selectedName = selectedEmployee
    ? codeName(String(selectedEmployee.employeeCode || ''), String(selectedEmployee.fullName || ''))
    : selectedConversation
      ? codeName(selectedConversation.employeeCode || '', selectedConversation.employeeName || '')
      : 'Chưa chọn người nhận';

  return (
    <section className="chat-page-v2">
      <div className="social-page-title">
        <div>
          <span className="eyebrow">Trao đổi nội bộ</span>
          <h2>Tin nhắn</h2>
          <p>Trao đổi trực tiếp với đồng nghiệp, Leader hoặc Admin về công việc, chấm công và đơn từ.</p>
        </div>
      </div>

      <div className="messenger-shell">
        <aside className="messenger-sidebar card">
          <div className="messenger-sidebar-header">
            <h3>Đoạn chat</h3>
            <span>{conversations.length} hội thoại</span>
          </div>
          <input className="search-input" value={keyword} onChange={(e) => setKeyword(e.target.value)} placeholder="Tìm mã, tên, email, SĐT" />

          {conversations.length > 0 && <div className="conversation-section-title">Gần đây</div>}
          <div className="conversation-list improved-conversation-list">
            {conversations.map((conversation) => (
              <button key={conversation.employeeId} type="button" className={selectedEmployeeId === conversation.employeeId ? 'active' : ''} onClick={() => setSelectedEmployeeId(conversation.employeeId)}>
                <span className="mini-avatar">{initialOf(conversation.employeeName || conversation.employeeCode)}</span>
                <span className="conversation-text">
                  <strong>{codeName(conversation.employeeCode || '', conversation.employeeName || '')}</strong>
                  <small>{conversation.lastMessage || 'Chưa có tin nhắn'}</small>
                </span>
                <em>{shortTime(conversation.lastMessageAt)}</em>
              </button>
            ))}
          </div>

          <div className="conversation-section-title">Danh bạ</div>
          <div className="employee-mini-list improved-employee-list">
            {selectableEmployees.map((employee) => (
              <button key={String(employee.id)} type="button" onClick={() => setSelectedEmployeeId(String(employee.id))} className={selectedEmployeeId === String(employee.id) ? 'active' : ''}>
                <span className="mini-avatar muted-avatar">{initialOf(employee.fullName || employee.employeeCode)}</span>
                <span>
                  <strong>{codeName(String(employee.employeeCode || ''), String(employee.fullName || ''))}</strong>
                  <small>{employee.email || employee.phone || 'Nhân viên'}</small>
                </span>
              </button>
            ))}
          </div>
        </aside>

        <div className="messenger-panel card">
          <div className="messenger-header">
            <div className="mini-avatar large-mini-avatar">{initialOf(selectedEmployee?.fullName || selectedConversation?.employeeName || selectedName)}</div>
            <div>
              <h3>{selectedName}</h3>
              <p>{selectedEmployeeId ? 'Tin nhắn nội bộ được lưu để tiện theo dõi công việc.' : 'Chọn một nhân viên để bắt đầu trao đổi.'}</p>
            </div>
          </div>

          <div className="message-list messenger-message-list">
            {!selectedEmployeeId && <div className="empty-state">Hãy chọn người nhận ở danh sách bên trái.</div>}
            {selectedEmployeeId && messages.length === 0 && <div className="empty-state">Chưa có tin nhắn. Hãy gửi lời chào đầu tiên.</div>}
            {messages.map((item) => (
              <div key={item.id} className={`message-row ${item.mine ? 'mine' : ''}`}>
                {!item.mine && <span className="mini-avatar message-avatar">{initialOf(item.senderName || item.senderCode)}</span>}
                <div className={`message-bubble ${item.mine ? 'mine' : ''}`}>
                  <span>{item.content}</span>
                  <small>{timeText(item.createdAt)}</small>
                </div>
              </div>
            ))}
            <div ref={messageEndRef} />
          </div>

          <form className="message-form messenger-form" onSubmit={submit}>
            <input value={message} onChange={(e) => setMessage(e.target.value)} placeholder="Nhập tin nhắn..." disabled={!selectedEmployeeId} />
            <button disabled={!selectedEmployeeId || sendMutation.isPending}>{sendMutation.isPending ? 'Đang gửi...' : 'Gửi'}</button>
          </form>
        </div>
      </div>
    </section>
  );
}
