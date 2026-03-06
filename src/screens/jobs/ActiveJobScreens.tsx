import { useState } from 'react';
import { TopBar, Avatar, MapPlaceholder, StickyIcon } from '../../components/ui';
import { AVATARS, ICONS } from '../../constants';
import { useHaptics } from '../../hooks/useHaptics';

export function ActiveJobScreen({ onBack, onComplete }: { onBack: () => void; onComplete: () => void }) {
  const [timer] = useState('00:42:17');
  const [showConfirm, setShowConfirm] = useState(false);
  const [showDispute, setShowDispute] = useState(false);
  const { haptic } = useHaptics();

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100dvh' }}>
      <TopBar
        left={<button onClick={() => { haptic('light'); onBack(); }} style={{ fontSize: 22, color: 'var(--text-muted)' }}>←</button>}
        title="Active Job"
      />

      {/* Map */}
      <MapPlaceholder height={180} />

      <div style={{ flex: 1, padding: '20px', overflowY: 'auto' }}>
        {/* Status bar */}
        <div style={{
          background: 'var(--brand-green-light)',
          border: '1.5px solid var(--brand-green)',
          borderRadius: 'var(--radius-md)',
          padding: '14px 16px',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          marginBottom: 16,
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <div style={{
              width: 10, height: 10, borderRadius: '50%',
              background: 'var(--soft-green)',
              animation: 'pulse-soft 2s ease-in-out infinite',
              boxShadow: '0 0 0 4px rgba(59,194,154,0.2)',
            }} />
            <span style={{ fontWeight: 700, color: 'var(--brand-green)' }}>In Progress</span>
          </div>
          <span style={{ fontWeight: 700, fontSize: '1.25rem', fontFeatureSettings: '"tnum"', color: 'var(--text-primary)', display: 'inline-flex', alignItems: 'center', gap: 6 }}>
            <StickyIcon src={ICONS.time} size={20} /> {timer}
          </span>
        </div>

        {/* Helper info card */}
        <div className="card" style={{ padding: '16px', marginBottom: 16 }}>
          <div style={{ display: 'flex', gap: 12, alignItems: 'center', marginBottom: 14 }}>
            <Avatar name="Emeka Obi" size={52} ring="active" src={AVATARS.emeka} />
            <div style={{ flex: 1 }}>
              <div style={{ fontWeight: 700, fontSize: '1.0625rem' }}>Emeka Obi</div>
              <div style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', display: 'inline-flex', alignItems: 'center', gap: 4 }}>
                <StickyIcon src={ICONS.star} size={14} /> 4.9 · Plumber
              </div>
            </div>
            <button style={{ background: 'var(--brand-green-light)', padding: 10, borderRadius: 'var(--radius-full)' }} onClick={() => haptic('light')}>
              <StickyIcon src={ICONS.phone} size={24} />
            </button>
          </div>
          <div style={{ fontWeight: 700, fontSize: '1rem', marginBottom: 4 }}>Kitchen Sink Repair</div>
          <div style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', marginBottom: 16, display: 'inline-flex', alignItems: 'center', gap: 6 }}>
            <StickyIcon src={ICONS.location} size={16} /> 14 Adeyemi St, Ikeja GRA
          </div>
          <div style={{
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            background: 'var(--bg-elevated)', borderRadius: 'var(--radius-sm)', padding: '12px 14px',
          }}>
            <span style={{ color: 'var(--text-secondary)', fontSize: '0.875rem', fontWeight: 500 }}>Escrow</span>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 4 }}>
              <StickyIcon src={ICONS.lock} size={14} />
              <span style={{ fontWeight: 600, fontSize: '0.9375rem' }}>₦15,000 secured</span>
            </div>
          </div>
        </div>

        {/* Actions */}
        {!showConfirm ? (
          <div style={{ display: 'flex', gap: 12 }}>
            <button
              className="btn btn-primary btn-full btn-bounce"
              style={{ borderRadius: 'var(--radius-md)' }}
              onClick={() => { haptic('medium'); setShowConfirm(true); }}
            >
              <StickyIcon src={ICONS.verification} size={18} style={{ filter: 'brightness(0) invert(1)' }} /> Mark Complete
            </button>
            <button
              className="btn btn-secondary"
              style={{ flex: '0 0 auto', borderRadius: 'var(--radius-md)', padding: '14px 16px', display: 'inline-flex', alignItems: 'center', gap: 6 }}
              onClick={() => { haptic('warning'); setShowDispute(true); }}
            >
              <StickyIcon src={ICONS.notification} size={18} /> Dispute
            </button>
          </div>
        ) : (
          <div style={{ background: 'var(--bg-elevated)', borderRadius: 'var(--radius-md)', padding: '20px' }}>
            <div style={{ fontWeight: 700, fontSize: '1.0625rem', textAlign: 'center', marginBottom: 6 }}>
              Did Emeka complete the job?
            </div>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem', textAlign: 'center', marginBottom: 16 }}>
              Payment will be released on confirmation.
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              <button className="btn btn-primary btn-full btn-bounce" onClick={() => { haptic('success'); onComplete(); }} style={{ borderRadius: 'var(--radius-md)', display: 'inline-flex', alignItems: 'center', gap: 8 }}>
                <StickyIcon src={ICONS.verification} size={18} style={{ filter: 'brightness(0) invert(1)' }} /> Yes, release payment
              </button>
              <button className="btn btn-secondary btn-full" onClick={() => { haptic('warning'); setShowDispute(true); }} style={{ borderRadius: 'var(--radius-md)', display: 'inline-flex', alignItems: 'center', gap: 8 }}>
                <StickyIcon src={ICONS.notification} size={18} /> No, open dispute
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Dispute modal */}
      {showDispute && (
        <div style={{
          position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', zIndex: 200,
          display: 'flex', alignItems: 'flex-end',
        }} onClick={() => setShowDispute(false)}>
          <div
            style={{ background: 'var(--bg-primary)', borderRadius: '24px 24px 0 0', padding: '24px 20px 40px', width: '100%' }}
            onClick={e => e.stopPropagation()}
          >
            <div style={{ fontWeight: 700, fontSize: '1.125rem', marginBottom: 6 }}>Open a Dispute</div>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem', marginBottom: 16 }}>A dispute agent will review within 2 hours.</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 16 }}>
              {["Job not completed", "Work quality issue", "Helper didn't show up", "Safety concern", "Overcharge"].map(issue => (
                <button
                  key={issue}
                  style={{
                    padding: '14px', border: '1.5px solid var(--separator)', borderRadius: 'var(--radius-md)',
                    textAlign: 'left', fontWeight: 500, fontSize: '0.9375rem', cursor: 'pointer',
                    background: 'var(--bg-secondary)',
                  }}
                  onClick={() => haptic('light')}
                >
                  {issue}
                </button>
              ))}
            </div>
            <button className="btn btn-primary btn-full" style={{ borderRadius: 'var(--radius-md)' }} onClick={() => haptic('heavy')}>
              Submit Dispute
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

// ── Rating Flow ────────────────────────────────────────────────────────────────
export function RatingFlow({ onBack, onDone }: { onBack: () => void; onDone: () => void }) {
  const [stars, setStars] = useState(0);
  const [hoveredStar, setHoveredStar] = useState(0);
  const [sparkle, setSparkle] = useState(-1);
  const [tags, setTags] = useState<string[]>([]);
  const [submitted, setSubmitted] = useState(false);
  const { haptic } = useHaptics();

  const TAGS = ['On time', 'Professional', 'Great work', 'Would hire again', 'Needed improvement'];

  const handleStar = (i: number) => {
    haptic(i >= 4 ? 'success' : 'medium');
    setStars(i);
    setSparkle(i);
    setTimeout(() => setSparkle(-1), 500);
  };

  const toggleTag = (t: string) => {
    haptic('light');
    setTags(ts => ts.includes(t) ? ts.filter(x => x !== t) : [...ts, t]);
  };

  if (submitted) {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100dvh', alignItems: 'center', justifyContent: 'center', padding: 32 }}>
        <div className="animate-coin-drop" style={{ marginBottom: 24 }}>
          <StickyIcon src={ICONS.money} size={80} />
        </div>
        <h1 style={{ fontSize: '1.5rem', fontWeight: 700, textAlign: 'center', marginBottom: 8 }}>
          ₦15,000 released to Emeka!
        </h1>
        <p style={{ color: 'var(--text-secondary)', textAlign: 'center', lineHeight: 1.5, marginBottom: 32 }}>
          Thanks for using Helpa. Your payment has been released successfully.
        </p>
        <button className="btn btn-primary btn-full btn-bounce" onClick={onDone} style={{ borderRadius: 'var(--radius-md)' }}>
          Back to Home
        </button>
      </div>
    );
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100dvh' }}>
      <TopBar
        left={<button onClick={() => { haptic('light'); onBack(); }} style={{ fontSize: 22, color: 'var(--text-muted)' }}>←</button>}
        title="Rate this Job"
      />

      <div style={{ flex: 1, padding: '32px 20px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Avatar name="Emeka Obi" size={80} ring="active" src={AVATARS.emeka} />
        <h2 style={{ fontSize: '1.375rem', fontWeight: 700, marginTop: 12, marginBottom: 4 }}>How did it go?</h2>
        <p style={{ color: 'var(--text-muted)', marginBottom: 28 }}>Rate your experience with Emeka</p>

        {/* Stars */}
        <div style={{ display: 'flex', gap: 8, marginBottom: 28 }}>
          {[1, 2, 3, 4, 5].map(i => (
            <button
              key={i}
              id={`star-${i}`}
              className={`star-btn ${i <= (hoveredStar || stars) ? 'lit' : ''} ${sparkle === i ? 'sparkle' : ''}`}
              onClick={() => handleStar(i)}
              onMouseEnter={() => setHoveredStar(i)}
              onMouseLeave={() => setHoveredStar(0)}
            >
              ★
            </button>
          ))}
        </div>

        {/* Tags */}
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', justifyContent: 'center', marginBottom: 24 }}>
          {TAGS.map(t => (
            <button
              key={t}
              onClick={() => toggleTag(t)}
              style={{
                padding: '9px 16px', borderRadius: 'var(--radius-full)',
                border: `1.5px solid ${tags.includes(t) ? 'var(--brand-green)' : 'var(--separator)'}`,
                background: tags.includes(t) ? 'var(--brand-green-light)' : 'var(--bg-secondary)',
                color: tags.includes(t) ? 'var(--brand-green)' : 'var(--text-secondary)',
                fontWeight: 500, fontSize: '0.875rem', cursor: 'pointer', transition: 'all 0.2s',
              }}
            >
              {t}
            </button>
          ))}
        </div>

        <textarea
          className="input-field"
          rows={4}
          placeholder="Tell us more (optional)"
          style={{ resize: 'none', width: '100%' }}
        />
      </div>

      <div style={{ padding: '16px 20px 32px', borderTop: '1px solid var(--separator)' }}>
        <button
          className="btn btn-primary btn-full btn-lg btn-bounce"
          onClick={() => { if (stars > 0) { haptic('success'); setSubmitted(true); } }}
          disabled={stars === 0}
          style={{ borderRadius: 'var(--radius-md)', opacity: stars > 0 ? 1 : 0.5, gap: 10 }}
        >
          Submit Rating <StickyIcon src={ICONS.star} size={20} style={{ filter: 'brightness(0) invert(1)' }} />
        </button>
      </div>
    </div>
  );
}
