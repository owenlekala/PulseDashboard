# Design System Usage Guide

This document is the source of truth for how AI and developers should use the shared UI components in this repository.

Its purpose is consistency, not creativity for its own sake.

When editing or adding UI:
- Prefer existing shared components over one-off markup.
- Follow the composition patterns already established in `src/components/ui` and `src/components/shared`.
- Do not invent alternate visual systems when a shared one already exists.
- If a new pattern is truly needed, build it as a reusable shared component first.

## Core Principles

### 1. Reuse Before Reinventing
- Always check `src/components/ui`, `src/components/shared`, and relevant feature folders before writing new UI markup.
- If the same UI pattern appears in more than one place, extract or reuse a shared component.
- Avoid page-local “temporary” components unless the pattern is truly unique to that page.

### 2. Consistency Over Novelty
- This dashboard should feel like one product, not a collection of unrelated sections.
- Pages may differ in content, but not in component language.
- Use the same spacing, hierarchy, card structure, and interaction patterns throughout.

### 3. Thin Pages, Reusable Features
- Page files should mostly orchestrate data, state, and layout.
- Reusable UI and feature-specific presentation should live in shared or feature component folders.
- Avoid large pages filled with repeated card/table/filter markup.

### 4. Shared Tokens First
- Radius, colors, shadows, and surfaces are controlled centrally.
- Do not hardcode ad hoc visual values when theme tokens and shared classes already exist.
- If the system needs a new reusable visual token, add it centrally.

## Component Hierarchy

Use components in this order of preference:

1. `src/components/shared`
   - For app-wide reusable feature pieces such as headers, empty states, dialogs, and status badges.
2. `src/components/ui`
   - For low-level primitives and styling foundations such as buttons, inputs, cards, sheets, and tables.
3. `src/components/admin/...`
   - For admin-domain reusable pieces such as dashboard modules and users-page feature components.
4. Page-local markup
   - Only when the UI is unique and not reusable elsewhere.

### Preferred Shared Building Blocks
When these components fit the use case, prefer them over bespoke markup:
- `KpiCard` for dashboard/admin summary metrics
- `InlineTrend` for dashboard percentage and delta indicators
- `FilterToolbar` for utility-style filter sections
- `ActionMenu` for row and quick-action dropdowns
- `InfoList` for structured read-only detail blocks

## Glass Card Rules

`GlassCard` is a specific surface language in this app. It is not a generic wrapper to put around everything.

### What `GlassCard` Means
`GlassCard` is a two-layer card:
- Outer shell: subtle framed container using the shared neutral gray surface in light mode and the sidebar-toned surface in dark mode
- Inner content surface: inset content area via `GlassCardContent`
- Optional outer label strip: `outerTitle`

This pattern is meant for high-emphasis dashboard surfaces and reusable admin summary surfaces.

### When To Use `GlassCard`
Use `GlassCard` for:
- Dashboard stat cards
- Dashboard charts
- Dashboard timelines and activity modules
- Reusable summary cards on admin pages
- Feature panels that should visually feel like part of the dashboard system
- Data-heavy admin modules where the framed “outer shell + inner panel” structure helps hierarchy

### When Not To Use `GlassCard`
Do not use `GlassCard` for:
- Basic forms that only need a normal surface
- Filter panels and utility control sections
- Modal or drawer internals
- Small inline sections
- List items
- Tiny utility wrappers
- Places where a normal `Card` is enough

If the UI does not benefit from the outer-shell + inner-surface treatment, use `Card` instead.

### Correct `GlassCard` Composition
Preferred patterns:

#### Pattern A: Stat/Summary Card
Use this for KPI cards and compact metrics.

Structure:
- `GlassCard`
- Top outer strip using plain `<div className="px-4 pt-4 pb-2">`
- Small uppercase label in outer strip
- Optional badge or icon aligned right in the same strip
- `GlassCardContent`
- Main metric value
- Small supporting description

This is the preferred composition for dashboard stat cards and summary cards.

#### Pattern B: Labeled Module Card
Use this for larger dashboard modules.

Structure:
- `GlassCard outerTitle="..."`
- `GlassCardContent`
- `GlassCardHeader`
- `GlassCardTitle`
- `GlassCardDescription`
- Body content

This is the preferred composition for charts, timelines, top-products, and recent-activity modules.

### `GlassCard` Do
- Use `outerTitle` for section-level modules when appropriate.
- Use `GlassCardContent` as the main inset surface.
- Keep the interior clean and readable.
- Use the stat-card style when the card is primarily one value.
- Use the module-card style when the card contains richer content.
- Let `GlassCard` participate in full-height layouts. In grids or rows where cards should visually match height, keep the outer card and `GlassCardContent` as flex columns so the inset surface stretches with the tallest sibling.
- When a compact stat card has a value and supporting text, use a `flex h-full flex-col justify-between` inner layout so the bottom spacing stays consistent across uneven rows.

