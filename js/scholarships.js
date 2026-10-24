// ============================================================================
// ScholarHub Pro — Scholarships list page logic
// Search, category/country filters, amount slider, sorting, pagination, view toggle.
// ============================================================================
import { bootstrap, icon } from './script.js'
import { SCHOLARSHIPS, CATEGORIES, COUNTRIES, categoryName, countryName } from './data.js'
import { scholarshipCard, bindCardActions } from './ui.js'

const state = {
  search: '',
  categories: new Set(),
  countries: new Set(),
  levels: new Set(),
  minAmount: 0,
  sort: 'deadline',
  page: 1,
  perPage: 6,
  view: 'grid',
}

// honour ?cat= / ?country= / ?q= from URL
const params = new URLSearchParams(location.search)
if (params.get('cat')) state.categories.add(params.get('cat'))
if (params.get('country')) state.countries.add(params.get('country'))
if (params.get('q')) state.search = params.get('q')

function buildFilters() {
  const cats = CATEGORIES.map(c => `
    <label class="filter-check">
      <input type="checkbox" value="${c.id}" ${state.categories.has(c.id) ? 'checked' : ''} data-fcat> ${c.name}
    </label>`).join('')
  const countries = COUNTRIES.map(c => `
    <label class="filter-check">
      <input type="checkbox" value="${c.id}" ${state.countries.has(c.id) ? 'checked' : ''} data-fcountry> ${c.name}
    </label>`).join('')
  const levels = ['Undergraduate', 'Masters', 'PhD'].map(l => `
    <label class="filter-check">
      <input type="checkbox" value="${l}" data-flevel> ${l}
    </label>`).join('')

  document.getElementById('filterPanel').innerHTML = `
    <div class="filter-card">
      <h4>${icon('filter')} Filters</h4>
      <button class="btn btn-ghost btn-sm btn-block" id="clearFilters">Clear all</button>
    </div>
    <div class="filter-card">
      <div class="filter-group">
        <h5>Category</h5>
        <div class="filter-list">${cats}</div>
      </div>
    </div>
    <div class="filter-card">
      <div class="filter-group">
        <h5>Country</h5>
        <div class="filter-list">${countries}</div>
      </div>
    </div>
    <div class="filter-card">
      <div class="filter-group">
        <h5>Study Level</h5>
        <div class="filter-list">${levels}</div>
      </div>
    </div>
    <div class="filter-card">
      <div class="filter-group" style="margin-bottom:0">
        <h5>Min Amount (USD)</h5>
        <div class="range-wrap">
          <input type="range" class="range-input" id="amountRange" min="0" max="50000" step="1000" value="${state.minAmount}" />
          <div class="range-vals"><span>$0</span><span id="amountVal">$${state.minAmount.toLocaleString()}+</span></div>
        </div>
      </div>
    </div>
  `
}

function getFiltered() {
  let list = SCHOLARSHIPS.filter(s => {
    if (state.search) {
      const q = state.search.toLowerCase()
      if (!s.name.toLowerCase().includes(q) && !s.uni.toLowerCase().includes(q) && !categoryName(s.category).toLowerCase().includes(q) && !countryName(s.country).toLowerCase().includes(q)) return false
    }
    if (state.categories.size && !state.categories.has(s.category)) return false
    if (state.countries.size && !state.countries.has(s.country)) return false
    if (state.levels.size && !state.levels.has(s.level)) return false
    if (s.amount < state.minAmount) return false
    return true
  })
  switch (state.sort) {
    case 'deadline': list.sort((a, b) => new Date(a.deadline) - new Date(b.deadline)); break
    case 'amount-high': list.sort((a, b) => b.amount - a.amount); break
    case 'amount-low': list.sort((a, b) => a.amount - b.amount); break
    case 'rating': list.sort((a, b) => b.rating - a.rating); break
    case 'applicants': list.sort((a, b) => b.applicants - a.applicants); break
  }
  return list
}

function render() {
  const grid = document.getElementById('scholarGrid')
  const list = getFiltered()
  const countEl = document.getElementById('resultsCount')
  countEl.innerHTML = `Showing <b>${list.length}</b> scholarship${list.length !== 1 ? 's' : ''}`

  if (!list.length) {
    grid.innerHTML = `<div class="empty-state" style="grid-column:1/-1">
      ${icon('search')}
      <h3>No scholarships found</h3>
      <p>Try adjusting your filters or search query.</p>
      <button class="btn" id="emptyReset">Reset filters</button>
    </div>`
    document.getElementById('pagination').innerHTML = ''
    document.getElementById('emptyReset')?.addEventListener('click', resetAll)
    return
  }

  const totalPages = Math.ceil(list.length / state.perPage)
  if (state.page > totalPages) state.page = 1
  const slice = list.slice((state.page - 1) * state.perPage, state.page * state.perPage)
  grid.className = `sch-grid ${state.view === 'list' ? 'list' : ''}`
  grid.innerHTML = slice.map(scholarshipCard).join('')
  bindCardActions(grid)

  // pagination
  const pg = document.getElementById('pagination')
  let phtml = `<button class="page-btn" data-page="prev" ${state.page === 1 ? 'disabled' : ''}>${icon('chevronLeft')}</button>`
  for (let i = 1; i <= totalPages; i++) {
    phtml += `<button class="page-btn ${i === state.page ? 'active' : ''}" data-page="${i}">${i}</button>`
  }
  phtml += `<button class="page-btn" data-page="next" ${state.page === totalPages ? 'disabled' : ''}>${icon('chevronRight')}</button>`
  pg.innerHTML = phtml
  pg.querySelectorAll('[data-page]').forEach(b => b.addEventListener('click', () => {
    const v = b.dataset.page
    if (v === 'prev') state.page = Math.max(1, state.page - 1)
    else if (v === 'next') state.page = Math.min(totalPages, state.page + 1)
    else state.page = +v
    render(); window.scrollTo({ top: document.getElementById('scholarGrid').offsetTop - 120, behavior: 'smooth' })
  }))

  window.SHP.initReveal()
}

