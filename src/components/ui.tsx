import React from 'react';
import { ICONS, HELPER_AVATARS } from '../constants';
import { useHaptics } from '../hooks/useHaptics';

// ─── Stickies Icon ──────────────────────────────────────────────────────────
interface StickyIconProps {
  src: string | React.ComponentType<{ size?: number; color?: string; style?: React.CSSProperties }>;
  size?: number;
  alt?: string;
  style?: React.CSSProperties;
}
export function StickyIcon({ src, size = 28, alt = '', style }: StickyIconProps) {
  if (typeof src === 'string') {
    return (
      <img
        src={src}
        alt={alt}
        width={size}
        height={size}
        draggable={false}
        style={{ objectFit: 'contain', display: 'block', flexShrink: 0, ...style }}
      />
    );
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { filter: _filter, ...iconStyle } = style || {};
  const IconComponent = src as React.ElementType;
  return (
    <span className="sticky-icon-svg" style={{ display: 'inline-flex', flexShrink: 0, ...iconStyle }}>
      <IconComponent size={size} color="currentColor" />
    </span>
  );
}

// ─── Bottom Nav ─────────────────────────────────────────────────────────────
interface NavItem {
  id: string;
  label: string;
  icon: string | React.ElementType;
}

const NAV_ITEMS: NavItem[] = [
  { id: 'home',    label: 'Home',    icon: ICONS.home    },
  { id: 'jobs',    label: 'Jobs',    icon: ICONS.jobs    },
  { id: 'wallet',  label: 'Wallet',  icon: ICONS.wallet  },
  { id: 'chat',    label: 'Chat',    icon: ICONS.chat    },
  { id: 'profile', label: 'Profile', icon: ICONS.profile },
];

interface BottomNavProps {
  active: string;
  onChange: (id: string) => void;
  notifCount?: number;
}

export function BottomNav({ active, onChange, notifCount = 0 }: BottomNavProps) {
  const { haptic } = useHaptics();

  const handleChange = (id: string) => {
    haptic('selection');
    onChange(id);
  };

  return (
    <nav className="bottom-nav">
      {NAV_ITEMS.map(item => (
        <button
          key={item.id}
          id={`nav-${item.id}`}
          className={`nav-item ${active === item.id ? 'active' : ''}`}
          onClick={() => handleChange(item.id)}
          style={{ background: 'none' }}
        >
          <div className="nav-icon-wrap">
            <StickyIcon
              src={item.icon}
              size={26}
              alt={item.label}
              style={{
                opacity: active === item.id ? 1 : 0.55,
                filter: active === item.id ? 'none' : 'grayscale(0.4)',
                transition: 'opacity 0.2s, filter 0.2s',
              }}
            />
            {item.id === 'chat' && notifCount > 0 && (
              <span className="nav-badge">{notifCount > 9 ? '9+' : notifCount}</span>
            )}
          </div>
          <span className="nav-item-label">{item.label}</span>
          {active === item.id && (
            <div style={{
              position: 'absolute',
              bottom: -1,
              left: '50%',
              transform: 'translateX(-50%)',
              width: 20, height: 3,
              borderRadius: 2,
              background: 'var(--brand-green)',
            }} />
          )}
        </button>
      ))}
    </nav>
  );
}

// ─── TopBar ──────────────────────────────────────────────────────────────────
interface TopBarProps {
  left?: React.ReactNode;
  center?: React.ReactNode;
  right?: React.ReactNode;
  title?: string;
  showBorder?: boolean;
}

export function TopBar({ left, center, right, title, showBorder = true }: TopBarProps) {
  return (
    <header className="top-bar" style={{ borderBottom: showBorder ? '1px solid var(--separator)' : 'none' }}>
      <div style={{ width: 44, display: 'flex', alignItems: 'center' }}>{left}</div>
      <div style={{ flex: 1, display: 'flex', justifyContent: 'center' }}>
        {center || (title && <span className="top-bar-title">{title}</span>)}
      </div>
      <div style={{ width: 44, display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>{right}</div>
    </header>
  );
}

// ─── Avatar ──────────────────────────────────────────────────────────────────
interface AvatarProps {
  /** Display name — used for initials fallback */
  name: string;
  size?: number;
  ring?: 'verified' | 'active' | 'student' | 'offline';
  /** Explicit image URL. If omitted, tries HELPER_AVATARS lookup, then initials */
  src?: string;
}

export function Avatar({ name, size = 44, ring, src }: AvatarProps) {
  const imageSrc = src ?? HELPER_AVATARS[name];
  const initials = name.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase();

  return (
    <div className={`avatar-ring ${ring ? `ring-${ring}` : ''}`} style={{ width: size, height: size }}>
      {imageSrc ? (
        <img
          src={imageSrc}
          alt={name}
          width={size}
          height={size}
          style={{ borderRadius: '50%', objectFit: 'cover', width: size, height: size, display: 'block' }}
          onError={(e) => {
            // Fallback to initials placeholder on load error
            (e.target as HTMLImageElement).style.display = 'none';
          }}
        />
      ) : (
        <div className="avatar-placeholder" style={{ width: size, height: size, fontSize: size * 0.35 }}>
          {initials}
        </div>
      )}
    </div>
  );
}

// ─── Escrow Badge ─────────────────────────────────────────────────────────────
interface EscrowBadgeProps { amount: string; }
export function EscrowBadge({ amount }: EscrowBadgeProps) {
  return (
    <span className="escrow-badge" style={{ display: 'inline-flex', alignItems: 'center', gap: 4 }}>
      <StickyIcon src={ICONS.lock} size={14} alt="Secured" />
      <span style={{ fontSize: '0.75rem', fontWeight: 600 }}>{amount} secured</span>
    </span>
  );
}

// ─── Trust Badge ──────────────────────────────────────────────────────────────
interface TrustBadgeProps { level: 'verified' | 'trusted' | 'elite' | 'pro'; }
export function TrustBadge({ level }: TrustBadgeProps) {
  const label = level.charAt(0).toUpperCase() + level.slice(1);
  const dots = level === 'verified' ? 1 : level === 'trusted' ? 2 : level === 'elite' ? 3 : 4;
  return (
    <span className={`trust-badge trust-badge-${level}`} style={{ display: 'inline-flex', alignItems: 'center', gap: 4 }}>
      <div style={{ display: 'flex', gap: 1 }}>
        {[...Array(dots)].map((_, i) => (
          <StickyIcon key={i} src={ICONS.verification} size={12} alt="Verified" />
        ))}
      </div>
      {label}
    </span>
  );
}

// ─── Chip ─────────────────────────────────────────────────────────────────────
interface ChipProps { type: 'urgent' | 'scheduled' | 'contract' | 'success' | 'pending' | 'inactive'; label: string; }
export function Chip({ type, label }: ChipProps) {
  const icon = type === 'urgent' ? ICONS.notification : type === 'scheduled' ? ICONS.time : type === 'contract' ? ICONS.receipt : null;
  return (
    <span className={`chip chip-${type}`} style={{ display: 'inline-flex', alignItems: 'center', gap: 4 }}>
      {icon && <StickyIcon src={icon} size={14} alt={type} />}
      {label}
    </span>
  );
}

// ─── Category Button (replaces emoji-only buttons) ───────────────────────────
interface CategoryBtnProps {
  icon: string | React.ElementType;
  label: string;
  onClick?: () => void;
}
export function CategoryBtn({ icon, label, onClick }: CategoryBtnProps) {
  const { haptic } = useHaptics();
  return (
    <button
      className="category-btn"
      onClick={() => { haptic('light'); onClick?.(); }}
      style={{
        display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6,
        background: 'var(--bg-elevated)', border: '1px solid var(--separator)',
        borderRadius: 'var(--radius-md)', padding: '14px 10px',
        minWidth: 76, flexShrink: 0, cursor: 'pointer',
        transition: 'all 0.2s',
      }}
    >
      <StickyIcon src={icon} size={36} alt={label} />
      <span style={{ fontSize: '0.6875rem', fontWeight: 600, color: 'var(--text-secondary)', textAlign: 'center', lineHeight: 1.2 }}>
        {label}
      </span>
    </button>
  );
}

// ─── Job Card ────────────────────────────────────────────────────────────────
interface JobCardProps {
  category: string | React.ElementType;
  title: string;
  customerName: string;
  customerRating: number;
  location: string;
  distance: string;
  urgency: 'urgent' | 'scheduled' | 'contract';
  budget: string;
  escrowFunded?: boolean;
  applicants?: number;
  imageUrl?: string;
  status?: string;
  onClick?: () => void;
}

export function JobCard({
  category, title, customerName, customerRating,
  location, distance, urgency, budget, escrowFunded,
  applicants, status, onClick,
}: JobCardProps) {
  const { haptic } = useHaptics();

  const handleClick = () => {
    haptic('light');
    onClick?.();
  };

  return (
    <div
      className={`job-card ${urgency === 'urgent' ? 'job-card-urgent-border' : ''}`}
      onClick={handleClick}
      id={`job-card-${title.toLowerCase().replace(/\s+/g, '-')}`}
    >
      {/* Top */}
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 10 }}>
        <div style={{ display: 'flex', gap: 10 }}>
          <div style={{
            width: 40, height: 40, borderRadius: 10,
            background: 'var(--brand-green-light)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            flexShrink: 0,
          }}>
            {/* Updated to use StickyIcon for category, supporting both images and Material Icons */}
            <StickyIcon src={category} size={24} />
          </div>
          <div>
            <div style={{ fontWeight: 700, fontSize: '0.9375rem', lineHeight: 1.3, marginBottom: 2 }}>{title}</div>
            <div style={{ fontSize: '0.8125rem', color: 'var(--text-secondary)', display: 'inline-flex', alignItems: 'center', gap: 4 }}>
              {customerName} · <StickyIcon src={ICONS.star} size={12} /> {customerRating}
            </div>
          </div>
        </div>
        <Chip type={urgency} label={urgency === 'urgent' ? 'Urgent' : urgency === 'scheduled' ? 'Scheduled' : 'Contract'} />
      </div>

      {/* Middle */}
      <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginBottom: 12 }}>
        <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', display: 'inline-flex', alignItems: 'center', gap: 4 }}>
          <StickyIcon src={ICONS.location} size={14} alt="Location" /> {location}
        </span>
        <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', display: 'inline-flex', alignItems: 'center', gap: 4 }}>
          <StickyIcon src={ICONS.globe} size={14} alt="Distance" /> {distance}
        </span>
        {applicants !== undefined && (
          <span style={{ fontSize: '0.75rem', color: 'var(--action-orange)', fontWeight: 600, display: 'inline-flex', alignItems: 'center', gap: 4 }}>
            <StickyIcon src={ICONS.profile} size={14} alt="Applicants" /> {applicants} applied
          </span>
        )}
      </div>

      {/* Bottom */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div>
          <div style={{ fontWeight: 700, fontSize: '1.125rem', color: 'var(--text-primary)' }}>{budget}</div>
          {escrowFunded && <EscrowBadge amount={budget} />}
        </div>

        {status ? (
          <Chip
            type={status === 'Accepted' ? 'success' : status === 'Completed' ? 'success' : 'inactive'}
            label={status}
          />
        ) : (
          <div style={{ display: 'flex', gap: 8 }}>
            <button
              className="btn btn-sm btn-secondary"
              onClick={e => { e.stopPropagation(); haptic('light'); }}
            >
              Details
            </button>
            <button
              className="btn btn-sm btn-primary btn-bounce"
              onClick={e => { e.stopPropagation(); haptic('medium'); }}
            >
              Apply
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

// ─── Map Placeholder ──────────────────────────────────────────────────────────
export function MapPlaceholder({ height = 180, showRadius = false }: { height?: number; showRadius?: boolean }) {
  return (
    <div className="map-placeholder" style={{ height }}>
      <div className="map-grid" />
      {showRadius && (
        <div style={{
          position: 'absolute',
          width: 120, height: 120, borderRadius: '50%',
          background: 'rgba(26,107,84,0.1)',
          border: '2px solid rgba(26,107,84,0.3)',
        }} />
      )}
      <div className="map-pulse">
        <StickyIcon src={ICONS.location} size={32} />
      </div>
      {/* Helper pins */}
      {[
        { top: '20%', left: '20%', color: 'var(--brand-green)' },
        { top: '35%', right: '25%', color: 'var(--brand-green)' },
        { bottom: '30%', left: '30%', color: 'var(--action-orange)' },
      ].map((pin, i) => (
        <div key={i} style={{
          position: 'absolute', ...pin,
          width: 12, height: 12, borderRadius: '50%',
          background: pin.color,
          border: '2px solid white',
          boxShadow: '0 2px 6px rgba(0,0,0,0.2)',
        }} />
      ))}
    </div>
  );
}

// ─── Section Header ───────────────────────────────────────────────────────────
export function SectionHeader({ title, action, onAction }: { title: string; action?: string; onAction?: () => void }) {
  const { haptic } = useHaptics();
  return (
    <div className="section-header">
      <span className="section-title">{title}</span>
      {action && (
        <button className="section-action" onClick={() => { haptic('light'); onAction?.(); }}>
          {action}
        </button>
      )}
    </div>
  );
}

// ─── Helper Card ──────────────────────────────────────────────────────────────
export function HelperCard({ name, rating, distance, trust, ring, jobs }: {
  name: string; rating: number; distance: string;
  trust: 'verified' | 'trusted' | 'elite' | 'pro'; ring: 'verified' | 'active' | 'student' | 'offline'; jobs: number;
}) {
  const { haptic } = useHaptics();
  return (
    <div className="card" style={{ padding: '16px', minWidth: 158, flex: '0 0 auto', cursor: 'pointer' }}>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
        <Avatar name={name} size={56} ring={ring} />
        <div style={{ fontWeight: 700, fontSize: '0.9375rem', textAlign: 'center' }}>{name.split(' ')[0]}</div>
        <div style={{ fontSize: '0.8125rem', color: 'var(--text-secondary)', display: 'inline-flex', alignItems: 'center', gap: 4 }}>
          <StickyIcon src={ICONS.star} size={12} /> {rating} · {distance}
        </div>
        <TrustBadge level={trust} />
        <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{jobs} jobs</div>
        <button
          className="btn btn-sm btn-primary btn-bounce"
          style={{ width: '100%', borderRadius: 8 }}
          onClick={() => haptic('medium')}
        >
          Hire Now
        </button>
      </div>
    </div>
  );
}
