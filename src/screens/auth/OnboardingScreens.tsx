import { useState } from 'react';
import { StickyIcon } from '../../components/ui';
import { ICONS } from '../../constants';
import { useApp } from '../../context/AppContext';
import { MdArrowForward, MdRocketLaunch, MdWarning, MdCheckCircle, MdCheck, MdAssignment } from 'react-icons/md';

// ───── Customer Onboarding ─────
export function CustomerOnboarding() {
  const { setAuthState } = useApp();
  const [step, setStep] = useState(1);
  const totalSteps = 4;

  const next = () => {
    if (step < totalSteps) setStep(s => s + 1);
    else setAuthState('app');
  };

  return (
    <div className="page-content no-nav" style={{ minHeight: '100dvh', display: 'flex', flexDirection: 'column' }}>
      {/* Progress */}
      <div style={{ padding: '20px 24px 0', display: 'flex', gap: 8 }}>
        {Array.from({ length: totalSteps }).map((_, i) => (
          <div key={i} style={{
            flex: 1, height: 4, borderRadius: 2,
            background: i < step ? 'var(--brand-green)' : 'var(--separator)',
            transition: 'background 0.3s ease',
          }} />
        ))}
      </div>

      <div style={{ flex: 1, padding: '32px 24px' }}>
        {step === 1 && <CustomerStep1 />}
        {step === 2 && <CustomerStep2 />}
        {step === 3 && <CustomerStep3 />}
        {step === 4 && <CustomerStep4 />}
      </div>

      <div style={{ padding: '0 24px 40px', display: 'flex', flexDirection: 'column', gap: 12 }}>
        <button className="btn btn-primary btn-full btn-lg" onClick={next} style={{ borderRadius: 'var(--radius-md)' }}>
          {step < totalSteps ? 'Next' : 'Post a Job'}
        </button>
        {step !== totalSteps && (
          <button onClick={next} style={{ textAlign: 'center', color: 'var(--text-muted)', fontSize: '0.875rem', fontWeight: 500 }}>
            Skip for now
          </button>
        )}
      </div>
    </div>
  );
}

function CustomerStep1() {
  return (
    <div className="animate-slide-up">
      <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem', marginBottom: 8 }}>Step 1 of 4</p>
      <h1 style={{ fontSize: '1.75rem', fontWeight: 700, marginBottom: 8 }}>Add a photo</h1>
      <p style={{ color: 'var(--text-secondary)', marginBottom: 32, lineHeight: 1.5 }}>
        Helpers feel more confident when they can see who they're helping.
      </p>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{
          width: 140, height: 140, borderRadius: '50%',
          border: '3px dashed var(--brand-green)',
          background: 'var(--brand-green-light)',
          display: 'flex', flexDirection: 'column',
          alignItems: 'center', justifyContent: 'center',
          cursor: 'pointer', gap: 12, transition: 'all 0.2s',
        }}>
          <StickyIcon src={ICONS.phone} size={48} />
          <span style={{ fontSize: '0.8125rem', color: 'var(--brand-green)', fontWeight: 700 }}>Upload photo</span>
        </div>
      </div>
    </div>
  );
}

function CustomerStep2() {
  return (
    <div className="animate-slide-up">
      <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem', marginBottom: 8 }}>Step 2 of 4</p>
      <h1 style={{ fontSize: '1.75rem', fontWeight: 700, marginBottom: 8 }}>Where are you based?</h1>
      <p style={{ color: 'var(--text-secondary)', marginBottom: 20 }}>We'll show you helpers in your area.</p>
      <MapPreview height={200} />
      <div style={{ marginTop: 16 }}>
        <input className="input-field" placeholder="Street address" defaultValue="14 Adeyemi St, Ikeja, Lagos" style={{ marginBottom: 10 }} />
        <button style={{
          display: 'flex', alignItems: 'center', gap: 8, color: 'var(--brand-green)',
          fontWeight: 600, fontSize: '0.9375rem',
        }}>
          <StickyIcon src={ICONS.location} size={18} /> Use current location
        </button>
      </div>
    </div>
  );
}

