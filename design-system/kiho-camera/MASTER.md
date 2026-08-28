# KIHO CAMERA — MASTER DESIGN SYSTEM SPECIFICATION
*Art Direction: Travel Journal / Camera Contact Sheet*

## 1. Creative Direction & Brand Identity
- **Concept:** Travel Journal / Camera Contact Sheet — A tactile, photographic, editorial visual diary from a Quảng Bình trip.
- **Tone:** Human, tactile, photographic, editorial, local, youthful, warm, travel-driven, confident, effortless.
- **Anti-Patterns:** No generic SaaS cards, no AI-generated plastic feel, no neon gradients, no excessive rounded-3xl pills, no monospace on body paragraphs or major headings.

---

## 2. Typography System (3 Distinct Roles)

| Role | Font Family | Usage | Characteristics |
| :--- | :--- | :--- | :--- |
| **Role A: Display / Editorial** | `Playfair Display` (`font-display`) | Hero headlines, section editorial titles, prominent quote statements | Expressive serif, human warmth, high contrast, proper Vietnamese diacritics support. |
| **Role B: UI / Body** | `Be Vietnam Pro` (`font-sans`) | Navigation, body paragraphs, forms, button labels, descriptions, card titles | Humanist grotesk, optimized for Vietnamese typography, highly legible at all sizes. |
| **Role C: Mono Accent** | `JetBrains Mono` (`font-mono`) | Technical specs, pricing numbers, frame indices, camera metadata, timestamp labels | Functional, technical metadata accent. **Never used for body text or navigation.** |

---

## 3. Color Tokens & Distribution

Approximate visual weight distribution: **80% Warm Paper/Neutrals | 15% Deep Ink Typography | 5% Burnt Orange Accent**

| Token | Class / Variable | Hex Value | Semantic Usage |
| :--- | :--- | :--- | :--- |
| **Paper Canvas** | `bg-paper` / `bg-[#faf8f5]` | `#faf8f5` | Page background, tactile editorial base |
| **Pure Surface** | `bg-white` | `#ffffff` | Elevated content surfaces (used sparingly) |
| **Deep Ink** | `text-ink-900` | `#111111` | Primary headings, display text, dark CTA buttons |
| **Muted Ink** | `text-ink-600` | `#4a4a4a` | Secondary text, editorial descriptions |
| **Meta Ink** | `text-ink-400` | `#767676` | Metadata labels, subtle timestamps, specs |
| **Hairline Border** | `border-ink-200` | `#e8e4de` | Subtle structural dividers, table rules |
| **Burnt Orange** | `bg-accent` / `text-accent` | `#d95d39` / `#ea580c` | Primary active accent, highlight badges |

---

## 4. Border Radius System
- **Small UI & Tags:** `rounded-sm` (4px) to `rounded-md` (6–8px)
- **Buttons & Form Inputs:** `rounded-lg` (8–10px) — *No oversized pill buttons for primary actions*
- **Cards & Containers:** `rounded-xl` (12–16px max)
- **Photographs & Prints:** `rounded-sm` (4px) or `rounded-none` (0px) to feel like printed photographic contact sheets.

---

## 5. Component Standards
1. **Buttons:**
   - *Primary:* Solid deep ink `bg-ink-900 text-white rounded-lg px-6 py-3 font-sans font-semibold text-sm hover:bg-black transition-all`
   - *Secondary:* Outline `border border-ink-300 text-ink-900 bg-white hover:bg-ink-50 rounded-lg px-6 py-3 font-sans font-medium text-sm`
   - *Editorial Link:* `text-ink-900 hover:text-accent font-sans font-medium inline-flex items-center gap-1.5 text-sm`
2. **Cards:**
   - Avoid nesting cards inside cards.
   - Use open layouts, asymmetric photo-text composition, and subtle hairline borders (`border border-ink-200`).
3. **Icons:**
   - Lucide icons rendered inline beside text with consistent 1.5px stroke width. No decorative circular bubble backgrounds.
