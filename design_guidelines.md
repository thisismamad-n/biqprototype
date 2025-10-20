# Business Growth Blueprint - Design Guidelines

## Design Approach
**Selected Approach**: Custom Design System with Gamification Elements
- Drawing inspiration from productivity tools like Linear and Notion for clean interfaces
- Incorporating gamification patterns from progress-tracking apps
- Focus on visual feedback and smooth state transitions
- Minimal aesthetic with strategic use of color for progress indication

## Core Design Elements

### A. Color Palette

**Base Colors**:
- Background: 0 0% 100% (pure white)
- Surface: 220 20% 98% (soft cool gray)
- Border: 220 13% 91% (subtle gray borders)
- Text Primary: 220 9% 16% (dark charcoal)
- Text Secondary: 220 9% 46% (medium gray)

**Section State Colors** (Pastel palette for the 8 business sections):
- Strategy: 210 60% 85% (soft blue)
- Operations: 160 55% 85% (mint green)
- HR: 200 65% 88% (light sky blue)
- Branding: 340 60% 88% (soft pink)
- Finance: 45 75% 85% (pale gold)
- Product: 280 55% 88% (lavender)
- Sales: 140 50% 85% (sage green)
- Technology: 260 60% 88% (periwinkle)
- Legal: 20 60% 88% (soft coral)

**Interactive States**:
- Greyed Out/Inactive: 220 10% 75% (desaturated gray)
- Hover Overlay: 0 0% 0% at 5% opacity
- Active/Selected: Increase saturation by 15%

**Health Indicators**:
- Healthy (Green): 140 70% 55%
- Needs Work (Yellow): 45 95% 55%
- Incomplete (Red): 0 70% 60%

### B. Typography

**Font Stack**: 
- Primary: 'Inter', -apple-system, system-ui, sans-serif
- Accent/Numbers: 'DM Sans', sans-serif

**Type Scale**:
- Hero/Center Label: text-2xl font-bold (24px)
- Section Labels: text-lg font-semibold (18px)
- Subsection Titles: text-base font-medium (16px)
- Body Text: text-sm (14px)
- Metadata/Progress: text-xs font-medium (12px)
- AI Tips: text-sm leading-relaxed

### C. Layout System

**Spacing Units**: Use Tailwind units of 2, 4, 6, 8, 12, 16, 20, 24
- Component padding: p-6 or p-8
- Section gaps: gap-6 or gap-8
- Card padding: p-6
- Margins between major sections: mb-12 or mb-16

**Grid Structure**:
- Main container: max-w-7xl mx-auto px-6
- Petal Diagram Area: Centered, min-height of 600px, scales responsively
- Sidebar Width: w-96 (384px) fixed on desktop, full-width drawer on mobile

### D. Component Library

**Central Petal Diagram**:
- SVG-based with 8 petals radiating from center circle
- Center circle: 100px diameter with "Business" label
- Petals: Follow provided SVG shape pattern, extend 150px from center
- Default state: Greyed out with 40% opacity
- Filled state: Full color with 100% opacity, subtle glow effect
- Interactive: Scale to 1.05 on hover, drop-shadow-lg
- Smooth transitions: 300ms cubic-bezier easing

**Progress Indicators**:
- Circular progress rings around subsection items (stroke-dasharray animation)
- Percentage badges with rounded-full shape
- Mini health dots (8px diameter) with pulse animation for incomplete items
- Overall progress bar at top: h-2 with rounded-full and gradient fill

**Business Health Meter**:
- Dashboard card with grid layout showing all 8 departments
- Each department: Icon + name + health dot + completion percentage
- Overall health score: Large circular chart (120px) with animated arc
- Color-coded segments matching health indicator colors
- Position: Sticky top-right panel or collapsible drawer

**AI Tips Sidebar**:
- Fixed position panel with overflow-y-auto
- Card-based layout with rounded-2xl and shadow-lg
- Each tip: Icon (lightbulb/sparkles) + heading + description
- Background: Surface color with subtle gradient overlay
- Contextual updates: Fade-in animation when section changes (400ms)

**Expandable Section Views**:
- Modal overlay with backdrop-blur-sm and bg-black/20
- Content panel: Slides in from right (translate-x animation)
- Width: max-w-2xl on desktop
- Subsection grid: 2 columns on desktop, 1 on mobile
- Each subsection card: Rounded-xl, p-6, with hover lift effect
- Form inputs: Rounded-lg borders, focus:ring-2 with section color

**Form Elements**:
- Input fields: h-11 rounded-lg border-2 with section-color focus states
- Textareas: min-h-32 rounded-lg
- Buttons: Rounded-lg with section-themed colors
- Toggle switches: For binary options within subsections
- Auto-save indicator: Small checkmark with fade-in animation

**Navigation & Controls**:
- Top bar: Sticky with backdrop-blur-md, shows current section breadcrumb
- Close/Back buttons: Ghost style with hover:bg-gray-100
- Save button: Filled with section color, includes success state animation

### E. Animations

**Micro-interactions** (use sparingly):
- Petal expansion: Scale + opacity transition (300ms)
- Health meter updates: Smooth arc animation with spring physics
- Progress bar fills: Linear with 500ms duration
- Card hover: Subtle lift (translateY -2px) + shadow increase
- Modal entry/exit: Slide + fade combination (400ms)
- AI tip updates: Crossfade between tips (300ms)
- Success states: Gentle bounce + color pulse

**Prohibited**:
- Excessive rotating animations
- Continuous looping animations
- Background particles or ambient animations

### F. Interaction Patterns

**Petal Click Flow**:
1. User clicks greyed-out petal
2. Petal scales slightly, modal slides in from right
3. Subsections display in grid with staggered fade-in (50ms delay between items)
4. User fills information, auto-save triggers
5. On close, petal transitions to colored state with subtle glow pulse

**Progress Tracking**:
- Real-time updates as user completes subsections
- Visual feedback: Progress ring fills, health dots change color
- Overall meter recalculates with smooth animation
- Completion celebration: Confetti effect when section reaches 100%

**Responsive Behavior**:
- Desktop (lg+): Sidebar visible, petal diagram full size
- Tablet (md): Sidebar becomes drawer, diagram scales to 80%
- Mobile: Full-screen petal view, sidebar as bottom sheet, stacked layout

### G. Accessibility

- Petal diagram includes ARIA labels for each section
- Keyboard navigation: Tab through petals, Enter to expand
- Focus indicators: 3px outline with section color
- Screen reader announcements for progress updates
- Minimum touch target: 44x44px for all interactive elements
- Color contrast: Maintain WCAG AA standard (4.5:1 for text)

### H. Professional Polish

- Subtle gradient overlays on cards (top-to-bottom, 5% opacity variation)
- Soft shadows: Use shadow-sm, shadow-md, shadow-lg strategically
- Rounded corners: Consistent rounded-xl (12px) for cards, rounded-lg (8px) for inputs
- Loading states: Skeleton screens with shimmer effect for data-heavy sections
- Empty states: Friendly illustrations with encouraging copy
- Tooltips: Small, rounded-lg with arrow, appear on hover (200ms delay)