function CustomerStep3() {
  return (
    <div className="animate-slide-up">
      <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem', marginBottom: 8 }}>Step 3 of 4</p>
      <h1 style={{ fontSize: '1.75rem', fontWeight: 700, marginBottom: 8 }}>Anything to know?</h1>
      <p style={{ color: 'var(--text-secondary)', marginBottom: 20 }}>Anything helpers should know about you?</p>
      <textarea
        className="input-field"
        rows={5}
        placeholder="e.g. Gate code is 1234. Dog is friendly. Ring twice."
        style={{ resize: 'none' }}
      />
    </div>
  );
}

function CustomerStep4() {
  return (
    <div className="animate-slide-up" style={{ textAlign: 'center', paddingTop: 32 }}>
      <div style={{ marginBottom: 24, display: 'flex', justifyContent: 'center' }}>
        <StickyIcon src={ICONS.reward} size={100} />
      </div>
      <h1 style={{ fontSize: '1.875rem', fontWeight: 700, marginBottom: 12 }}>You're ready.</h1>
      <p style={{ color: 'var(--text-secondary)', lineHeight: 1.6, fontSize: '1rem' }}>
        Post your first job and a verified helper will be nearby.
      </p>
    </div>
  );
}

// ───── Helper Onboarding ─────
export function HelperOnboarding() {
  const { setAuthState } = useApp();
  const [step, setStep] = useState(1);
  const totalSteps = 8;

  const next = () => {
    if (step < totalSteps) setStep(s => s + 1);
    else setAuthState('app');
  };

  return (
    <div className="page-content no-nav" style={{ minHeight: '100dvh', display: 'flex', flexDirection: 'column' }}>
      <div style={{ padding: '20px 24px 0', display: 'flex', alignItems: 'center', gap: 12 }}>
        <button onClick={() => step > 1 ? setStep(s => s - 1) : setAuthState('setup')} style={{ color: 'var(--text-muted)', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'none' }}>
          <StickyIcon src={ICONS.back} size={24} />
        </button>
        <div style={{ flex: 1, display: 'flex', gap: 4 }}>
          {Array.from({ length: totalSteps }).map((_, i) => (
            <div key={i} style={{
              flex: 1, height: 4, borderRadius: 2,
              background: i < step ? 'var(--brand-green)' : 'var(--separator)',
              transition: 'background 0.3s ease',
            }} />
          ))}
        </div>
        <span style={{ fontSize: '0.8125rem', color: 'var(--text-muted)', fontWeight: 500 }}>{step}/{totalSteps}</span>
      </div>

      <div style={{ flex: 1, padding: '28px 24px' }}>
        {step === 1 && <HelperStep1 />}
        {step === 2 && <HelperStep2 />}
        {step === 3 && <HelperStep3 />}
        {step === 4 && <HelperStep4 />}
        {step === 5 && <HelperStep5 />}
        {step === 6 && <HelperStep6 />}
        {step === 7 && <HelperStep7 />}
        {step === 8 && <HelperStep8 />}
      </div>

      <div style={{ padding: '0 24px 40px' }}>
        <button className="btn btn-primary btn-full btn-lg" onClick={next} style={{ borderRadius: 'var(--radius-md)', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}>
          {step < totalSteps ? (
            <>Next <MdArrowForward /></>
          ) : (
            <>Go Live <MdRocketLaunch /></>
          )}
        </button>
      </div>
    </div>
  );
}

const SKILLS = [
  { id: 'plumbing', icon: ICONS.plumbing,    label: 'Plumbing' },
  { id: 'electrical', icon: ICONS.electrical,  label: 'Electrical' },
  { id: 'driving', icon: ICONS.driver,      label: 'Driving' },
  { id: 'cleaning', icon: ICONS.cleaning,    label: 'Cleaning' },
  { id: 'errands', icon: ICONS.errands,     label: 'Errands' },
  { id: 'tech', icon: ICONS.techRepair,  label: 'Tech Repair' },
  { id: 'student', icon: ICONS.studentHelp, label: 'Student Help' },
  { id: 'other', icon: ICONS.help,        label: 'Other' },
];

function HelperStep1() {
  const [selected, setSelected] = useState<string[]>([]);
  const toggle = (id: string) => setSelected(s => s.includes(id) ? s.filter(x => x !== id) : [...s, id]);

  return (
    <div className="animate-slide-up">
      <h1 style={{ fontSize: '1.75rem', fontWeight: 700, marginBottom: 8 }}>What can you do?</h1>
      <p style={{ color: 'var(--text-secondary)', marginBottom: 24 }}>Select all that apply.</p>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 12 }}>
        {SKILLS.map(skill => (
          <button
            key={skill.id}
            onClick={() => toggle(skill.id)}
            style={{
              padding: '18px 14px',
              borderRadius: 'var(--radius-md)',
              border: selected.includes(skill.id) ? '2px solid var(--brand-green)' : '2px solid var(--separator)',
              background: selected.includes(skill.id) ? 'var(--brand-green-light)' : 'var(--bg-secondary)',
              display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8,
              transition: 'all 0.2s',
              cursor: 'pointer',
            }}
          >
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12 }}>
              <StickyIcon src={skill.icon} size={32} />
              <span style={{ fontWeight: 700, fontSize: '0.875rem', color: selected.includes(skill.id) ? 'var(--brand-green)' : 'var(--text-primary)' }}>{skill.label}</span>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}

function HelperStep2() {
  return (
    <div className="animate-slide-up">
      <h1 style={{ fontSize: '1.75rem', fontWeight: 700, marginBottom: 8 }}>Add a clear photo</h1>
      <p style={{ color: 'var(--text-secondary)', marginBottom: 8, lineHeight: 1.5 }}>
        Customers are more likely to hire helpers with photos. This also helps with face verification.
      </p>
      <div style={{
        background: 'var(--chip-urgent, #FEF0E6)',
        border: '1px solid #FED7AA',
        borderRadius: 'var(--radius-sm)',
        padding: '10px 14px',
        marginBottom: 24,
        fontSize: '0.8125rem',
        color: '#C2410C',
        display: 'flex', gap: 8, alignItems: 'center',
      }}>
        <MdWarning size={16} /> This step cannot be skipped.
      </div>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <div style={{
          width: 150, height: 150, borderRadius: '50%',
          border: '3px dashed var(--brand-green)',
          background: 'var(--brand-green-light)',
          display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
          cursor: 'pointer', gap: 12,
        }}>
          <StickyIcon src={ICONS.phone} size={48} />
          <span style={{ fontSize: '0.8125rem', color: 'var(--brand-green)', fontWeight: 700 }}>Upload photo</span>
        </div>
      </div>
    </div>
  );
}

function HelperStep3() {
  const [verified, setVerified] = useState<'idle'|'loading'|'done'|'error'>('idle');
  const verify = () => {
    setVerified('loading');
    setTimeout(() => setVerified('done'), 2000);
  };
  return (
    <div className="animate-slide-up">
      <h1 style={{ fontSize: '1.75rem', fontWeight: 700, marginBottom: 8 }}>Verify your identity</h1>
      <p style={{ color: 'var(--text-secondary)', marginBottom: 24, lineHeight: 1.5 }}>
        Required to receive payments and appear in job feeds.
      </p>
      <div className="input-group">
        <label className="input-label">NIN Number</label>
        <input className="input-field" placeholder="12345678901" inputMode="numeric" maxLength={11} />
      </div>
      <label style={{ display: 'flex', gap: 12, alignItems: 'flex-start', marginBottom: 24, cursor: 'pointer' }}>
        <input type="checkbox" style={{ marginTop: 3, accentColor: 'var(--brand-green)' }} defaultChecked />
        <span style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
          I consent to identity verification
        </span>
      </label>
      {verified === 'idle' && (
        <button className="btn btn-primary btn-full" onClick={verify} style={{ borderRadius: 'var(--radius-md)' }}>
          Verify NIN
        </button>
      )}
      {verified === 'loading' && (
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, color: 'var(--text-secondary)', justifyContent: 'center' }}>
          <div className="animate-spin" style={{ width: 20, height: 20, borderRadius: '50%', border: '2.5px solid var(--separator)', borderTopColor: 'var(--brand-green)' }} />
          Checking your NIN…
        </div>
      )}
      {verified === 'done' && (
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, color: '#16A34A', fontWeight: 600 }}>
          <MdCheckCircle size={24} /> NIN Verified <MdCheck size={18} />
        </div>
      )}
    </div>
  );
}

