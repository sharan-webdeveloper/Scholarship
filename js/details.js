// ============================================================================
// ScholarHub Pro — Scholarship details page logic
// ============================================================================
import { bootstrap, icon, toast } from './script.js'
import { getScholarship, relatedScholarships, countryObj, categoryName, SCHOLARSHIPS } from './data.js'
import { scholarshipCard, stars, faqItem, bindCardActions, deadlineInfo } from './ui.js'

bootstrap('details')

const id = new URLSearchParams(location.search).get('id') || SCHOLARSHIPS[0].id
const s = getScholarship(id) || SCHOLARSHIPS[0]
const c = countryObj(s.country)
const dl = deadlineInfo(s.deadline)

document.getElementById('app').innerHTML = `
  <section class="detail-hero">
    <img src="${s.image}" alt="${s.uni}" />
    <div class="container">
      <div class="crumb" style="color:rgba(255,255,255,.8);margin-bottom:16px">
        <a href="/" style="color:rgba(255,255,255,.8)">Home</a> ${icon('chevronRight')}
        <a href="/scholarships" style="color:rgba(255,255,255,.8)">Scholarships</a> ${icon('chevronRight')}
        <span style="color:#fff">${s.name}</span>
      </div>
      <div class="wrap">
        <span class="chip-dark">${icon(categoryName(s.category) ? 'tag' : 'tag')} ${categoryName(s.category)}</span>
        <span class="chip-dark">${icon('book', 'btn-icon')} ${s.level}</span>
        ${s.featured ? `<span class="chip-dark" style="background:rgba(245,158,11,.25);border-color:rgba(245,158,11,.4)">${icon('zap', 'btn-icon')} Featured</span>` : ''}
      </div>
      <h1 style="margin-top:14px">${s.name}</h1>
      <p class="lead">${s.description}</p>
      <div class="uni-row">
        <div class="sc-uni-logo" style="background:${s.uniColor};width:48px;height:48px;font-size:0.9rem">${s.uniShort}</div>
        <div><b>${s.uni}</b><span>${c.name} · ${stars(s.rating)} ${s.rating} (${s.applicants.toLocaleString()} applicants)</span></div>
      </div>
    </div>
  </section>

  <div class="container">
    <div class="detail-grid">
      <div class="detail-main">
        <!-- overview -->
        <div class="detail-section reveal">
          <h3><span class="ic">${icon('sparkle')}</span> Overview</h3>
          <p style="color:var(--text-2);line-height:1.8">${s.description} The ${s.name} at ${s.uni} is one of the most competitive awards in ${c.name}, supporting outstanding ${s.level.toLowerCase()} students with full or partial funding, mentorship and a global alumni network.</p>
          <div class="wrap" style="margin-top:16px">
            ${s.tags.map(t => `<span class="badge badge-primary">${t}</span>`).join('')}
            <span class="badge badge-success">${icon('checkCircle', 'btn-icon')} Verified</span>
          </div>
        </div>

        <!-- eligibility -->
        <div class="detail-section reveal">
          <h3><span class="ic">${icon('checkCircle')}</span> Eligibility Criteria</h3>
          <ul class="checklist">
            ${s.eligibility.map(e => `<li>${icon('check')} <span>${e}</span></li>`).join('')}
          </ul>
        </div>

        <!-- benefits -->
        <div class="detail-section reveal">
          <h3><span class="ic">${icon('award')}</span> Scholarship Benefits</h3>
          <ul class="checklist">
            ${s.benefits.map(b => `<li>${icon('dollar')} <span><b style="color:var(--text)">${b.split(' ').slice(0,2).join(' ')}</b> ${b.split(' ').slice(2).join(' ')}</span></li>`).join('')}
          </ul>
        </div>

        <!-- documents -->
        <div class="detail-section reveal">
          <h3><span class="ic">${icon('file')}</span> Required Documents</h3>
          <ul class="checklist">
            ${s.documents.map(d => `<li>${icon('file')} <span>${d}</span></li>`).join('')}
          </ul>
        </div>

        <!-- timeline -->
        <div class="detail-section reveal">
          <h3><span class="ic">${icon('flag')}</span> Application Timeline</h3>
          <div class="timeline">
            ${s.timeline.map(t => `<div class="tl-item ${t.done ? 'done' : ''}"><b>${t.label}</b><span>${t.date}</span></div>`).join('')}
          </div>
        </div>

        <!-- steps -->
        <div class="detail-section reveal">
          <h3><span class="ic">${icon('compass')}</span> Application Steps</h3>
          <div class="steps">
            ${s.steps.map((st, i) => `<div class="step-item"><div class="step-num">${i + 1}</div><p>${st}</p></div>`).join('')}
          </div>
        </div>

        <!-- faqs -->
        <div class="detail-section reveal">
          <h3><span class="ic">${icon('lightbulb')}</span> FAQs</h3>
          <div class="grid" style="gap:12px">
            ${s.faqs.map((f, i) => faqItem(f, i)).join('')}
          </div>
        </div>
      </div>

      <!-- sidebar -->
      <aside class="detail-aside">
        <div class="aside-card">
          <h4>Scholarship Summary</h4>
          <div class="aside-stat"><span>Amount</span><b>${s.amountText}</b></div>
          <div class="aside-stat"><span>Deadline</span><b>${dl.abs}</b></div>
          <div class="aside-stat"><span>Time left</span><b style="color:var(--c-warning)">${dl.text}</b></div>
          <div class="aside-stat"><span>Study level</span><b>${s.level}</b></div>
          <div class="aside-stat"><span>Country</span><b>${c.name}</b></div>
          <div class="aside-stat"><span>Category</span><b>${categoryName(s.category)}</b></div>
          <div class="aside-stat"><span>Rating</span><b>${stars(s.rating)} ${s.rating}</b></div>
        </div>
        <div class="aside-apply">
          <h4>Ready to apply?</h4>
          <p>Start your application now. It takes about 15 minutes.</p>
          <a href="/apply?id=${s.id}" class="btn btn-light btn-block">${icon('rocket', 'btn-icon')} Apply Now</a>
          <div style="display:flex;gap:8px;margin-top:10px">
            <button class="btn btn-outline btn-block" id="detailBookmark">${icon('bookmark', 'btn-icon')} ${window.SHP.isBookmarked(s.id) ? 'Saved' : 'Save'}</button>
            <button class="btn btn-outline btn-block" id="detailShare">${icon('share', 'btn-icon')} Share</button>
          </div>
        </div>
        <div class="aside-card center">
          <h4>Need help?</h4>
          <p style="color:var(--text-3);font-size:0.88rem;margin-bottom:12px">Our advisors respond within 24 hours.</p>
          <a href="/contact" class="btn btn-ghost btn-block">${icon('message', 'btn-icon')} Contact Advisor</a>
        </div>
      </aside>
    </div>

    <!-- related -->
    <div class="section-sm">
      <div class="section-head" style="text-align:left;max-width:none">
        <h2>Related Scholarships</h2>
      </div>
      <div class="grid grid-auto" id="relatedGrid"></div>
    </div>
  </div>
`

// related
const related = relatedScholarships(s.id, 3)
const rg = document.getElementById('relatedGrid')
rg.innerHTML = related.map(scholarshipCard).join('')
bindCardActions(rg)

// bookmark + share on sidebar
const bkBtn = document.getElementById('detailBookmark')
bkBtn?.addEventListener('click', () => {
  const now = window.SHP.toggleBookmark(s.id)
  bkBtn.innerHTML = `${icon('bookmark', 'btn-icon')} ${now ? 'Saved' : 'Save'}`
  bkBtn.classList.toggle('saved', now)
  toast(now ? 'Bookmarked' : 'Removed', now ? `${s.name} saved to your dashboard.` : 'Removed from saved.', now ? 'success' : 'info', 2400)
})
document.getElementById('detailShare')?.addEventListener('click', () => window.SHP.shareLink(s.name, `${location.origin}/details?id=${s.id}`))

window.SHP.renderAccordions()
window.SHP.initReveal()
