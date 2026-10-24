// ============================================================================
// ScholarHub Pro — Home page logic
// ============================================================================
import { bootstrap, icon, typeWriter, initParticles, toast } from './script.js'
import {
  IMAGES, CATEGORIES, SCHOLARSHIPS, UNIVERSITIES, TESTIMONIALS,
  SUCCESS_STORIES, STATS, FAQS,
} from './data.js'
import { scholarshipCard, categoryCard, universityCard, testimonialCard, faqItem, bindCardActions } from './ui.js'

bootstrap('home')

document.getElementById('app').innerHTML = `
  <!-- HERO -->
  <section class="hero">
    <div class="hero-bg"><img src="${IMAGES.heroCampus}" alt="University campus" /></div>
    <div class="float-shape hero-shape-1"></div>
    <div class="float-shape hero-shape-2"></div>
    <div class="float-shape hero-shape-3"></div>
    <canvas id="particles"></canvas>
    <div class="container">
      <div class="hero-grid">
        <div class="hero-copy">
          <span class="eyebrow" style="background:rgba(255,255,255,.15);color:#fff;border-color:rgba(255,255,255,.25)">${icon('sparkle', 'btn-icon')} 20,000+ Scholarships · 500+ Universities</span>
          <h1 style="margin-top:18px">Your Gateway to <span class="anim-grad typed-line" id="typedText"></span><span class="type-cursor">&nbsp;</span></h1>
          <p class="lead">Discover, compare and apply to fully-funded scholarships from the world's best universities — all in one beautifully simple portal built for ambitious students.</p>
          <div class="hero-cta">
            <a href="/scholarships" class="btn btn-lg">${icon('search', 'btn-icon')} Explore Scholarships</a>
            <a href="/apply" class="btn btn-outline btn-lg">${icon('rocket', 'btn-icon')} Apply Now</a>
          </div>
          <div class="hero-stats">
            ${STATS.slice(0, 3).map(s => `<div class="hero-stat"><b data-count="${s.value}" data-suffix="${s.suffix}">0</b><span>${s.label}</span></div>`).join('')}
          </div>
        </div>
        <div class="hero-search">
          <div class="hs-title">${icon('search', 'btn-icon')} Find your scholarship in seconds</div>
          <div class="input-group">
            <input class="input" id="heroSearch" type="text" placeholder="Search by university, country or subject…" autocomplete="off" />
          </div>
          <div class="suggestions" id="heroSuggestions"></div>
          <button class="btn btn-block" id="heroSearchBtn" style="margin-top:12px">${icon('search', 'btn-icon')} Search Scholarships</button>
          <div class="wrap" style="margin-top:14px;justify-content:center">
            <span style="color:rgba(255,255,255,.7);font-size:0.82rem">Popular:</span>
            <a class="chip-dark" href="/scholarships?cat=merit">Merit</a>
            <a class="chip-dark" href="/scholarships?cat=international">International</a>
            <a class="chip-dark" href="/scholarships?cat=women">Women in Tech</a>
          </div>
        </div>
      </div>
    </div>
    <div class="scroll-ind"><div class="mouse"></div><span>Scroll</span></div>
  </section>

  <!-- STATS -->
  <section class="section-sm">
    <div class="container">
      <div class="grid grid-4 reveal">
        ${STATS.map((s, i) => `<div class="stat-card" data-delay="${i + 1}">
          <div class="stat-icon">${icon(s.icon)}</div>
          <div class="stat-value" data-count="${s.value}" data-suffix="${s.suffix}">0</div>
          <div class="stat-label">${s.label}</div>
        </div>`).join('')}
      </div>
    </div>
  </section>

  <!-- SUCCESS STORIES CAROUSEL -->
  <section class="section">
    <div class="container">
      <div class="section-head">
        <span class="eyebrow">${icon('trophy', 'btn-icon')} Success Stories</span>
        <h2>Real Students, <span class="gradient-text">Real Triumphs</span></h2>
        <p>Meet scholars who turned ambition into achievement with ScholarHub Pro.</p>
        <div class="head-line"></div>
      </div>
      <div class="carousel reveal" id="storyCarousel">
        <div class="carousel-track" id="storyTrack">
          ${SUCCESS_STORIES.map(s => `<div class="carousel-slide">
            <img src="${s.image}" alt="${s.name}" />
            <div class="carousel-content">
              <span class="badge badge-gold">${icon('award', 'btn-icon')} ${s.award} · ${s.amount}</span>
              <h3>${s.quote}</h3>
              <div class="carousel-author">
                <img src="${s.avatar}" alt="${s.name}" />
                <div><b>${s.name}</b><span>Funded through ScholarHub Pro</span></div>
              </div>
            </div>
          </div>`).join('')}
        </div>
        <button class="carousel-nav prev" id="storyPrev" aria-label="Previous">${icon('chevronLeft')}</button>
        <button class="carousel-nav next" id="storyNext" aria-label="Next">${icon('chevronRight')}</button>
        <div class="carousel-dots" id="storyDots"></div>
      </div>
    </div>
  </section>

  <!-- CATEGORIES -->
  <section class="section" style="background:var(--bg-2)">
    <div class="container">
      <div class="section-head">
        <span class="eyebrow">${icon('grid', 'btn-icon')} Categories</span>
        <h2>Explore by <span class="gradient-text">Category</span></h2>
        <p>Find scholarships tailored to your field, background and goals.</p>
        <div class="head-line"></div>
      </div>
      <div class="grid grid-4">
        ${CATEGORIES.map(c => `<div data-delay="${CATEGORIES.indexOf(c) % 4 + 1}">${categoryCard(c)}</div>`).join('')}
      </div>
    </div>
  </section>

  <!-- LATEST SCHOLARSHIPS -->
  <section class="section">
    <div class="container">
      <div class="between" style="margin-bottom:var(--sp-4)">
        <div>
          <span class="eyebrow">${icon('zap', 'btn-icon')} Fresh Opportunities</span>
          <h2 style="margin-top:12px">Latest <span class="gradient-text">Scholarships</span></h2>
        </div>
        <a href="/scholarships" class="btn btn-ghost">View all ${icon('arrowRight', 'btn-icon')}</a>
      </div>
      <div class="grid grid-auto" id="latestGrid"></div>
    </div>
  </section>

  <!-- FEATURED UNIVERSITIES -->
  <section class="section" style="background:var(--bg-2)">
    <div class="container">
      <div class="section-head">
        <span class="eyebrow">${icon('building', 'btn-icon')} Partners</span>
        <h2>Featured <span class="gradient-text">Universities</span></h2>
        <p>Scholarships from the world's most prestigious institutions.</p>
        <div class="head-line"></div>
      </div>
      <div class="grid grid-4">
        ${UNIVERSITIES.slice(0, 8).map((u, i) => `<div data-delay="${i % 4 + 1}">${universityCard(u)}</div>`).join('')}
      </div>
    </div>
  </section>

  <!-- TESTIMONIALS -->
  <section class="section">
    <div class="container">
      <div class="section-head">
        <span class="eyebrow">${icon('heart', 'btn-icon')} Testimonials</span>
        <h2>What Our <span class="gradient-text">Scholars Say</span></h2>
        <p>Thousands of students have found their path through ScholarHub Pro.</p>
        <div class="head-line"></div>
      </div>
      <div class="grid grid-3">
        ${TESTIMONIALS.slice(0, 6).map((t, i) => `<div data-delay="${i % 3 + 1}">${testimonialCard(t)}</div>`).join('')}
      </div>
    </div>
  </section>

  <!-- FAQ teaser -->
  <section class="section" style="background:var(--bg-2)">
    <div class="container">
      <div class="section-head">
        <span class="eyebrow">${icon('lightbulb', 'btn-icon')} FAQ</span>
        <h2>Frequently Asked <span class="gradient-text">Questions</span></h2>
        <p>Everything you need to know before you start.</p>
        <div class="head-line"></div>
      </div>
      <div class="grid" style="max-width:820px;margin:0 auto;gap:14px" id="homeFaq">
        ${FAQS.slice(0, 5).map((f, i) => faqItem(f, i)).join('')}
      </div>
      <div class="center" style="margin-top:var(--sp-4)">
        <a href="/faq" class="btn btn-ghost">See all FAQs ${icon('arrowRight', 'btn-icon')}</a>
      </div>
    </div>
  </section>

  <!-- CTA -->
  <section class="section">
    <div class="container">
      <div class="cta-band reveal">
        <img src="${IMAGES.ctaBg}" alt="" />
        <h2>Ready to Fund Your Future?</h2>
        <p>Join over a million students who've found scholarships through ScholarHub Pro. It's free, fast and built for you.</p>
        <div class="wrap" style="justify-content:center">
          <a href="/register" class="btn btn-light btn-lg">Create Free Account</a>
          <a href="/scholarships" class="btn btn-outline btn-lg">Browse Scholarships</a>
        </div>
      </div>
    </div>
  </section>

  <!-- NEWSLETTER -->
  <section class="section-sm">
    <div class="container">
      <div class="news-card reveal">
        <h3>Never Miss a Scholarship</h3>
        <p>Get curated scholarship matches delivered to your inbox every week.</p>
        <form class="news-form" id="newsForm">
          <input type="email" placeholder="Enter your email address" required aria-label="Email" />
          <button type="submit" class="btn">Subscribe</button>
        </form>
      </div>
    </div>
  </section>
`

