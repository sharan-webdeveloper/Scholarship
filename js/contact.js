// ============================================================================
// ScholarHub Pro — Contact page logic
// ============================================================================
import { bootstrap, icon, toast } from './script.js'
import { api } from './api.js'

bootstrap('contact')

document.getElementById('app').innerHTML = `
  <div class="page-hero">
    <div class="container">
      <div class="crumb"><a href="/">Home</a> ${icon('chevronRight')} <span>Contact</span></div>
      <h1>Get in <span class="gradient-text">Touch</span></h1>
      <p class="lead">Questions about a scholarship, an application, or a partnership? We're here to help — usually within an hour.</p>
    </div>
  </div>

  <section class="section-sm">
    <div class="container">
      <div class="contact-grid">
        <!-- info -->
        <div class="contact-info reveal-l">
          <div class="contact-item">
            <div class="ci-icon">${icon('mapPin')}</div>
            <div><b>Our Office</b><p>221A Education Avenue, Boston, MA 02115, United States</p></div>
          </div>
          <div class="contact-item">
            <div class="ci-icon">${icon('mail')}</div>
            <div><b>Email Support</b><p><a href="mailto:hello@scholarhub.pro">hello@scholarhub.pro</a></p></div>
          </div>
          <div class="contact-item">
            <div class="ci-icon">${icon('phone')}</div>
            <div><b>Phone</b><p><a href="tel:+18005550199">+1 (800) 555-0199</a></p></div>
          </div>
          <div class="contact-item">
            <div class="ci-icon">${icon('clock')}</div>
            <div><b>Working Hours</b><p>Mon–Fri: 9:00 AM – 6:00 PM EST<br>Sat: 10:00 AM – 2:00 PM · Sun: Closed</p></div>
          </div>
          <div class="card-base" style="padding:var(--sp-3);text-align:center">
            <h4 style="margin-bottom:12px">Follow Us</h4>
            <div class="socials" style="justify-content:center">
              <a class="social" href="#" aria-label="LinkedIn">${icon('linkedin')}</a>
              <a class="social" href="#" aria-label="Twitter">${icon('twitter')}</a>
              <a class="social" href="#" aria-label="Instagram">${icon('instagram')}</a>
              <a class="social" href="#" aria-label="YouTube">${icon('youtube')}</a>
              <a class="social" href="#" aria-label="Facebook">${icon('facebook')}</a>
            </div>
          </div>
        </div>

        <!-- form -->
        <div class="contact-form-card reveal-r">
          <h3 style="margin-bottom:6px">Send Us a Message</h3>
          <p style="color:var(--text-3);margin-bottom:var(--sp-3)">Fill out the form and we'll get back to you shortly.</p>
          <form id="contactForm" novalidate>
            <div class="form-grid">
              <div class="field"><label>First Name <span class="req">*</span></label><input class="input" name="firstName" required placeholder="Jane" /><div class="field-msg"></div></div>
              <div class="field"><label>Last Name <span class="req">*</span></label><input class="input" name="lastName" required placeholder="Doe" /><div class="field-msg"></div></div>
              <div class="field full"><label>Email <span class="req">*</span></label><div class="input-group">${icon('mail', 'ig-icon')}<input class="input" name="email" type="email" required placeholder="jane@email.com" /></div><div class="field-msg"></div></div>
              <div class="field full"><label>Phone</label><div class="input-group">${icon('phone', 'ig-icon')}<input class="input" name="phone" type="tel" placeholder="+1 555 000 1234" /></div><div class="field-msg"></div></div>
              <div class="field full"><label>Subject <span class="req">*</span></label>
                <select class="select" name="subject" required>
                  <option value="">Select a topic…</option>
                  <option>Scholarship Inquiry</option><option>Application Support</option><option>Partnership</option><option>Technical Issue</option><option>Other</option>
                </select><div class="field-msg"></div>
              </div>
              <div class="field full"><label>Message <span class="req">*</span></label><textarea class="textarea" name="message" required placeholder="How can we help you?" style="min-height:140px"></textarea><div class="field-msg"></div></div>
            </div>
            <button type="submit" class="btn btn-block btn-lg" style="margin-top:8px">${icon('send', 'btn-icon')} Send Message</button>
          </form>
        </div>
      </div>

      <!-- map -->
      <div class="map-embed reveal" style="margin-top:var(--sp-4)">
        <iframe src="https://www.openstreetmap.org/export/embed.html?bbox=-71.12%2C42.33%2C-71.05%2C42.37&layer=mapnik&marker=42.3505%2C-71.0825" loading="lazy" referrerpolicy="no-referrer-when-downgrade" title="ScholarHub Pro office location"></iframe>
      </div>
    </div>
  </section>
`

const form = document.getElementById('contactForm')
const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
function mark(field, ok, msg) {
  field.classList.toggle('invalid', !ok); field.classList.toggle('valid', ok && !!field.querySelector('.input, .textarea, .select'))
  const m = field.querySelector('.field-msg'); if (m) m.innerHTML = ok ? `${icon('check')} Looks good` : `${icon('alert')} ${msg}`
}
form.addEventListener('submit', async (e) => {
  e.preventDefault()
  let ok = true
  ;['firstName', 'lastName', 'email', 'subject', 'message'].forEach(n => {
    const el = form.querySelector(`[name="${n}"]`); const f = el.closest('.field')
    if (!el.value.trim()) { mark(f, false, 'This field is required'); ok = false }
    else if (n === 'email' && !emailRe.test(el.value)) { mark(f, false, 'Enter a valid email'); ok = false }
    else mark(f, true)
  })
  if (!ok) { toast('Please fix the errors', 'Check highlighted fields', 'error'); return }
  toast('Message sent!', 'We\u2019ll reply within 24 hours.', 'success', 4000)
  form.reset()
  form.querySelectorAll('.field').forEach(f => f.classList.remove('valid', 'invalid'))
})
// live validation
form.querySelectorAll('.input, .textarea, .select').forEach(el => {
  el.addEventListener('blur', () => {
    const f = el.closest('.field')
    if (el.required && !el.value.trim()) mark(f, false, 'This field is required')
    else if (el.type === 'email' && el.value && !emailRe.test(el.value)) mark(f, false, 'Enter a valid email')
    else if (el.value) mark(f, true)
  })
})

window.SHP.initReveal()
