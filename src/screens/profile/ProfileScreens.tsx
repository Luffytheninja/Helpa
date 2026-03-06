import { useState } from 'react';
import { TopBar, Avatar, TrustBadge, StickyIcon } from '../../components/ui';
import { useApp } from '../../context/AppContext';
import { AVATARS, ICONS } from '../../constants';
import { useHaptics } from '../../hooks/useHaptics';
import { MdPerson, MdBuild, MdCheck, MdLightMode, MdDarkMode, MdDesktopMac } from 'react-icons/md';

export function ProfileScreen({ onNavigate }: { onNavigate: (s: string) => void }) {
  const { userName, activeMode, setActiveMode } = useApp();
  const { haptic } = useHaptics();

  const QUICK_LINKS = [
    { icon: ICONS.analytics, label: 'Analytics',    color: 'green',  screen: 'analytics' },
    { icon: ICONS.reward,    label: 'Referrals',    color: 'orange', screen: 'referral'  },
    { icon: ICONS.wrench,    label: 'Settings',     color: 'muted',  screen: 'settings'  },
    { icon: ICONS.help,      label: 'Help & Support', color: 'muted', screen: 'help'     },
  ];

  return (
    <div style={{ paddingBottom: 80 }}>
      {/* Header */}
      <div className="profile-header">
        {/* Mode toggle */}
        <div className="profile-mode-toggle">
          <button
            className={`mode-btn ${activeMode === 'hire' ? 'active' : ''}`}
            onClick={() => { haptic('selection'); setActiveMode('hire'); }}
            style={{ display: 'flex', alignItems: 'center', gap: 6 }}
          >
            <MdPerson size={16} /> Hire Mode
          </button>
          <button
            className={`mode-btn ${activeMode === 'earn' ? 'active' : ''}`}
            onClick={() => { haptic('selection'); setActiveMode('earn'); }}
            style={{ display: 'flex', alignItems: 'center', gap: 6 }}
          >
            <MdBuild size={16} /> Earn Mode
          </button>
        </div>

        <Avatar name={userName} size={80} ring="verified" src={AVATARS.me} />
        <h1 style={{ color: 'white', fontSize: '1.375rem', fontWeight: 700, marginTop: 10, marginBottom: 4 }}>{userName}</h1>
        <TrustBadge level="elite" />
        <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.875rem', marginTop: 6 }}>
          Ikeja, Lagos · Member since Jan 2025
        </p>
      </div>

      <div style={{ padding: '20px' }}>
        {/* Verification */}
        <div className="card" style={{ padding: '16px', marginBottom: 16 }}>
          <div style={{ fontWeight: 700, marginBottom: 12 }}>Verifications</div>
          {[
            { label: 'NIN Verified',     icon: ICONS.passport, done: true },
            { label: 'BVN Linked',       icon: ICONS.money,    done: true },
            { label: 'Address Verified', icon: ICONS.globe,    done: true },
            { label: 'Face Verified',    icon: ICONS.safety,   done: true },
          ].map(v => (
            <div key={v.label} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '8px 0', borderBottom: '1px solid var(--separator)', cursor: 'pointer' }}>
              <StickyIcon src={v.icon} size={26} alt={v.label} />
              <span style={{ flex: 1, fontWeight: 500, fontSize: '0.9375rem' }}>{v.label}</span>
              <span style={{
                background: 'var(--status-success-bg)', color: 'var(--status-success-text)',
                fontSize: '0.75rem', fontWeight: 700,
                padding: '2px 10px', borderRadius: 'var(--radius-full)',
                display: 'flex', alignItems: 'center', gap: 4,
              }}><MdCheck size={12} /> Done</span>
            </div>
          ))}
        </div>

        {/* Trust Level */}
        <div className="card" style={{ padding: '16px', marginBottom: 16 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 10 }}>
            <span style={{ fontWeight: 700 }}>Trust Level</span>
            <TrustBadge level="elite" />
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: 6 }}>
            <span>Elite Helper</span><span>Pro (next)</span>
          </div>
          <div style={{ height: 8, background: 'var(--separator)', borderRadius: 4, overflow: 'hidden' }}>
            <div style={{ height: '100%', width: '72%', background: 'linear-gradient(90deg, var(--brand-green), var(--soft-green))', borderRadius: 4 }} />
          </div>
          <div style={{ fontSize: '0.8125rem', color: 'var(--text-muted)', marginTop: 6 }}>28 more jobs to reach Pro</div>
        </div>

        {/* Quick links */}
        {QUICK_LINKS.map(item => (
          <button
            key={item.label}
            onClick={() => { haptic('light'); onNavigate(item.screen); }}
            style={{
              display: 'flex', alignItems: 'center', gap: 14,
              width: '100%', padding: '15px 0',
              borderBottom: '1px solid var(--separator)',
              background: 'none', textAlign: 'left',
              transition: 'opacity 0.15s',
            }}
          >
            <div style={{
              width: 40, height: 40, borderRadius: 10,
              background: item.color === 'green' ? 'var(--brand-green-light)' :
                          item.color === 'orange' ? 'var(--action-orange-light)' : 'var(--bg-elevated)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <StickyIcon src={item.icon} size={24} alt={item.label} />
            </div>
            <span style={{ fontWeight: 600, flex: 1, fontSize: '0.9375rem', color: 'var(--text-primary)' }}>{item.label}</span>
            <span style={{ color: 'var(--text-muted)', fontSize: '1rem' }}>›</span>
          </button>
        ))}
      </div>
    </div>
  );
}

