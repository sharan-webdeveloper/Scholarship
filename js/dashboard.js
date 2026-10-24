// ============================================================================
// ScholarHub Pro — Student Dashboard
// ============================================================================
import { bootstrap, icon, toast } from './script.js'
import { SCHOLARSHIPS, getScholarship, countryObj } from './data.js'
import { scholarshipCard, stars, bindCardActions } from './ui.js'
import { api } from './api.js'

bootstrap('dashboard')

// mock data
const applications = [
  { id: SCHOLARSHIPS[0].id, name: SCHOLARSHIPS[0].name, uni: SCHOLARSHIPS[0].uni, date: '2026-07-12', status: 'review' },
  { id: SCHOLARSHIPS[2].id, name: SCHOLARSHIPS[2].name, uni: SCHOLARSHIPS[2].uni, date: '2026-07-03', status: 'approved' },
  { id: SCHOLARSHIPS[3].id, name: SCHOLARSHIPS[3].name, uni: SCHOLARSHIPS[3].uni, date: '2026-06-28', status: 'pending' },
  { id: SCHOLARSHIPS[4].id, name: SCHOLARSHIPS[4].name, uni: SCHOLARSHIPS[4].uni, date: '2026-06-15', status: 'review' },
  { id: SCHOLARSHIPS[8].id, name: SCHOLARSHIPS[8].name, uni: SCHOLARSHIPS[8].uni, date: '2026-05-20', status: 'rejected' },
]
const savedIds = window.SHP.getBookmarks()
const saved = savedIds.length ? savedIds.map(getScholarship).filter(Boolean) : SCHOLARSHIPS.slice(0, 3)
const notifications = [
  { icon: 'checkCircle', color: '#10B981', title: 'Application under review', desc: 'Global Excellence Merit Scholarship', time: '2h ago' },
  { icon: 'bell', color: '#2563EB', title: 'New scholarship match', desc: 'Russell Group Dean\u2019s Award fits your profile', time: '5h ago' },
  { icon: 'clock', color: '#F59E0B', title: 'Deadline approaching', desc: 'Women in Technology Scholarship — 12 days left', time: '1d ago' },
  { icon: 'award', color: '#EC4899', title: 'Achievement unlocked', desc: 'You applied to 5 scholarships this month!', time: '2d ago' },
]
const messages = [
  { name: 'Dr. Eleanor Vance', text: 'Your essay draft looks strong. Let\u2019s refine the conclusion.', avatar: SCHOLARSHIPS[0].image, unread: true },
  { name: 'MIT Admissions', text: 'We\u2019ve received your STEM Fellowship application.', avatar: SCHOLARSHIPS[1].image, unread: true },
  { name: 'ScholarHub Team', text: 'Welcome to your new dashboard, Aarav!', avatar: SCHOLARSHIPS[2].image, unread: false },
]
const achievements = [
  { icon: 'rocket', name: 'First Apply', desc: '1 application', unlocked: true },
  { icon: 'bookmark', name: 'Collector', desc: '5 saved', unlocked: true },
  { icon: 'zap', name: 'Streak', desc: '7-day active', unlocked: true },
  { icon: 'target', name: 'Sharpshooter', desc: '3 approved', unlocked: false },
  { icon: 'trophy', name: 'Champion', desc: 'Win a scholarship', unlocked: false },
  { icon: 'star', name: 'Top 1%', desc: 'Elite tier', unlocked: false },
]
const chartData = [
  { label: 'Jan', val: 40 }, { label: 'Feb', val: 65 }, { label: 'Mar', val: 50 },
  { label: 'Apr', val: 80 }, { label: 'May', val: 70 }, { label: 'Jun', val: 95 },
  { label: 'Jul', val: 100 },
]

