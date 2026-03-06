import React, { useState, useEffect } from 'react';
import { StickyIcon } from '../../components/ui';
import { ICONS } from '../../constants';
import { useApp } from '../../context/AppContext';
import { MdArrowForward } from 'react-icons/md';

// ───── Welcome Splash ─────
export function SplashScreen() {
  const { setAuthState } = useApp();

  return (
    <div className="page-content no-nav" style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '100dvh',
      padding: '40px 32px',
      background: 'linear-gradient(160deg, var(--brand-green-dark) 0%, var(--brand-green) 50%, var(--brand-green-mid) 100%)',
      position: 'relative',
      overflow: 'hidden',
    }}>
      {/* Decorative circles */}
      <div style={{
        position: 'absolute', top: '-80px', right: '-60px',
        width: '260px', height: '260px', borderRadius: '50%',
        background: 'rgba(255,255,255,0.06)',
      }} />
      <div style={{
        position: 'absolute', bottom: '-60px', left: '-50px',
        width: '200px', height: '200px', borderRadius: '50%',
        background: 'rgba(255,255,255,0.05)',
      }} />
      <div style={{
        position: 'absolute', top: '30%', left: '-30px',
        width: '120px', height: '120px', borderRadius: '50%',
        background: 'rgba(255,140,66,0.12)',
      }} />

      <div className={`animate-slide-up`} style={{ textAlign: 'center', position: 'relative', zIndex: 1 }}>
        {/* Logo */}
        <div style={{
          width: 96, height: 96, borderRadius: '28px',
          background: 'rgba(255,255,255,0.15)',
          backdropFilter: 'blur(12px)',
          border: '1.5px solid rgba(255,255,255,0.25)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          margin: '0 auto 28px',
          boxShadow: '0 8px 32px rgba(0,0,0,0.2)',
        }}>
          <StickyIcon src={ICONS.wrench} size={48} style={{ opacity: 0.9 }} />
        </div>

        <h1 style={{
          fontWeight: 700, fontSize: '3rem', color: 'white',
          letterSpacing: '-0.02em', lineHeight: 1.1, marginBottom: 12,
        }}>
          Helpa
        </h1>
        <p style={{
          color: 'rgba(255,255,255,0.75)', fontSize: '1.125rem', fontWeight: 400,
          marginBottom: 64,
        }}>
          Help is nearby.
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 14, width: '100%' }}>
          <button
            className="btn btn-lg btn-bounce"
            onClick={() => setAuthState('phone')}
            style={{
              background: 'var(--action-orange)', color: 'white',
              boxShadow: '0 6px 24px rgba(249,115,22,0.4)',
              fontSize: '1.0625rem', fontWeight: 700, width: '100%',
              borderRadius: '20px', padding: '18px 24px'
            }}
          >
            Get Started
          </button>
          <button
            onClick={() => setAuthState('app')}
            style={{
              background: 'rgba(255,255,255,0.12)',
              border: '1.5px solid rgba(255,255,255,0.25)',
              color: 'white', padding: '14px 24px',
              borderRadius: '16px', fontSize: '1rem', fontWeight: 500,
              backdropFilter: 'blur(8px)',
            }}
          >
            I already have an account <MdArrowForward size={16} style={{ display: 'inline-block', verticalAlign: 'middle' }} /> Login
          </button>
        </div>
      </div>

      {/* Tagline dot */}
      <div style={{
        position: 'absolute', bottom: 40,
        display: 'flex', gap: 6, justifyContent: 'center',
      }}>
        {[0,1,2].map(i => (
          <div key={i} style={{
            width: i === 0 ? 20 : 7, height: 7, borderRadius: 4,
            background: i === 0 ? 'var(--action-orange)' : 'rgba(255,255,255,0.3)',
          }} />
        ))}
      </div>
    </div>
  );
}