function resetAll() {
  state.search = ''; state.categories.clear(); state.countries.clear(); state.levels.clear()
  state.minAmount = 0; state.sort = 'deadline'; state.page = 1
  document.getElementById('searchInput').value = ''
  document.getElementById('sortSelect').value = 'deadline'
  buildFilters(); bindFilterEvents(); render()
}

function bindFilterEvents() {
  document.querySelectorAll('[data-fcat]').forEach(el => el.addEventListener('change', () => { el.checked ? state.categories.add(el.value) : state.categories.delete(el.value); state.page = 1; render() }))
  document.querySelectorAll('[data-fcountry]').forEach(el => el.addEventListener('change', () => { el.checked ? state.countries.add(el.value) : state.countries.delete(el.value); state.page = 1; render() }))
  document.querySelectorAll('[data-flevel]').forEach(el => el.addEventListener('change', () => { el.checked ? state.levels.add(el.value) : state.levels.delete(el.value); state.page = 1; render() }))
  const range = document.getElementById('amountRange')
  range?.addEventListener('input', () => { state.minAmount = +range.value; document.getElementById('amountVal').textContent = `$${(+range.value).toLocaleString()}+`; })
  range?.addEventListener('change', () => { state.page = 1; render() })
  document.getElementById('clearFilters')?.addEventListener('click', resetAll)
}

function bindToolbar() {
  const search = document.getElementById('searchInput')
  let st
  search?.addEventListener('input', () => { clearTimeout(st); st = setTimeout(() => { state.search = search.value.trim(); state.page = 1; render() }, 220) })
  document.getElementById('sortSelect')?.addEventListener('change', (e) => { state.sort = e.target.value; state.page = 1; render() })
  document.querySelectorAll('.view-toggle button').forEach(b => b.addEventListener('click', () => {
    document.querySelectorAll('.view-toggle button').forEach(x => x.classList.remove('active'))
    b.classList.add('active'); state.view = b.dataset.view; render()
  }))
  // mobile filter toggle
  const mt = document.getElementById('mobileFilterToggle')
  mt?.addEventListener('click', () => {
    const p = document.getElementById('filterPanel')
    p.classList.toggle('open')
    p.style.display = p.style.display === 'block' ? '' : 'block'
  })
}

bootstrap('scholarships')
document.getElementById('app').innerHTML = `
  <div class="page-hero">
    <div class="container">
      <div class="crumb"><a href="/">Home</a> ${icon('chevronRight')} <span>Scholarships</span></div>
      <h1>Explore <span class="gradient-text">Scholarships</span></h1>
      <p class="lead">Browse ${SCHOLARSHIPS.length}+ curated scholarships from world-class universities. Filter by category, country, amount and deadline to find your perfect match.</p>
    </div>
  </div>

  <section class="section-sm">
    <div class="container">
      <div class="sch-layout">
        <aside class="sch-filters" id="filterPanel"></aside>
        <div>
          <div class="sch-toolbar">
            <div class="search-box">
              ${icon('search')}
              <input class="input" id="searchInput" type="text" placeholder="Search scholarships, universities…" value="${state.search}" />
            </div>
            <select class="select" id="sortSelect" style="width:auto">
              <option value="deadline">Sort: Deadline</option>
              <option value="amount-high">Amount: High to Low</option>
              <option value="amount-low">Amount: Low to High</option>
              <option value="rating">Top Rated</option>
              <option value="applicants">Most Popular</option>
            </select>
            <div class="view-toggle">
              <button data-view="grid" class="active" aria-label="Grid view">${icon('grid')}</button>
              <button data-view="list" aria-label="List view">${icon('list')}</button>
            </div>
            <button class="btn btn-ghost btn-sm filter-toggle-btn" id="mobileFilterToggle">${icon('filter')} Filters</button>
          </div>
          <p class="results-count" id="resultsCount"></p>
          <div class="grid grid-auto" id="scholarGrid" style="margin-top:18px"></div>
          <div class="pagination" id="pagination" style="margin-top:30px"></div>
        </div>
      </div>
    </div>
  </section>
`
buildFilters()
bindFilterEvents()
bindToolbar()
render()