### `GlassCard` Don’t
- Don’t put a `GlassCardHeader` outside `GlassCardContent`.
- Don’t mix multiple competing card structures in the same section.
- Don’t wrap a `GlassCard` inside another `GlassCard`.
- Don’t fake the inset styling with custom `div` wrappers when `GlassCardContent` already provides it.
- Don’t create alternate versions of the same glass-card layout on different pages.
- Don’t use `GlassCard` for filters just because the page is in the dashboard area.

## Standard Card Rules

Use `Card` when you want a normal single-surface container.

Use `Card` for:
- Simple content blocks
- Form sections
- Utility dialogs where the outer-shell treatment is not needed
- Settings surfaces
- Standard information panels

Do not convert everything to `GlassCard`.

Rule of thumb:
- Use `GlassCard` for “dashboard system emphasis”
- Use `Card` for “standard app surface”

### Cards Are Optional
Not every grouped section needs a bordered card.

Use separators and spacing instead of `Card` when:
- the content already lives inside another strong surface such as a sheet, dialog, or existing panel
- you only need lightweight internal grouping between form sections
- adding another border would make the layout feel boxed in or repetitive
- the hierarchy is already clear through headings, spacing, and alignment

Prefer a separator-led structure for:
- side sheets and drawer forms
- stacked settings sections inside an existing surface
- lightweight read/edit groups where a full card adds noise

Do not wrap every subsection in its own card by default. If the border is not adding hierarchy, remove it and use headings plus `Separator` instead.

## Page Header Rules

Use `PageHeader` for top-of-page title areas.

Use it when a page needs:
- Title
- Optional description
- Optional back action
- Optional primary page action

### `PageHeader` Do
- Use `title` and `description` for every major admin page.
- Use `action` for the main page-level action only.
- Use `backHref` for simple route-based back navigation.

### `PageHeader` Don’t
- Don’t create custom page-title sections unless the page has a strong, justified need.
- Don’t place multiple competing primary actions in the header.
- Don’t replace `PageHeader` with random `div` + `h1` markup on admin pages.

## Data Table Rules

`DataTable` is the shared admin table pattern. Use it instead of rebuilding table controls.

### Use `DataTable` For
- Admin listing pages
- Searchable/filterable collections
- Bulk actions
- Exportable tables
- Row-click detail flows

### `DataTable` Do
- Pass reusable `columns`
- Use `searchFields` to control search behavior
- Use `statusFilterOptions` when the page has a status concept
- Use `emptyState` to provide context-aware recovery when no rows match
- Use `onRowClick` for drill-down flows
- Use `meta` for row-level actions that need page-owned handlers

### `DataTable` Don’t
- Don’t fork the table layout per page unless absolutely necessary
- Don’t duplicate search/filter/export chrome outside the shared table without a strong reason
- Don’t add per-page visual hacks to make the table look different from the rest of the admin system

## Filters Rules

Filters should be reusable and page-owned via state orchestration.

### Correct Pattern
- Page owns filter state
- Reusable feature filter component renders controls
- Data filtering logic lives in the page or a page-level hook
- Shared primitives power the controls

### Do
- Use `Input`, `Select`, `DatePicker`, and `DateRangePicker`
- Provide a clear reset path
- Keep filters visually grouped
- Make filters meaningful to the page domain

### Don’t
- Don’t stuff page-specific filter logic into low-level UI primitives
- Don’t create filter bars with raw HTML controls when shared inputs exist
- Don’t scatter filters across multiple unrelated card sections unless the page truly demands it

## Empty State Rules

Use `EmptyState` whenever a page or table reaches a zero-results or no-content situation.

### Use It For
- No filtered results
- No initial records
- No available items for a module
- “Nothing yet” surfaces that should tell the user what to do next

### Empty State Do
- Explain what is missing
- Explain why the user might be seeing it
- Offer one clear next action

### Empty State Don’t
- Don’t leave blank areas
- Don’t use generic “No data” text if you can be more specific
- Don’t bury the recovery action

## Badge and Icon Rules

