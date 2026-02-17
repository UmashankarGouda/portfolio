## Umashankar S Gouda – Portfolio

A modern, animated developer portfolio built with React, Vite, Tailwind CSS, and motion libraries. It showcases my experience, skills, projects, open‑source work, achievements, and a visual gallery in a single‑page, theme‑aware layout.

---

## ✨ Features

- Light/dark theme with smooth toggle and persistent preference (saved in localStorage)
- Hero section with strong visual identity and call‑to‑action
- About section describing background, interests, and what I work on
- Skills overview for core technologies and tools
- Experience and Certifications with interactive/3D card effects
- Open Source section highlighting contributions
- Projects grid for personal, academic, and hackathon work
- Achievements timeline/cards for awards and milestones
- Photo gallery for visual highlights
- Contact section to reach out plus social links

---

## 🧰 Tech Stack

- React (Vite) – SPA bootstrapping and fast dev experience
- Tailwind CSS v4 – utility‑first styling and custom theme tokens
- Framer Motion – section and card animations
- GSAP / @gsap/react – advanced motion and scroll‑based effects
- OGL / 3D card components – subtle 3D/tilt interactions
- lucide-react – icon set
- react-github-calendar – GitHub contribution visualisation

---

## 🚀 Getting Started

### Prerequisites

- Node.js (LTS recommended)
- npm, pnpm, or yarn

### Clone the repository

```bash
git clone https://github.com/UmashankarGouda/portfolio.git
cd portfolio
```

### Install dependencies

```bash
npm install
# or
pnpm install
# or
yarn
```

### Run the development server

```bash
npm run dev
```

Then open the URL printed in the terminal (usually http://localhost:5173).

### Build for production

```bash
npm run build
```

To preview the production build locally:

```bash
npm run preview
```

---

## 📁 Project Structure (high level)

- `src/main.jsx` – React entry point
- `src/App.jsx` – Main layout wiring all sections
- `src/context/ThemeContext.jsx` – Light/dark theme state and provider
- `src/components/layout` – Navbar, footer, layout‑level components
- `src/components/sections` – Hero, About, Skills, Open Source, Experience, Certifications, Projects, Achievements, Photo Gallery, Contact
- `src/components/ui` – Reusable UI building blocks (3D cards, flip cards, text/transition effects, theme toggle, cursor, etc.)
- `src/index.css` – Tailwind and global theme configuration

Assets such as images (avatar, gallery, etc.) live under `public/assets`.

---

## 🛠 Available Scripts

From `package.json`:

- `npm run dev` – Start Vite dev server
- `npm run build` – Create production build in `dist`
- `npm run preview` – Preview the production build locally
- `npm run lint` – Run ESLint across the project

---

## 📦 Deployment

Any static hosting that supports a Vite build will work:

1. Build the app with `npm run build`.
2. Deploy the generated `dist` folder to platforms like Vercel, Netlify, GitHub Pages, or any static file host.

Consult your chosen platform’s guide for Vite/React deployments.

---

## 📬 Contact

If you’d like to collaborate, discuss an opportunity, or provide feedback on this portfolio, feel free to reach out via the Contact section on the site or through the social links provided there.
