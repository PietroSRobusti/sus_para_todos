# HealHub - Design Guidelines

## Design Approach

**Selected Approach:** Design System (Material Design adapted for Brazilian healthcare)

**Justification:** Healthcare scheduling application requiring maximum accessibility, reliability, and ease of use for adults and elderly users. Material Design provides proven accessibility patterns, clear visual feedback, and structured component hierarchy ideal for form-heavy utility applications.

**Key Principles:**
- Accessibility-first design for elderly users
- Clear visual hierarchy with generous spacing
- High contrast and readable typography
- Simplified navigation with minimal cognitive load
- Trustworthy, official government aesthetic

---

## Core Design Elements

### A. Color Palette

**Primary Colors (HealHub Brand):**
- **Primary Green:** 142 65% 45% (HealHub institutional green)
- **Primary Blue:** 210 75% 50% (HealHub complementary blue)
- **Deep Green (Dark mode primary):** 142 60% 35%
- **Deep Blue (Dark mode accent):** 210 70% 40%

**Functional Colors:**
- **Success:** 142 70% 50%
- **Warning:** 45 95% 55%
- **Error:** 0 85% 60%
- **Info:** 210 90% 60%

**Neutral Palette:**
- **Background (Light):** 0 0% 98%
- **Background (Dark):** 220 15% 12%
- **Surface (Light):** 0 0% 100%
- **Surface (Dark):** 220 15% 16%
- **Text Primary (Light):** 220 20% 15%
- **Text Primary (Dark):** 0 0% 95%
- **Text Secondary (Light):** 220 15% 45%
- **Text Secondary (Dark):** 0 0% 70%

---

### B. Typography

**Font Families:**
- **Primary:** Inter (high legibility, modern)
- **Headings:** Inter Bold/Semibold
- **Body:** Inter Regular

**Type Scale (Elderly-friendly sizing):**
- **Hero/H1:** text-5xl md:text-6xl (60-72px) font-bold
- **H2:** text-4xl md:text-5xl (48-60px) font-semibold
- **H3:** text-3xl (36px) font-semibold
- **H4:** text-2xl (24px) font-semibold
- **Body Large:** text-xl (20px) - primary body text for forms/instructions
- **Body:** text-lg (18px) - default body text
- **Small:** text-base (16px) - labels, captions
- **Line Height:** leading-relaxed (1.75) for all body text

**Critical:** Minimum font size 16px throughout application for elderly readability.

---

### C. Layout System

**Spacing Primitives:** Use Tailwind units of **4, 6, 8, 12, 16, 20**
- **Component Padding:** p-6, p-8
- **Section Spacing:** py-12, py-16, py-20
- **Card Gaps:** gap-6, gap-8
- **Button Padding:** px-8 py-4 (generous touch targets)
- **Form Field Spacing:** space-y-6

**Container Strategy:**
- **Max Width:** max-w-7xl for main content
- **Form Containers:** max-w-3xl (optimal form width)
- **News Cards:** max-w-6xl in grid layout

**Grid Layouts:**
- **Hospital Cards:** grid-cols-1 md:grid-cols-2 lg:grid-cols-3
- **News Section:** grid-cols-1 md:grid-cols-2 gap-8
- **Calendar:** Single column focus with generous spacing

---

### D. Component Library

**Navigation:**
- Fixed header with HealHub logo (left), main navigation links (center), user profile/accessibility controls (right)
- Large touch targets (min 48x48px)
- High contrast against background
- Mobile: Hamburger menu with full-screen overlay

**Hero Section:**
- Large hero image showing diverse patients in São Caetano do Sul hospital settings (generated via OpenAI/DALL-E)
- Overlaid headline: "Agende sua Consulta ou Exame no HealHub" (text-5xl, white with subtle shadow)
- Primary CTA button: "Agendar Agora" (large, primary green, px-12 py-5)
- Secondary info: "Atendemos todos os hospitais de São Caetano do Sul"
- Height: 70vh with gradient overlay for text readability

**Appointment Booking Form:**
- Multi-step card-based flow with clear progress indicator
- Step 1: Select Hospital (cards with hospital images, names, addresses)
- Step 2: Select Service Type (Consulta/Exame - large radio buttons with icons)
- Step 3: Select Specialty (dropdown or card selection with AI-generated medical icons)
- Step 4: Select Patient (form fields: Nome, CPF, Data de Nascimento, Telefone)
- Step 5: Calendar date/time picker
- Each step has large "Continuar" and "Voltar" buttons
- Form validation with clear error messages
- AI-generated illustrations next to each step explaining the process

