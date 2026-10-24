// ============================================================================
// ScholarHub Pro — Shared UI helpers (card rendering, star ratings, etc.)
// ============================================================================
import { icon } from './script.js'
import { countryObj, categoryName, CATEGORIES, COUNTRIES } from './data.js'

// format deadline -> "X days left" or absolute
export function deadlineInfo(dateStr) {
  const d = new Date(dateStr)
  const now = new Date()
  const days = Math.ceil((d - now) / 86400000)
  const abs = d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
  if (days < 0) return { text: 'Closed', cls: 'badge-error', abs }
  if (days <= 30) return { text: `${days} days left`, cls: 'badge-warning', abs }
  return { text: abs, cls: 'badge-primary', abs }
}

export function stars(rating) {
  let s = ''
  for (let i = 1; i <= 5; i++) s += i <= Math.round(rating) ? icon('star') : icon('starOutline')
  return `<span class="stars">${s}</span>`
}

// full scholarship card (grid or list)
export function scholarshipCard(s) {
  const c = countryObj(s.country)
  const dl = deadlineInfo(s.deadline)
  const saved = window.SHP.isBookmarked(s.id)
  const featured = s.featured ? `<span class="sc-badge badge badge-gold">${icon('zap', 'btn-icon')} Featured</span>` : ''
  return `
  <article class="scholar-card reveal-s" data-id="${s.id}" data-amount="${s.amount}" data-country="${s.country}" data-category="${s.category}" data-deadline="${s.deadline}" data-rating="${s.rating}">
    <div class="sc-media">
      ${featured}
      <button class="sc-bookmark ${saved ? 'saved' : ''}" data-bookmark="${s.id}" aria-label="Bookmark">${icon('bookmark')}</button>
      <img src="${s.image}" alt="${s.name}" loading="lazy" />
      <span class="sc-amount">${s.amountText}</span>
    </div>
    <div class="sc-body">
      <div class="sc-uni">
        <div class="sc-uni-logo" style="background:${s.uniColor}">${s.uniShort}</div>
        <div>
          <div class="sc-uni-name">${s.uni}</div>
          <div class="stars" style="margin-top:2px">${stars(s.rating)}<span style="color:var(--text-3);font-size:0.78rem;margin-left:4px">${s.rating}</span></div>
        </div>
      </div>
      <h3 class="sc-title"><a href="/details?id=${s.id}" style="color:inherit">${s.name}</a></h3>
      <div class="sc-meta">
        <span class="sc-meta-item">${icon('mapPin', 'btn-icon')} ${c.name}</span>
        <span class="sc-meta-item">${icon('book', 'btn-icon')} ${s.level}</span>
        <span class="sc-meta-item">${icon('users', 'btn-icon')} ${s.applicants.toLocaleString()}</span>
      </div>
      <p class="sc-eligibility">${s.eligibility[0]}</p>
      <div class="wrap">${s.tags.map(t => `<span class="tag">${t}</span>`).join('')}</div>
      <div class="sc-footer">
        <span class="sc-deadline">${icon('clock', 'btn-icon')} <span class="${dl.cls} badge" style="padding:3px 8px">${dl.text}</span></span>
        <div class="sc-actions">
          <a href="/details?id=${s.id}" class="icon-btn" aria-label="Details">${icon('eye')}</a>
          <button class="icon-btn" data-share="${s.id}" aria-label="Share">${icon('share')}</button>
          <a href="/apply?id=${s.id}" class="btn btn-sm" style="padding:8px 16px">Apply</a>
        </div>
      </div>
    </div>
  </article>`
}

export function categoryCard(cat) {
  const count = 0 // placeholder, set by caller if needed
  return `
  <a class="cat-card reveal-s" href="/scholarships?cat=${cat.id}" data-delay="1">
    <div class="cat-icon" style="background:linear-gradient(135deg, ${cat.color}, ${cat.color}cc)">${icon(cat.icon)}</div>
    <h4>${cat.name}</h4>
    <span>Browse scholarships</span>
  </a>`
}

export function universityCard(u) {
  const c = countryObj(u.country)
  return `
  <a class="uni-card reveal-s" href="/scholarships?country=${u.country}" data-delay="1">
    <img src="${u.image}" alt="${u.name}" loading="lazy" />
    <div class="uni-info">
      <h4>${u.name}</h4>
      <div class="wrap">
        <span class="chip-dark">${icon('mapPin', 'btn-icon')} ${c.name}</span>
        <span class="chip-dark">${icon('book', 'btn-icon')} ${u.programs} programs</span>
        <span class="chip-dark">${stars(u.rating)}</span>
      </div>
    </div>
  </a>`
}

export function testimonialCard(t) {
  const st = Array(t.rating).fill(icon('star')).join('')
  return `
  <div class="tst-card reveal-s" data-delay="1">
    <div class="tst-stars">${st}</div>
    <p class="tst-text">"${t.text}"</p>
    <div class="tst-author">
      <img src="${t.avatar}" alt="${t.name}" loading="lazy" />
      <div><b>${t.name}</b><span>${t.role} · ${t.uni}</span></div>
    </div>
  </div>`
}

export function faqItem(f, i = 0) {
  return `
  <div class="acc-item ${i === 0 ? 'open' : ''}" data-q="${f.q.toLowerCase()}">
    <div class="acc-head">${f.q}<span class="acc-icon">${icon('chevronDown')}</span></div>
    <div class="acc-body"><div class="acc-body-inner">${f.a}</div></div>
  </div>`
}

// bind bookmark + share clicks (delegated)
export function bindCardActions(container) {
  container.addEventListener('click', async (e) => {
    const bk = e.target.closest('[data-bookmark]')
    if (bk) {
      e.preventDefault()
      const id = bk.dataset.bookmark
      const nowSaved = !bk.classList.contains('saved')
      try {
        if (nowSaved) await api.post(`/bookmarks/${id}`, {})
        else await api.delete(`/bookmarks/${id}`)
        bk.classList.toggle('saved', nowSaved)
        const card = bk.closest('.scholar-card')
        if (card) card.dataset.saved = nowSaved ? '1' : '0'
        window.SHP.toast(nowSaved ? 'Bookmarked' : 'Removed', nowSaved ? 'Saved to your dashboard.' : 'Removed from saved.', nowSaved ? 'success' : 'info', 2200)
        if (nowSaved) { bk.style.transform = 'scale(1.3)'; setTimeout(() => bk.style.transform = '', 200) }
      } catch (err) {
        window.SHP.toast('Sign in required', err.message, 'error', 3000)
      }
      return
    }
    const sh = e.target.closest('[data-share]')
    if (sh) {
      e.preventDefault()
      const id = sh.dataset.share
      window.SHP.shareLink('ScholarHub Scholarship', `${location.origin}/details?id=${id}`)
    }
  })
}
