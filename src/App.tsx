import { useState } from 'react';
import { useApp } from './context/AppContext';

// Auth
import { SplashScreen, PhoneScreen, OTPScreen, SetupScreen } from './screens/auth/AuthScreens';
import { CustomerOnboarding, HelperOnboarding } from './screens/auth/OnboardingScreens';

// Bottom nav + shared
import { BottomNav, StickyIcon } from './components/ui';
import { ICONS } from './constants';

// Dashboard
import { CustomerDashboard } from './screens/dashboard/CustomerDashboard';
import { HelperDashboard } from './screens/dashboard/HelperDashboard';

// Jobs
import { PostJobFlow } from './screens/jobs/PostJobFlow';
import { JobMatchingScreen, HelperProfileScreen } from './screens/jobs/MatchingScreens';
import { ActiveJobScreen, RatingFlow } from './screens/jobs/ActiveJobScreens';

// Wallet
import { WalletScreen } from './screens/wallet/WalletScreen';

// Profile
import { ProfileScreen, SettingsScreen } from './screens/profile/ProfileScreens';

// Misc
import { NotificationsScreen, ReferralScreen } from './screens/misc/NotificationsAndReferral';

// Chat & AI
import { ChatScreen } from './screens/chat/ChatScreen';
import { AIAssistantScreen } from './screens/chat/AIAssistantScreen';

type NavTab = 'home' | 'jobs' | 'wallet' | 'chat' | 'profile';
type SubScreen =
  | null
  | 'post-job'
  | 'job-matching'
  | 'helper-profile'
  | 'active-job'
  | 'rating'
  | 'notifications'
  | 'settings'
  | 'referral'
  | 'add-funds'
  | 'chat'
  | 'ai-assistant';

export default function App() {
  const { authState } = useApp();
  const [activeTab, setActiveTab] = useState<NavTab>('home');
  const [subScreen, setSubScreen] = useState<SubScreen>(null);

  // ── AUTH FLOW ──────────────────────────────────────────────────
  if (authState === 'splash')            return <SplashScreen />;
  if (authState === 'phone')             return <PhoneScreen />;
  if (authState === 'otp')               return <OTPScreen />;
  if (authState === 'setup')             return <SetupScreen />;
  if (authState === 'onboard-customer')  return <CustomerOnboarding />;
  if (authState === 'onboard-helper')    return <HelperOnboarding />;

  // ── SUB-SCREENS (full-screen overlays) ────────────────────────
  const navigate = (screen: string) => setSubScreen(screen as SubScreen);
  const goBack   = () => setSubScreen(null);

  if (subScreen === 'post-job') {
    return <PostJobFlow onBack={goBack} onComplete={() => setSubScreen('job-matching')} />;
  }
  if (subScreen === 'job-matching') {
    return <JobMatchingScreen onBack={goBack} onSelect={() => setSubScreen('helper-profile')} />;
  }
  if (subScreen === 'helper-profile') {
    return <HelperProfileScreen onBack={() => setSubScreen('job-matching')} onHire={() => setSubScreen('active-job')} />;
  }
  if (subScreen === 'active-job') {
    return <ActiveJobScreen onBack={goBack} onComplete={() => setSubScreen('rating')} />;
  }
  if (subScreen === 'rating') {
    return <RatingFlow onBack={() => setSubScreen('active-job')} onDone={goBack} />;
  }
  if (subScreen === 'notifications') {
    return <NotificationsScreen onBack={goBack} />;
  }
  if (subScreen === 'settings') {
    return <SettingsScreen onBack={goBack} />;
  }
  if (subScreen === 'referral') {
    return <ReferralScreen onBack={goBack} />;
  }
  if (subScreen === 'chat') {
    return <ChatScreen onBack={goBack} />;
  }
  if (subScreen === 'ai-assistant') {
    return <AIAssistantScreen onBack={goBack} />;
  }

  // ── MAIN APP SHELL ─────────────────────────────────────────────
  return <AppShell activeTab={activeTab} setActiveTab={setActiveTab} navigate={navigate} />;
}

