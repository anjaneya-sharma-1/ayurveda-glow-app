# Typography System - AyurDiet

## Overview
This document outlines the comprehensive typography system for the AyurDiet application, designed specifically for healthcare professionals working with Ayurvedic medicine.

## Font Families

### Primary Fonts
1. **Inter** (`font-body`, `font-sans`)
   - Usage: Body text, UI elements, data display
   - Characteristics: Excellent readability, professional, healthcare-appropriate
   - Supports: Extensive weights (100-900), tabular numbers

2. **Playfair Display** (`font-display`, `font-serif`)
   - Usage: Headings, brand elements, emphasis
   - Characteristics: Elegant, authoritative, distinctive
   - Supports: Extensive weights, italics

3. **Noto Sans Devanagari** (`font-devanagari`)
   - Usage: Sanskrit terms, Ayurvedic terminology
   - Characteristics: Culturally appropriate, readable
   - Purpose: Authentic representation of traditional terms

## Typography Scale

### Display Text (Large Headers)
- `text-display-lg`: 3.5rem (56px) - Hero titles
- `text-display-md`: 2.875rem (46px) - Main page headers
- `text-display-sm`: 2.25rem (36px) - Section headers

### Headings
- `text-heading-lg`: 2rem (32px) - Card titles, major sections
- `text-heading-md`: 1.5rem (24px) - Subsections
- `text-heading-sm`: 1.25rem (20px) - Minor headings

### Body Text
- `text-body-lg`: 1.125rem (18px) - Large body text
- `text-body-md`: 1rem (16px) - Standard body text
- `text-body-sm`: 0.875rem (14px) - Small body text
- `text-caption`: 0.75rem (12px) - Captions, labels

### Special Purpose
- `text-sanskrit`: 1.125rem (18px) - Sanskrit/Ayurvedic terms
- `clinical-data`: Monospace - Medical data, measurements

## Semantic Classes

### Healthcare-Specific
```css
.patient-name        /* Patient identification */
.diagnosis-text      /* Medical diagnoses */
.metric-value        /* Numerical health data */
.metric-label        /* Data labels */
.clinical-data       /* Tabular medical data */
```

### Content Structure
```css
.card-title          /* Card headers */
.card-subtitle       /* Card descriptions */
.section-header      /* Major section titles */
.subsection-header   /* Minor section titles */
```

### Cultural/Ayurvedic
```css
.sanskrit-text       /* Traditional Sanskrit text */
.ayurvedic-term      /* Highlighted Ayurvedic terms */
.dosha-label         /* Vata/Pitta/Kapha labels */
```

### Interactive Elements
```css
.link-text           /* Clickable links */
.button-text         /* Button labels */
.nav-item            /* Navigation items */
.nav-section         /* Navigation categories */
```

### Status & Alerts
```css
.success-text        /* Success states */
.warning-text        /* Warning states */
.error-text          /* Error states */
```

### Forms
```css
.form-label          /* Form field labels */
.form-description    /* Help text */
.form-error          /* Validation errors */
```

## Font Weights

| Weight | Value | Usage |
|--------|-------|-------|
| Light | 300 | Subtle text, disclaimers |
| Normal | 400 | Standard body text |
| Medium | 500 | Emphasized text, labels |
| Semibold | 600 | Headings, important text |
| Bold | 700 | Strong emphasis, titles |

## Letter Spacing

| Class | Value | Usage |
|-------|-------|-------|
| `tracking-tight` | -0.025em | Large headings |
| `tracking-normal` | 0em | Body text |
| `tracking-wide` | 0.025em | Labels, small text |
| `tracking-ayurvedic` | 0.035em | Sanskrit/cultural text |

## Usage Guidelines

### Do's
✅ Use `font-body` for all body text and UI elements
✅ Use `font-display` for headings and emphasis
✅ Use `font-devanagari` for Sanskrit terms
✅ Apply semantic classes for consistent styling
✅ Use tabular numbers for data display
✅ Maintain proper contrast ratios

### Don'ts
❌ Mix font families inconsistently
❌ Use display fonts for long text blocks
❌ Ignore cultural appropriateness for Sanskrit
❌ Use too many font weights in one design
❌ Compromise readability for aesthetics

## Examples

### Patient Card Header
```tsx
<h3 className="patient-name">Dr. Rajesh Kumar</h3>
<p className="card-subtitle">Ayurvedic Consultant</p>
```

### Dosha Information
```tsx
<span className="dosha-label">वात (Vata)</span>
<span className="ayurvedic-term">प्राण</span>
```

### Medical Data
```tsx
<div className="metric-value">72</div>
<div className="metric-label">Heart Rate (BPM)</div>
```

### Form Elements
```tsx
<label className="form-label">Patient Name</label>
<p className="form-description">Enter full legal name</p>
<span className="form-error">This field is required</span>
```

## Accessibility

- All text maintains WCAG AA contrast ratios
- Font sizes are responsive and scalable
- Line heights optimize readability
- Letter spacing enhances legibility
- Cultural fonts respect traditional usage

## Performance

- Fonts are loaded with `font-display: swap`
- Preconnect to Google Fonts for faster loading
- Fallback fonts ensure text remains visible
- Font feature settings optimize rendering

## Future Extensions

Consider adding:
- Additional Indic scripts (Tamil, Telugu, etc.)
- Variable font implementations
- Advanced OpenType features
- Regional language support