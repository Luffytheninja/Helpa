import { useState } from 'react';
import { TopBar } from '../../components/ui';
import { useHaptics } from '../../hooks/useHaptics';

const NOTIFS = [
  { id: 'n1', icon: '🟢', bg: '#D1FAE5', title: 'Helper accepted your job', sub: 'Emeka Obi accepted Kitchen Sink Repair', time: '2 min ago', unread: true },
  { id: 'n2', icon: '🔒', bg: '#FEF9C3', title: 'Escrow funded', sub: '₦15,000 secured for Kitchen Sink Repair', time: '10 min ago', unread: true },
  { id: 'n3', icon: '⭐', bg: '#FEF9C3', title: 'New rating received', sub: 'Tunde gave you 5 stars!', time: '1 hr ago', unread: true },
  { id: 'n4', icon: '✅', bg: '#D1FAE5', title: 'Job completed — payment released', sub: '₦22,000 released for AC Servicing', time: '3 hrs ago', unread: false },
  { id: 'n5', icon: '💬', bg: '#DBEAFE', title: 'New message', sub: 'Fatima: I\'m 5 minutes away!', time: '5 hrs ago', unread: false },
  { id: 'n6', icon: '🎉', bg: '#EDE9FE', title: 'Referral bonus earned!', sub: 'Kola signed up using your code. +₦300 added.', time: 'Yesterday', unread: false },
  { id: 'n7', icon: '⚠️', bg: '#FEE2E2', title: 'Dispute update', sub: 'Your dispute #0042 has been resolved.', time: 'Mar 3', unread: false },
];

const TABS = ['All', 'Jobs', 'Payments', 'System'];

