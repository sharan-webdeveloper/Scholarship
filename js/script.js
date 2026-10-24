// ============================================================================
// ScholarHub Pro — Shared script (runs on every page)
// Handles: icons, navbar/footer injection, preloader, dark mode, custom cursor,
// mouse trail, scroll progress, back-to-top, FAB chat, toast, modal, scroll
// reveal, animated counters, ripple buttons, typing animation, particles.
// ============================================================================

import { FAQS } from './data.js'

// --- SVG icon library (inline so no external requests) ---------------------
export const ICONS = {
  award: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="8" r="6"/><path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11"/></svg>',
  heart: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.29 1.51 4.04 3 5.5l7 7Z"/></svg>',
  globe: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20M2 12h20"/></svg>',
  flask: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 3h6v4l5 9a3 3 0 0 1-2.7 4.5H6.7A3 3 0 0 1 4 16l5-9V3z"/><path d="M7 14h10"/></svg>',
  venus: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="9" r="6"/><path d="M12 15v7M9 19h6"/></svg>',
  microscope: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 18h8M3 22h18M14 22a7 7 0 1 0-7-7"/><path d="m9 14 4-4 2 2-4 4-2-2z"/></svg>',
  trophy: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6M18 9h1.5a2.5 2.5 0 0 0 0-5H18M4 22h16M10 14.66V17c0 .55.45 1 1 1h2c.55 0 1-.45 1-1v-2.34M8 18h8M12 2v12"/></svg>',
  palette: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="13.5" cy="6.5" r=".5" fill="currentColor"/><circle cx="17.5" cy="10.5" r=".5" fill="currentColor"/><circle cx="8.5" cy="7.5" r=".5" fill="currentColor"/><circle cx="6.5" cy="12.5" r=".5" fill="currentColor"/><path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 0 1 1.668-1.668h1.996c3.051 0 5.555-2.503 5.555-5.554C21.965 6.012 17.461 2 12 2z"/></svg>',
  users: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/></svg>',
  building: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="16" height="20" x="4" y="2" rx="2"/><path d="M9 22v-4h6v4M8 6h.01M16 6h.01M12 6h.01M12 10h.01M12 14h.01M16 10h.01M16 14h.01M8 10h.01M8 14h.01"/></svg>',
  trending: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="22 7 13.5 15.5 8.5 10.5 2 17"/><polyline points="16 7 22 7 22 13"/></svg>',
  bookmark: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m19 21-7-4-7 4V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16z"/></svg>',
  share: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><line x1="8.6" y1="13.5" x2="15.4" y2="17.5"/><line x1="15.4" y1="6.5" x2="8.6" y2="10.5"/></svg>',
  mapPin: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>',
  calendar: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="18" height="18" x="3" y="4" rx="2"/><path d="M3 10h18M8 2v4M16 2v4"/></svg>',
  clock: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>',
  dollar: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="2" x2="12" y2="22"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>',
  star: '<svg viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>',
  starOutline: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>',
  search: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>',
  filter: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"/></svg>',
  chevronDown: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m6 9 6 6 6-6"/></svg>',
  chevronLeft: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m15 18-6-6 6-6"/></svg>',
  chevronRight: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m9 18 6-6-6-6"/></svg>',
  arrowRight: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>',
  arrowUp: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m18 15-6-6-6 6"/></svg>',
  arrowLeft: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>',
  check: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>',
  checkCircle: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>',
  x: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 6 6 18M6 6l12 12"/></svg>',
  alert: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>',
  menu: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="4" y1="6" x2="20" y2="6"/><line x1="4" y1="12" x2="20" y2="12"/><line x1="4" y1="18" x2="20" y2="18"/></svg>',
  sun: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41"/></svg>',
  moon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/></svg>',
  message: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>',
  send: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m22 2-7 20-4-9-9-4Z"/><path d="M22 2 11 13"/></svg>',
  bell: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9M10.3 21a1.94 1.94 0 0 0 3.4 0"/></svg>',
  eye: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/></svg>',
  eyeOff: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9.88 9.88a3 3 0 1 0 4.24 4.24M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61M2 2l20 20"/></svg>',
  upload: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M17 8l-5-5-5 5M12 3v12"/></svg>',
  file: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>',
  download: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3"/></svg>',
  grid: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="7" height="7" x="3" y="3" rx="1"/><rect width="7" height="7" x="14" y="3" rx="1"/><rect width="7" height="7" x="14" y="14" rx="1"/><rect width="7" height="7" x="3" y="14" rx="1"/></svg>',
  list: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/><line x1="8" y1="18" x2="21" y2="18"/><line x1="3" y1="6" x2="3.01" y2="6"/><line x1="3" y1="12" x2="3.01" y2="12"/><line x1="3" y1="18" x2="3.01" y2="18"/></svg>',
  target: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/></svg>',
  flag: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z"/><line x1="4" y1="22" x2="4" y2="15"/></svg>',
  zap: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>',
  phone: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>',
  mail: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-10 5L2 7"/></svg>',
  rocket: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z"/><path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z"/><path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5"/></svg>',
  sparkle: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3v18M3 12h18M5.6 5.6l12.8 12.8M18.4 5.6 5.6 18.4"/></svg>',
  graduation: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c0 1 2 3 6 3s6-2 6-3v-5"/></svg>',
  book: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg>',
  shield: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>',
  lightbulb: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5"/><path d="M9 18h6M10 22h4"/></svg>',
  compass: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76"/></svg>',
  heart2: '<svg viewBox="0 0 24 24" fill="currentColor" stroke="none"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.29 1.51 4.04 3 5.5l7 7Z"/></svg>',
  linkedin: '<svg viewBox="0 0 24 24" fill="currentColor" stroke="none"><path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.34V9h3.42v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13zM7.12 20.45H3.56V9h3.56v11.45zM22.22 0H1.77C.8 0 0 .77 0 1.73v20.54C0 23.23.8 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.22 0z"/></svg>',
  twitter: '<svg viewBox="0 0 24 24" fill="currentColor" stroke="none"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>',
  instagram: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="20" height="20" x="2" y="2" rx="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.5" y2="6.5"/></svg>',
  youtube: '<svg viewBox="0 0 24 24" fill="currentColor" stroke="none"><path d="M23.5 6.2a3 3 0 0 0-2.1-2.1C19.5 3.5 12 3.5 12 3.5s-7.5 0-9.4.6A3 3 0 0 0 .5 6.2 31 31 0 0 0 0 12a31 31 0 0 0 .5 5.8 3 3 0 0 0 2.1 2.1c1.9.6 9.4.6 9.4.6s7.5 0 9.4-.6a3 3 0 0 0 2.1-2.1A31 31 0 0 0 24 12a31 31 0 0 0-.5-5.8zM9.6 15.6V8.4l6.2 3.6z"/></svg>',
  facebook: '<svg viewBox="0 0 24 24" fill="currentColor" stroke="none"><path d="M24 12.07C24 5.4 18.63 0 12 0S0 5.4 0 12.07C0 18.1 4.39 23.1 10.13 24v-8.44H7.08v-3.49h3.05V9.41c0-3.02 1.79-4.69 4.53-4.69 1.31 0 2.68.24 2.68.24v2.97h-1.51c-1.49 0-1.96.93-1.96 1.89v2.25h3.33l-.53 3.49h-2.8V24C19.61 23.1 24 18.1 24 12.07z"/></svg>',
  settings: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"/><circle cx="12" cy="12" r="3"/></svg>',
  layout: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="18" height="18" x="3" y="3" rx="2"/><path d="M3 9h18M9 21V9"/></svg>',
  home: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>',
  logout: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4M16 17l5-5-5-5M21 12H9"/></svg>',
}

