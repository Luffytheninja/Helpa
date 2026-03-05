import { useState } from 'react';
import { TopBar } from '../../components/ui';
import { useHaptics } from '../../hooks/useHaptics';

const TRANSACTIONS = [
  { id: 't1', type: 'credit', icon: '🔒', desc: 'Escrow funded — Kitchen Sink', amount: '+₦15,000', status: 'Pending', date: 'Today, 10:03 AM' },
  { id: 't2', type: 'credit', icon: '✅', desc: 'Payment released — AC Service', amount: '+₦22,000', status: 'Completed', date: 'Yesterday' },
  { id: 't3', type: 'debit',  icon: '💸', desc: 'Withdrawal to GTBank',         amount: '-₦30,000', status: 'Processed', date: 'Mar 3' },
  { id: 't4', type: 'credit', icon: '🎉', desc: 'Referral bonus — Kola joined',  amount: '+₦300',    status: 'Completed', date: 'Mar 2' },
  { id: 't5', type: 'debit',  icon: '🔒', desc: 'Escrow funded — Cleaning job', amount: '-₦18,000', status: 'Pending', date: 'Mar 1' },
  { id: 't6', type: 'credit', icon: '↩️', desc: 'Refund — Disputed job #0042',  amount: '+₦18,000', status: 'Refunded', date: 'Feb 28' },
];

const FILTER_TABS = ['All', 'Earned', 'Spent', 'Pending'];

