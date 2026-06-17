import { FormEvent, useEffect, useRef, useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { http } from '../api/http';

type BotMessage = { role: 'user' | 'bot'; content: string };

const WELCOME_MESSAGE: BotMessage = {
  role: 'bot',
  content: 'Xin chào, tôi là trợ lý chấm công. Bạn có thể hỏi về quên check-in/check-out, nghỉ phép, đi muộn, về sớm, OT hoặc quy trình duyệt đơn.'
};

export function FloatingChatbot() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<BotMessage[]>([WELCOME_MESSAGE]);
  const listRef = useRef<HTMLDivElement | null>(null);

  const askMutation = useMutation({
    mutationFn: async (message: string) => (await http.post<{ answer: string }>('/chatbot/ask', { message })).data,
    onSuccess: (data) => setMessages((prev) => [...prev, { role: 'bot', content: data.answer }]),
    onError: () => setMessages((prev) => [...prev, { role: 'bot', content: 'Tôi chưa thể trả lời lúc này. Bạn kiểm tra lại backend hoặc thử lại sau nhé.' }])
  });

  useEffect(() => {
    const handler = () => setOpen(true);
    window.addEventListener('open-floating-chatbot', handler);
    return () => window.removeEventListener('open-floating-chatbot', handler);
  }, []);

  useEffect(() => {
    if (!open) return;
    listRef.current?.scrollTo({ top: listRef.current.scrollHeight, behavior: 'smooth' });
  }, [messages, askMutation.isPending, open]);

  function submit(e: FormEvent) {
    e.preventDefault();
    const message = input.trim();
    if (!message || askMutation.isPending) return;
    setMessages((prev) => [...prev, { role: 'user', content: message }]);
    setInput('');
    askMutation.mutate(message);
  }

  function openWithHint(hint: string) {
    setOpen(true);
    setInput(hint);
  }

  return (
    <div className={`floating-chatbot ${open ? 'is-open' : ''}`}>
      {open && (
        <div className="floating-chatbot-window" role="dialog" aria-label="Trợ lý chấm công">
          <div className="floating-chatbot-header">
            <div className="bot-avatar">🤖</div>
            <div>
              <strong>Trợ lý chấm công</strong>
              <span>Hỏi nhanh về quy trình chấm công</span>
            </div>
            <button type="button" className="icon-button" onClick={() => setOpen(false)} aria-label="Thu nhỏ chatbot">×</button>
          </div>

          <div className="floating-chatbot-suggestions">
            <button type="button" onClick={() => openWithHint('Tôi quên check out thì làm thế nào?')}>Quên check out</button>
            <button type="button" onClick={() => openWithHint('Tôi muốn xin nghỉ phép thì làm sao?')}>Nghỉ phép</button>
            <button type="button" onClick={() => openWithHint('Đi muộn có cần tạo đơn không?')}>Đi muộn</button>
          </div>

          <div className="floating-chatbot-messages" ref={listRef}>
            {messages.map((message, index) => (
              <div key={`${message.role}-${index}`} className={`floating-bubble ${message.role === 'user' ? 'mine' : ''}`}>
                {message.content}
              </div>
            ))}
            {askMutation.isPending && <div className="floating-bubble typing">Đang trả lời...</div>}
          </div>

          <form className="floating-chatbot-form" onSubmit={submit}>
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Nhập câu hỏi..."
              autoComplete="off"
            />
            <button type="submit" disabled={askMutation.isPending || !input.trim()}>Gửi</button>
          </form>
        </div>
      )}

      {!open && (
        <button type="button" className="floating-chatbot-button" onClick={() => setOpen(true)}>
          <span>🤖</span>
          <strong>Trợ lý</strong>
        </button>
      )}
    </div>
  );
}
