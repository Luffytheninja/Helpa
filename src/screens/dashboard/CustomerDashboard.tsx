import { useApp } from '../../context/AppContext';
import { Avatar, SectionHeader, HelperCard, MapPlaceholder, CategoryBtn, StickyIcon } from '../../components/ui';
import { ICONS, AVATARS } from '../../constants';
import { useHaptics } from '../../hooks/useHaptics';

const QUICK_CATS = [
  { icon: ICONS.plumbing,    label: 'Plumbing'     },
  { icon: ICONS.electrical,  label: 'Electrical'   },
  { icon: ICONS.driver,      label: 'Driver'       },
  { icon: ICONS.errands,     label: 'Errands'      },
  { icon: ICONS.cleaning,    label: 'Cleaning'     },
  { icon: ICONS.techRepair,  label: 'Tech Repair'  },
  { icon: ICONS.studentHelp, label: 'Student Help' },
];

const ACTIVE_JOBS = [
  { id: 'aj1', title: 'Kitchen Sink Repair', helper: 'Emeka O.', status: 'In Progress', escrow: '₦15,000', ring: 'active' as const },
  { id: 'aj2', title: 'AC Unit Servicing',   helper: 'Fatima A.', status: 'Accepted',   escrow: '₦22,000', ring: 'verified' as const },
];

const NEARBY_HELPERS = [
  { name: 'Emeka Obi',       rating: 4.9, distance: '0.3km', trust: 'elite'    as const, ring: 'active'   as const, jobs: 214 },
  { name: 'Fatima Abubakar', rating: 4.8, distance: '0.7km', trust: 'trusted'  as const, ring: 'verified' as const, jobs: 87  },
  { name: 'Chidi Eze',       rating: 4.7, distance: '1.2km', trust: 'verified' as const, ring: 'verified' as const, jobs: 52  },
  { name: 'Adaeze N.',       rating: 4.6, distance: '1.4km', trust: 'verified' as const, ring: 'student'  as const, jobs: 31  },
];

export function CustomerDashboard({ onNavigate }: { onNavigate: (screen: string) => void }) {
  const { userName, greeting, notifCount } = useApp();
  const { haptic } = useHaptics();

  return (
    <div style={{ paddingBottom: 80 }}>
      {/* Top bar */}
      <div style={{ padding: '16px 20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Avatar name={userName} size={40} ring="verified" src={AVATARS.me} />
        <div style={{
          display: 'flex', alignItems: 'center', gap: 8,
          background: 'var(--bg-elevated)', borderRadius: 'var(--radius-full)',
          padding: '8px 16px', border: '1px solid var(--separator)',
          cursor: 'pointer',
        }}
          onClick={() => haptic('light')}
        >
          <StickyIcon src={ICONS.location} size={18} />
          <span style={{ fontSize: '0.875rem', fontWeight: 600 }}>Ikeja, Lagos</span>
        </div>
        <button
          id="notif-bell-customer"
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

      {/* Greeting */}
      <div style={{ padding: '0 20px 20px' }}>
        <h1 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: 2 }}>
          {greeting}, {userName.split(' ')[0]}.
        </h1>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.9375rem' }}>What do you need help with today?</p>
      </div>

      {/* Quick Action */}
      <div style={{ padding: '0 20px 20px' }}>
        <button
          id="post-urgent-job"
          className="btn btn-orange btn-full btn-lg btn-bounce"
          onClick={() => { haptic('medium'); onNavigate('post-job'); }}
          style={{ borderRadius: 'var(--radius-md)', fontSize: '1.0625rem', fontWeight: 700, letterSpacing: '-0.01em', gap: 10 }}
        >
          <StickyIcon src={ICONS.notification} size={20} /> Post Urgent Job
        </button>
      </div>

      {/* Categories */}
      <SectionHeader title="Categories" action="See all" />
      <div style={{ padding: '0 20px 20px', display: 'flex', gap: 10, overflowX: 'auto', scrollbarWidth: 'none' }}>
        {QUICK_CATS.map(c => (
          <CategoryBtn key={c.label} icon={c.icon} label={c.label} />
        ))}
      </div>

      {/* Active Jobs */}
      {ACTIVE_JOBS.length > 0 && (
        <>
          <SectionHeader title="Active Jobs" action="View all" />
          <div style={{ padding: '0 20px 20px', display: 'flex', flexDirection: 'column', gap: 12 }}>
            {ACTIVE_JOBS.map(job => (
              <div key={job.id} className="card" style={{ padding: '16px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <Avatar name={job.helper} size={44} ring={job.ring} />
                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: 700, fontSize: '0.9375rem', marginBottom: 2 }}>{job.title}</div>
                    <div style={{ fontSize: '0.8125rem', color: 'var(--text-muted)' }}>{job.helper}</div>
                  </div>
                  <div>
                    <div style={{
                      padding: '4px 10px', borderRadius: 'var(--radius-full)',
                      background: job.status === 'In Progress' ? '#FEF0E6' : '#DCFCE7',
                      color: job.status === 'In Progress' ? '#C2410C' : '#166534',
                      fontSize: '0.75rem', fontWeight: 700, marginBottom: 4, textAlign: 'right',
                    }}>{job.status}</div>
                    <div style={{ fontSize: '0.8125rem', fontWeight: 700, textAlign: 'right', color: 'var(--brand-green)', display: 'inline-flex', alignItems: 'center', gap: 4 }}>
                      <StickyIcon src={ICONS.lock} size={14} /> {job.escrow}
                    </div>
                  </div>
                </div>
                <div style={{ marginTop: 12, display: 'flex', gap: 8 }}>
                  <button
                    className="btn btn-sm btn-primary btn-bounce"
                    style={{ flex: 1, borderRadius: 8 }}
                    onClick={() => { haptic('medium'); onNavigate('active-job'); }}
                  >
                    View Job
                  </button>
                  <button
                    className="btn btn-sm btn-secondary"
                    style={{ flex: 1, borderRadius: 8 }}
                    onClick={() => { haptic('light'); onNavigate('chat'); }}
                  >
                    Chat
                  </button>
                </div>
              </div>
            ))}
          </div>
        </>
      )}

      {/* Map mini */}
      <SectionHeader title="Helpers Near You" />
      <div style={{ padding: '0 20px 16px' }}>
        <MapPlaceholder height={160} showRadius />
      </div>

      {/* Recommended helpers */}
      <div style={{ padding: '0 20px 12px' }}>
        <div style={{ display: 'flex', gap: 12, overflowX: 'auto', scrollbarWidth: 'none', paddingBottom: 4 }}>
          {NEARBY_HELPERS.map(h => (
            <HelperCard key={h.name} {...h} />
          ))}
        </div>
      </div>
    </div>
  );
}
