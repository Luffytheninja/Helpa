/**
 * HELPA — Centralized constants
 *
 * Avatars: Unsplash public images (Black models / West-African professional aesthetic)
 * Icons:   Stickies SVG pack — served from /public/icons/*
 */

// ─── Avatars ──────────────────────────────────────────────────────────────────
// Each URL uses Unsplash's on-the-fly resize (w=200, q=80, fit=crop, face focus)
export const AVATARS = {
  /** The signed-in user (customer / default) */
  me:     'https://images.unsplash.com/photo-1531384441138-2736e62e0919?w=200&q=80&auto=format&fit=crop&crop=face',
  /** Emeka Obi — elite plumber helper */
  emeka:  'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&q=80&auto=format&fit=crop&crop=face',
  /** Fatima Abubakar — trusted helper */
  fatima: 'https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?w=200&q=80&auto=format&fit=crop&crop=face',
  /** Chidi Eze — verified helper */
  chidi:  'https://images.unsplash.com/photo-1522529599102-193c0d76b5b6?w=200&q=80&auto=format&fit=crop&crop=face',
  /** Adaeze Nwosu — student helper */
  adaeze: 'https://images.unsplash.com/photo-1543269664-7eef42226a21?w=200&q=80&auto=format&fit=crop&crop=face',
  /** Kola Adeyemi — verified helper */
  kola:   'https://images.unsplash.com/photo-1506277886164-e25aa3f4ef7f?w=200&q=80&auto=format&fit=crop&crop=face',
  /** Review author — Bisi */
  bisi:   'https://images.unsplash.com/photo-1589156191108-c762ff4b96ab?w=200&q=80&auto=format&fit=crop&crop=face',
  /** Review author — Tunde */
  tunde:  'https://images.unsplash.com/photo-1628157588553-5eeea00af15c?w=200&q=80&auto=format&fit=crop&crop=face',
  /** Review author — Grace */
  grace:  'https://images.unsplash.com/photo-1583195764036-46f6b4003f85?w=200&q=80&auto=format&fit=crop&crop=face',
} as const;

// ─── Helper avatar lookup by name ─────────────────────────────────────────────
export const HELPER_AVATARS: Record<string, string> = {
  'Emeka Obi':       AVATARS.emeka,
  'Emeka O.':        AVATARS.emeka,
  'Fatima Abubakar': AVATARS.fatima,
  'Fatima A.':       AVATARS.fatima,
  'Chidi Eze':       AVATARS.chidi,
  'Adaeze Nwosu':    AVATARS.adaeze,
  'Adaeze N.':       AVATARS.adaeze,
  'Kola Adeyemi':    AVATARS.kola,
  'Bisi A.':         AVATARS.bisi,
  'Bisi Adewale':    AVATARS.bisi,
  'Tunde O.':        AVATARS.tunde,
  'Tunde Afolabi':   AVATARS.tunde,
  'Grace E.':        AVATARS.grace,
};

// ─── Stickies SVG icon paths (served from /public/icons/) ─────────────────────
// The `-1` variants are the coloured / duo-tone versions; plain are outline.
const I = (name: string) => `/icons/${name}`;

export const ICONS = {
  // Navigation
  home:         I('Shop-Store--Streamline-Stickies-1.svg'),
  jobs:         I('Checking-Order--Streamline-Stickies-1.svg'),
  wallet:       I('Money-Coin-2--Streamline-Stickies-1.svg'),
  chat:         I('View-Mail--Streamline-Stickies-1.svg'),
  profile:      I('Face-Id-1--Streamline-Stickies-1.svg'),

  // Categories
  plumbing:     I('Construction-Area--Streamline-Stickies-1.svg'),
  electrical:   I('Solar-Power-Battery--Streamline-Stickies-1.svg'),
  driver:       I('Taxi--Streamline-Stickies-1.svg'),
  errands:      I('Backpack--Streamline-Stickies-1.svg'),
  cleaning:     I('Plant-1--Streamline-Stickies-1.svg'),
  techRepair:   I('Labtop--Streamline-Stickies-1.svg'),
  studentHelp:  I('School--Streamline-Stickies-1.svg'),

  // Actions & misc
  search:       I('Search--Streamline-Stickies-1.svg'),
  notification: I('Online-Information--Streamline-Stickies-1.svg'),
  star:         I('Star--Streamline-Stickies-1.svg'),
  medal:        I('Medal--Streamline-Stickies-1.svg'),
  money:        I('Pile-Of-Money--Streamline-Stickies-1.svg'),
  key:          I('Key--Streamline-Stickies-1.svg'),
  phone:        I('Mobile-Phone--Streamline-Stickies-1.svg'),
  time:         I('Time--Streamline-Stickies-1.svg'),
  wrench:       I('Wrench--Streamline-Stickies-1.svg'),
  globe:        I('Globe-1--Streamline-Stickies-1.svg'),
  reward:       I('Reward--Streamline-Stickies-1.svg'),
  passport:     I('Passport--Streamline-Stickies-1.svg'),
  receipt:      I('Reciept-1--Streamline-Stickies-1.svg'),
  pen:          I('Pen--Streamline-Stickies-1.svg'),
  help:         I('Help--Streamline-Stickies-1.svg'),
  qrCode:       I('Qr-Code--Streamline-Stickies-1.svg'),
  analytics:    I('Graph-Bar--Streamline-Stickies-1.svg'),
  safety:       I('Safety--Streamline-Stickies-1.svg'),
  library:      I('Book-Library--Streamline-Stickies-1.svg'),
} as const;
