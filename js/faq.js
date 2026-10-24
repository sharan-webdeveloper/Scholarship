// ============================================================================
// ScholarHub Pro — FAQ page logic (search + accordion + popular tags)
// ============================================================================
import { bootstrap, icon, toast } from './script.js'
import { FAQS } from './data.js'
import { faqItem } from './ui.js'

bootstrap('faq')

const POPULAR = ['eligibility', 'documents', 'deadline', 'free', 'apply', 'secure']

document.getElementById('app').innerHTML = `
  <div class="page-hero">
    <div class="container">
      <div class="crumb"><a href="/">Home</a> ${icon('chevronRight')} <span>FAQ</span></div>
      <h1>Frequently Asked <span class="gradient-text">Questions</span></h1>
      <p class="lead">Find quick answers to the most common questions about ScholarHub Pro. Can't find what you're looking for? <a href="/contact">Contact us</a>.</p>
    </div>
  </div>

  <section class="section-sm">
    <div class="container">
      <div class="faq-controls">
        <div class="search-box">
          ${icon('search')}
          <input class="input" id="faqSearch" type="text" placeholder="Search frequently asked questions…" />
        </div>
      </div>
      <div class="popular-tags">
        <span style="color:var(--text-3);align-self:center;font-size:0.86rem">Popular:</span>
        ${POPULAR.map(p => `<button class="chip" data-tag="${p}">${p}</button>`).join('')}
      </div>

      <div class="grid" style="max-width:820px;margin:0 auto;gap:14px" id="faqList">
        ${FAQS.map((f, i) => faqItem(f, i)).join('')}
      </div>
      <div id="faqEmpty" class="empty-state hidden" style="max-width:820px;margin:0 auto">
        ${icon('search')}
        <h3>No matching questions</h3>
        <p>Try a different search term or <a href="/contact">contact our team</a>.</p>
      </div>

      <!-- still need help -->
      <div class="card-base" style="max-width:820px;margin:var(--sp-5) auto 0;padding:var(--sp-4);text-align:center">
        <div class="feature-icon" style="margin:0 auto 12px">${icon('message')}</div>
        <h3>Still have questions?</h3>
        <p style="color:var(--text-3);margin:8px 0 18px">Our support team is available 24/7 to help you with anything.</p>
        <div class="wrap" style="justify-content:center">
          <a href="/contact" class="btn">${icon('mail', 'btn-icon')} Contact Support</a>
          <button class="btn btn-ghost" id="chatHelp">${icon('message', 'btn-icon')} Live Chat</button>
        </div>
      </div>
    </div>
  </section>
`

const list = document.getElementById('faqList')
const empty = document.getElementById('faqEmpty')
const search = document.getElementById('faqSearch')

function filterFAQ(q) {
  q = q.toLowerCase().trim()
  let shown = 0
  list.querySelectorAll('.acc-item').forEach(item => {
    const match = !q || item.dataset.q.includes(q)
    item.style.display = match ? '' : 'none'
    if (match) shown++
  })
  empty.classList.toggle('hidden', shown > 0)
}

search.addEventListener('input', () => filterFAQ(search.value))
document.querySelectorAll('[data-tag]').forEach(t => t.addEventListener('click', () => {
  search.value = t.dataset.tag; filterFAQ(t.dataset.tag)
  document.querySelectorAll('[data-tag]').forEach(x => x.classList.remove('active'))
  t.classList.add('active')
}))
document.getElementById('chatHelp')?.addEventListener('click', () => {
  document.getElementById('fabChat')?.click()
  toast('Chat opened', 'Type your question below.', 'info')
})

window.SHP.renderAccordions()
