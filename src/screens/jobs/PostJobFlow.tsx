import { useState } from 'react';
import { TopBar, MapPlaceholder, StickyIcon } from '../../components/ui';
import { ICONS } from '../../constants';

type Step = 1 | 2 | 3 | 4 | 5;

export function PostJobFlow({ onBack, onComplete }: { onBack: () => void; onComplete: () => void }) {
  const [step, setStep] = useState<Step>(1);
  const [description, setDescription] = useState('');
  const [aiSuggestion, setAiSuggestion] = useState<string | null>(null);
  const [budget, setBudget] = useState(15000);
  const [urgency, setUrgency] = useState<'urgent' | 'scheduled'>('urgent');
  const [aiLoading, setAiLoading] = useState(false);

  const handleAI = () => {
    if (!description) return;
    setAiLoading(true);
    setTimeout(() => {
      setAiLoading(false);
      setAiSuggestion('Kitchen sink leaking under cabinet. Possible pipe joint issue. Immediate fix required.');
    }, 1800);
  };

  const next = () => {
    if (step < 5) setStep(s => (s + 1) as Step);
    else onComplete();
  };

  const QUICK_TAGS = ['Fix plumbing', 'Need driver', 'Pick up package', 'Clean house'];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100dvh', background: 'var(--bg-primary)' }}>
      {/* Header */}
      <TopBar
        left={<button onClick={step === 1 ? onBack : () => setStep(s => (s - 1) as Step)} style={{ fontSize: 22, color: 'var(--text-muted)' }}>←</button>}
        title={step === 5 ? 'Finding Helpers…' : 'Post a Job'}
        right={<span style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>{step}/5</span>}
      />

      {/* Stepper */}
      <div style={{ display: 'flex', gap: 6, padding: '12px 20px 0' }}>
        {[1,2,3,4,5].map(n => (
          <div key={n} style={{
            flex: 1, height: 4, borderRadius: 2,
            background: n <= step ? 'var(--brand-green)' : 'var(--separator)',
            transition: 'background 0.3s ease',
          }} />
        ))}
      </div>

      <div style={{ flex: 1, overflowY: 'auto', padding: '24px 20px' }}>
        {/* Step 1: Describe */}
        {step === 1 && (
          <div className="animate-slide-up">
            <h2 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: 6 }}>Tell us what you need</h2>
            <p style={{ color: 'var(--text-secondary)', marginBottom: 16, fontSize: '0.9375rem' }}>Be specific — helpers see this first.</p>

            {/* Quick tags */}
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 14 }}>
              {QUICK_TAGS.map(tag => (
                <button key={tag} onClick={() => setDescription(tag)} style={{
                  padding: '7px 14px', borderRadius: 'var(--radius-full)',
                  background: 'var(--bg-elevated)', border: '1px solid var(--separator)',
                  fontSize: '0.8125rem', fontWeight: 500, color: 'var(--text-secondary)',
                  cursor: 'pointer', transition: 'all 0.15s',
                }}>{tag}</button>
              ))}
            </div>

            <textarea
              className="input-field"
              rows={5}
              placeholder='My kitchen sink is leaking under the cabinet.'
              value={description}
              onChange={e => setDescription(e.target.value)}
              style={{ resize: 'none', marginBottom: 14 }}
            />

            {/* AI suggestion */}
            {aiSuggestion && (
              <div style={{
                background: 'var(--brand-green-light)',
                border: '1.5px solid var(--brand-green)',
                borderRadius: 'var(--radius-md)',
                padding: '14px',
                marginBottom: 14,
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 8 }}>
                  <StickyIcon src={ICONS.help} size={20} />
                  <span style={{ fontWeight: 700, fontSize: '0.875rem', color: 'var(--brand-green)' }}>AI Suggestion</span>
                </div>
                <p style={{ fontSize: '0.9375rem', color: 'var(--text-primary)', lineHeight: 1.5, marginBottom: 10 }}>
                  "{aiSuggestion}"
                </p>
                <div style={{ display: 'flex', gap: 8 }}>
                  <button className="btn btn-sm btn-green" onClick={() => setDescription(aiSuggestion)} style={{ borderRadius: 8 }}>
                    ✓ Use this
                  </button>
                  <button className="btn btn-sm btn-secondary" onClick={() => setAiSuggestion(null)} style={{ borderRadius: 8 }}>
                    Dismiss
                  </button>
                </div>
              </div>
            )}

            <div style={{ display: 'flex', gap: 10 }}>
              <button className="btn btn-secondary btn-sm" style={{ borderRadius: 8 }}>📷 Add photo</button>
              <button className="btn btn-secondary btn-sm" style={{ borderRadius: 8 }}>🎤 Voice</button>
              <button
                className="btn btn-sm"
                onClick={handleAI}
                disabled={aiLoading || !description}
                style={{
                  borderRadius: 8, marginLeft: 'auto',
                  background: 'var(--bg-elevated)',
                  border: '1.5px solid var(--brand-green)',
                  color: 'var(--brand-green)', fontWeight: 600,
                  opacity: description ? 1 : 0.4,
                }}
              >
                {aiLoading ? (
                  <span className="animate-spin" style={{ display: 'inline-block', width: 14, height: 14, border: '2px solid var(--brand-green)', borderTopColor: 'transparent', borderRadius: '50%' }} />
                ) : (
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                    <StickyIcon src={ICONS.help} size={14} /> Improve
                  </div>
                )}
              </button>
            </div>

            {/* Safety hint */}
            <div style={{
              marginTop: 16, padding: '12px 14px',
              background: '#FEF9C3', border: '1px solid #FDE68A',
              borderRadius: 'var(--radius-sm)', fontSize: '0.8125rem', color: '#92400E',
              lineHeight: 1.5, display: 'flex', gap: 8, alignItems: 'center'
            }}>
              <StickyIcon src={ICONS.notification} size={16} /> This job might require a licensed electrician. Consider adjusting your description.
            </div>
          </div>
        )}

        {/* Step 2: Location */}
        {step === 2 && (
          <div className="animate-slide-up">
            <h2 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: 6 }}>Where should the helper go?</h2>
            <p style={{ color: 'var(--text-secondary)', marginBottom: 16 }}>Confirm your location on the map.</p>
            <MapPlaceholder height={220} showRadius={urgency === 'urgent'} />
            <input
              className="input-field"
              style={{ marginTop: 14, marginBottom: 14 }}
              defaultValue="14 Adeyemi St, Ikeja, Lagos"
              placeholder="Street address"
            />
            <button style={{ display: 'flex', alignItems: 'center', gap: 8, color: 'var(--brand-green)', fontWeight: 600, marginBottom: 20 }}>
              <StickyIcon src={ICONS.location} size={18} /> Use current location
            </button>

            {/* Urgency toggle */}
            <div style={{ display: 'flex', gap: 10, marginTop: 4 }}>
              {(['urgent', 'scheduled'] as const).map(u => (
                <button
                  key={u}
                  onClick={() => setUrgency(u)}
                  style={{
                    flex: 1, padding: '14px', borderRadius: 'var(--radius-md)',
                    border: `2px solid ${urgency === u ? (u === 'urgent' ? 'var(--action-orange)' : 'var(--brand-green)') : 'var(--separator)'}`,
                    background: urgency === u ? (u === 'urgent' ? 'var(--action-orange-light)' : 'var(--brand-green-light)') : 'var(--bg-secondary)',
                    color: urgency === u ? (u === 'urgent' ? 'var(--action-orange)' : 'var(--brand-green)') : 'var(--text-muted)',
                    fontWeight: 700, fontSize: '0.9375rem', cursor: 'pointer', transition: 'all 0.2s',
                    display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6,
                  }}
                >
                  <StickyIcon src={u === 'urgent' ? ICONS.notification : ICONS.time} size={18} />
                  {u === 'urgent' ? 'Urgent' : 'Scheduled'}
                </button>
              ))}
            </div>

            {urgency === 'scheduled' && (
              <div style={{ marginTop: 14, display: 'flex', gap: 10 }}>
                <input type="date" className="input-field" />
                <input type="time" className="input-field" />
              </div>
            )}
          </div>
        )}

        {/* Step 3: Budget */}
        {step === 3 && (
          <div className="animate-slide-up">
            <h2 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: 6 }}>Set your budget</h2>
            <p style={{ color: 'var(--text-secondary)', marginBottom: 16 }}>Helpers will see your offer.</p>

            {/* AI estimate */}
            <div style={{
              background: 'var(--bg-elevated)', border: '1px solid var(--separator)',
              borderRadius: 'var(--radius-md)', padding: '14px', marginBottom: 20,
              display: 'flex', alignItems: 'center', gap: 12,
            }}>
              <StickyIcon src={ICONS.help} size={32} />
              <div>
                <div style={{ fontWeight: 700, fontSize: '0.9375rem' }}>AI Price Estimate</div>
                <div style={{ color: 'var(--brand-green)', fontWeight: 600 }}>Typical in Ikeja: ₦12,000 – ₦18,000</div>
              </div>
            </div>

            {/* Slider */}
            <div style={{ marginBottom: 20 }}>
              <div style={{ fontSize: '2.5rem', fontWeight: 700, textAlign: 'center', marginBottom: 8 }}>
                ₦{budget.toLocaleString()}
              </div>
              <input
                type="range" min={3000} max={50000} step={500}
                value={budget}
                onChange={e => setBudget(Number(e.target.value))}
                style={{ width: '100%', accentColor: 'var(--brand-green)' }}
              />
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8125rem', color: 'var(--text-muted)', marginTop: 4 }}>
                <span>₦3k</span><span>₦50k</span>
              </div>
            </div>

            {/* Or manual */}
            <div className="input-group">
              <label className="input-label">Or enter manually</label>
              <div style={{ display: 'flex', alignItems: 'center', gap: 0 }}>
                <div style={{
                  padding: '14px 14px', background: 'var(--bg-elevated)', border: '1.5px solid var(--separator)',
                  borderRight: 'none', borderRadius: 'var(--radius-md) 0 0 var(--radius-md)',
                  fontWeight: 700, color: 'var(--text-muted)',
                }}>₦</div>
                <input
                  type="number"
                  className="input-field"
                  style={{ borderRadius: '0 var(--radius-md) var(--radius-md) 0', borderLeft: 'none' }}
                  value={budget}
                  onChange={e => setBudget(Number(e.target.value))}
                />
              </div>
            </div>

            {/* Escrow info */}
            <div className="escrow-badge" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, fontSize: '0.875rem', padding: '12px 16px', background: 'var(--brand-green-light)', border: '1px solid var(--brand-green)', color: 'var(--brand-green)', borderRadius: 'var(--radius-md)', width: '100%' }}>
              <StickyIcon src={ICONS.lock} size={16} /> Funds will be held safely until you rate the job.
            </div>
          </div>
        )}

        {/* Step 4: Review */}
        {step === 4 && (
          <div className="animate-slide-up">
            <h2 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: 16 }}>Review & Post</h2>
            <div className="card" style={{ padding: '18px', marginBottom: 16 }}>
              <div style={{ display: 'flex', gap: 12, marginBottom: 14, paddingBottom: 14, borderBottom: '1px solid var(--separator)' }}>
                <div style={{
                  width: 48, height: 48, borderRadius: 12,
                  background: 'var(--brand-green-light)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  flexShrink: 0,
                }}>
                  <StickyIcon src={ICONS.wrench} size={28} />
                </div>
                <div>
                  <div style={{ fontWeight: 700 }}>Kitchen Sink Repair</div>
                  <div style={{ fontSize: '0.8125rem', color: 'var(--text-secondary)', lineHeight: 1.4, marginTop: 2 }}>
                    {description || 'Kitchen sink leaking under cabinet. Possible pipe joint issue.'}
                  </div>
                </div>
              </div>
              {[
                { k: 'Location', v: 'Ikeja GRA, Lagos', icon: ICONS.location },
                { k: 'Urgency', v: urgency === 'urgent' ? 'Urgent — ASAP' : 'Scheduled', icon: urgency === 'urgent' ? ICONS.notification : ICONS.time },
                { k: 'Budget', v: `₦${budget.toLocaleString()}`, icon: ICONS.money },
              ].map(({ k, v, icon }) => (
                <div key={k} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 0', borderBottom: '1px solid var(--separator)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <StickyIcon src={icon} size={16} />
                    <span style={{ color: 'var(--text-secondary)', fontSize: '0.9375rem' }}>{k}</span>
                  </div>
                  <span style={{ fontWeight: 600, fontSize: '0.9375rem' }}>{v}</span>
                </div>
              ))}
            </div>

            {/* Cost breakdown */}
            <div style={{ background: 'var(--bg-elevated)', borderRadius: 'var(--radius-md)', padding: '16px', marginBottom: 16 }}>
              <div style={{ fontWeight: 700, marginBottom: 12 }}>Cost Breakdown</div>
              {[
                ['Service amount', `₦${budget.toLocaleString()}`],
                ['Platform fee (5%)', `₦${Math.round(budget * 0.05).toLocaleString()}`],
              ].map(([k, v]) => (
                <div key={k} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8, fontSize: '0.9375rem', color: 'var(--text-secondary)' }}>
                  <span>{k}</span><span>{v}</span>
                </div>
              ))}
              <div style={{ height: 1, background: 'var(--separator)', margin: '10px 0' }} />
              <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 700, fontSize: '1.0625rem' }}>
                <span>Total</span>
                <span style={{ color: 'var(--action-orange)' }}>₦{Math.round(budget * 1.05).toLocaleString()}</span>
              </div>
            </div>
          </div>
        )}

        {/* Step 5: Confirmation animation */}
        {step === 5 && (
          <div className="animate-fade-in" style={{ textAlign: 'center', paddingTop: 24 }}>
            <MapPlaceholder height={200} showRadius />
            <div style={{ marginTop: 32 }}>
              <div className="animate-coin-drop" style={{ marginBottom: 20, display: 'flex', justifyContent: 'center' }}>
                <StickyIcon src={ICONS.lock} size={80} />
              </div>
              <h2 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: 8 }}>Finding helpers nearby…</h2>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.9375rem', lineHeight: 1.5 }}>
                Funds secured in escrow. You'll be notified when a helper accepts.
              </p>
              <div className="escrow-badge" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, marginTop: 24, fontSize: '0.875rem', padding: '12px 24px', background: 'var(--brand-green-light)', color: 'var(--brand-green)', border: '1.5px solid var(--brand-green)', borderRadius: 'var(--radius-md)' }}>
                <StickyIcon src={ICONS.lock} size={16} /> ₦{budget.toLocaleString()} secured in escrow
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Bottom CTA */}
      <div style={{ padding: '16px 20px 32px', borderTop: '1px solid var(--separator)' }}>
        <button
          id="post-job-next"
          className="btn btn-primary btn-full btn-lg btn-bounce"
          onClick={next}
          style={{ borderRadius: 'var(--radius-md)' }}
        >
          {step === 4 ? '🔒 Fund & Post Job' : step === 5 ? 'View Matches →' : 'Next →'}
        </button>
      </div>
    </div>
  );
}
