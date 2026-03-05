import { useState } from 'react';
import { Avatar } from '../../components/ui';
import { AVATARS } from '../../constants';
import { useHaptics } from '../../hooks/useHaptics';

const MESSAGES = [
  { id: 1, type: 'received', text: 'Hello! I\'ve seen your job post. I can fix the kitchen sink today.', time: '10:14 AM' },
  { id: 2, type: 'system',   text: 'Escrow funded 🔒' },
  { id: 3, type: 'sent',     text: 'Great! When can you come?', time: '10:16 AM' },
  { id: 4, type: 'received', text: 'I can be there in 30 minutes. Is that okay?', time: '10:17 AM' },
  { id: 5, type: 'sent',     text: 'Perfect! The gate code is 4421. Park inside.', time: '10:18 AM' },
  { id: 6, type: 'received', text: 'Got it. On my way now 🚗', time: '10:19 AM' },
  { id: 7, type: 'system',   text: 'Job marked complete' },
];

export function ChatScreen({ onBack }: { onBack: () => void }) {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState(MESSAGES);
  const { haptic } = useHaptics();

  const send = () => {
    if (!input.trim()) return;
    haptic('light');
    setMessages(m => [...m, {
      id: Date.now(), type: 'sent', text: input.trim(), time: 'Now',
    }]);
    setInput('');
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100dvh' }}>
      {/* Header */}
      <div style={{
        display: 'flex', alignItems: 'center', gap: 12,
        padding: '12px 16px',
        background: 'var(--bg-primary)',
        borderBottom: '1px solid var(--separator)',
        position: 'sticky', top: 0, zIndex: 10,
      }}>
        <button onClick={() => { haptic('light'); onBack(); }} style={{ fontSize: 22, color: 'var(--text-muted)', background: 'none' }}>←</button>
        <Avatar name="Emeka Obi" size={40} ring="active" src={AVATARS.emeka} />
        <div style={{ flex: 1 }}>
          <div style={{ fontWeight: 700, fontSize: '0.9375rem' }}>Emeka Obi</div>
          <div style={{ fontSize: '0.75rem', color: 'var(--soft-green)', fontWeight: 500 }}>● Online</div>
        </div>
        <div style={{ display: 'flex', gap: 10 }}>
          <button style={{ background: 'none', fontSize: '1.25rem' }}>📞</button>
          <button style={{ background: 'none', fontSize: '1.25rem' }}>📹</button>
          <button style={{ background: 'none', fontSize: '1.25rem' }}>⋯</button>
        </div>
      </div>

      {/* Messages */}
      <div style={{
        flex: 1, overflowY: 'auto', padding: '16px 16px',
        display: 'flex', flexDirection: 'column', gap: 10,
      }}>
        {messages.map(msg => (
          <div
            key={msg.id}
            style={{
              display: 'flex',
              justifyContent: msg.type === 'sent' ? 'flex-end' : msg.type === 'system' ? 'center' : 'flex-start',
            }}
          >
            {msg.type === 'system' ? (
              <span className="chat-system-msg">{msg.text}</span>
            ) : (
              <div style={{ maxWidth: '78%' }}>
                <div className={`chat-bubble ${msg.type}`}>{msg.text}</div>
                <div style={{
                  fontSize: '0.6875rem', color: 'var(--text-muted)', marginTop: 3,
                  textAlign: msg.type === 'sent' ? 'right' : 'left',
                }}>
                  {(msg as { time?: string }).time}
                  {msg.type === 'sent' && ' ✓✓'}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Input */}
      <div style={{
        display: 'flex', gap: 10, alignItems: 'flex-end',
        padding: '12px 16px 28px',
        borderTop: '1px solid var(--separator)',
        background: 'var(--bg-primary)',
      }}>
        <button style={{ background: 'none', fontSize: '1.5rem', flexShrink: 0 }}>📎</button>
        <textarea
          className="input-field"
          rows={1}
          placeholder="Type a message…"
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); send(); } }}
          style={{ resize: 'none', flex: 1, maxHeight: 120, overflow: 'auto' }}
        />
        <button
          id="chat-send-btn"
          onClick={send}
          style={{
            width: 46, height: 46, borderRadius: '50%',
            background: input.trim() ? 'var(--action-orange)' : 'var(--separator)',
            color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: '1.125rem', flexShrink: 0, transition: 'background 0.2s',
          }}
        >
          ➤
        </button>
      </div>
    </div>
  );
}