document.getElementById('app').innerHTML = `
  <div class="page-hero" style="padding-bottom:var(--sp-3)">
    <div class="container">
      <div class="crumb"><a href="/">Home</a> ${icon('chevronRight')} <span>Dashboard</span></div>
    </div>
  </div>

  <section class="section-sm" style="padding-top:0">
    <div class="container">
      <div class="dash-layout">
        <!-- sidebar -->
        <aside class="dash-side">
          <div class="dash-profile">
            <img src="https://images.pexels.com/photos/38197025/pexels-photo-38197025.jpeg?auto=compress&cs=tinysrgb&h=300&w=300" alt="Student" />
            <b>Loading profile…</b>
            <span>Loading profile…</span>
          </div>
          <nav class="dash-nav" id="dashNav">
            <a href="#overview" class="active" data-tab="overview">${icon('layout')} Overview</a>
            <a href="#applications" data-tab="applications">${icon('file')} Applications <span class="dn-badge">${applications.length}</span></a>
            <a href="#saved" data-tab="saved">${icon('bookmark')} Saved</a>
            <a href="#deadlines" data-tab="deadlines">${icon('calendar')} Deadlines</a>
            <a href="#messages" data-tab="messages">${icon('message')} Messages <span class="dn-badge">2</span></a>
            <a href="#achievements" data-tab="achievements">${icon('trophy')} Achievements</a>
            <a href="#settings" data-tab="settings">${icon('settings')} Settings</a>
            <a href="/login" style="margin-top:8px;color:var(--c-error)">${icon('logout')} Logout</a>
          </nav>
        </aside>

        <!-- main -->
        <div class="dash-main">
          <div class="dash-greeting">
            <div>
              <h2>Welcome back!</h2>
              <p>Loading your applications and deadlines…</p>
            </div>
            <a href="/apply" class="btn">${icon('rocket', 'btn-icon')} New Application</a>
          </div>

          <!-- stats -->
          <div class="dash-stats reveal">
            <div class="dash-stat">
              <div class="ds-icon" style="background:var(--grad-primary)">${icon('file')}</div>
              <b>${applications.length}</b><span>Applications</span>
              <span class="ds-trend up">${icon('trending')} +2</span>
            </div>
            <div class="dash-stat">
              <div class="ds-icon" style="background:linear-gradient(135deg,#10B981,#059669)">${icon('checkCircle')}</div>
              <b>1</b><span>Approved</span>
              <span class="ds-trend up">${icon('trending')} +1</span>
            </div>
            <div class="dash-stat">
              <div class="ds-icon" style="background:linear-gradient(135deg,#F59E0B,#D97706)">${icon('bookmark')}</div>
              <b>${saved.length}</b><span>Saved</span>
              <span class="ds-trend up">${icon('trending')} +3</span>
            </div>
            <div class="dash-stat">
              <div class="ds-icon" style="background:linear-gradient(135deg,#EC4899,#DB2777)">${icon('award')}</div>
              <b>$182K</b><span>Total Funding</span>
              <span class="ds-trend up">${icon('trending')} +$45K</span>
            </div>
          </div>

          <!-- charts + rings -->
          <div class="dash-grid">
            <div class="dash-card reveal">
              <div class="dash-card-head"><h3><span class="ic">${icon('trending')}</span> Application Activity</h3></div>
              <div class="chart" id="activityChart"></div>
            </div>
            <div class="dash-card reveal" style="display:flex;flex-direction:column;align-items:center;justify-content:center;gap:var(--sp-2)">
              <h3 style="text-align:center">Profile Completion</h3>
              <div class="ring" data-p="78" style="--size:140px"><span>0%</span></div>
              <p style="text-align:center;color:var(--text-3);font-size:0.86rem">Add your photo and documents to reach 100%.</p>
              <a href="#settings" class="btn btn-ghost btn-sm" data-tab-link="settings">Complete profile</a>
            </div>
          </div>

          <!-- progress rings row -->
          <div class="dash-card reveal">
            <div class="dash-card-head"><h3><span class="ic">${icon('target')}</span> Scholarship Progress</h3></div>
            <div class="grid grid-3" style="gap:var(--sp-2)">
              <div style="text-align:center"><div class="ring" data-p="65" style="--size:110px;margin:0 auto"><span>0%</span></div><p style="margin-top:8px;font-size:0.85rem;color:var(--text-2)"><b>Global Excellence</b></p></div>
              <div style="text-align:center"><div class="ring" data-p="40" style="--size:110px;margin:0 auto"><span>0%</span></div><p style="margin-top:8px;font-size:0.85rem;color:var(--text-2)"><b>Women in Tech</b></p></div>
              <div style="text-align:center"><div class="ring" data-p="90" style="--size:110px;margin:0 auto"><span>0%</span></div><p style="margin-top:8px;font-size:0.85rem;color:var(--text-2)"><b>Commonwealth</b></p></div>
            </div>
          </div>

          <!-- applications table -->
          <div class="dash-card reveal" id="applications">
            <div class="dash-card-head"><h3><span class="ic">${icon('file')}</span> Application Status</h3><a href="#" class="see-all">View all</a></div>
            <div style="overflow-x:auto">
              <table class="status-table">
                <thead><tr><th>Scholarship</th><th>University</th><th>Applied</th><th>Status</th></tr></thead>
                <tbody>
                  ${applications.map(a => `<tr>
                    <td class="st-name"><a href="/details?id=${a.id}" style="color:inherit">${a.name}</a></td>
                    <td>${a.uni}</td>
                    <td>${new Date(a.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</td>
                    <td><span class="status-dot ${a.status}">${a.status.charAt(0).toUpperCase() + a.status.slice(1)}</span></td>
                  </tr>`).join('')}
                </tbody>
              </table>
            </div>
          </div>

          <!-- deadlines + notifications -->
          <div class="dash-grid">
            <div class="dash-card reveal" id="deadlines">
              <div class="dash-card-head"><h3><span class="ic">${icon('calendar')}</span> Upcoming Deadlines</h3></div>
              <div id="calendarWrap"></div>
              <div style="margin-top:16px;display:flex;flex-direction:column;gap:8px">
                ${SCHOLARSHIPS.slice(0, 3).map(s => {
                  const d = new Date(s.deadline); const days = Math.ceil((d - new Date()) / 86400000)
                  return `<a href="/details?id=${s.id}" style="display:flex;align-items:center;gap:10px;padding:10px;border-radius:var(--r-sm);background:var(--bg-2);border:1px solid var(--border)">
                    <div style="width:42px;height:42px;border-radius:10px;background:var(--grad-primary-soft);color:var(--c-primary);display:grid;place-items:center;font-weight:700;font-size:0.8rem;flex:none">${days}d</div>
                    <div style="flex:1;min-width:0"><b style="font-size:0.86rem;color:var(--text);display:block;overflow:hidden;text-overflow:ellipsis;white-space:nowrap">${s.name}</b><span style="font-size:0.78rem;color:var(--text-3)">${d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} · ${s.uni}</span></div>
                  </a>`
                }).join('')}
              </div>
            </div>

            <div class="dash-card reveal">
              <div class="dash-card-head"><h3><span class="ic">${icon('bell')}</span> Notifications</h3></div>
              <div class="notif-list">
                ${notifications.map(n => `<div class="notif-item">
                  <div class="notif-icon" style="background:${n.color}">${icon(n.icon)}</div>
                  <div class="notif-body"><b>${n.title}</b><span>${n.desc}</span></div>
                  <span class="notif-time">${n.time}</span>
                </div>`).join('')}
              </div>
            </div>
          </div>

          <!-- saved scholarships -->
          <div class="dash-card reveal" id="saved">
            <div class="dash-card-head"><h3><span class="ic">${icon('bookmark')}</span> Saved Scholarships</h3><a href="/scholarships" class="see-all">Browse more</a></div>
            <div class="grid grid-auto" id="savedGrid"></div>
          </div>

          <!-- messages + achievements -->
          <div class="dash-grid" id="achievements">
            <div class="dash-card reveal" id="messages">
              <div class="dash-card-head"><h3><span class="ic">${icon('message')}</span> Recent Messages</h3></div>
              <div style="display:flex;flex-direction:column;gap:4px">
                ${messages.map(m => `<div class="msg-item">
                  <img src="${m.avatar}" alt="${m.name}" />
                  <div class="mi-body"><b>${m.name}</b><p>${m.text}</p></div>
                  ${m.unread ? '<span class="mi-dot"></span>' : ''}
                </div>`).join('')}
              </div>
            </div>
            <div class="dash-card reveal">
              <div class="dash-card-head"><h3><span class="ic">${icon('trophy')}</span> Achievements</h3></div>
              <div class="achv-grid">
                ${achievements.map(a => `<div class="achv ${a.unlocked ? '' : 'locked'}">
                  <div class="achv-icon" style="${a.unlocked ? '' : 'background:var(--bg-3)'}">${icon(a.icon)}</div>
                  <b>${a.name}</b><span>${a.desc}</span>
                </div>`).join('')}
              </div>
            </div>
          </div>

          <!-- settings (hidden by default) -->
          <div class="dash-card reveal hidden" id="settings">
            <div class="dash-card-head"><h3><span class="ic">${icon('settings')}</span> Account Settings</h3></div>
            <div class="form-grid">
              <div class="field"><label>Full Name</label><input class="input" value="" /></div>
              <div class="field"><label>Email</label><input class="input" value="" /></div>
              <div class="field"><label>Phone</label><input class="input" value="" /></div>
              <div class="field"><label>Field of Study</label><input class="input" value="" /></div>
              <div class="field full"><label>Bio</label><textarea class="textarea" style="min-height:80px"></textarea></div>
            </div>
            <button class="btn" style="margin-top:16px" id="saveSettings">${icon('check', 'btn-icon')} Save Changes</button>
          </div>

        </div>
      </div>
    </div>
  </section>
`

// activity chart
const chart = document.getElementById('activityChart')
const max = Math.max(...chartData.map(d => d.val))
chart.innerHTML = chartData.map(d => `<div class="chart-bar"><div class="cb-fill" style="height:0%" data-h="${Math.round((d.val / max) * 100)}"></div><span class="cb-label">${d.label}</span></div>`).join('')
// animate bars
const chartIO = new IntersectionObserver((entries) => {
  entries.forEach(en => {
    if (!en.isIntersecting) return
    chart.querySelectorAll('.cb-fill').forEach((b, i) => setTimeout(() => b.style.height = b.dataset.h + '%', i * 80))
    chartIO.unobserve(en.target)
  })
}, { threshold: 0.3 })
chartIO.observe(chart)

// calendar (current month)
const today = new Date()
const y = today.getFullYear(), m = today.getMonth()
const first = new Date(y, m, 1).getDay()
const days = new Date(y, m + 1, 0).getDate()
const eventDays = [12, 20, 25] // mock deadlines this month
let calHTML = '<div class="cal-grid">'
['S', 'M', 'T', 'W', 'T', 'F', 'S'].forEach(d => calHTML += `<div class="cal-head">${d}</div>`)
for (let i = 0; i < first; i++) calHTML += '<div class="cal-day muted"></div>'
for (let d = 1; d <= days; d++) {
  const cls = ['cal-day']
  if (d === today.getDate()) cls.push('today')
  if (eventDays.includes(d)) cls.push('has-event')
  calHTML += `<div class="${cls.join(' ')}">${d}</div>`
}
calHTML += '</div>'
calHTML += `<div style="text-align:center;font-weight:600;margin-bottom:14px;color:var(--text)">${today.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}</div>`
document.getElementById('calendarWrap').innerHTML = calHTML

// saved scholarships
const sg = document.getElementById('savedGrid')
sg.innerHTML = saved.slice(0, 3).map(scholarshipCard).join('')
bindCardActions(sg)

// dashboard nav tabs
document.querySelectorAll('#dashNav a[data-tab]').forEach(a => {
  a.addEventListener('click', (e) => {
    e.preventDefault()
    document.querySelectorAll('#dashNav a').forEach(x => x.classList.remove('active'))
    a.classList.add('active')
    const tab = a.dataset.tab
    const target = document.getElementById(tab)
    if (target) {
      target.classList.remove('hidden')
      target.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  })
})
document.querySelectorAll('[data-tab-link]').forEach(a => a.addEventListener('click', (e) => {
  e.preventDefault(); document.querySelector(`#dashNav a[data-tab="${a.dataset.tabLink}"]`)?.click()
}))

document.getElementById('saveSettings')?.addEventListener('click', () => toast('Settings saved', 'Your profile has been updated.', 'success'))

window.SHP.initReveal()
window.SHP.initRings()

// Load authenticated account data from the backend.
// The profile is loaded independently from dashboard statistics so a failure in
// one secondary request can never leave the whole profile stuck on "Loading...".
async function loadRealDashboard() {
  const profile = document.querySelector('.dash-profile')
  const greeting = document.querySelector('.dash-greeting h2')
  const desc = document.querySelector('.dash-greeting p')

  try {
    // /api/auth/me is the canonical session check and is known to work even when
    // one of the optional dashboard data calls fails.
    const me = await api.me()
    const user = me.user

    if (!user) throw new Error('No authenticated user was returned by the server.')

    const profileText = [
      user.profile?.field,
      user.profile?.city,
      user.profile?.studyCountry,
      user.phone
    ].filter(Boolean).join(' · ') || 'Student'

    if (profile) {
      const name = profile.querySelector('b')
      const meta = profile.querySelector('span')
      if (name) name.textContent = user.name || 'Student'
      if (meta) meta.textContent = profileText
    }
    if (greeting) greeting.textContent = `Welcome back, ${(user.name || 'Student').split(' ')[0]}!`

    // Populate settings immediately from the authenticated user.
    const settings = document.getElementById('settings')
    if (settings) {
      const inputs = settings.querySelectorAll('input')
      if (inputs[0]) inputs[0].value = user.name || ''
      if (inputs[1]) inputs[1].value = user.email || ''
      if (inputs[2]) inputs[2].value = user.phone || ''
      if (inputs[3]) inputs[3].value = user.profile?.field || ''
      const bio = settings.querySelector('textarea')
      if (bio) bio.value = user.profile?.bio || ''
    }

    // The profile is now confirmed and rendered. Load the optional dashboard data.
    let data = { applications: [], saved: [], notifications: [], stats: { applications: 0, saved: 0, underReview: 0, approved: 0 } }
    try {
      data = await api.get('/dashboard')
    } catch (dashboardError) {
      // Fall back to the individual endpoints instead of reverting to mock data.
      const [appsResult, savedResult] = await Promise.allSettled([
        api.get('/applications'),
        api.get('/bookmarks')
      ])
      const applicationsData = appsResult.status === 'fulfilled' ? (appsResult.value.data || []) : []
      const savedData = savedResult.status === 'fulfilled' ? (savedResult.value.data || []) : []
      data.applications = applicationsData.map(a => ({
        ...a,
        scholarshipId: a.scholarshipId,
        name: a.scholarship?.name || a.scholarshipId,
        uni: a.scholarship?.uni || '',
        date: a.submittedAt,
        status: a.status
      }))
      data.saved = savedData
      data.stats = {
        applications: data.applications.length,
        saved: data.saved.length,
        underReview: data.applications.filter(a => ['review', 'pending'].includes(a.status)).length,
        approved: data.applications.filter(a => a.status === 'approved').length
      }
      console.warn('Dashboard aggregate endpoint failed; individual endpoints were used instead.', dashboardError)
    }

    const applications = data.applications || []
    const savedData = data.saved || []
    const stats = data.stats || {}

    if (desc) {
      desc.innerHTML = `You have <b style="color:var(--c-primary)">${stats.underReview || 0} applications</b> under review and <b style="color:var(--c-warning)">${applications.length ? 1 : 0} active deadline</b> this month.`
    }

    const statValues = document.querySelectorAll('.dash-stat > b')
    if (statValues[0]) statValues[0].textContent = stats.applications || applications.length
    if (statValues[1]) statValues[1].textContent = stats.approved || 0
    if (statValues[2]) statValues[2].textContent = stats.saved || savedData.length

    const badge = document.querySelector('#dashNav a[data-tab="applications"] .dn-badge')
    if (badge) badge.textContent = applications.length

    const tbody = document.querySelector('.status-table tbody')
    if (tbody) {
      tbody.innerHTML = applications.length ? applications.map(a => `<tr>
        <td class="st-name"><a href="/details?id=${a.scholarshipId}" style="color:inherit">${a.name}</a></td>
        <td>${a.uni}</td>
        <td>${a.date ? new Date(a.date).toLocaleDateString('en-US',{month:'short',day:'numeric'}) : '—'}</td>
        <td><span class="status-dot ${a.status}">${String(a.status || 'pending').charAt(0).toUpperCase()+String(a.status || 'pending').slice(1)}</span></td></tr>`).join('') : '<tr><td colspan="4" style="text-align:center;padding:24px;color:var(--text-3)">No applications yet. Start your first application.</td></tr>'
    }

    const savedGrid = document.getElementById('savedGrid')
    if (savedGrid) {
      savedGrid.innerHTML = savedData.length ? savedData.slice(0,3).map(scholarshipCard).join('') : '<p style="color:var(--text-3)">No saved scholarships yet.</p>'
      if (savedData.length) bindCardActions(savedGrid)
    }

    const notifList = document.querySelector('.notif-list')
    if (notifList && data.notifications?.length) {
      notifList.innerHTML = data.notifications.slice(0,6).map(n => `<div class="notif-item"><div class="notif-icon" style="background:#2563EB">${icon('bell')}</div><div class="notif-body"><b>${n.title}</b><span>${n.text}</span></div><span class="notif-time">${new Date(n.createdAt).toLocaleDateString()}</span></div>`).join('')
    }

    document.getElementById('saveSettings')?.addEventListener('click', async () => {
      const inputs = settings?.querySelectorAll('input') || []
      const bio = settings?.querySelector('textarea')
      try {
        await api.patch('/profile', {
          name: inputs[0]?.value || user.name,
          phone: inputs[2]?.value || user.phone,
          field: inputs[3]?.value || '',
          bio: bio?.value || ''
        })
        toast('Settings saved', 'Your profile has been updated.', 'success')
      } catch (err) {
        toast('Save failed', err.message, 'error')
      }
    }, { once: true })

    document.querySelector('#dashNav a[href="/login"]')?.addEventListener('click', async (e) => {
      e.preventDefault()
      await api.logout()
      location.href='/login'
    })

  } catch (err) {
    const message = err?.message || 'Unable to load your profile.'
    if (/Authentication required|Session expired|Invalid session|Not authenticated/i.test(message)) {
      location.href = '/login'
      return
    }

    if (profile) {
      const name = profile.querySelector('b')
      const meta = profile.querySelector('span')
      if (name) name.textContent = 'Profile unavailable'
      if (meta) meta.textContent = 'Please refresh and try again.'
    }
    if (greeting) greeting.textContent = 'Unable to load your dashboard'
    if (desc) desc.textContent = `${message}. Please refresh the page.`
    toast('Dashboard error', message, 'error', 6000)
  }
}

loadRealDashboard()
