import { useState } from 'react';
import { TopBar, Avatar, TrustBadge, StickyIcon } from '../../components/ui';
import { AVATARS, ICONS } from '../../constants';
import { useHaptics } from '../../hooks/useHaptics';

const HELPERS = [
  { name: 'Emeka Obi',       rating: 4.9, trust: 'elite'    as const, ring: 'active'   as const, distance: '0.3km', jobs: 214, verified: true,  src: AVATARS.emeka  },
  { name: 'Fatima Abubakar', rating: 4.8, trust: 'trusted'  as const, ring: 'verified' as const, distance: '0.7km', jobs: 87,  verified: true,  src: AVATARS.fatima },
  { name: 'Chidi Eze',       rating: 4.7, trust: 'verified' as const, ring: 'verified' as const, distance: '1.2km', jobs: 52,  verified: true,  src: AVATARS.chidi  },
  { name: 'Adaeze Nwosu',    rating: 4.6, trust: 'verified' as const, ring: 'student'  as const, distance: '1.5km', jobs: 31,  verified: false, src: AVATARS.adaeze },
  { name: 'Kola Adeyemi',    rating: 4.5, trust: 'verified' as const, ring: 'verified' as const, distance: '1.8km', jobs: 19,  verified: true,  src: AVATARS.kola   },
];