export function icon(name, cls = '') {
  return (ICONS[name] || '').replace('<svg ', `<svg class="${cls}" `)
}

// --- Page registry for nav + active highlight ------------------------------
const PAGES = [
  { href: '/', label: 'Home' },
  { href: '/scholarships', label: 'Scholarships', drop: [
    { href: '/scholarships', label: 'Browse All', icon: 'grid' },
    { href: '/scholarships?cat=merit', label: 'Merit-Based', icon: 'award' },
    { href: '/scholarships?cat=international', label: 'International', icon: 'globe' },
    { href: '/scholarships?cat=need', label: 'Need-Based', icon: 'heart' },
  ]},
  { href: '/apply', label: 'Apply' },
  { href: '/dashboard', label: 'Dashboard' },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
  { href: '/faq', label: 'FAQ' },
]

// --- Inject navbar + footer + overlays -------------------------------------
function activePath() {
  const p = location.pathname.replace(/\/$/, '') || '/'
  return p === '' ? '/' : p
}
function isActive(href) {
  const cur = activePath()
  if (href === '/') return cur === '/' || cur === '/index.html'
  const clean = href.replace(/\?.*$/, '')
  return cur === clean || cur === clean + '.html'
}

export function injectLayout(page) {
  const nav = document.createElement('nav')
  nav.className = 'nav'
  nav.id = 'navbar'
  nav.innerHTML = `
    <div class="container nav-inner">
      <a href="/" class="brand">
        <span class="brand-logo">${icon('graduation')}</span>
        Scholar<span>Hub</span> Pro
      </a>
      <ul class="nav-links">
        ${PAGES.map((p) => p.drop ? `
          <li class="has-drop">
            <a class="nav-link ${isActive(p.href) ? 'active' : ''}" href="${p.href}">${p.label} ${icon('chevronDown', 'btn-icon')}</a>
            <div class="drop">
              ${p.drop.map(d => `<a href="${d.href}">${icon(d.icon)} ${d.label}</a>`).join('')}
            </div>
          </li>` : `
          <li><a class="nav-link ${isActive(p.href) ? 'active' : ''}" href="${p.href}">${p.label}</a></li>`).join('')}
      </ul>
      <div class="nav-actions">
        <button class="icon-btn theme-toggle" id="themeToggle" aria-label="Toggle theme">
          ${icon('sun')} ${icon('moon')}
        </button>
        <a href="/login" class="btn btn-ghost btn-sm">Login</a>
        <a href="/register" class="btn btn-sm">Sign Up</a>
        <button class="hamburger" id="hamburger" aria-label="Menu"><span></span><span></span><span></span></button>
      </div>
    </div>
  `
  const drawer = document.createElement('div')
  drawer.className = 'mobile-drawer'
  drawer.id = 'mobileDrawer'
  drawer.innerHTML = PAGES.map(p => `<a class="nav-link ${isActive(p.href) ? 'active' : ''}" href="${p.href}">${p.label}</a>`).join('') +
    `<a class="nav-link" href="/login">Login</a><a class="nav-link" href="/register">Sign Up</a>`

  const footer = document.createElement('footer')
  footer.className = 'footer'
  footer.innerHTML = `
    <div class="container">
      <div class="footer-top">
        <div class="footer-brand">
          <a href="/" class="brand">
            <span class="brand-logo">${icon('graduation')}</span>
            Scholar<span>Hub</span> Pro
          </a>
          <p>The smart scholarship management portal connecting ambitious students with life-changing funding opportunities across 500+ universities worldwide.</p>
          <form class="footer-news" id="footerNews">
            <input type="email" placeholder="Your email for scholarship alerts" aria-label="Email" />
            <button class="btn btn-sm" type="submit">Subscribe</button>
          </form>
        </div>
        <div>
          <h5>Quick Links</h5>
          <ul class="footer-links">
            <li><a href="/">Home</a></li>
            <li><a href="/scholarships">Scholarships</a></li>
            <li><a href="/apply">Apply Now</a></li>
            <li><a href="/dashboard">Dashboard</a></li>
            <li><a href="/about">About Us</a></li>
          </ul>
        </div>
        <div>
          <h5>Useful Links</h5>
          <ul class="footer-links">
            <li><a href="/faq">FAQ</a></li>
            <li><a href="/contact">Contact</a></li>
            <li><a href="/login">Login</a></li>
            <li><a href="/register">Register</a></li>
            <li><a href="#" id="privacyLink">Privacy Policy</a></li>
          </ul>
        </div>
        <div>
          <h5>Get in Touch</h5>
          <ul class="footer-links">
            <li><a href="mailto:hello@scholarhub.pro">hello@scholarhub.pro</a></li>
            <li><a href="tel:+18005550199">+1 (800) 555-0199</a></li>
            <li>221A Education Ave, Boston, MA</li>
          </ul>
          <div class="socials" style="margin-top:14px">
            <a class="social" href="#" aria-label="LinkedIn">${icon('linkedin')}</a>
            <a class="social" href="#" aria-label="Twitter">${icon('twitter')}</a>
            <a class="social" href="#" aria-label="Instagram">${icon('instagram')}</a>
            <a class="social" href="#" aria-label="YouTube">${icon('youtube')}</a>
          </div>
        </div>
      </div>
      <div class="footer-bottom">
        <p>© 2026 ScholarHub Pro. All rights reserved.</p>
        <div class="wrap">
          <a href="#" id="termsLink">Terms</a>
          <a href="#" id="privacyLink2">Privacy</a>
          <a href="/sitemap">Sitemap</a>
        </div>
      </div>
    </div>
  `

  // toast container, back-to-top, FAB chat, scroll progress, modal
  const overlays = `
    <div class="scroll-progress" id="scrollProgress"></div>
    <div class="toast-wrap" id="toastWrap"></div>
    <button class="to-top" id="toTop" aria-label="Back to top">${icon('arrowUp')}</button>
    <button class="fab" id="fabChat" aria-label="Chat support">${icon('message')}</button>
    <div class="chat-widget" id="chatWidget">
      <div class="chat-head">
        <div class="chat-avatar">${icon('sparkle')}</div>
        <div><b>ScholarHub Assistant</b><span>Online · replies instantly</span></div>
        <button class="icon-btn" id="chatClose" style="margin-left:auto;color:#fff;background:rgba(255,255,255,.2);border:none">${icon('x')}</button>
      </div>
      <div class="chat-body" id="chatBody">
        <div class="chat-msg bot">Hi there! 👋 I'm your scholarship assistant. How can I help you today?</div>
      </div>
      <form class="chat-input" id="chatForm">
        <input type="text" placeholder="Type a message…" aria-label="Message" />
        <button type="submit">${icon('send')}</button>
      </form>
    </div>
    <div class="modal-overlay" id="modalOverlay">
      <div class="modal" id="modalBox"></div>
    </div>
  `

  document.body.prepend(nav, drawer)
  // main content marker — footer after #app
  const mount = document.getElementById('app') || document.body
  mount.insertAdjacentElement('afterend', footer)
  document.body.insertAdjacentHTML('beforeend', overlays)
}

