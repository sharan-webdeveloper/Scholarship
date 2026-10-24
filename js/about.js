// ============================================================================
// ScholarHub Pro — About page logic
// ============================================================================
import { bootstrap, icon } from './script.js'
import { IMAGES, TEAM, OFFICE_GALLERY, COMPANY_TIMELINE, PARTNERS, STATS } from './data.js'

bootstrap('about')

document.getElementById('app').innerHTML = `
  <div class="page-hero">
    <div class="container">
      <div class="crumb"><a href="/">Home</a> ${icon('chevronRight')} <span>About</span></div>
      <h1>Empowering Students, <span class="gradient-text">One Scholarship at a Time</span></h1>
      <p class="lead">ScholarHub Pro was born from a simple belief: talent is everywhere, but opportunity is not. We exist to bridge that gap — connecting ambitious students with life-changing funding across the globe.</p>
    </div>
  </div>

  <!-- Story -->
  <section class="section">
    <div class="container">
      <div class="story-grid">
        <div class="story-img reveal-l"><img src="${IMAGES.gradConfetti}" alt="Graduates celebrating" /></div>
        <div class="reveal-r">
          <span class="eyebrow">${icon('book', 'btn-icon')} Our Story</span>
          <h2 style="margin:14px 0">From a Dorm Room to a <span class="gradient-text">Global Platform</span></h2>
          <p style="margin-bottom:16px">In 2018, our founder Eleanor watched brilliant classmates abandon their dream universities because they couldn't afford them. The information was scattered, the deadlines were missed, and the process was broken.</p>
          <p style="margin-bottom:16px">So we built ScholarHub Pro — one place to discover, track and apply to every scholarship that matters. Today, over a million students rely on us, and 500+ universities trust us to find their next generation of talent.</p>
          <div class="wrap" style="margin-top:20px">
            ${STATS.slice(0, 3).map(s => `<div class="stat-card" style="flex:1;min-width:140px"><div class="stat-value" data-count="${s.value}" data-suffix="${s.suffix}">0</div><div class="stat-label">${s.label}</div></div>`).join('')}
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- Mission & Vision -->
  <section class="section" style="background:var(--bg-2)">
    <div class="container">
      <div class="mv-grid">
        <div class="mv-card reveal-l">
          <div class="mv-icon">${icon('target')}</div>
          <h3>Our Mission</h3>
          <p style="margin-top:10px">To democratize access to higher education by making every scholarship discoverable, every deadline trackable, and every application achievable — regardless of a student's background or geography.</p>
        </div>
        <div class="mv-card reveal-r">
          <div class="mv-icon">${icon('compass')}</div>
          <h3>Our Vision</h3>
          <p style="margin-top:10px">A world where financial barriers never decide who gets to learn. Where the next Nobel laureate, cure-discoverer or moon-lander is found not by wealth, but by talent and determination.</p>
        </div>
      </div>
    </div>
  </section>

  <!-- Timeline -->
  <section class="section">
    <div class="container">
      <div class="section-head">
        <span class="eyebrow">${icon('flag', 'btn-icon')} Journey</span>
        <h2>Our <span class="gradient-text">Timeline</span></h2>
        <p>Milestones that shaped ScholarHub Pro into what it is today.</p>
        <div class="head-line"></div>
      </div>
      <div class="c-timeline reveal">
        ${COMPANY_TIMELINE.map(t => `<div class="c-tl-item">
          <div class="c-tl-year">${t.year}</div>
          <h4>${t.title}</h4>
          <p>${t.text}</p>
        </div>`).join('')}
      </div>
    </div>
  </section>

  <!-- Team -->
  <section class="section" style="background:var(--bg-2)">
    <div class="container">
      <div class="section-head">
        <span class="eyebrow">${icon('users', 'btn-icon')} Team</span>
        <h2>Meet Our <span class="gradient-text">Team</span></h2>
        <p>The passionate people behind ScholarHub Pro.</p>
        <div class="head-line"></div>
      </div>
      <div class="grid grid-3">
        ${TEAM.map((m, i) => `<div data-delay="${i % 3 + 1}">
          <div class="team-card reveal-s">
            <div class="team-photo">
              <img src="${m.avatar}" alt="${m.name}" />
              <div class="team-social">
                <a href="#" aria-label="LinkedIn">${icon('linkedin')}</a>
                <a href="#" aria-label="Twitter">${icon('twitter')}</a>
                <a href="#" aria-label="Email">${icon('mail')}</a>
              </div>
            </div>
            <div class="team-info"><b>${m.name}</b><span>${m.role}</span></div>
          </div>
        </div>`).join('')}
      </div>
    </div>
  </section>

  <!-- Office gallery -->
  <section class="section">
    <div class="container">
      <div class="section-head">
        <span class="eyebrow">${icon('building', 'btn-icon')} Office</span>
        <h2>Our <span class="gradient-text">Workspace</span></h2>
        <p>Where the magic happens — our Boston headquarters.</p>
        <div class="head-line"></div>
      </div>
      <div class="gallery-grid reveal">
        ${OFFICE_GALLERY.map((g, i) => `<div class="gallery-item ${i === 0 ? 'wide' : ''} ${i === 3 ? 'tall' : ''}"><img src="${g}" alt="Office" loading="lazy" /></div>`).join('')}
      </div>
    </div>
  </section>

  <!-- Achievements / stats -->
  <section class="section" style="background:var(--bg-2)">
    <div class="container">
      <div class="section-head">
        <span class="eyebrow">${icon('award', 'btn-icon')} Impact</span>
        <h2>Our <span class="gradient-text">Achievements</span></h2>
        <p>Numbers that tell our story of impact.</p>
        <div class="head-line"></div>
      </div>
      <div class="grid grid-4 reveal">
        ${STATS.map((s, i) => `<div class="stat-card" data-delay="${i + 1}">
          <div class="stat-icon">${icon(s.icon)}</div>
          <div class="stat-value" data-count="${s.value}" data-suffix="${s.suffix}">0</div>
          <div class="stat-label">${s.label}</div>
        </div>`).join('')}
      </div>
    </div>
  </section>

  <!-- Partners marquee -->
  <section class="section-sm">
    <div class="container">
      <div class="section-head">
        <span class="eyebrow">${icon('shield', 'btn-icon')} Partners</span>
        <h2>Trusted by <span class="gradient-text">Leading Universities</span></h2>
        <div class="head-line"></div>
      </div>
      <div class="marquee reveal">
        <div class="marquee-track">
          ${[...PARTNERS, ...PARTNERS].map(p => `<div class="marquee-item">${p}</div>`).join('')}
        </div>
      </div>
    </div>
  </section>
`

window.SHP.initReveal()
window.SHP.initCounters()