// typing animation
typeWriter(document.getElementById('typedText'), ['Global Scholarships.', 'Fully Funded Dreams.', 'Your Bright Future.', 'Endless Opportunities.'])

// particles
initParticles(document.getElementById('particles'))

// hero search suggestions
const heroSearch = document.getElementById('heroSearch')
const sugg = document.getElementById('heroSuggestions')
heroSearch?.addEventListener('input', () => {
  const q = heroSearch.value.trim().toLowerCase()
  if (!q) { sugg.classList.remove('open'); return }
  const matches = SCHOLARSHIPS.filter(s => s.name.toLowerCase().includes(q) || s.uni.toLowerCase().includes(q) || s.country.toLowerCase().includes(q)).slice(0, 5)
  if (!matches.length) { sugg.classList.remove('open'); return }
  sugg.innerHTML = matches.map(s => `<a href="/details?id=${s.id}">${icon('search')} ${s.name} <span style="color:var(--text-3);margin-left:auto;font-size:0.8rem">${s.uniShort}</span></a>`).join('')
  sugg.classList.add('open')
})
heroSearch?.addEventListener('blur', () => setTimeout(() => sugg.classList.remove('open'), 200))
document.getElementById('heroSearchBtn')?.addEventListener('click', () => {
  const v = heroSearch.value.trim()
  if (v) location.href = `/scholarships?q=${encodeURIComponent(v)}`
  else location.href = '/scholarships'
})