export function JobMatchingScreen({ onBack, onSelect }: { onBack: () => void; onSelect: () => void }) {
  const [selected, setSelected] = useState<string | null>(null);
  const { haptic } = useHaptics();

  const handleSelect = (name: string) => {
    haptic('success');
    setSelected(name);
    setTimeout(onSelect, 300);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100dvh' }}>
      <TopBar
        left={<button onClick={() => { haptic('light'); onBack(); }} style={{ fontSize: 22, color: 'var(--text-muted)' }}>←</button>}
        title="Helpers Nearby"
        right={
          <span style={{ fontSize: '0.8125rem', color: 'var(--action-orange)', fontWeight: 600 }}>
            {HELPERS.length} found
          </span>
        }
      />

      <div style={{ padding: '12px 20px 0' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '12px 16px', background: 'var(--action-orange-light)', border: '1.5px solid #FED7AA', borderRadius: 'var(--radius-md)', marginBottom: 16 }}>
          <StickyIcon src={ICONS.notification} size={24} />
          <span style={{ fontSize: '0.875rem', color: '#C2410C', fontWeight: 600 }}>Urgent job broadcast active — helpers are seeing this now</span>
        </div>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem', marginBottom: 4 }}>
          5 helpers applied · Select who you'd like
        </p>
      </div>

      <div style={{ flex: 1, overflow: 'auto', padding: '12px 20px', display: 'flex', flexDirection: 'column', gap: 12 }}>
        {HELPERS.map((h, i) => (
          <div
            key={h.name}
            className={`card animate-slide-up stagger-${i + 1}`}
            style={{
              padding: '16px',
              border: selected === h.name ? '2px solid var(--action-orange)' : '1px solid var(--border-card)',
              transition: 'all 0.2s',
              cursor: 'pointer',
            }}
            onClick={() => { haptic('light'); setSelected(h.name); }}
          >
            <div style={{ display: 'flex', gap: 14, alignItems: 'flex-start' }}>
              <Avatar name={h.name} size={56} ring={h.ring} src={h.src} />
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap', marginBottom: 4 }}>
                  <span style={{ fontWeight: 700, fontSize: '1rem' }}>{h.name}</span>
                  <TrustBadge level={h.trust} />
                </div>
                <div style={{ display: 'flex', gap: 12, fontSize: '0.8125rem', color: 'var(--text-secondary)', marginBottom: 8, alignItems: 'center' }}>
                  <span style={{ display: 'inline-flex', alignItems: 'center', gap: 3 }}>
                    <StickyIcon src={ICONS.star} size={14} /> {h.rating}
                  </span>
                  <span style={{ display: 'inline-flex', alignItems: 'center', gap: 3 }}>
                    <StickyIcon src={ICONS.location} size={14} /> {h.distance}
                  </span>
                  <span style={{ display: 'inline-flex', alignItems: 'center', gap: 3 }}>
                    <StickyIcon src={ICONS.verification} size={14} /> {h.jobs} jobs
                  </span>
                </div>
                {h.verified && (
                  <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                    {['NIN', 'BVN', 'Face'].map(v => (
                      <span key={v} style={{
                        background: '#D1FAE5', color: '#065F46',
                        fontSize: '0.6875rem', fontWeight: 700,
                        padding: '2px 8px', borderRadius: 'var(--radius-full)',
                      }}>✓ {v}</span>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Completion rate bar */}
            <div style={{ margin: '12px 0 14px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', marginBottom: 5, color: 'var(--text-muted)' }}>
                <span>Completion rate</span>
                <span style={{ fontWeight: 700, color: 'var(--soft-green)' }}>{98 - i * 2}%</span>
              </div>
              <div style={{ height: 5, background: 'var(--separator)', borderRadius: 3, overflow: 'hidden' }}>
                <div style={{
                  height: '100%', background: 'var(--soft-green)',
                  width: `${98 - i * 2}%`, borderRadius: 3, transition: 'width 0.5s ease',
                }} />
              </div>
            </div>

            <div style={{ display: 'flex', gap: 10 }}>
              <button
                className="btn btn-sm btn-secondary"
                style={{ flex: 1, borderRadius: 8 }}
                onClick={e => { e.stopPropagation(); haptic('light'); setSelected(h.name); }}
              >
                View Profile
              </button>
              <button
                className="btn btn-sm btn-primary btn-bounce"
                style={{ flex: 1, borderRadius: 8 }}
                onClick={e => { e.stopPropagation(); handleSelect(h.name); }}
              >
                Select ✓
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ── Helper Profile Screen ──────────────────────────────────────────────────────
export function HelperProfileScreen({ onBack, onHire }: { onBack: () => void; onHire: () => void }) {
  const { haptic } = useHaptics();

  const REVIEWS = [
    { name: 'Bisi A.',   src: AVATARS.bisi,  rating: 5, text: 'Emeka was professional and fixed everything quickly. Highly recommended!', date: '2 days ago' },
    { name: 'Tunde O.', src: AVATARS.tunde, rating: 5, text: 'Super reliable. Arrived on time and did a great job.', date: '1 week ago' },
    { name: 'Grace E.', src: AVATARS.grace, rating: 4, text: 'Good work overall, very friendly.', date: '2 weeks ago' },
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100dvh' }}>
      <TopBar
        left={<button onClick={() => { haptic('light'); onBack(); }} style={{ fontSize: 22, color: 'var(--text-muted)' }}>←</button>}
        title="Helper Profile"
        showBorder={false}
      />

      {/* Hero */}
      <div style={{
        background: 'linear-gradient(160deg, var(--brand-green) 0%, var(--brand-green-mid) 100%)',
        padding: '24px 20px 32px',
        textAlign: 'center',
      }}>
        <Avatar name="Emeka Obi" size={96} ring="active" src={AVATARS.emeka} />
        <h1 style={{ color: 'white', fontSize: '1.5rem', fontWeight: 700, marginTop: 12, marginBottom: 4 }}>Emeka Obi</h1>
        <TrustBadge level="elite" />
        <div style={{ color: 'rgba(255,255,255,0.9)', fontSize: '0.875rem', marginTop: 10, display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 12 }}>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4 }}><StickyIcon src={ICONS.star} size={16} style={{ filter: 'brightness(0) invert(1)' }} /> 4.9</span>
          <span style={{ opacity: 0.5 }}>|</span>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4 }}><StickyIcon src={ICONS.verification} size={16} style={{ filter: 'brightness(0) invert(1)' }} /> 214 jobs</span>
          <span style={{ opacity: 0.5 }}>|</span>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4 }}><StickyIcon src={ICONS.location} size={16} style={{ filter: 'brightness(0) invert(1)' }} /> Ikeja, Lagos</span>
        </div>
        <div style={{ display: 'flex', justifyContent: 'center', gap: 16, marginTop: 16 }}>
          {[
            { label: 'Completion',     value: '98%'  },
            { label: 'Repeat clients', value: '42'   },
            { label: 'Avg response',   value: '4 min'},
          ].map(s => (
            <div key={s.label} style={{ textAlign: 'center' }}>
              <div style={{ fontWeight: 700, fontSize: '1.25rem', color: 'white' }}>{s.value}</div>
              <div style={{ fontSize: '0.6875rem', color: 'rgba(255,255,255,0.6)' }}>{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      <div style={{ flex: 1, overflowY: 'auto', padding: '20px' }}>
        {/* Verifications */}
        <div className="card" style={{ padding: '16px', marginBottom: 16 }}>
          <div style={{ fontWeight: 700, marginBottom: 12 }}>Verifications</div>
          {[
            { label: 'NIN Verified',      icon: ICONS.passport },
            { label: 'BVN Linked',        icon: ICONS.lock },
            { label: 'Address Verified',  icon: ICONS.location },
            { label: 'Face Verified',     icon: ICONS.profile },
          ].map(v => (
            <div key={v.label} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '10px 0', borderBottom: '1px solid var(--separator)' }}>
              <StickyIcon src={v.icon} size={24} />
              <span style={{ flex: 1, fontSize: '0.9375rem', fontWeight: 500 }}>{v.label}</span>
              <span style={{
                background: 'var(--brand-green-light)', color: 'var(--brand-green)',
                fontSize: '0.75rem', fontWeight: 700,
                padding: '3px 12px', borderRadius: 'var(--radius-full)',
              }}>Verified <StickyIcon src={ICONS.verification} size={12} style={{ display: 'inline-block', verticalAlign: 'middle', marginLeft: 2 }} /></span>
            </div>
          ))}
        </div>

        {/* Skills */}
        <div className="card" style={{ padding: '16px', marginBottom: 16 }}>
          <div style={{ fontWeight: 700, marginBottom: 10 }}>Skills</div>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            {['🔧 Plumbing', '⚡ Electrical', '🔩 General Repairs', '🚿 Bathroom'].map(s => (
              <span key={s} style={{
                padding: '6px 14px', borderRadius: 'var(--radius-full)',
                background: 'var(--brand-green-light)', color: 'var(--brand-green)',
                fontWeight: 600, fontSize: '0.8125rem',
              }}>{s}</span>
            ))}
          </div>
        </div>

        {/* Reviews */}
        <div style={{ fontWeight: 700, fontSize: '1rem', marginBottom: 12 }}>Reviews</div>
        {REVIEWS.map(r => (
          <div key={r.name} className="review-card">
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 6 }}>
              <Avatar name={r.name} size={36} src={r.src} />
              <div>
                <div style={{ fontWeight: 600, fontSize: '0.875rem' }}>{r.name}</div>
                <div className="stars">{'★'.repeat(r.rating)}{'☆'.repeat(5 - r.rating)}</div>
              </div>
              <span style={{ marginLeft: 'auto', fontSize: '0.75rem', color: 'var(--text-muted)' }}>{r.date}</span>
            </div>
            <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>{r.text}</p>
          </div>
        ))}
      </div>

      {/* Hire button */}
      <div style={{ padding: '16px 20px 32px', borderTop: '1px solid var(--separator)' }}>
        <button
          className="btn btn-primary btn-full btn-lg btn-bounce"
          onClick={() => { haptic('heavy'); onHire(); }}
          style={{ borderRadius: 'var(--radius-md)' }}
        >
          Hire Now 🚀
        </button>
      </div>
    </div>
  );
}