// ───── Phone Number Screen ─────
export function PhoneScreen() {
  const { setAuthState } = useApp();
  const [phone, setPhone] = useState('');

  return (
    <div className="page-content no-nav" style={{ padding: '0 24px', display: 'flex', flexDirection: 'column', minHeight: '100dvh' }}>
      {/* Back */}
      <div style={{ paddingTop: 56, paddingBottom: 32 }}>
        <button onClick={() => setAuthState('splash')} style={{ color: 'var(--text-muted)', fontSize: 24, marginBottom: 32, lineHeight: 1, display: 'flex', alignItems: 'center' }}>
          <StickyIcon src={ICONS.back} size={24} />
        </button>
        <h1 className="animate-slide-up" style={{ fontSize: '1.875rem', fontWeight: 700, marginBottom: 8 }}>
          What's your number?
        </h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: '1rem' }}>
          We'll send you a one-time code.
        </p>
      </div>

      <div className="input-group animate-slide-up stagger-1">
        <label className="input-label">Phone Number</label>
        <div style={{ display: 'flex', gap: 10 }}>
          <div style={{
            display: 'flex', alignItems: 'center', gap: 8,
            padding: '14px 16px', background: 'var(--bg-secondary)',
            border: '1.5px solid var(--separator)', borderRadius: 'var(--radius-md)',
            fontSize: '1rem', fontWeight: 500, color: 'var(--text-primary)',
            flexShrink: 0, cursor: 'pointer',
          }}>
            🇳🇬 +234
          </div>
          <input
            type="tel"
            className="input-field"
            placeholder="813 456 7890"
            value={phone}
            onChange={e => setPhone(e.target.value)}
            inputMode="numeric"
            autoFocus
          />
        </div>
      </div>

      <div style={{ marginTop: 'auto', paddingBottom: 40 }}>
        <button
          className="btn btn-primary btn-full btn-lg animate-slide-up stagger-2"
          onClick={() => setAuthState('otp')}
          style={{ borderRadius: 'var(--radius-md)', marginBottom: 20 }}
        >
          Send Code
        </button>
        <p style={{ textAlign: 'center', fontSize: '0.8125rem', color: 'var(--text-muted)', lineHeight: 1.6 }}>
          By continuing, you agree to our{' '}
          <span style={{ color: 'var(--brand-green)', fontWeight: 500 }}>Terms</span>{' '}
          and{' '}
          <span style={{ color: 'var(--brand-green)', fontWeight: 500 }}>Privacy Policy</span>.
        </p>
      </div>
    </div>
  );
}

// ───── OTP Screen ─────
export function OTPScreen() {
  const { setAuthState } = useApp();
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [countdown, setCountdown] = useState(45);
  const refs = Array.from({ length: 6 }, () => React.createRef<HTMLInputElement>());

  useEffect(() => {
    const timer = setInterval(() => setCountdown(c => c > 0 ? c - 1 : 0), 1000);
    return () => clearInterval(timer);
  }, []);

  const handleChange = (idx: number, val: string) => {
    if (!/^\d?$/.test(val)) return;
    const next = [...otp];
    next[idx] = val;
    setOtp(next);
    if (val && idx < 5) refs[idx + 1].current?.focus();
    if (next.every(d => d !== '') ) {
      setTimeout(() => setAuthState('setup'), 300);
    }
  };

  const handleKeyDown = (idx: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !otp[idx] && idx > 0) refs[idx - 1].current?.focus();
  };

  return (
    <div className="page-content no-nav" style={{ padding: '0 24px', display: 'flex', flexDirection: 'column', minHeight: '100dvh' }}>
      <div style={{ paddingTop: 56, paddingBottom: 32 }}>
        <button onClick={() => setAuthState('phone')} style={{ color: 'var(--text-muted)', fontSize: 24, marginBottom: 32, display: 'flex', alignItems: 'center' }}>
          <StickyIcon src={ICONS.back} size={24} />
        </button>
        <h1 style={{ fontSize: '1.875rem', fontWeight: 700, marginBottom: 8 }}>Enter your code</h1>
        <p style={{ color: 'var(--text-secondary)' }}>Sent to +234 813 ●●● ●●●●</p>
      </div>

      <div className="otp-container" style={{ marginBottom: 32 }}>
        {otp.map((digit, i) => (
          <input
            key={i}
            ref={refs[i]}
            className="otp-box"
            type="text"
            inputMode="numeric"
            maxLength={1}
            value={digit}
            onChange={e => handleChange(i, e.target.value)}
            onKeyDown={e => handleKeyDown(i, e)}
            autoFocus={i === 0}
          />
        ))}
      </div>

      <div style={{ textAlign: 'center', marginBottom: 32 }}>
        {countdown > 0 ? (
          <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>
            Resend in 0:{countdown < 10 ? '0' : ''}{countdown}
          </p>
        ) : (
          <button
            onClick={() => setCountdown(45)}
            style={{ color: 'var(--brand-green)', fontWeight: 600, fontSize: '0.875rem' }}
          >
            Resend code
          </button>
        )}
      </div>

      <div style={{ marginTop: 'auto', paddingBottom: 40 }}>
        <button
          className="btn btn-primary btn-full btn-lg"
          onClick={() => setAuthState('setup')}
          style={{ borderRadius: 'var(--radius-md)' }}
        >
          Verify Code
        </button>
      </div>
    </div>
  );
}

