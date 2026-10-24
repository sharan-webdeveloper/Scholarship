// ============================================================================
// ScholarHub Pro — Apply page: multi-step form with validation, uploads, receipt
// ============================================================================
import { bootstrap, icon, toast, openModal } from './script.js'
import { SCHOLARSHIPS, getScholarship } from './data.js'
import { api } from './api.js'

bootstrap('apply')

const preId = new URLSearchParams(location.search).get('id')
const preSch = preId ? getScholarship(preId) : null

const STEPS = ['Personal', 'Education', 'Address', 'Scores', 'Scholarship', 'Documents', 'Essay', 'Review']
const formData = { files: {} }

document.getElementById('app').innerHTML = `
  <div class="page-hero">
    <div class="container">
      <div class="crumb"><a href="/">Home</a> ${icon('chevronRight')} <span>Apply</span></div>
      <h1>Start Your <span class="gradient-text">Application</span></h1>
      <p class="lead">Complete each step to submit your scholarship application. Your progress is saved as you go. Estimated time: 15 minutes.</p>
    </div>
  </div>

  <section class="section-sm">
    <div class="container">
      <div class="apply-wrap">
        <div class="apply-card">
          <!-- progress steps -->
          <div class="apply-progress" id="applyProgress">
            ${STEPS.map((st, i) => `
              <div class="ap-step ${i === 0 ? 'active' : ''}" data-step="${i}">
                <div class="ap-num">${i + 1}</div>
                <span class="ap-label">${st}</span>
              </div>`).join('')}
          </div>
          <div class="apply-bar"><div class="apply-bar-fill" id="applyBarFill"></div></div>

          <form id="applyForm" novalidate>
            <!-- Step 1: Personal -->
            <div class="apply-pane active" data-pane="0">
              <h3>Personal Details</h3>
              <p>Tell us about yourself. All names should match your official documents.</p>
              <div class="form-grid">
                <div class="field"><label>First Name <span class="req">*</span></label><input class="input" name="firstName" required data-rule="name" placeholder="Aarav" /><div class="field-msg"></div></div>
                <div class="field"><label>Last Name <span class="req">*</span></label><input class="input" name="lastName" required data-rule="name" placeholder="Sharma" /><div class="field-msg"></div></div>
                <div class="field"><label>Email <span class="req">*</span></label><div class="input-group">${icon('mail', 'ig-icon')}<input class="input" name="email" type="email" required data-rule="email" placeholder="aarav@email.com" /></div><div class="field-msg"></div></div>
                <div class="field"><label>Phone <span class="req">*</span></label><div class="input-group">${icon('phone', 'ig-icon')}<input class="input" name="phone" type="tel" required data-rule="phone" placeholder="+91 98765 43210" /></div><div class="field-msg"></div></div>
                <div class="field"><label>Date of Birth <span class="req">*</span></label><input class="input" name="dob" type="date" required data-rule="dob" /><div class="field-msg"></div></div>
                <div class="field"><label>Gender <span class="req">*</span></label>
                  <select class="select" name="gender" required>
                    <option value="">Select…</option><option>Female</option><option>Male</option><option>Non-binary</option><option>Prefer not to say</option>
                  </select><div class="field-msg"></div>
                </div>
              </div>
            </div>

            <!-- Step 2: Education -->
            <div class="apply-pane" data-pane="1">
              <h3>Education Details</h3>
              <p>Your most recent academic qualification.</p>
              <div class="form-grid">
                <div class="field"><label>Highest Qualification <span class="req">*</span></label>
                  <select class="select" name="qualification" required>
                    <option value="">Select…</option><option>High School</option><option>Bachelor's</option><option>Master's</option><option>Doctorate</option>
                  </select><div class="field-msg"></div>
                </div>
                <div class="field"><label>Field of Study <span class="req">*</span></label><input class="input" name="field" required data-rule="name" placeholder="Computer Science" /><div class="field-msg"></div></div>
                <div class="field full"><label>Institution <span class="req">*</span></label><input class="input" name="institution" required data-rule="name" placeholder="University of Delhi" /><div class="field-msg"></div></div>
                <div class="field"><label>Graduation Year <span class="req">*</span></label><input class="input" name="gradYear" type="number" min="2015" max="2026" required placeholder="2024" /><div class="field-msg"></div></div>
                <div class="field"><label>Country of Study <span class="req">*</span></label><input class="input" name="studyCountry" required data-rule="name" placeholder="India" /><div class="field-msg"></div></div>
              </div>
            </div>

            <!-- Step 3: Address -->
            <div class="apply-pane" data-pane="2">
              <h3>Address</h3>
              <p>Your current residential address.</p>
              <div class="form-grid">
                <div class="field full"><label>Street Address <span class="req">*</span></label><input class="input" name="street" required placeholder="123 MG Road, Apt 4B" /><div class="field-msg"></div></div>
                <div class="field"><label>City <span class="req">*</span></label><input class="input" name="city" required data-rule="name" placeholder="Mumbai" /><div class="field-msg"></div></div>
                <div class="field"><label>State / Province <span class="req">*</span></label><input class="input" name="state" required data-rule="name" placeholder="Maharashtra" /><div class="field-msg"></div></div>
                <div class="field"><label>Postal Code <span class="req">*</span></label><input class="input" name="postal" required data-rule="postal" placeholder="400001" /><div class="field-msg"></div></div>
                <div class="field"><label>Country <span class="req">*</span></label><input class="input" name="country" required data-rule="name" placeholder="India" /><div class="field-msg"></div></div>
              </div>
            </div>

            <!-- Step 4: Scores -->
            <div class="apply-pane" data-pane="3">
              <h3>Academic Score</h3>
              <p>Enter your standardized test scores. Enter 0 if not applicable.</p>
              <div class="form-grid">
                <div class="field"><label>GPA (out of 10) <span class="req">*</span></label><input class="input" name="gpa" type="number" step="0.01" min="0" max="10" required placeholder="8.75" /><div class="field-msg"></div></div>
                <div class="field"><label>GPA (out of 4)</label><input class="input" name="gpa4" type="number" step="0.01" min="0" max="4" placeholder="3.5" /><div class="field-msg"></div></div>
                <div class="field"><label>SAT Score</label><input class="input" name="sat" type="number" min="0" max="1600" placeholder="1450" /><div class="field-msg"></div></div>
                <div class="field"><label>GRE Score</label><input class="input" name="gre" type="number" min="0" max="340" placeholder="325" /><div class="field-msg"></div></div>
                <div class="field"><label>TOEFL / IELTS</label><input class="input" name="english" placeholder="TOEFL 110 / IELTS 7.5" /><div class="field-msg"></div></div>
                <div class="field"><label>Class Rank</label><input class="input" name="rank" placeholder="Top 5%" /><div class="field-msg"></div></div>
              </div>
            </div>

            <!-- Step 5: Scholarship selection -->
            <div class="apply-pane" data-pane="4">
              <h3>Scholarship Selection</h3>
              <p>Choose the scholarship you are applying for.</p>
              <div class="field">
                <label>Select Scholarship <span class="req">*</span></label>
                <select class="select" name="scholarship" required id="scholarshipSelect">
                  <option value="">Select a scholarship…</option>
                  ${SCHOLARSHIPS.map(s => `<option value="${s.id}" ${preSch && preSch.id === s.id ? 'selected' : ''}>${s.name} — ${s.uni}</option>`).join('')}
                </select>
                <div class="field-msg"></div>
              </div>
              <div id="scholarshipPreview" style="margin-top:16px"></div>
            </div>

            <!-- Step 6: Documents -->
            <div class="apply-pane" data-pane="5">
              <h3>Document Uploads</h3>
              <p>Upload clear scans of your documents. Accepted: PDF, JPG, PNG (max 5MB each).</p>
              <div class="form-grid">
                ${['Resume', 'Aadhar / National ID', 'Passport', 'Marksheet', 'Photo'].map((label, i) => {
                  const key = label.toLowerCase().split(' ')[0]
                  return `<div class="field">
                    <label>${label} <span class="req">*</span></label>
                    <div class="upload-zone" data-upload="${key}">
                      ${icon('upload')}<p><b>Click to upload</b> or drag & drop</p>
                      <input type="file" accept=".pdf,.jpg,.jpeg,.png" hidden data-file="${key}" required />
                    </div>
                    <div class="file-list" data-list="${key}"></div>
                    <div class="field-msg"></div>
                  </div>`
                }).join('')}
              </div>
            </div>

            <!-- Step 7: Essay -->
            <div class="apply-pane" data-pane="6">
              <h3>Personal Essay</h3>
              <p>Tell us why you deserve this scholarship. Be specific about your goals and impact.</p>
              <div class="field">
                <label>Essay (minimum 150 words) <span class="req">*</span></label>
                <textarea class="textarea" name="essay" required data-rule="essay" placeholder="Describe your academic journey, career aspirations, and how this scholarship will help you achieve your goals…"></textarea>
                <div style="display:flex;justify-content:space-between;margin-top:6px">
                  <span class="field-msg"></span>
                  <span style="font-size:0.78rem;color:var(--text-3)" id="essayCount">0 words</span>
                </div>
              </div>
            </div>

            <!-- Step 8: Review -->
            <div class="apply-pane" data-pane="7">
              <h3>Review & Submit</h3>
              <p>Please review your application before submitting.</p>
              <div id="reviewContent"></div>
              <label class="check" style="margin-top:20px"><input type="checkbox" id="termsCheck" /> I confirm the information provided is accurate and agree to the <a href="#" id="termsInline">Terms & Privacy Policy</a>. <span class="req">*</span></label>
              <div class="field-msg" id="termsMsg" style="margin-top:6px"></div>
            </div>

            <!-- success -->
            <div class="apply-pane" data-pane="8">
              <div class="apply-success">
                <div class="success-ring">${icon('checkCircle')}</div>
                <h2>Application Submitted!</h2>
                <p style="color:var(--text-3);max-width:440px;margin:10px auto 0">Your application has been received and is now under review. You will receive an email confirmation shortly.</p>
                <div class="receipt" id="receipt"></div>
                <div class="wrap" style="justify-content:center;margin-top:20px">
                  <button class="btn" id="downloadReceipt">${icon('download', 'btn-icon')} Download Receipt</button>
                  <a href="/dashboard" class="btn btn-ghost">Go to Dashboard</a>
                </div>
              </div>
            </div>

            <!-- nav -->
            <div class="apply-nav" id="applyNav">
              <button type="button" class="btn btn-ghost" id="prevBtn" disabled>${icon('arrowLeft', 'btn-icon')} Previous</button>
              <button type="button" class="btn" id="nextBtn">Next ${icon('arrowRight', 'btn-icon')}</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </section>
`

