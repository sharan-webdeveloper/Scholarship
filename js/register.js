// ============================================================================
// ScholarHub Pro — Register page (password strength, confirm, validation, popup)
// ============================================================================
import { bootstrap, icon, toast, openModal } from './script.js'
import { IMAGES } from './data.js'
import { api } from './api.js'

bootstrap('register')

document.getElementById('app').innerHTML = `
  <div class="auth-wrap">
    <div class="auth-visual">
      <img src="${IMAGES.gradsOutdoors}" alt="Graduates" />
      <a href="/" class="brand" style="color:#fff;margin-bottom:var(--sp-4)">
        <span class="brand-logo">${icon('graduation')}</span>
        Scholar<span style="color:#fff">Hub</span> Pro
      </a>
      <h2>Start your scholarship journey today — completely free.</h2>
      <p>Join over a million students who've discovered, tracked and won scholarships with ScholarHub Pro.</p>
      <ul class="auth-bullets">
        <li>${icon('check')} Free forever — no hidden fees, no credit card</li>
        <li>${icon('check')} Personalized scholarship matches in minutes</li>
        <li>${icon('check')} Smart reminders so you never miss a deadline</li>
        <li>${icon('check')} A beautiful dashboard to track everything</li>
      </ul>
    </div>
    <div class="auth-form-wrap">
      <div class="auth-card">
        <a href="/" class="brand" style="margin-bottom:var(--sp-3)">
          <span class="brand-logo">${icon('graduation')}</span>
          Scholar<span>Hub</span> Pro
        </a>
        <h2>Create your account</h2>
        <p class="sub">It takes less than a minute. No credit card required.</p>
        <form id="regForm" novalidate>
          <div class="field">
            <label>Full Name <span class="req">*</span></label>
            <div class="input-group">${icon('users', 'ig-icon')}<input class="input" name="name" required placeholder="Jane Doe" /></div>
            <div class="field-msg"></div>
          </div>
          <div class="field">
            <label>Email Address <span class="req">*</span></label>
            <div class="input-group">${icon('mail', 'ig-icon')}<input class="input" name="email" type="email" required placeholder="you@email.com" /></div>
            <div class="field-msg"></div>
          </div>
          <div class="field">
            <label>Phone Number <span class="req">*</span></label>
            <div class="input-group">${icon('phone', 'ig-icon')}<input class="input" name="phone" type="tel" required placeholder="+1 555 000 1234" /></div>
            <div class="field-msg"></div>
          </div>
          <div class="field">
            <label>Password <span class="req">*</span></label>
            <div class="input-group">
              ${icon('shield', 'ig-icon')}
              <input class="input" name="password" type="password" required placeholder="Min 8 characters" id="pwInput" />
              <button type="button" class="ig-action" id="pwToggle" aria-label="Show password">${icon('eye')}</button>
            </div>
            <div class="strength"><div class="strength-bar" id="strengthBar"></div></div>
            <span class="strength-label" id="strengthLabel">Enter a password</span>
            <div class="field-msg" id="pwMsg"></div>
          </div>
          <div class="field">
            <label>Confirm Password <span class="req">*</span></label>
            <div class="input-group">
              ${icon('shield', 'ig-icon')}
              <input class="input" name="confirm" type="password" required placeholder="Re-enter password" id="pwConfirm" />
              <button type="button" class="ig-action" id="pwToggle2" aria-label="Show password">${icon('eye')}</button>
            </div>
            <div class="field-msg" id="confirmMsg"></div>
          </div>
          <label class="check" style="margin-bottom:var(--sp-2)"><input type="checkbox" id="terms" /> I agree to the <a href="#" id="termsLink">Terms</a> and <a href="#" id="privacyLink">Privacy Policy</a> <span class="req">*</span></label>
          <button type="submit" class="btn btn-block btn-lg">${icon('rocket', 'btn-icon')} Create Account</button>
        </form>
        <div class="auth-divider">or sign up with</div>
        <div class="social-auth">
          <button type="button" id="googleAuth">${icon('sparkle')} Google</button>
          <button type="button" id="linkedinAuth">${icon('linkedin')} LinkedIn</button>
        </div>
        <p class="auth-switch">Already have an account? <a href="/login">Sign in</a></p>
      </div>
    </div>
  </div>
`

const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const phoneRe = /^[\d\s+()-]{7,}$/
const form = document.getElementById('regForm')
const pw = document.getElementById('pwInput')
const confirm = document.getElementById('pwConfirm')

