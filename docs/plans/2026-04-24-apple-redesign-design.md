# DevFox AI Apple-Style Redesign

## Design Direction
- **Brand tone**: High-end restrained (Apple pure)
- **Visual**: Agent interface screenshots + animations as hero visuals
- **Sections**: 3 full-viewport blocks
- **Color rhythm**: Black → Gray → Black

## Section Layout

### 1. Hero (Black #000000, ~100vh)
- One headline: "DevFox AI" at 56px SF Pro Display weight 600, line-height 1.07
- One subtitle at 21px describing the value proposition
- Two pill CTAs: Apple Blue filled + transparent outline
- Agent interface screenshot centered below (rounded 12px, subtle shadow)
- No gradient backgrounds, no signal cards, no pipeline panels

### 2. Product Showcase (Light Gray #f5f5f7, auto height)
- Section title at 40px #1d1d1f, centered
- 3-column grid (desktop), 2-column (tablet), 1-column stacked (mobile)
- Each card: white #ffffff bg, no border, 8px radius, no hover
- Card structure: interface screenshot (60%) + name + description + "Learn more >" link
- Products: GrowthPilot, Smart Sales, ContentForge

### 3. CTA (Black #000000, ~60vh)
- Headline at 56px white, centered
- Subtitle at 21px rgba(255,255,255,0.8)
- Two pill CTAs: Apple Blue + white outline

## Navigation
- 48px height, full-width
- rgba(0,0,0,0.8) + backdrop-filter: saturate(180%) blur(20px)
- 12px SF Pro Text, white
- Items: Home, Products, About, Contact

## Design Tokens (from DESIGN-apple.md)
- Primary black: #000000
- Light gray: #f5f5f7
- Near black text: #1d1d1f
- Apple Blue: #0071e3
- Link blue (light bg): #0066cc
- Link blue (dark bg): #2997ff
- Pill radius: 980px
- Card radius: 8px
- Headline: 56px/40px SF Pro Display weight 600
- Body: 17px/14px SF Pro Text