function HelperStep4() {
  return (
    <div className="animate-slide-up">
      <h1 style={{ fontSize: '1.75rem', fontWeight: 700, marginBottom: 8 }}>Link your BVN</h1>
      <p style={{ color: 'var(--text-secondary)', marginBottom: 24, lineHeight: 1.5 }}>
        Used to secure your earnings and enable withdrawals. We never share this.
      </p>
      <div className="input-group">
        <label className="input-label">BVN Number</label>
        <input className="input-field" placeholder="12345678901" inputMode="numeric" maxLength={11} />
      </div>
      <button className="btn btn-primary btn-full" style={{ borderRadius: 'var(--radius-md)' }}>Verify BVN</button>
    </div>
  );
}

function HelperStep5() {
  return (
    <div className="animate-slide-up">
      <h1 style={{ fontSize: '1.75rem', fontWeight: 700, marginBottom: 8 }}>Where should we send earnings?</h1>
      <p style={{ color: 'var(--text-secondary)', marginBottom: 24 }}>Your bank account details.</p>
      <div className="input-group">
        <label className="input-label">Bank</label>
        <select className="input-field">
          <option>Select bank...</option>
          <option>Access Bank</option>
          <option>First Bank</option>
          <option>GTBank</option>
          <option>Zenith Bank</option>
          <option>UBA</option>
          <option>Kuda Bank</option>
          <option>Opay</option>
          <option>Palmpay</option>
        </select>
      </div>
      <div className="input-group">
        <label className="input-label">Account Number</label>
        <input className="input-field" placeholder="0123456789" inputMode="numeric" maxLength={10} />
      </div>
      <div style={{
        background: 'var(--brand-green-light)',
        border: '1.5px solid var(--brand-green)',
        borderRadius: 'var(--radius-sm)',
        padding: '12px 16px',
        fontSize: '0.875rem', color: 'var(--brand-green)', fontWeight: 600,
        display: 'flex', alignItems: 'center', gap: 8
      }}>
        <MdCheck /> Account Name: Ayomide Okafor
      </div>
    </div>
  );
}