// ───── Role Selection ─────
export function SetupScreen() {
  const { setAuthState, setRole } = useApp();
  const [selected, setSelected] = useState<'customer'|'helper'|null>(null);

  return (
    <div className="page-content no-nav" style={{ padding: '0 24px', display: 'flex', flexDirection: 'column', minHeight: '100dvh' }}>
      <div style={{ paddingTop: 56, paddingBottom: 32 }}>
        <h1 style={{ fontSize: '1.875rem', fontWeight: 700, marginBottom: 8 }}>Let's set you up.</h1>
        <p style={{ color: 'var(--text-secondary)' }}>What's your full name?</p>
        <input
          type="text"
          className="input-field"
          placeholder="Full name"
          defaultValue="Ayomide Okafor"
          style={{ marginTop: 16 }}
        />
      </div>

      <p style={{ fontWeight: 600, marginBottom: 16 }}>How do you want to use Helpa?</p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 14, marginBottom: 24 }}>
        {[
          { id: 'customer' as const, icon: ICONS.reward, title: 'I need help', sub: 'Post jobs, hire helpers' },
          { id: 'helper'   as const, icon: ICONS.wrench,  title: 'Become a HELPA', sub: 'Complete jobs, get paid' },
        ].map(opt => (
          <button
            key={opt.id}
            onClick={() => setSelected(opt.id)}
            style={{
              background: selected === opt.id ? 'var(--brand-green-light)' : 'var(--bg-secondary)',
              border: selected === opt.id ? '2px solid var(--brand-green)' : '1.5px solid var(--separator)',
              borderRadius: 'var(--radius-md)',
              padding: '24px 20px',
              textAlign: 'left',
              display: 'flex', alignItems: 'center', gap: 16,
              transition: 'all 0.2s ease',
            }}
          >
            <StickyIcon src={opt.icon} size={32} />
            <div style={{ flex: 1 }}>
              <div style={{ fontWeight: 700, fontSize: '1.0625rem', marginBottom: 2 }}>{opt.title}</div>
              <div style={{ color: 'var(--text-secondary)', fontSize: '0.875rem' }}>{opt.sub}</div>
            </div>
            {selected === opt.id && (
              <div style={{ color: 'var(--brand-green)', display: 'flex' }}>
                <StickyIcon src={ICONS.verification} size={24} />
              </div>
            )}
          </button>
        ))}
      </div>

      <p style={{ textAlign: 'center', color: 'var(--text-muted)', fontSize: '0.8125rem', marginBottom: 24 }}>
        You can do both. Switch anytime in your profile.
      </p>

      <div style={{ marginTop: 'auto', paddingBottom: 40 }}>
        <button
          className="btn btn-primary btn-full btn-lg"
          disabled={!selected}
          onClick={() => {
            if (!selected) return;
            setRole(selected);
            setAuthState(selected === 'customer' ? 'onboard-customer' : 'onboard-helper');
          }}
          style={{
            borderRadius: 'var(--radius-md)',
            opacity: selected ? 1 : 0.5,
            transition: 'opacity 0.2s ease',
          }}
        >
          Continue
        </button>
      </div>
    </div>
  );
}