// ── Settings Screen ────────────────────────────────────────────────────────────
export function SettingsScreen({ onBack }: { onBack: () => void }) {
  const { theme, setTheme } = useApp();
  const { haptic } = useHaptics();
  const [notifs, setNotifs] = useState({ jobs: true, payments: true, messages: true, system: false });

  return (
    <div style={{ paddingBottom: 80 }}>
      <TopBar
        left={<button onClick={() => { haptic('light'); onBack(); }} style={{ fontSize: 22, color: 'var(--text-muted)', display: 'flex', alignItems: 'center' }}><StickyIcon src={ICONS.back} size={22} /></button>}
        title="Settings"
      />

      {/* Account */}
      <div className="settings-group" style={{ marginTop: 16 }}>
        <div className="settings-group-label">Account</div>
        <div style={{ margin: '0 20px', borderRadius: 'var(--radius-md)', overflow: 'hidden', border: '1px solid var(--separator)' }}>
          {[
            { icon: ICONS.profile,  label: 'Edit name',           color: 'green' },
            { icon: ICONS.phone,    label: 'Change phone number',  color: 'green' },
          ].map(item => (
            <div key={item.label} className="settings-item" onClick={() => haptic('light')}>
              <div className="settings-item-left">
                <div className={`settings-icon-wrap settings-icon-${item.color}`}>
                  <StickyIcon src={item.icon} size={20} alt={item.label} />
                </div>
                <span style={{ fontWeight: 500, fontSize: '0.9375rem', color: 'var(--text-primary)' }}>{item.label}</span>
              </div>
              <span style={{ color: 'var(--text-muted)' }}>›</span>
            </div>
          ))}
        </div>
      </div>

      {/* Appearance */}
      <div className="settings-group">
        <div className="settings-group-label">Appearance</div>
        <div style={{ margin: '0 20px', borderRadius: 'var(--radius-md)', overflow: 'hidden', border: '1px solid var(--separator)' }}>
          {(['light', 'dark', 'system'] as const).map(t => (
            <div key={t} className="settings-item" style={{ cursor: 'pointer' }} onClick={() => { haptic('selection'); setTheme(t); }}>
              <div className="settings-item-left">
                <div className="settings-icon-wrap settings-icon-green" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  {t === 'light'
                    ? <MdLightMode size={20} style={{ color: 'var(--brand-green)' }} />
                    : t === 'dark'
                    ? <MdDarkMode size={20} style={{ color: 'var(--brand-green)' }} />
                    : <MdDesktopMac size={20} style={{ color: 'var(--brand-green)' }} />}
                </div>
                <span style={{ fontWeight: 500, fontSize: '0.9375rem', textTransform: 'capitalize' }}>
                  {t === 'system' ? 'System Default' : `${t.charAt(0).toUpperCase() + t.slice(1)} Mode`}
                </span>
              </div>
              {theme === t && <MdCheck size={20} style={{ color: 'var(--brand-green)', flexShrink: 0 }} />}
            </div>
          ))}
        </div>
      </div>

      {/* Notifications */}
      <div className="settings-group">
        <div className="settings-group-label">Notifications</div>
        <div style={{ margin: '0 20px', borderRadius: 'var(--radius-md)', overflow: 'hidden', border: '1px solid var(--separator)' }}>
          {([
            { key: 'jobs'     as const, label: 'Job updates',    icon: ICONS.jobs    },
            { key: 'payments' as const, label: 'Payment alerts', icon: ICONS.wallet  },
            { key: 'messages' as const, label: 'Messages',       icon: ICONS.chat    },
            { key: 'system'   as const, label: 'System notices', icon: ICONS.notification },
          ]).map(item => (
            <div key={item.key} className="settings-item">
              <div className="settings-item-left">
                <div className="settings-icon-wrap settings-icon-green">
                  <StickyIcon src={item.icon} size={20} alt={item.label} />
                </div>
                <span style={{ fontWeight: 500, fontSize: '0.9375rem' }}>{item.label}</span>
              </div>
              <label className="toggle" style={{ width: 48, height: 26 }}>
                <input
                  type="checkbox"
                  checked={notifs[item.key]}
                  onChange={e => { haptic('light'); setNotifs(n => ({ ...n, [item.key]: e.target.checked })); }}
                />
                <div className="toggle-track" style={{ top: 0, left: 0, right: 0, bottom: 0, position: 'absolute' }} />
                <div className="toggle-thumb" style={{ top: 2, left: 2, width: 20, height: 20 }} />
              </label>
            </div>
          ))}
        </div>
      </div>

      {/* Privacy */}
      <div className="settings-group">
        <div className="settings-group-label">Privacy & Security</div>
        <div style={{ margin: '0 20px', borderRadius: 'var(--radius-md)', overflow: 'hidden', border: '1px solid var(--separator)' }}>
          {[
            { icon: ICONS.library, label: 'Privacy Policy',      color: 'muted'  },
            { icon: ICONS.receipt, label: 'Download your data',  color: 'muted'  },
            { icon: ICONS.pen,     label: 'Delete account',      color: 'danger' },
          ].map(item => (
            <div key={item.label} className="settings-item" onClick={() => haptic(item.color === 'danger' ? 'warning' : 'light')}>
              <div className="settings-item-left">
                <div
                  className={`settings-icon-wrap ${item.color === 'danger' ? '' : 'settings-icon-muted'}`}
                  style={item.color === 'danger' ? { background: 'var(--status-danger-bg)', color: 'var(--status-danger-text)' } : {}}
                >
                  <StickyIcon src={item.icon} size={20} alt={item.label} />
                </div>
                <span style={{ fontWeight: 500, fontSize: '0.9375rem', color: item.color === 'danger' ? 'var(--status-danger-text)' : 'var(--text-primary)' }}>
                  {item.label}
                </span>
              </div>
              <span style={{ color: 'var(--text-muted)' }}>›</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