**Calendar Component:**
- Month view with large date cells (min 60x60px)
- Available dates: Primary green background
- Selected date: Deep blue background with white text
- Past dates: Grayed out
- Time slots displayed below selected date as button chips
- Clear visual distinction between morning/afternoon/evening slots

**News Section:**
- Card-based grid layout (2 columns desktop, 1 column mobile)
- Each card features:
  - AI-generated thematic health illustration (e.g., vaccination campaigns, health tips)
  - Headline (text-2xl font-semibold)
  - Summary (text-lg, 2-3 lines)
  - Publication date and category badge
  - "Ler Mais" link
- Cards have subtle shadow and hover lift effect

**Appointment Confirmation:**
- Success modal/page with:
  - Large checkmark icon (success green)
  - Confirmation message (text-3xl)
  - Appointment details card (hospital, date, time, specialty, doctor)
  - QR code for check-in
  - "Baixar Comprovante" and "Adicionar ao Calendário" buttons
  - AI-generated illustration: friendly healthcare worker

**Buttons:**
- Primary: Green background, white text, rounded-lg, px-8 py-4, shadow-md
- Secondary: White background, green border/text, rounded-lg, px-8 py-4
- Outline on images: Backdrop blur-md with white/light background
- All buttons: Large touch targets, clear hover states (slight scale + shadow increase)

**Cards:**
- White background (light mode), dark surface (dark mode)
- Rounded-xl, shadow-lg
- Padding: p-8
- Hover: Subtle lift (transform translateY -2px, shadow increase)

**Form Inputs:**
- Large text inputs: h-14, text-lg, rounded-lg
- Clear labels above inputs (text-lg font-medium)
- Focus: Primary green outline (ring-2 ring-primary)
- Error state: Red outline with error message below
- Consistent with dark mode (proper background colors)

**Footer:**
- Three-column layout (desktop) / stacked (mobile)
- Column 1: HealHub logo, mission statement, social media links
- Column 2: Quick links (Hospitais, Especialidades, Notícias, Contato)
- Column 3: Contact info (Endereço, Telefone, Email, Horário de atendimento)
- Copyright and accessibility statement at bottom
- Background: Subtle green tint

---

### E. Accessibility Features

- **Font Sizes:** All text minimum 16px, critical information 18-20px
- **Color Contrast:** WCAG AAA compliance (7:1 minimum for body text)
- **Touch Targets:** Minimum 48x48px for all interactive elements
- **Focus Indicators:** Thick, high-contrast outlines on all focusable elements
- **Keyboard Navigation:** Full tab order, skip links, clear focus management
- **Screen Reader:** Semantic HTML, proper ARIA labels, descriptive alt text for all images
- **Dark Mode:** Full implementation with consistent colors across all components including form inputs

---

### F. Images & Illustrations

**Hero Image:**
- **Type:** Photographic
- **Subject:** Diverse group of patients (elderly, adults, children) in modern Brazilian hospital setting in São Caetano do Sul
- **Mood:** Welcoming, professional, trustworthy
- **Treatment:** Warm color grade with slight green tint overlay

**AI-Generated Illustrations (OpenAI/DALL-E):**
1. **Booking Flow Icons:** Medical-themed icons for each specialty (cardiology, orthopedics, pediatrics, etc.) - clean, friendly illustration style
2. **Process Illustrations:** Step-by-step visual guides next to form steps showing people completing appointment booking
3. **News Images:** Health-themed illustrations for news articles (vaccination, exercise, nutrition, preventive care)
4. **Success States:** Friendly healthcare professionals giving thumbs up or welcoming gesture
5. **Empty States:** Gentle illustrations for "No appointments" or "No news" states

**Style:** Modern, friendly, inclusive illustration style - avoid overly technical medical imagery, focus on accessibility and warmth

---

### G. Animations (Minimal)

- **Page Transitions:** Subtle fade-in (200ms)
- **Form Step Changes:** Slide transition (300ms ease-in-out)
- **Button Hovers:** Scale (1.02) + shadow increase (200ms)
- **Card Hovers:** Lift effect translateY(-4px) (250ms)
- **Loading States:** Simple spinner (primary green)
- **No scroll-triggered animations** - keeps experience predictable for elderly users