let cur = 0

const RULES = {
  name: (v) => v.trim().length >= 2 ? '' : 'Must be at least 2 characters',
  email: (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v) ? '' : 'Enter a valid email address',
  phone: (v) => /^[\d\s+()-]{7,}$/.test(v) ? '' : 'Enter a valid phone number',
  dob: (v) => { const d = new Date(v); const age = (Date.now() - d) / 31557600000; return d && age >= 14 && age <= 60 ? '' : 'Age must be 14–60' },
  postal: (v) => /^[\w\s-]{3,10}$/.test(v) ? '' : 'Enter a valid postal code',
  essay: (v) => v.trim().split(/\s+/).length >= 150 ? '' : 'Essay must be at least 150 words',
}

function validatePane(pane) {
  let ok = true
  pane.querySelectorAll('[data-rule]').forEach(input => {
    const rule = input.dataset.rule
    const field = input.closest('.field')
    const msg = field.querySelector('.field-msg')
    const err = RULES[rule](input.value)
    if (err) { field.classList.add('invalid'); field.classList.remove('valid'); msg.innerHTML = `${icon('alert')} ${err}`; ok = false }
    else if (input.required || input.value) { field.classList.add('valid'); field.classList.remove('invalid'); msg.innerHTML = `${icon('check')} Looks good` }
    else { field.classList.remove('invalid', 'valid') }
  })
  // required selects + simple required inputs without rule
  pane.querySelectorAll('select[required], input[required]:not([data-rule])').forEach(input => {
    const field = input.closest('.field')
    const msg = field.querySelector('.field-msg')
    if (!input.value || (input.type === 'checkbox' && !input.checked)) {
      if (input.type !== 'file') {
        field.classList.add('invalid'); field.classList.remove('valid')
        if (msg) msg.innerHTML = `${icon('alert')} This field is required`
        ok = false
      }
    } else { field.classList.add('valid'); field.classList.remove('invalid'); if (msg) msg.innerHTML = `${icon('check')} Looks good` }
  })
  // files on step 6
  if (pane.dataset.pane === '5') {
    pane.querySelectorAll('[data-file]').forEach(inp => {
      const field = inp.closest('.field')
      const msg = field.querySelector('.field-msg')
      if (!inp.files || !inp.files.length) { field.classList.add('invalid'); msg.innerHTML = `${icon('alert')} Please upload this document`; ok = false }
      else { field.classList.add('valid'); field.classList.remove('invalid'); msg.innerHTML = `${icon('check')} Uploaded` }
    })
  }
  return ok
}