export function WalletScreen({ onNavigate }: { onNavigate: (s: string) => void }) {
  const [filter, setFilter] = useState('All');
  const [showWithdraw, setShowWithdraw] = useState(false);
  const [withdrawStep, setWithdrawStep] = useState(1);
  const [withdrawAmount, setWithdrawAmount] = useState('');
  const { haptic } = useHaptics();

  const filtered = TRANSACTIONS.filter(t => {
    if (filter === 'Earned') return t.type === 'credit';
    if (filter === 'Spent')  return t.type === 'debit';
    if (filter === 'Pending') return t.status === 'Pending';
    return true;
  });

  return (
    <div style={{ paddingBottom: 80 }}>
      <TopBar title="Wallet" />

      {/* Balance card */}
      <div style={{ padding: '16px 20px 20px' }}>
        <div className="wallet-balance">
          <div style={{ fontSize: '0.875rem', opacity: 0.75, marginBottom: 4, position: 'relative', zIndex: 1 }}>Available Balance</div>
          <div className="wallet-amount">₦58,250</div>
          <div style={{ display: 'flex', gap: 20, marginTop: 16, position: 'relative', zIndex: 1 }}>
            <div>
              <div style={{ fontSize: '0.75rem', opacity: 0.65 }}>Pending Escrow</div>
              <div style={{ fontWeight: 700, fontSize: '1rem' }}>₦15,000</div>
            </div>
            <div style={{ width: 1, background: 'rgba(255,255,255,0.2)' }} />
            <div>
              <div style={{ fontSize: '0.75rem', opacity: 0.65 }}>Lifetime Earnings</div>
              <div style={{ fontWeight: 700, fontSize: '1rem' }}>₦284,500</div>
            </div>
          </div>
        </div>
      </div>

      {/* Action buttons */}
      <div style={{ padding: '0 20px 20px', display: 'flex', gap: 12 }}>
        <button
          className="btn btn-primary btn-full btn-bounce"
          style={{ borderRadius: 'var(--radius-md)' }}
          onClick={() => { haptic('medium'); setShowWithdraw(true); }}
        >
          Withdraw
        </button>
        <button
          className="btn btn-secondary btn-full"
          style={{ borderRadius: 'var(--radius-md)' }}
          onClick={() => { haptic('light'); onNavigate('add-funds'); }}
        >
          Add Funds
        </button>
      </div>

      {/* Filter tabs */}
      <div className="filter-tabs">
        {FILTER_TABS.map(tab => (
          <button
            key={tab}
            id={`wallet-tab-${tab.toLowerCase()}`}
            className={`filter-tab ${filter === tab ? 'active' : ''}`}
            onClick={() => { haptic('selection'); setFilter(tab); }}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Transaction list */}
      <div style={{ padding: '0 20px' }}>
        <div style={{ fontWeight: 700, marginBottom: 12 }}>Transaction History</div>
        {filtered.map(tx => (
          <div key={tx.id} style={{
            display: 'flex', gap: 12, alignItems: 'center',
            padding: '14px 0', borderBottom: '1px solid var(--separator)',
          }}>
            <div style={{
              width: 44, height: 44, borderRadius: '50%',
              background: tx.type === 'credit' ? '#D1FAE5' : '#FEE2E2',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: '1.2rem', flexShrink: 0,
            }}>{tx.icon}</div>
            <div style={{ flex: 1 }}>
              <div style={{ fontWeight: 600, fontSize: '0.9375rem', marginBottom: 2 }}>{tx.desc}</div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{tx.date}</div>
            </div>
            <div style={{ textAlign: 'right' }}>
              <div style={{
                fontWeight: 700, fontSize: '1rem',
                color: tx.type === 'credit' ? 'var(--soft-green)' : 'var(--status-danger)',
              }}>
                {tx.amount}
              </div>
              <div style={{
                fontSize: '0.6875rem', fontWeight: 600, marginTop: 2,
                color: tx.status === 'Completed' ? 'var(--soft-green)' :
                       tx.status === 'Pending' ? 'var(--status-warning)' : 'var(--text-muted)',
              }}>
                {tx.status}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Withdraw modal */}
      {showWithdraw && (
        <div style={{
          position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', zIndex: 200,
          display: 'flex', alignItems: 'flex-end',
        }} onClick={() => { setShowWithdraw(false); setWithdrawStep(1); }}>
          <div
            style={{ background: 'var(--bg-primary)', borderRadius: '24px 24px 0 0', width: '100%', padding: '24px 20px 40px', maxWidth: 430, margin: '0 auto' }}
            onClick={e => e.stopPropagation()}
          >
            {withdrawStep === 1 && (
              <>
                <div style={{ fontWeight: 700, fontSize: '1.125rem', marginBottom: 6 }}>Withdraw Funds</div>
                <div style={{ fontSize: '0.875rem', color: 'var(--text-muted)', marginBottom: 20 }}>
                  Available: <strong style={{ color: 'var(--text-primary)' }}>₦58,250</strong> · Min: ₦1,000
                </div>
                <div className="input-group">
                  <label className="input-label">Amount</label>
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <span style={{ padding: '14px 12px', background: 'var(--bg-elevated)', border: '1.5px solid var(--separator)', borderRight: 'none', borderRadius: 'var(--radius-md) 0 0 var(--radius-md)', fontWeight: 700 }}>₦</span>
                    <input
                      type="number"
                      className="input-field"
                      style={{ borderRadius: '0 var(--radius-md) var(--radius-md) 0' }}
                      placeholder="10,000"
                      value={withdrawAmount}
                      onChange={e => setWithdrawAmount(e.target.value)}
                    />
                  </div>
                </div>
                <button className="btn btn-primary btn-full" onClick={() => { haptic('medium'); setWithdrawStep(2); }} style={{ borderRadius: 'var(--radius-md)' }}>Next →</button>
              </>
            )}

            {withdrawStep === 2 && (
              <>
                <div style={{ fontWeight: 700, fontSize: '1.125rem', marginBottom: 16 }}>Confirm Account</div>
                <div style={{ background: 'var(--bg-elevated)', borderRadius: 'var(--radius-md)', padding: '16px', marginBottom: 20 }}>
                  <div style={{ fontSize: '0.875rem', color: 'var(--text-muted)', marginBottom: 4 }}>Withdrawing to</div>
                  <div style={{ fontWeight: 700 }}>GTBank ···· 0789</div>
                  <div style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>Ayomide Okafor</div>
                </div>
                <p style={{ fontSize: '0.8125rem', color: 'var(--text-muted)', marginBottom: 16 }}>
                  Withdrawals process in 1–2 business days.
                </p>
                <button className="btn btn-primary btn-full btn-bounce" onClick={() => { haptic('success'); setShowWithdraw(false); setWithdrawStep(1); }} style={{ borderRadius: 'var(--radius-md)' }}>
                  Confirm Withdrawal ✓
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