// --- Toast -----------------------------------------------------------------
export function toast(title, msg = '', type = 'info', ms = 3800) {
  const wrap = document.getElementById('toastWrap')
  if (!wrap) return
  const el = document.createElement('div')
  el.className = `toast toast-${type}`
  const ic = type === 'success' ? 'checkCircle' : type === 'error' ? 'alert' : 'bell'
  el.innerHTML = `<span class="toast-icon">${icon(ic)}</span><div class="toast-body"><b>${title}</b>${msg ? `<span>${msg}</span>` : ''}</div>`
  wrap.appendChild(el)
  setTimeout(() => { el.classList.add('out'); setTimeout(() => el.remove(), 300) }, ms)
}

// --- Modal -----------------------------------------------------------------
export function openModal(html) {
  const ov = document.getElementById('modalOverlay')
  const box = document.getElementById('modalBox')
  if (!ov || !box) return
  box.innerHTML = html
  ov.classList.add('open')
  ov.onclick = (e) => { if (e.target === ov) closeModal() }
}
export function closeModal() {
  document.getElementById('modalOverlay')?.classList.remove('open')
}

// --- Preloader -------------------------------------------------------------
function buildPreloader() {
  if (document.querySelector('.preloader')) return
  const pre = document.createElement('div')
  pre.className = 'preloader'
  pre.innerHTML = `<div><div class="pre-logo">${icon('graduation')}</div><div class="pre-spin"></div><div class="pre-text">SCHOLARHUB PRO</div></div>`
  document.body.prepend(pre)
  window.addEventListener('load', () => setTimeout(() => pre.classList.add('hide'), 500))
  // safety: hide after 2s regardless
  setTimeout(() => pre.classList.add('hide'), 2000)
}