function showPane(i) {
  document.querySelectorAll('.apply-pane').forEach((p, idx) => p.classList.toggle('active', idx === i))
  document.querySelectorAll('.ap-step').forEach((s, idx) => {
    s.classList.toggle('active', idx === i)
    s.classList.toggle('done', idx < i)
  })
  const fill = document.getElementById('applyBarFill')
  fill.style.width = (i / (STEPS.length - 1)) * 100 + '%'
  // nav buttons
  document.getElementById('prevBtn').disabled = i === 0
  const next = document.getElementById('nextBtn')
  if (i === STEPS.length - 1) next.innerHTML = `${icon('check', 'btn-icon')} Submit Application`
  else next.innerHTML = `Next ${icon('arrowRight', 'btn-icon')}`
  if (i === 8) document.getElementById('applyNav').style.display = 'none'
  else document.getElementById('applyNav').style.display = 'flex'
  // review content on step 8
  if (i === 7) buildReview()
  window.scrollTo({ top: document.querySelector('.apply-card').offsetTop - 100, behavior: 'smooth' })
}

function buildReview() {
  const f = new FormData(document.getElementById('applyForm'))
  const rows = [
    ['Name', `${f.get('firstName') || ''} ${f.get('lastName') || ''}`],
    ['Email', f.get('email') || ''],
    ['Phone', f.get('phone') || ''],
    ['DOB', f.get('dob') || ''],
    ['Education', `${f.get('qualification') || ''} in ${f.get('field') || ''}`],
    ['Institution', f.get('institution') || ''],
    ['Address', `${f.get('street') || ''}, ${f.get('city') || ''}, ${f.get('country') || ''}`],
    ['GPA', f.get('gpa') || ''],
    ['Scholarship', (getScholarship(f.get('scholarship')) || {}).name || '—'],
  ]
  const docs = Object.keys(formData.files).map(k => `<span class="badge badge-success">${icon('file', 'btn-icon')} ${k}: ${formData.files[k].name}</span>`).join('')
  document.getElementById('reviewContent').innerHTML = `
    <div class="card-base" style="padding:var(--sp-3)">
      ${rows.map(([k, v]) => `<div class="aside-stat"><span>${k}</span><b>${v || '—'}</b></div>`).join('')}
      <div style="margin-top:12px"><b style="display:block;margin-bottom:8px">Documents</b><div class="wrap">${docs || '<span style="color:var(--text-3)">No files</span>'}</div></div>
    </div>
  `
}