// ── App Shell (tabs + content) ─────────────────────────────────────
function AppShell({
  activeTab,
  setActiveTab,
  navigate,
}: {
  activeTab: NavTab;
  setActiveTab: (t: NavTab) => void;
  navigate: (s: string) => void;
}) {
  const { activeMode, notifCount } = useApp();

  return (
    <div className="app-layout">
      {/* Tab content */}
      <div className="page-content">
        {activeTab === 'home' && (
          activeMode === 'earn'
            ? <HelperDashboard onNavigate={navigate} />
            : <CustomerDashboard onNavigate={navigate} />
        )}
        {activeTab === 'jobs' && <JobsListTab navigate={navigate} />}
        {activeTab === 'wallet' && <WalletScreen onNavigate={navigate} />}
        {activeTab === 'chat' && (
          <div style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
            <ConversationsList navigate={navigate} />
          </div>
        )}
        {activeTab === 'profile' && <ProfileScreen onNavigate={navigate} />}
      </div>

      {/* Global AI Assistant Floating Action Button */}
      <button 
        className="btn-bounce"
        onClick={() => navigate('ai-assistant')}
        style={{
          position: 'fixed', bottom: 84, right: 20, zIndex: 40,
          width: 56, height: 56, borderRadius: '50%',
          background: 'var(--brand-green)', color: 'white',
          boxShadow: 'var(--shadow-primary)',
          display: 'flex', alignItems: 'center', justifyContent: 'center'
        }}
        aria-label="Open AI Assistant"
      >
        <StickyIcon src={ICONS.help} size={30} style={{ color: 'white' }} />
      </button>

      {/* Bottom Nav */}
      <BottomNav
        active={activeTab}
        onChange={t => setActiveTab(t as NavTab)}
        notifCount={notifCount}
      />
    </div>
  );
}

// ── Jobs List Tab ──────────────────────────────────────────────────
function JobsListTab({ navigate }: { navigate: (s: string) => void }) {
  const { activeMode } = useApp();
  return (
    <div>
      <div style={{ padding: '20px 20px 0' }}>
        <h1 style={{ fontSize: '1.375rem', fontWeight: 700, marginBottom: 6 }}>
          {activeMode === 'earn' ? 'Available Jobs' : 'My Jobs'}
        </h1>
        <div style={{ display: 'flex', gap: 8, paddingBottom: 16, overflowX: 'auto', scrollbarWidth: 'none' }}>
          {['All', 'Active', 'Completed', 'Disputes'].map(f => (
            <button key={f} style={{
              padding: '8px 18px', borderRadius: 'var(--radius-full)',
              background: f === 'All' ? 'var(--brand-green)' : 'var(--bg-elevated)',
              color: f === 'All' ? 'white' : 'var(--text-secondary)',
              border: `1px solid ${f === 'All' ? 'var(--brand-green)' : 'var(--separator)'}`,
              fontSize: '0.875rem', fontWeight: 500, whiteSpace: 'nowrap',
              flexShrink: 0, cursor: 'pointer',
            }}>{f}</button>
          ))}
        </div>
      </div>
      {/* Stub: reuse active job card */}
      <div style={{ padding: '0 20px', display: 'flex', flexDirection: 'column', gap: 12 }}>
        {[
          { title: 'Kitchen Sink Repair', status: 'In Progress', amount: '₦15,000', date: 'Today' },
          { title: 'AC Unit Servicing', status: 'Accepted', amount: '₦22,000', date: 'Today' },
          { title: 'Office Electrical', status: 'Completed', amount: '₦25,000', date: 'Mar 3' },
        ].map(job => (
          <div key={job.title} className="card" style={{ padding: '16px', cursor: 'pointer' }} onClick={() => navigate('active-job')}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
              <span style={{ fontWeight: 700 }}>{job.title}</span>
              <span style={{
                fontSize: '0.75rem', fontWeight: 700, padding: '3px 10px', borderRadius: 'var(--radius-full)',
                background: job.status === 'In Progress' ? '#FEF0E6' : job.status === 'Completed' ? '#DCFCE7' : '#FEF9C3',
                color: job.status === 'In Progress' ? '#C2410C' : job.status === 'Completed' ? '#166534' : '#92400E',
              }}>{job.status}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-muted)', fontSize: '0.875rem' }}>
              <span>{job.date}</span>
              <span style={{ fontWeight: 700, color: 'var(--brand-green)' }}>{job.amount}</span>
            </div>
          </div>
        ))}
      </div>

      {activeMode === 'hire' && (
        <div style={{ padding: '20px' }}>
          <button
            className="btn btn-primary btn-full btn-bounce"
            id="jobs-tab-post"
            onClick={() => navigate('post-job')}
            style={{ borderRadius: 'var(--radius-md)', gap: 8 }}
          >
            <StickyIcon src={ICONS.add} size={20} /> Post a New Job
          </button>
        </div>
      )}
    </div>
  );
}