// --- Dark mode (persisted) -------------------------------------------------
function initTheme() {
  const saved = localStorage.getItem('shp-theme')
  const sysDark = window.matchMedia('(prefers-color-scheme: dark)').matches
  const theme = saved || (sysDark ? 'dark' : 'light')
  document.documentElement.setAttribute('data-theme', theme)
}
export function toggleTheme() {
  const cur = document.documentElement.getAttribute('data-theme') || 'light'
  const next = cur === 'dark' ? 'light' : 'dark'
  document.documentElement.setAttribute('data-theme', next)
  localStorage.setItem('shp-theme', next)
}

// --- Custom cursor + trail -------------------------------------------------
function initCursor() {
  if (window.matchMedia('(pointer: coarse)').matches) return
  const dot = document.createElement('div')
  const ring = document.createElement('div')
  dot.className = 'cursor-dot'; ring.className = 'cursor-ring'
  document.body.append(dot, ring)
  let rx = 0, ry = 0, mx = 0, my = 0
  window.addEventListener('mousemove', (e) => {
    mx = e.clientX; my = e.clientY
    dot.style.transform = `translate(${mx}px, ${my}px) translate(-50%, -50%)`
    // trail
    if (Math.random() > 0.6) {
      const t = document.createElement('div')
      t.className = 'trail-dot'
      t.style.left = mx + 'px'; t.style.top = my + 'px'
      document.body.appendChild(t)
      setTimeout(() => t.remove(), 700)
    }
  })
  const loop = () => {
    rx += (mx - rx) * 0.18; ry += (my - ry) * 0.18
    ring.style.transform = `translate(${rx}px, ${ry}px) translate(-50%, -50%)`
    requestAnimationFrame(loop)
  }
  loop()
  // hover grow
  document.addEventListener('mouseover', (e) => {
    if (e.target.closest('a, button, .chip, .cat-card, input, textarea, select, .nav-link')) ring.classList.add('hover')
  })
  document.addEventListener('mouseout', (e) => {
    if (e.target.closest('a, button, .chip, .cat-card, input, textarea, select, .nav-link')) ring.classList.remove('hover')
  })
}