async function submitApplication() {
  const form = document.getElementById('applyForm')
  const f = new FormData(form)
  for (const [key, file] of Object.entries(formData.files)) {
    if (file) f.set(key, file)
  }
  try {
    const result = await api.post('/applications', f)
    const sch = getScholarship(f.get('scholarship'))
    const app = result.application
    formData.receipt = { ref: app.reference, name: `${f.get('firstName')} ${f.get('lastName')}`, email: f.get('email'), scholarship: sch?.name, date: new Date(app.submittedAt).toLocaleString() }
    document.getElementById('receipt').innerHTML = `
      <div class="receipt-row"><span>Reference No.</span><b>${formData.receipt.ref}</b></div>
      <div class="receipt-row"><span>Applicant</span><b>${formData.receipt.name}</b></div>
      <div class="receipt-row"><span>Email</span><b>${formData.receipt.email}</b></div>
      <div class="receipt-row"><span>Scholarship</span><b>${formData.receipt.scholarship}</b></div>
      <div class="receipt-row"><span>Submitted</span><b>${formData.receipt.date}</b></div>
      <div class="receipt-row"><span>Status</span><b style="color:var(--c-success)">Under Review</b></div>
    `
    showPane(8)
    toast('Application submitted!', `Reference ${app.reference}`, 'success', 5000)
  } catch (err) {
    toast('Application failed', err.message, 'error', 5000)
  }
}


document.getElementById('nextBtn').addEventListener('click', async () => {
  const pane = document.querySelector(`.apply-pane[data-pane="${cur}"]`)
  if (cur === 7) {
    // final submit
    if (!validatePane(pane)) { toast('Please complete required fields', '', 'error'); return }
    const terms = document.getElementById('termsCheck')
    const tmsg = document.getElementById('termsMsg')
    if (!terms.checked) { tmsg.innerHTML = `${icon('alert')} You must accept the terms to submit`; tmsg.style.opacity = '1'; tmsg.style.color = 'var(--c-error)'; return }
    tmsg.style.opacity = '0'
    const next = document.getElementById('nextBtn')
    next.disabled = true
    await submitApplication()
    next.disabled = false
    return
  }
  if (!validatePane(pane)) { toast('Please fix the errors', 'Check highlighted fields', 'error'); return }
  if (cur < STEPS.length - 1) { cur++; showPane(cur) }
})
document.getElementById('prevBtn').addEventListener('click', () => { if (cur > 0) { cur--; showPane(cur) } })