function HelperStep6() {
  return (
    <div className="animate-slide-up">
      <h1 style={{ fontSize: '1.75rem', fontWeight: 700, marginBottom: 8 }}>Where are you based?</h1>
      <p style={{ color: 'var(--text-secondary)', marginBottom: 20 }}>Drag the pin to your location.</p>
      <MapPreview height={200} />
      <input className="input-field" placeholder="Street address" style={{ marginTop: 14 }} defaultValue="45 Eko Street, Surulere, Lagos" />
      <button style={{ display: 'flex', alignItems: 'center', gap: 8, color: 'var(--brand-green)', fontWeight: 600, marginTop: 12 }}>
        <StickyIcon src={ICONS.location} size={18} /> Use current location
      </button>
    </div>
  );
}

function HelperStep7() {
  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  const [active, setActive] = useState([0, 1, 2, 3, 4]);
  const [urgent, setUrgent] = useState(true);
  const toggle = (i: number) => setActive(d => d.includes(i) ? d.filter(x => x !== i) : [...d, i]);

  return (
    <div className="animate-slide-up">
      <h1 style={{ fontSize: '1.75rem', fontWeight: 700, marginBottom: 8 }}>When are you available?</h1>
      <p style={{ color: 'var(--text-secondary)', marginBottom: 20 }}>Select your working days.</p>
      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 24 }}>
        {days.map((d, i) => (
          <button key={d} onClick={() => toggle(i)} style={{
            padding: '10px 14px', borderRadius: 12,
            fontWeight: 600, fontSize: '0.875rem',
            background: active.includes(i) ? 'var(--brand-green)' : 'var(--bg-elevated)',
            color: active.includes(i) ? 'white' : 'var(--text-secondary)',
            border: 'none', transition: 'all 0.2s', cursor: 'pointer',
          }}>{d}</button>
        ))}
      </div>
      <p style={{ fontWeight: 600, marginBottom: 8 }}>Working hours</p>
      <div style={{ display: 'flex', gap: 12, marginBottom: 24 }}>
        <select className="input-field">
          {['6am','7am','8am','9am','10am'].map(t => <option key={t}>{t}</option>)}
        </select>
        <span style={{ alignSelf: 'center', color: 'var(--text-muted)' }}>to</span>
        <select className="input-field">
          {['6pm','7pm','8pm','9pm','10pm'].map(t => <option key={t} selected={t==='9pm'}>{t}</option>)}
        </select>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '14px 16px', background: 'var(--bg-elevated)', borderRadius: 'var(--radius-md)' }}>
        <div>
          <div style={{ fontWeight: 600 }}>Available for urgent jobs</div>
          <div style={{ fontSize: '0.8125rem', color: 'var(--text-muted)' }}>Get notified for urgent requests</div>
        </div>
        <label className="toggle">
          <input type="checkbox" checked={urgent} onChange={e => setUrgent(e.target.checked)} />
          <div className="toggle-track" />
          <div className="toggle-thumb" />
        </label>
      </div>
    </div>
  );
}