// --- Scroll progress + navbar + back to top --------------------------------
function initScroll() {
  const nav = document.getElementById('navbar')
  const prog = document.getElementById('scrollProgress')
  const toTop = document.getElementById('toTop')
  const onScroll = () => {
    const y = window.scrollY
    const h = document.documentElement.scrollHeight - window.innerHeight
    if (nav) nav.classList.toggle('scrolled', y > 30)
    if (prog) prog.style.width = (h > 0 ? (y / h) * 100 : 0) + '%'
    if (toTop) toTop.classList.toggle('show', y > 500)
  }
  window.addEventListener('scroll', onScroll, { passive: true })
  onScroll()
  toTop?.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }))
}

// --- Hamburger -------------------------------------------------------------
function initHamburger() {
  const ham = document.getElementById('hamburger')
  const drawer = document.getElementById('mobileDrawer')
  ham?.addEventListener('click', () => {
    ham.classList.toggle('active')
    drawer?.classList.toggle('open')
  })
  drawer?.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
    ham?.classList.remove('active'); drawer?.classList.remove('open')
  }))
}

// --- Ripple buttons --------------------------------------------------------
function initRipple() {
  document.addEventListener('click', (e) => {
    const btn = e.target.closest('.btn, .icon-btn, .page-btn, .social, .fab, .to-top')
    if (!btn) return
    const rect = btn.getBoundingClientRect()
    const r = document.createElement('span')
    const size = Math.max(rect.width, rect.height)
    r.className = 'ripple-span'
    r.style.width = r.style.height = size + 'px'
    r.style.left = (e.clientX - rect.left - size / 2) + 'px'
    r.style.top = (e.clientY - rect.top - size / 2) + 'px'
    btn.appendChild(r)
    setTimeout(() => r.remove(), 600)
  })
}

// --- Scroll reveal (IntersectionObserver) ---------------------------------
export function initReveal() {
  const els = document.querySelectorAll('.reveal, .reveal-l, .reveal-r, .reveal-s')
  if (!els.length) return
  const io = new IntersectionObserver((entries) => {
    entries.forEach(en => { if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target) } })
  }, { threshold: 0.12, rootMargin: '0px 0px -60px 0px' })
  els.forEach(el => io.observe(el))
}