export function NotificationsScreen({ onBack }: { onBack: () => void }) {
  const [activeTab, setActiveTab] = useState('All');
  const [notifs, setNotifs] = useState(NOTIFS);
  const { haptic } = useHaptics();

  const markAllRead = () => { haptic('light'); setNotifs(ns => ns.map(n => ({ ...n, unread: false }))); };

  const filtered = notifs.filter(n => {
    if (activeTab === 'Jobs') return ['🟢', '✅', '⚠️'].includes(n.icon);
    if (activeTab === 'Payments') return ['🔒', '🎉'].includes(n.icon);
    if (activeTab === 'System') return ['⭐', '💬'].includes(n.icon);
    return true;
  });

  const unreadCount = notifs.filter(n => n.unread).length;

  return (
    <div style={{ paddingBottom: 80 }}>
      <TopBar
        left={<button onClick={() => { haptic('light'); onBack(); }} style={{ fontSize: 22, color: 'var(--text-muted)' }}>←</button>}
        title={`Notifications ${unreadCount > 0 ? `(${unreadCount})` : ''}`}
        right={
          <button onClick={markAllRead} style={{ fontSize: '0.75rem', color: 'var(--brand-green)', fontWeight: 600 }}>
            Mark all read
          </button>
        }
      />

      {/* Tabs */}
      <div className="filter-tabs" style={{ paddingTop: 12 }}>
        {TABS.map(t => (
          <button
            key={t}
            className={`filter-tab ${activeTab === t ? 'active' : ''}`}
            onClick={() => { haptic('selection'); setActiveTab(t); }}
          >
            {t}
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <div className="empty-state">
          <div className="empty-icon">🔔</div>
          <div className="empty-title">You're all caught up</div>
          <div className="empty-sub">We'll ping you when something moves.</div>
        </div>
      ) : (
        filtered.map(n => (
          <div
            key={n.id}
            className={`notif-item ${n.unread ? 'unread' : ''}`}
            onClick={() => { haptic('light'); setNotifs(ns => ns.map(x => x.id === n.id ? { ...x, unread: false } : x)); }}
          >
            <div
              className="notif-icon"
              style={{ background: n.bg, fontSize: '1.25rem' }}
            >
              {n.icon}
            </div>
            <div style={{ flex: 1 }}>
              <div style={{
                fontWeight: n.unread ? 700 : 500,
                fontSize: '0.9375rem',
                color: 'var(--text-primary)',
                marginBottom: 2,
              }}>
                {n.title}
              </div>
              <div style={{ fontSize: '0.8125rem', color: 'var(--text-secondary)', lineHeight: 1.4, marginBottom: 3 }}>
                {n.sub}
              </div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{n.time}</div>
            </div>
            {n.unread && (
              <div style={{
                width: 9, height: 9, borderRadius: '50%',
                background: 'var(--action-orange)',
                flexShrink: 0, alignSelf: 'center',
              }} />
            )}
          </div>
        ))
      )}
    </div>
  );
}

// ── Referral Screen ───────────────────────────────────────────────
export function ReferralScreen({ onBack }: { onBack: () => void }) {
  const [copied, setCopied] = useState(false);
  const code = 'HELPA-AYO24';
  const { haptic } = useHaptics();

  const copy = () => {
    navigator.clipboard?.writeText(code);
    haptic('success');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const TIERS = [
    { label: 'Bronze', threshold: 5,  earned: 1500 },
    { label: 'Silver', threshold: 20, earned: 6000 },
    { label: 'Gold',   threshold: 50, earned: 15000 },
    { label: 'Elite',  threshold: 100,earned: 30000 },
  ];

  const inviteCount = 12;
  const nextTier = TIERS.find(t => t.threshold > inviteCount) ?? TIERS[TIERS.length - 1];

  return (
    <div style={{ paddingBottom: 80 }}>
      <TopBar
        left={<button onClick={() => { haptic('light'); onBack(); }} style={{ fontSize: 22, color: 'var(--text-muted)' }}>←</button>}
        title="Referrals"
      />

      <div style={{ padding: '20px' }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: 24 }}>
          <div style={{ fontSize: '3rem', marginBottom: 8 }}>🎁</div>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: 6 }}>Invite friends, earn cash</h2>
          <p style={{ color: 'var(--text-secondary)', lineHeight: 1.5, fontSize: '0.9375rem' }}>
            Earn ₦300 for every new helper who completes their first job using your link.
          </p>
        </div>

        {/* Code box */}
        <div className="referral-code-box" style={{ marginBottom: 16 }}>
          <div style={{ fontSize: '0.8125rem', color: 'var(--text-muted)', marginBottom: 6 }}>Your referral code</div>
          <div className="referral-code">{code}</div>
        </div>

        {/* Copy button */}
        <button
          id="copy-referral-code"
          className="btn btn-primary btn-full btn-bounce"
          style={{ borderRadius: 'var(--radius-md)', marginBottom: 12 }}
          onClick={copy}
        >
          {copied ? '✓ Copied!' : '📋 Copy Code'}
        </button>

        {/* Share row */}
        <div style={{ display: 'flex', gap: 10, marginBottom: 24 }}>
          {[
            { icon: '💬', label: 'WhatsApp', bg: '#25D366', color: 'white' },
            { icon: '🐦', label: 'Twitter', bg: '#1DA1F2', color: 'white' },
            { icon: '🔗', label: 'Copy Link', bg: 'var(--bg-elevated)', color: 'var(--text-primary)' },
          ].map(s => (
            <button key={s.label} style={{
              flex: 1, padding: '12px', borderRadius: 'var(--radius-md)',
              background: s.bg, color: s.color,
              display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4,
              fontSize: '1.25rem', fontWeight: 600, border: 'none', cursor: 'pointer',
            }}>
              {s.icon}
              <span style={{ fontSize: '0.6875rem' }}>{s.label}</span>
            </button>
          ))}
        </div>

        {/* Stats */}
        <div style={{ display: 'flex', gap: 12, marginBottom: 24 }}>
          <div className="stat-card" style={{ flex: 1 }}>
            <div className="stat-value">{inviteCount}</div>
            <div className="stat-label">People joined</div>
          </div>
          <div className="stat-card" style={{ flex: 1 }}>
            <div className="stat-value" style={{ color: 'var(--brand-green)' }}>₦3,600</div>
            <div className="stat-label">Total earned</div>
          </div>
        </div>

        {/* Tier progress */}
        <div style={{ fontWeight: 700, marginBottom: 12 }}>Your Progress</div>
        <div style={{ display: 'flex', gap: 8, marginBottom: 16 }}>
          {TIERS.map((tier, i) => {
            const done = inviteCount >= tier.threshold;
            const active = !done && inviteCount < tier.threshold && (i === 0 || inviteCount >= TIERS[i-1].threshold);
            return (
              <div key={tier.label} style={{
                flex: 1, textAlign: 'center', padding: '10px 6px',
                borderRadius: 'var(--radius-sm)',
                background: done ? 'var(--brand-green)' : active ? 'var(--action-orange-light)' : 'var(--bg-elevated)',
                border: active ? '1.5px solid var(--action-orange)' : '1.5px solid var(--separator)',
              }}>
                <div style={{ fontSize: '0.6875rem', fontWeight: 700, color: done ? 'white' : active ? 'var(--action-orange)' : 'var(--text-muted)' }}>
                  {tier.label}
                </div>
                <div style={{ fontSize: '0.625rem', color: done ? 'rgba(255,255,255,0.7)' : 'var(--text-muted)', marginTop: 2 }}>
                  {tier.threshold} invites
                </div>
              </div>
            );
          })}
        </div>

        {/* Progress bar to next tier */}
        <div style={{ marginBottom: 8 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8125rem', color: 'var(--text-muted)', marginBottom: 6 }}>
            <span>{inviteCount} invites</span>
            <span>{nextTier.threshold} to {nextTier.label}</span>
          </div>
          <div style={{ height: 8, background: 'var(--separator)', borderRadius: 4, overflow: 'hidden' }}>
            <div style={{
              height: '100%',
              width: `${Math.min(100, (inviteCount / nextTier.threshold) * 100)}%`,
              background: 'linear-gradient(90deg, var(--action-orange), #FFB366)',
              borderRadius: 4, transition: 'width 0.5s ease',
            }} />
          </div>
        </div>
      </div>
    </div>
  );
}