### Icons
- Icons should usually be plain icons, not icons inside decorative colored pills, unless there is a strong meaning for that container.
- If the icon is already aligned with a metric or header, keep it simple.
- Prefer a plain colored icon over a tinted icon background for summary-card top-right markers.
- Use `@mingcute/react` as the default icon library across the project.
- Prefer MingCute `Line` icons for general UI actions and lighter interface chrome.
- Prefer MingCute `Fill` icons where the UI benefits from stronger emphasis, such as sidebar navigation, selected states, or dense primary navigation surfaces.
- Do not introduce new `lucide-react` or Heroicons usage for product UI when a MingCute equivalent exists.
- Only keep or use another icon library when MingCute does not provide a suitable icon and consistency would not be harmed.

### Badges
Use badges when the UI needs to communicate:
- status
- change
- categorization
- alert level

Do not use badges:
- just to decorate
- as icon containers when no badge meaning exists

If the badge is not carrying semantic label value, a plain icon is usually better.

### Dashboard Percentage Indicators
- Percentage/change indicators in dashboard glass cards should not use tinted background fills.
- Do not use `Badge` or chip-style components for dashboard percentage indicators.
- Prefer flat, low-noise styling: colored text, optional icon, no decorative chip background, and no chip padding.
- Use stronger badge backgrounds only when the indicator needs to communicate a distinct semantic state beyond simple trend/change.

## Tables, Charts, and Dashboard Modules

### Charts
Charts on the dashboard should use:
- `GlassCard`
- optional `outerTitle`
- `GlassCardContent`
- `GlassCardHeader`
- title/description
- chart body beneath header

### Activity Modules
Recent activity, timelines, and operational lists should:
- use the module-card composition
- keep consistent internal row spacing
- use badges only for actual status meaning

### Summary Rows
Summary cards in rows should:
- all use the same composition
- not mix header styles
- not mix icon-only cards and badge-heavy cards without intent
- use plain colored icons or flat percentage indicators unless semantic badge styling is truly needed

## Buttons and Inputs

### Buttons
Use shared `Button` variants:
- `default` for primary action
- `outline` for secondary action
- `ghost` for low-emphasis action
- `destructive` only for destructive actions

Do not create custom button visuals when an existing variant works.

### Inputs
Use shared input primitives:
- `Input`
- `Textarea`
- `Select`
- `DatePicker`
- `DateRangePicker`
- `InputGroup` where the composition needs addons/icons

Do not manually restyle inputs page by page unless there is a strong contextual reason.

## Layout and Spacing Rules

### Use Existing Rhythms
Common patterns already used in this repo:
- Page sections: `space-y-6` or `space-y-8`
- Dashboard grids: `gap-4`
- Card inner spacing: use shared card content components

### Do
- Keep section spacing consistent across sibling modules
- Use grid layouts similar to existing admin pages
- Respect the shared surface padding from `CardContent` and `GlassCardContent`

### Don’t
- Don’t manually add random padding wrappers inside a shared component when the component already defines its spacing
- Don’t collapse spacing just to fit more items on screen unless the design explicitly needs density

## What AI Must Do Before Adding UI

Before writing new UI, AI should:
1. Check whether a shared component already exists.
2. Decide whether the surface should be `Card` or `GlassCard`.
3. Decide whether the section needs a card at all, or whether headings plus `Separator` would create a cleaner layout.
4. Keep page files thin and move reusable pieces into feature/shared components.
5. Prefer consistency with current dashboard/admin patterns over experimentation.

## What AI Must Not Do

AI must not:
- invent new card systems when `GlassCard` or `Card` already fits
- mix multiple visual patterns for the same type of content on the same page
- replace shared components with custom raw markup without reason
- put icon backgrounds everywhere just for decoration
- create alternative versions of page headers, empty states, or tables when shared ones exist
- introduce one-off styling that breaks the current visual language

## Decision Cheatsheet

### Use `GlassCard` when:
- this is a dashboard/stat/module surface
- the outer-shell + inset-surface treatment adds hierarchy
- it should feel like part of the premium admin system

### Use `Card` when:
- this is a standard content panel
- the UI only needs a simple single-surface container
- extra framing would feel heavy or unnecessary

### Use `Separator` with plain layout when:
- the section is inside a sheet, drawer, dialog, or existing panel
- you need lightweight grouping rather than another visual container
- headings and spacing already provide enough structure

### Use a plain icon when:
- the icon is only an accent marker
- the icon is already paired with text and layout hierarchy
- a badge background would add noise

### Use a badge when:
- the element communicates semantic status or change
- users should read the badge as labeled meaning, not decoration

## Future Maintenance Rule

If a future implementation conflicts with this file:
- update the implementation to match this guide, or
- update this guide only if the design system itself has intentionally changed

Do not silently drift away from the shared rules.

This document should remain aligned with the real component system in:
- `src/components/ui`
- `src/components/shared`
- `src/components/admin`