// --- Animated counters -----------------------------------------------------
export function initCounters() {
  const nums = document.querySelectorAll('[data-count]')
  if (!nums.length) return
  const run = (el) => {
    const target = +el.dataset.count
    const suffix = el.dataset.suffix || ''
    const dur = 1800; const start = performance.now()
    const fmt = (n) => {
      if (target >= 1000000) return (n / 1000000).toFixed(2).replace(/\.00$/, '') + 'M'
      if (target >= 1000) return Math.round(n / 1000) + 'K'
      return Math.round(n)
    }
    const step = (now) => {
      const p = Math.min((now - start) / dur, 1)
      const eased = 1 - Math.pow(1 - p, 3)
      el.textContent = fmt(target * eased) + suffix
      if (p < 1) requestAnimationFrame(step)
      else el.textContent = fmt(target) + suffix
    }
    requestAnimationFrame(step)
  }
  const io = new IntersectionObserver((entries) => {
    entries.forEach(en => { if (en.isIntersecting) { run(en.target); io.unobserve(en.target) } })
  }, { threshold: 0.4 })
  nums.forEach(el => io.observe(el))
}

// --- Progress rings (animate conic gradient) -------------------------------
export function initRings() {
  const rings = document.querySelectorAll('.ring[data-p]')
  if (!rings.length) return
  const io = new IntersectionObserver((entries) => {
    entries.forEach(en => {
      if (!en.isIntersecting) return
      const el = en.target
      const target = +el.dataset.p
      let cur = 0
      const t = setInterval(() => {
        cur += 2
        if (cur >= target) { cur = target; clearInterval(t) }
        el.style.setProperty('--p', cur)
        const span = el.querySelector('span')
        if (span) span.textContent = cur + '%'
      }, 18)
      io.unobserve(el)
    })
  }, { threshold: 0.4 })
  rings.forEach(r => io.observe(r))
}

// --- Typing animation ------------------------------------------------------
export function typeWriter(el, words, opts = {}) {
  if (!el) return
  const { speed = 70, pause = 1600 } = opts
  let wi = 0, ci = 0, deleting = false
  const tick = () => {
    const word = words[wi]
    if (!deleting) {
      el.textContent = word.slice(0, ++ci)
      if (ci === word.length) { deleting = true; setTimeout(tick, pause); return }
    } else {
      el.textContent = word.slice(0, --ci)
      if (ci === 0) { deleting = false; wi = (wi + 1) % words.length }
    }
    setTimeout(tick, deleting ? speed / 2 : speed)
  }
  tick()
}

// --- Particles (lightweight canvas) ----------------------------------------
export function initParticles(canvas) {
  if (!canvas) return
  const ctx = canvas.getContext('2d')
  let w, h, parts = []
  const resize = () => { w = canvas.width = canvas.offsetWidth; h = canvas.height = canvas.offsetHeight }
  resize(); window.addEventListener('resize', resize)
  const N = Math.min(60, Math.floor(w / 30))
  for (let i = 0; i < N; i++) parts.push({
    x: Math.random() * w, y: Math.random() * h,
    vx: (Math.random() - 0.5) * 0.4, vy: (Math.random() - 0.5) * 0.4,
    r: Math.random() * 2 + 1,
  })
  const draw = () => {
    ctx.clearRect(0, 0, w, h)
    parts.forEach(p => {
      p.x += p.vx; p.y += p.vy
      if (p.x < 0 || p.x > w) p.vx *= -1
      if (p.y < 0 || p.y > h) p.vy *= -1
      ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
      ctx.fillStyle = 'rgba(255,255,255,.4)'; ctx.fill()
    })
    // connect lines
    for (let i = 0; i < parts.length; i++) for (let j = i + 1; j < parts.length; j++) {
      const dx = parts[i].x - parts[j].x, dy = parts[i].y - parts[j].y
      const d = Math.hypot(dx, dy)
      if (d < 120) { ctx.beginPath(); ctx.moveTo(parts[i].x, parts[i].y); ctx.lineTo(parts[j].x, parts[j].y); ctx.strokeStyle = `rgba(255,255,255,${0.12 * (1 - d / 120)})`; ctx.lineWidth = 1; ctx.stroke() }
    }
    requestAnimationFrame(draw)
  }
  draw()
}

// --- Bookmark store --------------------------------------------------------
export function getBookmarks() { return JSON.parse(localStorage.getItem('shp-bookmarks') || '[]') }
export function toggleBookmark(id) {
  const b = getBookmarks()
  const i = b.indexOf(id)
  if (i >= 0) { b.splice(i, 1); return false }
  b.push(id); return true
}
export function isBookmarked(id) { return getBookmarks().includes(id) }

