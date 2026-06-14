import { FormEvent, useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { http } from '../api/http';

type BotMessage = { role: 'user' | 'bot'; content: string };

export function ChatbotPage() {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<BotMessage[]>([
    { role: 'bot', content: 'Xin chào, tôi có thể hỗ trợ bạn về chấm công, nghỉ phép, quên check-in/check-out, OT và quy trình duyệt đơn.' }
  ]);

  const askMutation = useMutation({
    mutationFn: async (message: string) => (await http.post<{ answer: string }>('/chatbot/ask', { message })).data,
    onSuccess: (data) => setMessages((prev) => [...prev, { role: 'bot', content: data.answer }])
  });

  function submit(e: FormEvent) {
    e.preventDefault();
    const message = input.trim();
    if (!message) return;
    setMessages((prev) => [...prev, { role: 'user', content: message }]);
    setInput('');
    askMutation.mutate(message);
  }

  return (
    <section>
      <div className="page-hero soft-hero">
        <div>
          <span className="eyebrow">Trợ lý hệ thống</span>
          <h2>Chatbot chấm công</h2>
          <p>Trợ lý quy tắc giúp nhân viên tra cứu nhanh cách làm đơn, xử lý quên chấm công và các quy định liên quan.</p>
        </div>
      </div>
      <div className="card chatbot-card">
        <div className="bot-message-list">
          {messages.map((message, index) => (
            <div key={`${message.role}-${index}`} className={`message-bubble ${message.role === 'user' ? 'mine' : ''}`}>
              <span>{message.content}</span>
            </div>
          ))}
          {askMutation.isPending && <div className="message-bubble"><span>Đang trả lời...</span></div>}
        </div>
        <form className="message-form" onSubmit={submit}>
          <input value={input} onChange={(e) => setInput(e.target.value)} placeholder="Ví dụ: Tôi quên check out thì làm thế nào?" />
          <button disabled={askMutation.isPending}>Hỏi</button>
        </form>
      </div>
    </section>
  );
}
