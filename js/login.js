// ============================================================================
// ScholarHub Pro — Login page (split screen, glass card, show/hide password)
// ============================================================================
import { bootstrap, icon, toast } from './script.js'
import { IMAGES } from './data.js'
import { api } from './api.js'

bootstrap('login')

document.getElementById('app').innerHTML = `
  <div class="auth-wrap">
    <div class="auth-visual">
      <img src="${IMAGES.studyLibrary}" alt="Students studying" />
      <a href="/" class="brand" style="color:#fff;margin-bottom:var(--sp-4)">
        <span class="brand-logo">${icon('graduation')}</span>
        Scholar<span style="color:#fff">Hub</span> Pro
      </a>
      <h2>Welcome back to where your scholarship journey continues.</h2>
      <p>Pick up exactly where you left off — your saved scholarships, applications and deadlines are waiting.</p>
      <ul class="auth-bullets">
        <li>${icon('check')} Track every application in one beautiful dashboard</li>
        <li>${icon('check')} Get reminded before every deadline</li>
        <li>${icon('check')} Access 20,000+ verified scholarships</li>
        <li>${icon('check')} Bank-grade encryption keeps your data safe</li>
      </ul>
    </div>
    <div class="auth-form-wrap">
      <div class="auth-card">
        <a href="/" class="brand" style="margin-bottom:var(--sp-3)">
          <span class="brand-logo">${icon('graduation')}</span>
          Scholar<span>Hub</span> Pro
        </a>
        <h2>Sign in to your account</h2>
        <p class="sub">Enter your credentials to access your dashboard.</p>
        <form id="loginForm" novalidate>
          <div class="field">
            <label>Email Address <span class="req">*</span></label>
            <div class="input-group">
              ${icon('mail', 'ig-icon')}
              <input class="input" name="email" type="email" required placeholder="you@email.com" />
            </div>
            <div class="field-msg"></div>
          </div>
          <div class="field">
            <label>Password <span class="req">*</span></label>
            <div class="input-group">
              ${icon('shield', 'ig-icon')}
              <input class="input" name="password" type="password" required placeholder="••••••••" id="pwInput" />
              <button type="button" class="ig-action" id="pwToggle" aria-label="Show password">${icon('eye')}</button>
            </div>
            <div class="field-msg"></div>
          </div>
          <div class="auth-row">
            <label class="check"><input type="checkbox" name="remember" /> Remember me</label>
            <a href="#" id="forgotPw">Forgot password?</a>
          </div>
          <button type="submit" class="btn btn-block btn-lg">${icon('arrowRight', 'btn-icon')} Sign In</button>
        </form>
        <div class="auth-divider">or continue with</div>
        <div class="social-auth">
          <button type="button" id="googleAuth">${icon('sparkle')} Google</button>
          <button type="button" id="linkedinAuth">${icon('linkedin')} LinkedIn</button>
        </div>
        <p class="auth-switch">Don't have an account? <a href="/register">Create one free</a></p>
      </div>
    </div>
  </div>
`

const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const form = document.getElementById('loginForm')

// password show/hide
const pw = document.getElementById('pwInput')
const tog = document.getElementById('pwToggle')
tog.addEventListener('click', () => {
  const show = pw.type === 'password'
  pw.type = show ? 'text' : 'password'
  tog.innerHTML = icon(show ? 'eyeOff' : 'eye')
})

form.addEventListener('submit', async (e) => {
  e.preventDefault()
  let ok = true
  const email = form.email, pwF = form.password
  const ef = email.closest('.field'), pf = pwF.closest('.field')
  const em = ef.querySelector('.field-msg'), pm = pf.querySelector('.field-msg')
  if (!emailRe.test(email.value)) { ef.classList.add('invalid'); em.innerHTML = `${icon('alert')} Enter a valid email`; ok = false }
  else { ef.classList.remove('invalid'); ef.classList.add('valid'); em.innerHTML = `${icon('check')} Looks good` }
  if (pwF.value.length < 8) { pf.classList.add('invalid'); pm.innerHTML = `${icon('alert')} Min 8 characters`; ok = false }
  else { pf.classList.remove('invalid'); pf.classList.add('valid'); pm.innerHTML = `${icon('check')} Looks good` }
  if (!ok) return
  const button = form.querySelector('button[type="submit"]')
  button.disabled = true
  try {
    await api.login({ email: email.value.trim(), password: pwF.value })
    toast('Welcome back!', 'Redirecting to your dashboard…', 'success', 1800)
    setTimeout(() => location.href = '/dashboard', 900)
  } catch (err) {
    toast('Sign in failed', err.message, 'error', 4000)
    button.disabled = false
  }
})

document.getElementById('forgotPw')?.addEventListener('click', (e) => {
  e.preventDefault()
  window.SHP.openModal(`<div class="check-circle" style="background:rgba(37,99,235,.14);color:var(--c-primary)">${icon('mail')}</div><h3>Reset Password</h3><p style="color:var(--text-2);margin:10px 0 18px">Enter your email and we'll send you a reset link.</p><input class="input" placeholder="you@email.com" style="margin-bottom:12px" /><button class="btn btn-block" onclick="document.getElementById('modalOverlay').classList.remove('open')">Send Reset Link</button>`)
})
document.getElementById('googleAuth')?.addEventListener('click', () => toast('Google sign-in', 'Demo only — not connected.', 'info'))
document.getElementById('linkedinAuth')?.addEventListener('click', () => toast('LinkedIn sign-in', 'Demo only — not connected.', 'info'))