// --- Chat widget -----------------------------------------------------------
function initChat() {
  const fab = document.getElementById('fabChat')
  const widget = document.getElementById('chatWidget')
  const close = document.getElementById('chatClose')
  const form = document.getElementById('chatForm')
  const body = document.getElementById('chatBody')
  fab?.addEventListener('click', () => widget?.classList.toggle('open'))
  close?.addEventListener('click', () => widget?.classList.remove('open'))
  form?.addEventListener('submit', (e) => {
    e.preventDefault()
    const inp = form.querySelector('input')
    const v = inp.value.trim(); if (!v) return
    const m = document.createElement('div'); m.className = 'chat-msg me'; m.textContent = v
    body.appendChild(m); body.scrollTop = body.scrollHeight; inp.value = ''
    setTimeout(() => {
      const replies = [
        'Great question! You can browse all scholarships on the Scholarships page and filter by country, amount and category.',
        'To apply, head to the Apply page and complete the multi-step form. Your progress is saved automatically.',
        'Deadlines appear on your dashboard calendar once you bookmark a scholarship.',
        'Our team is available 24/7 — drop a message at hello@scholarhub.pro and we\u2019ll respond within an hour.',
      ]
      const r = document.createElement('div'); r.className = 'chat-msg bot'; r.textContent = replies[Math.floor(Math.random() * replies.length)]
      body.appendChild(r); body.scrollTop = body.scrollHeight
    }, 700)
  })
}

// --- FAQ accordion (shared renderer) --------------------------------------
export function renderAccordions(container = document) {
  container.querySelectorAll('.acc-item:not([data-bound])').forEach(item => {
    item.dataset.bound = '1'
    const head = item.querySelector('.acc-head')
    const body = item.querySelector('.acc-body')
    head?.addEventListener('click', () => {
      const open = item.classList.contains('open')
      // close siblings in same group
      item.parentElement?.querySelectorAll('.acc-item').forEach(s => {
        s.classList.remove('open'); s.querySelector('.acc-body').style.maxHeight = null
      })
      if (!open) { item.classList.add('open'); body.style.maxHeight = body.scrollHeight + 'px' }
    })
  })
}

// --- Share helper ----------------------------------------------------------
export function shareLink(title, url) {
  if (navigator.share) { navigator.share({ title, url }).catch(() => {}) }
  else { navigator.clipboard?.writeText(url); toast('Link copied', 'Scholarship link copied to clipboard', 'success') }
}

// --- Bootstrap everything --------------------------------------------------
export function bootstrap(page = '') {
  initTheme()
  buildPreloader()
  injectLayout(page)
  initScroll()
  initHamburger()
  initRipple()
  initCursor()
  initChat()
  document.getElementById('themeToggle')?.addEventListener('click', toggleTheme)
  document.getElementById('footerNews')?.addEventListener('submit', (e) => {
    e.preventDefault(); e.target.reset(); toast('Subscribed!', 'You\u2019ll receive weekly scholarship alerts.', 'success')
  })
  document.getElementById('privacyLink')?.addEventListener('click', (e) => { e.preventDefault(); openModal(`<h3>Privacy Policy</h3><p style="margin:12px 0;color:var(--text-2)">ScholarHub Pro is committed to protecting your personal data. We collect only the information necessary to match you with scholarships and process applications. We never sell your data, and all information is encrypted at rest and in transit.</p><button class="btn btn-block" onclick="document.getElementById('modalOverlay').classList.remove('open')">Got it</button>`) })
  document.getElementById('termsLink')?.addEventListener('click', (e) => { e.preventDefault(); openModal(`<h3>Terms of Service</h3><p style="margin:12px 0;color:var(--text-2)">By using ScholarHub Pro you agree to provide accurate information in your applications, respect scholarship deadlines, and not misuse the platform. We reserve the right to suspend accounts that violate these terms.</p><button class="btn btn-block" onclick="document.getElementById('modalOverlay').classList.remove('open')">Understood</button>`) })
  // reveal + counters run after DOM paint
  requestAnimationFrame(() => { initReveal(); initCounters(); initRings(); renderAccordions() })
}

// expose for inline page scripts
window.SHP = { icon, toast, openModal, closeModal, toggleTheme, typeWriter, initParticles, getBookmarks, toggleBookmark, isBookmarked, renderAccordions, shareLink, initReveal, initCounters, initRings, FAQS }