function HelperStep8() {
  const verifications = [
    { label: 'NIN Verified', status: 'done' },
    { label: 'BVN Linked', status: 'done' },
    { label: 'Bank Account', status: 'done' },
    { label: 'Address Verified', status: 'done' },
    { label: 'Face Verification', status: 'pending' },
  ];
  return (
    <div className="animate-slide-up">
      <h1 style={{ fontSize: '1.75rem', fontWeight: 700, marginBottom: 8 }}>You're almost live!</h1>
      <p style={{ color: 'var(--text-secondary)', marginBottom: 24 }}>Review your profile before going live.</p>
      <div className="card" style={{ padding: '16px', marginBottom: 16 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 16 }}>
          <div style={{
            width: 56, height: 56, borderRadius: '50%',
            background: 'var(--brand-green)', color: 'white',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: '1.25rem', fontWeight: 700,
          }}>AO</div>
          <div>
            <div style={{ fontWeight: 700, fontSize: '1.0625rem' }}>Ayomide Okafor</div>
            <div style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>Ikeja, Lagos</div>
          </div>
        </div>
        {verifications.map(v => (
          <div key={v.label} className="verify-row">
            <div className={`verify-icon ${v.status}`} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <StickyIcon src={v.status === 'done' ? ICONS.verification : ICONS.time} size={14} style={{ filter: v.status === 'done' ? 'brightness(0) invert(1)' : 'none' }} />
            </div>
            <span style={{ fontSize: '0.9375rem', fontWeight: 500 }}>{v.label}</span>
            <span style={{ marginLeft: 'auto', fontSize: '0.8125rem', color: v.status === 'done' ? 'var(--soft-green)' : 'var(--text-muted)', fontWeight: 600 }}>
              {v.status === 'done' ? 'Verified' : 'Pending'}
            </span>
          </div>
        ))}
      </div>
      <div style={{
        background: 'var(--brand-green-light)',
        border: '1.5px solid var(--brand-green)',
        borderRadius: 'var(--radius-sm)',
        padding: '12px 16px',
        fontSize: '0.875rem',
        color: 'var(--brand-green)',
        lineHeight: 1.5,
        display: 'flex', gap: 10, alignItems: 'flex-start'
      }}>
        <MdAssignment style={{ marginTop: 2, flexShrink: 0 }} /> 
        <span>Your profile is under review. You'll go live within 24 hours after face verification.</span>
      </div>
    </div>
  );
}

// Shared map component
function MapPreview({ height = 180 }: { height?: number }) {
  return (
    <div className="map-placeholder" style={{ height, borderRadius: 'var(--radius-md)' }}>
      <div className="map-grid" />
      <div className="map-pulse">
        <StickyIcon src={ICONS.location} size={32} />
      </div>
    </div>
  );
}
