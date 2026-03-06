import { useState } from 'react';
import { Avatar, StickyIcon } from '../../components/ui';
import { AVATARS, ICONS } from '../../constants';
import { useHaptics } from '../../hooks/useHaptics';

const MESSAGES = [
  { id: 1, type: 'received', text: 'Hello! I\'ve seen your job post. I can fix the kitchen sink today.', time: '10:14 AM' },
  { id: 2, type: 'system',   text: 'Escrow funded', icon: ICONS.lock },
  { id: 3, type: 'sent',     text: 'Great! When can you come?', time: '10:16 AM' },
  { id: 4, type: 'received', text: 'I can be there in 30 minutes. Is that okay?', time: '10:17 AM' },
  { id: 5, type: 'sent',     text: 'Perfect! The gate code is 4421. Park inside.', time: '10:18 AM' },
  { id: 6, type: 'received', text: 'Got it. On my way now', time: '10:19 AM' },
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
          <button style={{ background: 'none' }}><StickyIcon src={ICONS.phone} size={24} /></button>
          <button style={{ background: 'none', fontSize: '1.25rem', color: 'var(--text-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', width: 24, height: 24 }}>⋮</button>
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
              <span className="chat-system-msg" style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}>
                {(msg as {icon?: string}).icon && <StickyIcon src={(msg as {icon?: string}).icon!} size={14} />}
                {msg.text}
              </span>
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

      {/* Input Area */}
      <div style={{
        display: 'flex', flexDirection: 'column',
        borderTop: '1px solid var(--separator)',
        background: 'var(--bg-primary)',
        paddingBottom: 28,
      }}>
        {/* Smart Replies */}
        <div style={{
          display: 'flex', alignItems: 'center', gap: 8, padding: '12px 16px 0', overflowX: 'auto', scrollbarWidth: 'none'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, background: 'var(--brand-green-light)', color: 'var(--brand-green)', border: '1px solid var(--brand-green)', padding: '6px 12px', borderRadius: 'var(--radius-full)', fontSize: '0.75rem', fontWeight: 700, whiteSpace: 'nowrap', flexShrink: 0 }}>
            <StickyIcon src={ICONS.help} size={14} /> Smart Reply
          </div>
          {['See you soon!', 'I will open the gate.', 'Thanks!'].map(reply => (
            <button
              key={reply}
              onClick={() => { haptic('light'); setInput(reply); }}
              style={{ padding: '6px 14px', borderRadius: 'var(--radius-full)', background: 'var(--bg-elevated)', border: '1px solid var(--separator)', fontSize: '0.8125rem', fontWeight: 500, whiteSpace: 'nowrap', flexShrink: 0, transition: 'all 0.2s', color: 'var(--text-primary)' }}
            >
              {reply}
            </button>
          ))}
        </div>

        <div style={{
          display: 'flex', gap: 10, alignItems: 'flex-end',
          padding: '12px 16px 0',
        }}>
          <button style={{ background: 'none', fontSize: '1.5rem', flexShrink: 0, color: 'var(--text-secondary)' }}>+</button>
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
              background: input.trim() ? 'var(--brand-green)' : 'var(--separator)',
              color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: '1.125rem', flexShrink: 0, transition: 'background 0.2s',
            }}
          >
            ➤
          </button>
        </div>
      </div>
    </div>
  );
}