function scorePassword(v) {
  let score = 0
  if (v.length >= 8) score++
  if (v.length >= 12) score++
  if (/[A-Z]/.test(v) && /[a-z]/.test(v)) score++
  if (/\d/.test(v)) score++
  if (/[^A-Za-z0-9]/.test(v)) score++
  return Math.min(score, 4)
}
const STRENGTH = [
  { w: 0, label: 'Enter a password', color: '#E2E8F0' },
  { w: 25, label: 'Weak', color: '#EF4444' },
  { w: 50, label: 'Fair', color: '#F59E0B' },
  { w: 75, label: 'Good', color: '#2563EB' },
  { w: 100, label: 'Strong', color: '#10B981' },
]
pw.addEventListener('input', () => {
  const s = scorePassword(pw.value)
  const info = STRENGTH[s]
  const bar = document.getElementById('strengthBar')
  bar.style.width = pw.value ? info.w + '%' : '0%'
  bar.style.background = info.color
  document.getElementById('strengthLabel').textContent = pw.value ? info.label : 'Enter a password'
  document.getElementById('strengthLabel').style.color = info.color
  // validate
  const f = pw.closest('.field')
  const m = document.getElementById('pwMsg')
  if (pw.value.length === 0) { f.classList.remove('valid', 'invalid') }
  else if (pw.value.length < 8) { f.classList.add('invalid'); f.classList.remove('valid'); m.innerHTML = `${icon('alert')} Min 8 characters` }
  else { f.classList.add('valid'); f.classList.remove('invalid'); m.innerHTML = `${icon('check')} ${info.label} password` }
  // re-check confirm
  if (confirm.value) confirm.dispatchEvent(new Event('input'))
})
confirm.addEventListener('input', () => {
  const f = confirm.closest('.field')
  const m = document.getElementById('confirmMsg')
  if (confirm.value.length === 0) { f.classList.remove('valid', 'invalid') }
  else if (confirm.value !== pw.value) { f.classList.add('invalid'); f.classList.remove('valid'); m.innerHTML = `${icon('alert')} Passwords don't match` }
  else { f.classList.add('valid'); f.classList.remove('invalid'); m.innerHTML = `${icon('check')} Passwords match` }
})

// toggles
function bindToggle(btnId, inputId) {
  document.getElementById(btnId).addEventListener('click', () => {
    const inp = document.getElementById(inputId)
    const show = inp.type === 'password'
    inp.type = show ? 'text' : 'password'
    document.getElementById(btnId).innerHTML = icon(show ? 'eyeOff' : 'eye')
  })
}
bindToggle('pwToggle', 'pwInput')
bindToggle('pwToggle2', 'pwConfirm')

// live validation for name/email/phone
form.name.addEventListener('blur', () => {
  const f = form.name.closest('.field')
  if (form.name.value.trim().length < 2) { f.classList.add('invalid'); f.querySelector('.field-msg').innerHTML = `${icon('alert')} Enter your full name` }
  else { f.classList.remove('invalid'); f.classList.add('valid'); f.querySelector('.field-msg').innerHTML = `${icon('check')} Looks good` }
})
form.email.addEventListener('blur', () => {
  const f = form.email.closest('.field')
  if (!emailRe.test(form.email.value)) { f.classList.add('invalid'); f.querySelector('.field-msg').innerHTML = `${icon('alert')} Enter a valid email` }
  else { f.classList.remove('invalid'); f.classList.add('valid'); f.querySelector('.field-msg').innerHTML = `${icon('check')} Email looks valid` }
})
form.phone.addEventListener('blur', () => {
  const f = form.phone.closest('.field')
  if (!phoneRe.test(form.phone.value)) { f.classList.add('invalid'); f.querySelector('.field-msg').innerHTML = `${icon('alert')} Enter a valid phone number` }
  else { f.classList.remove('invalid'); f.classList.add('valid'); f.querySelector('.field-msg').innerHTML = `${icon('check')} Phone looks valid` }
})

form.addEventListener('submit', async (e) => {
  e.preventDefault()
  let ok = true
  ;['name', 'email', 'phone'].forEach(n => form[n].dispatchEvent(new Event('blur')))
  pw.dispatchEvent(new Event('input'))
  confirm.dispatchEvent(new Event('input'))
  if (form.querySelectorAll('.field.invalid').length) ok = false
  if (!document.getElementById('terms').checked) { toast('Please accept the terms', '', 'error'); ok = false }
  if (!ok) return
  const button = form.querySelector('button[type="submit"]')
  button.disabled = true
  try {
    await api.register({ name: form.name.value.trim(), email: form.email.value.trim(), phone: form.phone.value.trim(), password: pw.value })
    openModal(`<div class="check-circle">${icon('checkCircle')}</div><h2>Welcome aboard, ${form.name.value.split(' ')[0]}!</h2><p style="color:var(--text-2);margin:10px 0 18px">Your account has been created successfully. Let's find your perfect scholarship.</p><div class="wrap" style="justify-content:center"><a href="/dashboard" class="btn">Go to Dashboard</a><a href="/scholarships" class="btn btn-ghost">Browse Scholarships</a></div>`)
    form.reset()
    document.querySelectorAll('.field').forEach(f => f.classList.remove('valid', 'invalid'))
    document.getElementById('strengthBar').style.width = '0%'
    document.getElementById('strengthLabel').textContent = 'Enter a password'
  } catch (err) {
    toast('Registration failed', err.message, 'error', 4500)
  } finally { button.disabled = false }
})

document.getElementById('termsLink')?.addEventListener('click', (e) => { e.preventDefault(); window.SHP.openModal(`<h3>Terms of Service</h3><p style="margin:12px 0;color:var(--text-2)">By creating an account you agree to provide accurate information and use ScholarHub Pro responsibly. We never sell your data.</p><button class="btn btn-block" onclick="document.getElementById('modalOverlay').classList.remove('open')">Got it</button>`) })
document.getElementById('privacyLink')?.addEventListener('click', (e) => { e.preventDefault(); window.SHP.openModal(`<h3>Privacy Policy</h3><p style="margin:12px 0;color:var(--text-2)">Your data is encrypted at rest and in transit. We collect only what's needed to match you with scholarships.</p><button class="btn btn-block" onclick="document.getElementById('modalOverlay').classList.remove('open')">Understood</button>`) })
document.getElementById('googleAuth')?.addEventListener('click', () => toast('Google sign-up', 'Demo only — not connected.', 'info'))
document.getElementById('linkedinAuth')?.addEventListener('click', () => toast('LinkedIn sign-up', 'Demo only — not connected.', 'info'))