// ── Conversations List ────────────────────────────────────────────
function ConversationsList({ navigate }: { navigate: (s: string) => void }) {
  const convos = [
    { name: 'Emeka Obi',    last: 'On my way now',              time: '10:19', unread: 2 },
    { name: 'Fatima A.',    last: 'Thank you for the rating!',   time: '9:40',  unread: 0 },
    { name: 'Chidi Eze',    last: 'I can be there in 30 mins.',  time: 'Yesterday', unread: 0 },
  ];

  return (
    <div>
      <div style={{ padding: '20px 20px 8px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
          <h1 style={{ fontSize: '1.375rem', fontWeight: 700 }}>Messages</h1>
          <button style={{ background: 'var(--brand-green-light)', color: 'var(--brand-green)', border: '1px solid var(--brand-green)', padding: '6px 12px', borderRadius: 'var(--radius-full)', fontSize: '0.75rem', fontWeight: 700, display: 'flex', alignItems: 'center', gap: 6 }}>
            <StickyIcon src={ICONS.help} size={14} /> AI Inbox
          </button>
        </div>
        
        {/* AI Summary Block */}
        <div style={{ padding: '16px', borderRadius: 'var(--radius-md)', background: 'var(--brand-green-light)', border: '1px solid var(--brand-green)', display: 'flex', gap: 12, alignItems: 'flex-start' }}>
          <div style={{ flexShrink: 0, width: 36, height: 36, borderRadius: '50%', background: 'var(--brand-green)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <StickyIcon src={ICONS.help} size={20} style={{ color: 'white' }} />
          </div>
          <div>
            <div style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--brand-green)', fontWeight: 800, marginBottom: 4 }}>Daily Briefing</div>
            <div style={{ fontSize: '0.875rem', color: 'var(--text-primary)', lineHeight: 1.5, fontWeight: 500 }}>
              Emeka is on his way for the sink repair. No other urgent jobs need your attention right now.
            </div>
          </div>
        </div>
      </div>
      {convos.map(c => (
        <div
          key={c.name}
          style={{
            display: 'flex', gap: 14, padding: '14px 20px',
            borderBottom: '1px solid var(--separator)', cursor: 'pointer',
            transition: 'background 0.15s',
          }}
          onClick={() => navigate('chat')}
        >
          <div style={{
            width: 50, height: 50, borderRadius: '50%',
            background: 'var(--brand-green)', color: 'white',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontWeight: 700, fontSize: '1.1rem', flexShrink: 0,
          }}>{c.name.split(' ').map((w:string) => w[0]).join('').slice(0,2)}</div>
          <div style={{ flex: 1 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 3 }}>
              <span style={{ fontWeight: 700, fontSize: '0.9375rem' }}>{c.name}</span>
              <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{c.time}</span>
            </div>
            <div style={{ fontSize: '0.875rem', color: c.unread ? 'var(--text-primary)' : 'var(--text-muted)', fontWeight: c.unread ? 600 : 400 }}>
              {c.last}
            </div>
          </div>
          {c.unread > 0 && (
            <div style={{
              width: 20, height: 20, borderRadius: '50%',
              background: 'var(--action-orange)', color: 'white',
              fontSize: '0.6875rem', fontWeight: 700,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              flexShrink: 0, alignSelf: 'center',
            }}>{c.unread}</div>
          )}
        </div>
      ))}
    </div>
  );
}