// latest scholarships (featured + first few)
const latest = SCHOLARSHIPS.filter(s => s.featured).concat(SCHOLARSHIPS.filter(s => !s.featured)).slice(0, 6)
const lg = document.getElementById('latestGrid')
lg.innerHTML = latest.map(scholarshipCard).join('')
bindCardActions(lg)

// success stories carousel
let storyIdx = 0
const track = document.getElementById('storyTrack')
const dotsBox = document.getElementById('storyDots')
const total = SUCCESS_STORIES.length
dotsBox.innerHTML = SUCCESS_STORIES.map((_, i) => `<div class="carousel-dot ${i === 0 ? 'active' : ''}" data-i="${i}"></div>`).join('')
function goStory(i) {
  storyIdx = (i + total) % total
  track.style.transform = `translateX(-${storyIdx * 100}%)`
  dotsBox.querySelectorAll('.carousel-dot').forEach((d, di) => d.classList.toggle('active', di === storyIdx))
}
document.getElementById('storyPrev').addEventListener('click', () => goStory(storyIdx - 1))
document.getElementById('storyNext').addEventListener('click', () => goStory(storyIdx + 1))
dotsBox.querySelectorAll('.carousel-dot').forEach(d => d.addEventListener('click', () => goStory(+d.dataset.i)))
let storyTimer = setInterval(() => goStory(storyIdx + 1), 5500)
document.getElementById('storyCarousel').addEventListener('mouseenter', () => clearInterval(storyTimer))
document.getElementById('storyCarousel').addEventListener('mouseleave', () => { storyTimer = setInterval(() => goStory(storyIdx + 1), 5500) })

// newsletter
document.getElementById('newsForm')?.addEventListener('submit', (e) => {
  e.preventDefault(); e.target.reset(); toast('Subscribed!', 'Check your inbox for weekly scholarship alerts.', 'success')
})

window.SHP.renderAccordions()
window.SHP.initReveal()
window.SHP.initCounters()