// scholarship preview
document.getElementById('scholarshipSelect').addEventListener('change', (e) => {
  const s = getScholarship(e.target.value)
  const p = document.getElementById('scholarshipPreview')
  if (!s) { p.innerHTML = ''; return }
  p.innerHTML = `<div class="card-base" style="padding:var(--sp-3);display:flex;gap:14px;align-items:center">
    <div class="sc-uni-logo" style="background:${s.uniColor}">${s.uniShort}</div>
    <div><b style="color:var(--text)">${s.name}</b><p style="font-size:0.86rem;color:var(--text-3);margin:2px 0">${s.uni} · ${s.amountText} · Due ${new Date(s.deadline).toLocaleDateString()}</p></div>
  </div>`
})
if (preSch) document.getElementById('scholarshipSelect').dispatchEvent(new Event('change'))

// essay word count
const essay = document.querySelector('[name="essay"]')
essay?.addEventListener('input', () => {
  const w = essay.value.trim() ? essay.value.trim().split(/\s+/).length : 0
  document.getElementById('essayCount').textContent = w + ' word' + (w !== 1 ? 's' : '')
})

// file uploads
document.querySelectorAll('.upload-zone').forEach(zone => {
  const input = zone.querySelector('input[type=file]')
  const list = document.querySelector(`[data-list="${zone.dataset.upload}"]`)
  zone.addEventListener('click', () => input.click())
  zone.addEventListener('dragover', (e) => { e.preventDefault(); zone.classList.add('drag') })
  zone.addEventListener('dragleave', () => zone.classList.remove('drag'))
  zone.addEventListener('drop', (e) => { e.preventDefault(); zone.classList.remove('drag'); if (e.dataTransfer.files.length) { input.files = e.dataTransfer.files; handleFile(input, list, zone) } })
  input.addEventListener('change', () => handleFile(input, list, zone))
})

function handleFile(input, list, zone) {
  const key = input.dataset.file
  list.innerHTML = ''
  if (!input.files.length) { delete formData.files[key]; return }
  const file = input.files[0]
  if (file.size > 5 * 1024 * 1024) { toast('File too large', 'Max 5MB per file', 'error'); input.value = ''; delete formData.files[key]; return }
  formData.files[key] = file
  list.innerHTML = `<div class="file-item">${icon('file')} <span class="fi-name">${file.name}</span><span class="fi-size">${(file.size / 1024).toFixed(0)} KB</span><button type="button" class="fi-remove" data-remove="${key}">${icon('x')}</button></div>`
  list.querySelector('[data-remove]')?.addEventListener('click', (e) => { e.stopPropagation(); input.value = ''; delete formData.files[key]; list.innerHTML = '' })
}

// download receipt
document.getElementById('downloadReceipt').addEventListener('click', () => {
  const r = formData.receipt
  if (!r) return
  const txt = `SCHOLARHUB PRO — APPLICATION RECEIPT\n\nReference: ${r.ref}\nApplicant: ${r.name}\nEmail: ${r.email}\nScholarship: ${r.scholarship}\nSubmitted: ${r.date}\nStatus: Under Review\n\nThank you for applying. Keep this reference for your records.`
  const blob = new Blob([txt], { type: 'text/plain' })
  const a = document.createElement('a')
  a.href = URL.createObjectURL(blob); a.download = `receipt-${r.ref}.txt`; a.click()
  URL.revokeObjectURL(a.href)
  toast('Receipt downloaded', '', 'success')
})

// terms inline
document.getElementById('termsInline')?.addEventListener('click', (e) => {
  e.preventDefault()
  openModal(`<h3>Terms & Privacy Policy</h3><p style="margin:12px 0;color:var(--text-2);font-size:0.9rem;line-height:1.7">By submitting this application you confirm that all information provided is accurate and complete to the best of your knowledge. Your data is encrypted and used solely for scholarship matching and processing. You consent to being contacted about your application status.</p><button class="btn btn-block" onclick="document.getElementById('modalOverlay').classList.remove('open')">I understand</button>`)
})

showPane(0)
