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

import {
  MdHome, MdWork, MdAccountBalanceWallet, MdChat, MdPerson,
  MdPlumbing, MdElectricalServices, MdDirectionsCar, MdBackpack,
  MdCleaningServices, MdComputer, MdSchool, MdSearch, MdNotifications,
  MdEmojiEvents, MdAttachMoney, MdVpnKey, MdPhone, MdAccessTime,
  MdBuild, MdLanguage, MdCardGiftcard, MdBadge, MdReceipt, MdEdit,
  MdRocketLaunch, MdHelp, MdQrCode, MdBarChart, MdHealthAndSafety, MdLocalLibrary,
  MdLocationOn, MdLock, MdDoneAll, MdMoreVert, MdArrowBack,
  MdPhotoCamera, MdMic, MdCheck, MdArrowForward, MdFiberManualRecord,
  MdSend, MdAdd, MdStar, MdCheckCircle
} from 'react-icons/md';

// ─── SVG icon paths (served from /public/icons/) ─────────────────────

export const ICONS = {
  // Navigation
  home:         MdHome,
  jobs:         MdWork,
  wallet:       MdAccountBalanceWallet,
  chat:         MdChat,
  profile:      MdPerson,

  checkAll:     MdDoneAll,
  check:        MdCheck,
  dot:          MdFiberManualRecord,
  send:         MdSend,
  add:          MdAdd,
  back:         MdArrowBack,
  forward:      MdArrowForward,
  more:         MdMoreVert,

  // Categories
  plumbing:     MdPlumbing,
  electrical:   MdElectricalServices,
  driver:       MdDirectionsCar,
  errands:      MdBackpack,
  cleaning:     MdCleaningServices,
  techRepair:   MdComputer,
  studentHelp:  MdSchool,

  // Actions & misc
  search:       MdSearch,
  notification: MdNotifications,
  star:         MdStar,
  medal:        MdEmojiEvents,
  money:        MdAttachMoney,
  key:          MdVpnKey,
  phone:        MdPhone,
  time:         MdAccessTime,
  wrench:       MdBuild,
  globe:        MdLanguage,
  reward:       MdCardGiftcard,
  passport:     MdBadge,
  receipt:      MdReceipt,
  pen:          MdEdit,
  help:         MdHelp,
  qrCode:       MdQrCode,
  analytics:    MdBarChart,
  safety:       MdHealthAndSafety,
  library:      MdLocalLibrary,
  location:     MdLocationOn,
  camera:       MdPhotoCamera,
  mic:          MdMic,
  rocket:       MdRocketLaunch,
  verification: MdCheckCircle,
  lock:         MdLock,
} as const;
