import { useState } from 'react';
import { StickyIcon } from '../../components/ui';
import { ICONS } from '../../constants';
import { useHaptics } from '../../hooks/useHaptics';

const INITIAL_MESSAGES = [
  { id: 1, type: 'received', text: 'Hi there! I am your Helpa AI assistant. How can I help you today?', time: 'Just now' },
];

const QUICK_ACTIONS = [
  'Help me price a plumbing job',
  'Find top rated electricians',
  'How do I post a job?',
];

export function AIAssistantScreen({ onBack }: { onBack: () => void }) {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState(INITIAL_MESSAGES);
  const [isTyping, setIsTyping] = useState(false);
  const { haptic } = useHaptics();

  const send = (text: string = input) => {
    if (!text.trim()) return;
    haptic('light');
    
    // Add user message
    const newMsg = { id: Date.now(), type: 'sent', text: text.trim(), time: 'Now' };
    setMessages(m => [...m, newMsg]);
    setInput('');
    setIsTyping(true);
    
    // Simulate AI response
    setTimeout(() => {
      setIsTyping(false);
      haptic('medium');
      setMessages(m => [...m, {
        id: Date.now() + 1, type: 'received', 
        text: 'I can certainly help you with that! Could you provide a bit more detail about your location or the exact service you need?', 
        time: 'Now'
      }]);
    }, 1500);
  };

  return (
    <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', height: '100dvh', background: 'var(--bg-secondary)' }}>
      {/* Header */}
      <div style={{
        display: 'flex', alignItems: 'center', gap: 12,
        padding: '12px 16px',
        background: 'var(--brand-green)',
        color: 'white',
        position: 'sticky', top: 0, zIndex: 10,
      }}>
        <button onClick={() => { haptic('light'); onBack(); }} style={{ fontSize: 22, color: 'rgba(255,255,255,0.8)', background: 'none' }}>←</button>
        <div style={{ width: 40, height: 40, borderRadius: '50%', background: 'rgba(255,255,255,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <StickyIcon src={ICONS.help} size={24} style={{ filter: 'brightness(0) invert(1)' }} />
        </div>
        <div style={{ flex: 1 }}>
          <div style={{ fontWeight: 700, fontSize: '1rem', color: 'white' }}>Helpa AI</div>
          <div style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.8)', fontWeight: 500 }}>● Always here to help</div>
        </div>
      </div>

      {/* Messages */}
      <div style={{
        flex: 1, overflowY: 'auto', padding: '20px 16px',
        display: 'flex', flexDirection: 'column', gap: 16,
      }}>
        {messages.map(msg => (
          <div
            key={msg.id}
            style={{
              display: 'flex',
              justifyContent: msg.type === 'sent' ? 'flex-end' : 'flex-start',
            }}
          >
            {msg.type === 'received' && (
              <div style={{ width: 28, height: 28, borderRadius: '50%', background: 'var(--brand-green)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginRight: 8, marginTop: 4, flexShrink: 0 }}>
                <StickyIcon src={ICONS.help} size={16} style={{ filter: 'brightness(0) invert(1)' }} />
              </div>
            )}
            <div style={{ maxWidth: '78%' }}>
              <div 
                className={`chat-bubble ${msg.type}`}
                style={msg.type === 'received' ? { background: 'white', color: 'var(--text-primary)', border: '1px solid var(--separator)' } : {}}
              >
                {msg.text}
              </div>
              <div style={{
                fontSize: '0.6875rem', color: 'var(--text-muted)', marginTop: 4,
                textAlign: msg.type === 'sent' ? 'right' : 'left',
                paddingLeft: msg.type === 'received' ? 4 : 0,
              }}>
                {msg.time}
              </div>
            </div>
          </div>
        ))}
        {isTyping && (
           <div className="animate-fade-in" style={{ display: 'flex', justifyContent: 'flex-start' }}>
             <div style={{ width: 28, height: 28, borderRadius: '50%', background: 'var(--brand-green)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginRight: 8, marginTop: 4, flexShrink: 0 }}>
                <StickyIcon src={ICONS.help} size={16} style={{ filter: 'brightness(0) invert(1)' }} />
             </div>
             <div className="chat-bubble received" style={{ background: 'white', color: 'var(--text-primary)', border: '1px solid var(--separator)', display: 'flex', gap: 4, alignItems: 'center' }}>
               <div className="typing-dot" style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--text-muted)' }} />
               <div className="typing-dot" style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--text-muted)', animationDelay: '0.2s' }} />
               <div className="typing-dot" style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--text-muted)', animationDelay: '0.4s' }} />
             </div>
           </div>
        )}
      </div>

      {/* Input Area */}
      <div style={{
        display: 'flex', flexDirection: 'column',
        borderTop: '1px solid var(--separator)',
        background: 'var(--bg-primary)',
        paddingBottom: 28,
        boxShadow: '0 -4px 20px rgba(0,0,0,0.03)',
      }}>
        {/* Quick Actions */}
        {messages.length === 1 && (
          <div className="animate-slide-up" style={{
            display: 'flex', gap: 8, padding: '16px 16px 4px', overflowX: 'auto', scrollbarWidth: 'none'
          }}>
            {QUICK_ACTIONS.map((action) => (
              <button
                key={action}
                onClick={() => { haptic('medium'); send(action); }}
                style={{ 
                  padding: '8px 16px', borderRadius: 'var(--radius-full)', 
                  background: 'var(--brand-green-light)', border: '1px solid var(--brand-green)', 
                  color: 'var(--brand-green)', fontSize: '0.8125rem', fontWeight: 600, 
                  whiteSpace: 'nowrap', flexShrink: 0, transition: 'all 0.2s' 
                }}
              >
                {action}
              </button>
            ))}
          </div>
        )}

        <div style={{
          display: 'flex', gap: 10, alignItems: 'flex-end',
          padding: '12px 16px 0',
        }}>
          <textarea
            className="input-field"
            rows={1}
            placeholder="Ask Helpa AI..."
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); send(); } }}
            style={{ resize: 'none', flex: 1, maxHeight: 120, overflow: 'auto', background: 'var(--bg-secondary)' }}
          />
          <button
            onClick={() => send()}
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
      <style>{`
        @keyframes typing {
          0%, 100% { transform: translateY(0); opacity: 0.5; }
          50% { transform: translateY(-3px); opacity: 1; }
        }
        .typing-dot {
          animation: typing 1.4s infinite ease-in-out both;
        }
      `}</style>
    </div>
  );
}
