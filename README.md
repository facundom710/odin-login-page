# Vardheim's Personal Authentication System

![Vardheim Logo](./assets/img/vardheim_banner.png)

> A cyberpunk/sci-fi terminal authentication interface and dashboard built with vanilla HTML5, CSS3, and JavaScript as part of **The Odin Project** curriculum.

*Para la versión en español de este archivo, consulte [README_ES.md](README_ES.md).*

---

## Table of Contents

- [About This Project](#about-this-project)
- [Structures Used](#structures-used)
- [Resources Used](#resources-used)
- [What I Learned From This Project](#what-i-learned-from-this-project)

---

## About This Project

The **Vardheim Personal Authentication System** is a frontend web application developed for the *Sign-up Form* project in **The Odin Project** (Intermediate HTML and CSS / JavaScript path). 

Instead of building a conventional generic form, this project is designed with an immersive sci-fi terminal aesthetic inspired by the aesthetics of the Federal Bureau Of Control in the [Control](https://en.wikipedia.org/wiki/Control_(video_game)) videogame by Remedy Entertaiment. The design it's a representation of restricted research facilities and command consoles.

### Key Features

- **Dynamic Multi-Form Interface**: Seamless switching between **Log In**, **Sign Up**, and **Password Recovery** views inside a single container without full page reloads.
- **Declarative Field Generation**: Form inputs, labels, and SVG icons are programmatically rendered from JavaScript data configurations, keeping the markup modular and *DRY* ([*Don't Repeat Yourself*](https://en.wikipedia.org/wiki/Don%27t_repeat_yourself)).
- **Custom Client-Side Form Validation**: Real-time validation combining the browser's native **HTML5 Constraint Validation API** with custom rules (e.g., regex patterns, disallowing digits in names, mandatory email domains, and matching password confirmations).
- **In-Memory User Simulation**:
  - Generates custom employee IDs (format: `123-456`) upon successful registration.
  - Enforces uniqueness constraints on emails and phone numbers.
  - Authenticates credentials against registered users in memory.
  - Simulates password recovery by locating existing accounts via email.
  - *Runtime Data Note*: Because all user data is generated and stored in runtime memory (cache), records are cleared when navigating or switching between pages.
- **System Terminal Dashboard**: Successful authentication navigates to an operational terminal (`dashboard.html`) showcasing active employee clearance data, real-time subsystem telemetry, and a session termination mechanism.

---

## Structures Used

The application is structured around a modular separation of concerns across files, markup, presentation, and logic:

### 1. File & Directory Organization

```text
odin-login-page/
├── assets/
│   ├── fonts/
│   │   └── SometypeMono-SemiBold.ttf    # Monospace typography
│   └── img/
│       ├── background.png               # Visual background texture
│       ├── vardheim_isotipe.svg         # Favicon / brand mark
│       └── vardheim_logo.svg            # Header facility logo
├── licences/
│   ├── BOOTSTRAP_ICONS.txt              # MIT License for SVG icons
│   └── OFL_SOMETYPE_MONO.txt            # SIL OFL License for font
├── scripts/
│   ├── forms_managment.js               # Form rendering, validation & event handling
│   └── users_managment.js               # User data store, registration & auth operations
├── styles/
│   ├── dashboard_styles.css             # Terminal dashboard layout and cards
│   └── index_styles.css                 # Login / signup form controls and states
├── dashboard.html                       # Protected terminal interface
├── index.html                           # Main authentication portal
├── README.md                            # Project documentation
└── styles.css                           # Global resets, CSS variables & typography
```

### 2. JavaScript & Data Architecture

- **Declarative Form Schema**:
  - Fields are defined as arrays of configuration objects (`signupFields`, `passwFields`, `loginFields`).
  - Each field definition encapsulates its `label`, `id`, `type`, inline SVG `icon`, and constraint rules (`validation: { minlength, maxlength, pattern }`).
- **Template Rendering Pipeline**:
  - Modular helper functions (`createField`, `createRow`, `createRequirements`) convert declarative configuration objects into semantic HTML template literals.
  - A view controller (`actualForm` tracker) dynamically renders views via `loadLogin()`, `loadSignup()`, and `loadRecoverpass()`.
- **Event Delegation**:
  - Instead of attaching individual listeners to inputs that are dynamically mounted and unmounted, event listeners for `focusout`, `input`, and `submit` are attached to the static `<form>` element.
- **Validation Engine**:
  - Intercepts default form submission (`event.preventDefault()`).
  - Leverages `input.validity` (`valueMissing`, `typeMismatch`, `patternMismatch`, `tooShort`, `tooLong`) and combines it with custom business logic (e.g., cross-field password matching, no-digit name validation).
  - Toggles CSS state classes (`.invalid`) and updates dynamic error descriptions with live feedback.
- **Data Management & In-Memory Store**:
  - `users_managment.js` maintains an in-memory user collection (`users = []`).
  - Provides modular methods: `registerUser()`, `loginUser()`, `recoverPassword()`, and `generateId()`.
  - Since data is generated and retained in runtime memory (cache), all stored records are cleared when switching between pages.

### 3. HTML5 Semantic & Accessibility Structure

- Semantic landmark elements: `<main>`, `<section>`, `<header>`, `<form novalidate>`, `<fieldset>`, and `<footer>`.
- Associated labels using `<label for="...">` matching input IDs.
- Screen-reader friendly indicators: `aria-live="polite"` on `.error-msg` elements for non-intrusive error announcements, and `aria-hidden="true"` on decorative SVG icons.

### 4. CSS Architecture & Design System

- **Modern CSS Reset**: Box-sizing inheritance, margin/padding normalization, and typography smoothing.
- **Design Tokens with CSS Custom Properties**: Centralized `:root` palette for dark surfaces (`--dark`, `--dark2`, `--dark3`), typography colors (`--main-txt`, `--second-txt`), and operational accent indicators (`--green`, `--red`).
- **Modern Selectors & Layout**:
  - Flexbox layouts for dynamic rows and alignment.
  - Modern pseudo-classes like `:has(input:user-invalid)` to style container borders conditionally based on input state.
  - Custom font loading via `@font-face`.

---

## Resources Used

- **Typography**:
  - [Sometype Mono](https://github.com/googlefonts/sometype-mono) by The Sometype Mono Project Authors (Licensed under the [SIL Open Font License 1.1](licences/OFL_SOMETYPE_MONO.txt)).
- **Icons & Images**:
  - [Bootstrap Icons](https://icons.getbootstrap.com/) by The Bootstrap Authors (Licensed under the [MIT License](licences/BOOTSTRAP_ICONS.txt)), embedded as inline SVG vectors for performance and styling flexibility.
  - Background image generated with [ChatGPT (GPT-6 Luna Model)](https://chatgpt.com/) by [OpenAI](https://openai.com/).
- **Curriculum & Guidelines**:
  - [The Odin Project](https://www.theodinproject.com/) — *Sign-up Form* project brief and requirements. **It should be noted that this project does not adhere strictly to the assignment's exact specifications, extending far beyond the scope proposed in the curriculum.**
- **Web Standards & APIs**:
  - HTML5 Form Constraint Validation API (`ValidityState`).
  - JavaScript `FormData` API and ES6+ features (template literals, arrow functions, array methods like `.map()`, `.some()`, and `.find()`).

---

## What I Learned From This Project

1. **Mastering Client-Side Form Validation**:
   - Gained a deep understanding of combining native HTML5 constraint attributes (`required`, `pattern`, `minlength`, `maxlength`) with the JavaScript `ValidityState` API (`v.valueMissing`, `v.typeMismatch`, etc.).
   - Implemented custom validation logic (such as checking password matching in real time and rejecting numeric values in name fields) while suppressing annoying browser defaults with `novalidate`.

2. **Event Delegation on Dynamic Elements**:
   - Learned why binding event listeners directly to dynamic elements causes memory leaks or missed bindings, and how to use event delegation on parent containers (`form.addEventListener('focusout', ...)`) using `event.target.matches(...)`.

3. **Building Declarative UI Components with Vanilla JS**:
   - Discovered how to separate UI configuration data from DOM rendering logic, using data arrays and pure mapping functions to render and switch complex form states cleanly.

4. **Simulating Authentication & Runtime State**:
   - Understood the fundamentals of client-side user management: unique ID generation, validating credentials against in-memory records, and managing the lifecycle of runtime cached data when navigating between pages.

5. **Crafting Thematic, Accessible Web Experiences**:
   - Learned how to apply a consistent visual aesthetic through CSS variables, custom typography, and terminal-style iconography without compromising accessibility (`aria-live`, semantic landmarks, explicit `<label>` bindings).
