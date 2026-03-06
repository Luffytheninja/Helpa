import { useApp } from '../../context/AppContext';
import { Avatar, SectionHeader, JobCard, MapPlaceholder, StickyIcon } from '../../components/ui';
import { ICONS, AVATARS } from '../../constants';
import { useHaptics } from '../../hooks/useHaptics';

const NEARBY_JOBS = [
  {
    category: '🔧', title: 'Fix kitchen sink leak',
    customerName: 'Bisi Adewale', customerRating: 4.8,
    location: 'Ikeja GRA', distance: '0.4km',
    urgency: 'urgent' as const, budget: '₦15,000',
    escrowFunded: true, applicants: 5,
  },
  {
    category: '⚡', title: 'Electrical fault in office',
    customerName: 'Tunde Afolabi', customerRating: 4.6,
    location: 'Lekki Phase 1', distance: '1.1km',
    urgency: 'scheduled' as const, budget: '₦25,000',
    escrowFunded: true, applicants: 2,
  },
  {
    category: '🚗', title: 'Airport pickup — 3 passengers',
    customerName: 'Chinyere Obi', customerRating: 5.0,
    location: 'Ajah', distance: '2.3km',
    urgency: 'urgent' as const, budget: '₦10,000',
    escrowFunded: false, applicants: 8,
  },
  {
    category: '🧹', title: 'Deep-clean 4-bedroom apartment',
    customerName: 'Kola Adeleke', customerRating: 4.4,
    location: 'Yaba', distance: '3.1km',
    urgency: 'scheduled' as const, budget: '₦18,000',
    escrowFunded: false, applicants: 1,
  },
];

export function HelperDashboard({ onNavigate }: { onNavigate: (screen: string) => void }) {
  const { userName, greeting, onlineStatus, setOnlineStatus, notifCount } = useApp();
  const { haptic } = useHaptics();
  const todayEarnings = '₦32,500';
  const todayJobs = 3;

  const handleToggle = (checked: boolean) => {
    haptic(checked ? 'success' : 'warning');
    setOnlineStatus(checked);
  };

  return (
    <div style={{ paddingBottom: 80 }}>
      {/* Top row */}
      <div style={{ padding: '16px 20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Avatar name={userName} size={40} ring={onlineStatus ? 'active' : 'offline'} src={AVATARS.me} />
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '0.8125rem', color: 'var(--text-muted)', fontWeight: 500 }}>{greeting}</div>
          <div style={{ fontWeight: 700, fontSize: '1rem' }}>{userName.split(' ')[0]}</div>
        </div>
        <button
          style={{ position: 'relative', background: 'none' }}
          onClick={() => { haptic('light'); onNavigate('notifications'); }}
        >
          <StickyIcon src={ICONS.notification} size={28} alt="Notifications" />
          {notifCount > 0 && (
            <span style={{
              position: 'absolute', top: -2, right: -2,
              background: 'var(--action-orange)', color: 'white',
              fontSize: '0.6rem', fontWeight: 700,
              width: 16, height: 16, borderRadius: '50%',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>{notifCount}</span>
          )}
        </button>
      </div>

      {/* Online Toggle */}
      <div className="online-toggle-card" style={{
        background: onlineStatus ? 'var(--brand-green-light)' : 'var(--bg-card)',
        borderColor: onlineStatus ? 'var(--brand-green)' : 'var(--border-card)',
        transition: 'all 0.3s ease',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <div className={`online-indicator ${onlineStatus ? 'active' : ''}`} />
          <div>
            <div style={{ fontWeight: 700, fontSize: '1rem' }}>
              {onlineStatus ? "You're Online" : "You're Offline"}
            </div>
            <div style={{ fontSize: '0.8125rem', color: 'var(--text-muted)' }}>
              {onlineStatus ? 'Visible to nearby customers' : 'Hidden from job feeds'}
            </div>
          </div>
        </div>
        <label className="toggle" id="online-toggle">
          <input
            type="checkbox"
            checked={onlineStatus}
            onChange={e => handleToggle(e.target.checked)}
          />
          <div className="toggle-track" />
          <div className="toggle-thumb" />
        </label>
      </div>

      {/* Analytics preview */}
      <div style={{ padding: '0 20px 20px', display: 'flex', gap: 12 }}>
        {[
          { label: "Today's Earnings", value: todayEarnings, icon: ICONS.money },
          { label: 'Jobs Today',       value: String(todayJobs), icon: ICONS.jobs },
          { label: 'Rating',           value: '4.9',             icon: ICONS.star },
        ].map(s => (
          <div key={s.label} className="stat-card" style={{ flex: 1 }}>
            <StickyIcon src={s.icon} size={28} alt={s.label} style={{ margin: '0 auto 4px' }} />
            <div className="stat-value" style={{ fontSize: '1.125rem' }}>{s.value}</div>
            <div className="stat-label">{s.label}</div>
          </div>
        ))}
      </div>

      {/* Mini map */}
      <SectionHeader title="Jobs Near You" action="Map view" onAction={() => haptic('light')} />
      <div style={{ padding: '0 20px 16px' }}>
        <MapPlaceholder height={140} showRadius />
      </div>

      {/* Jobs list */}
      <div style={{ padding: '0 20px', display: 'flex', flexDirection: 'column', gap: 12 }}>
        {NEARBY_JOBS.map(job => (
          <JobCard
            key={job.title}
            {...job}
            onClick={() => onNavigate('job-matching')}
          />
        ))}
      </div>
    </div>
  );
}
