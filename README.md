# PulseFit Pro X — Premium Landing Page

> *Know Your Body. Own Your Day.*

A production-quality, Apple-inspired smartwatch landing page built with pure **HTML5**, **CSS3**, and **Vanilla JavaScript**. No frameworks, no dependencies — just clean, fast, accessible code.

---

## 🚀 Quick Start

```bash
# Option 1: Open directly in browser
Double-click index.html

# Option 2: Python local server
python -m http.server 3000
# Then visit http://localhost:3000

# Option 3: Node live server
npx live-server
```

---

## 📁 Project Structure

```
pulsefit-landing-page/
├── index.html                  # Main HTML (16 sections)
├── css/
│   └── style.css               # Complete design system
├── js/
│   └── script.js               # All JavaScript features
├── assets/
│   └── images/
│       ├── watch-hero.png      # Hero product image
│       ├── app-mockup.png      # Mobile app dashboard
│       └── lifestyle.png       # Lifestyle photography
└── README.md                   # This file
```

---

## 🗂️ Page Sections (16 Total)

| # | Section | Description |
|---|---------|-------------|
| 1 | **Announcement Bar** | Scrolling marquee · Free shipping · Sale codes |
| 2 | **Sticky Navigation** | Logo · Links · Dark mode · Mobile drawer |
| 3 | **Hero** | Full-screen · Animated watch · Floating badges · Stats |
| 4 | **Press Logos** | TechCrunch · Forbes · Wired · TIME · CNET |
| 5 | **Features** | 6 premium animated cards with hover effects |
| 6 | **Product Showcase** | Color picker · Zoom image · Spec checklist |
| 7 | **Comparison Table** | PulseFit vs Traditional vs Budget |
| 8 | **Health Tracking** | Animated metric bars · 6 health chart cards |
| 9 | **Mobile App** | App mockup · Feature list · App store buttons |
| 10 | **Testimonials** | Auto-rotating carousel · Verified badges |
| 11 | **Statistics** | Animated counters · 10K+ / 500K+ / 99% / 40+ |
| 12 | **Pricing** | 3 tiers · Monthly/Yearly toggle · Best value highlight |
| 13 | **FAQ** | 8 questions · Animated accordion |
| 14 | **Contact** | Form validation · Company info · Map placeholder |
| 15 | **Newsletter** | 15% off incentive · Email capture |
| 16 | **Footer** | 4-column links · Social icons · Legal links |

---

## 🎨 Design System

### Color Palette
| Token | Value | Usage |
|-------|-------|-------|
| `--clr-primary` | `#0F172A` | Dark navy background |
| `--clr-blue` | `#2563EB` | Primary brand blue |
| `--clr-green` | `#22C55E` | Success / CTA accent |
| `--clr-orange` | `#F97316` | Warm accent |
| `--clr-sky` | `#38BDF8` | Light blue gradient end |

### Typography
- **Headings**: Poppins (300–900)
- **Body**: Inter (300–700)
- **Scale**: `--text-xs` (12px) → `--text-7xl` (72px)

### Design Language
- **Border Radius**: 16px base, 24px large, 9999px full
- **Shadows**: 5-tier scale (xs → xl) + colored shadows
- **Spacing**: 8-point grid system

---

## ⚙️ JavaScript Features (25 Total)

| Feature | Implementation |
|---------|---------------|
| Scroll progress bar | CSS `width` driven by `scrollY / docHeight` |
| Announcement bar close | Height animation → `display:none` |
| Dark mode toggle | `data-theme` attribute + `localStorage` persistence |
| Sticky navbar | `scrolled` class at 60px → glassmorphism effect |
| Mobile menu | Slide-in drawer + overlay + focus trap |
| Active nav links | `IntersectionObserver`-based scroll spy |
| Back to top button | Fade-in at 500px scroll · smooth scroll |
| Button ripple | Dynamic `<span>` injection on click |
| Scroll reveal | `IntersectionObserver` — no janky scroll listeners |
| Animated counters | `requestAnimationFrame` + ease-out cubic easing |
| FAQ accordion | Single-open with keyboard support |
| Pricing toggle | Monthly/Yearly with animated number transition |
| Color picker | Product showcase color selection + alt-text update |
| Testimonial carousel | Auto-rotate · touch swipe · dot navigation |
| Contact form validation | Real-time `blur` + submit · email regex |
| Newsletter signup | Success state animation |
| Lazy image loading | `IntersectionObserver` + fade-in reveal |
| Card tilt effect | `mousemove` → `perspective/rotateX/Y` on desktop |
| Smooth scrolling | Offset-aware anchor scrolling (navbar height) |
| Parallax hero | Scroll-driven blob + watch movement |
| Metric bar animation | Width transition triggered on section enter |
| Health chart counters | Scoped counter animation for health section |
| Preload key assets | `requestIdleCallback` for non-critical images |
| Touch swipe support | Carousel swipe detection on mobile |
| Keyboard navigation | Escape closes menus · Enter/Space on FAQ |

---

## ♿ Accessibility (WCAG AA)

- ✅ Semantic HTML5 elements (`<header>`, `<nav>`, `<section>`, `<article>`, `<footer>`)
- ✅ All images have descriptive `alt` text
- ✅ ARIA labels on interactive elements
- ✅ `role` attributes on carousels, lists, dialogs
- ✅ `aria-expanded` on accordion and mobile menu
- ✅ `aria-live` region for form success messages
- ✅ Visible focus states (`:focus-visible`)
- ✅ Screen reader-only class `.sr-only` for decorative content
- ✅ Keyboard navigation support throughout

---

## 🔍 SEO

- ✅ `<title>` and `<meta description>` optimized
- ✅ Open Graph (`og:title`, `og:description`, `og:image`)
- ✅ Twitter Card meta tags
- ✅ `<link rel="canonical">` tag
- ✅ JSON-LD structured data (Product schema with AggregateRating)
- ✅ Semantic heading hierarchy (`h1` → `h6`)
- ✅ Descriptive image `alt` attributes

---

## 📱 Responsive Breakpoints

| Breakpoint | Layout Changes |
|-----------|----------------|
| `< 1200px` | Footer collapses to 3 columns |
| `< 1024px` | Features 2-col · Stats 2-col · Single pricing |
| `< 768px`  | All grids → 1 column · Mobile menu active |
| `< 640px`  | Reduced padding · Stats 2×2 grid |

---

## Customization

### Change Brand Colors
Edit `:root` in `css/style.css`:
```css
:root {
  --clr-blue:  #2563EB;   /* Primary blue */
  --clr-green: #22C55E;   /* Success green */
  --clr-orange: #F97316;  /* Accent orange */
}
```

### Update Pricing
Find the `.pricing-card` sections in `index.html`:
```html
<span class="pricing-card__amount"
  data-monthly="199"
  data-yearly="159">199</span>
```

### Update Content
All text, features, and testimonials are in `index.html`.
Search by section comment: `<!-- 5. FEATURES -->`, etc.

### Connect the Form
Replace the `setTimeout` in `script.js` with a real `fetch()`:
```js
// In the contact form submit handler:
await fetch('/api/contact', {
  method: 'POST',
  body: JSON.stringify({ name, email, subject, message })
});
```

---

## 📄 License

© 2025 PulseFit Inc. All rights reserved.

Built with pure HTML, CSS & JavaScript — no build tools required.
