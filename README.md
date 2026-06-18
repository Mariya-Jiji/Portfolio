# Mariya Jiji — Developer Portfolio

A dark-themed personal portfolio for **Mariya Jiji** — B.Tech Computer Science Engineering student at FISAT (Federal Institute of Science and Technology), specializing in Java Full Stack Development.

Built with **React + TypeScript + Vite + Tailwind CSS + Framer Motion**. Designed for one-click deployment on **Vercel**.

## Stack
- React 18 / TypeScript
- Vite (build tool)
- Tailwind CSS (utility-first styling)
- Framer Motion (animations + scroll effects)
- Lucide React (icons)

## Sections
1. **Hero** — name, animated tagline, background video, social links
2. **About** — bio, skills grouped by Languages / Frontend / Backend / Database / Tools / Fundamentals, education timeline
3. **Achievements** — certifications including NPTEL (IIT Kharagpur), IBM Node.js, React Development, Blockchain & Ethereum, GenAI Workshop, Horizon.Hack() Hackathon
4. **Projects** — HomeEase App (service platform with JWT auth, real-time provider tracking)
5. **Contact** — Email, Phone, LinkedIn, GitHub, HackerRank

## Run locally
```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # production build → /dist
npm run preview  # serve /dist locally
```

## Project structure

src/

├── App.tsx                    # composes all sections

├── main.tsx                   # React entry

├── index.css                  # global styles

└── components/

├── HeroSection.tsx        # navbar, name, video background, social links

├── AboutSection.tsx       # bio, skills, education timeline

├── ServicesSection.tsx    # achievements & certifications

├── ProjectsSection.tsx    # project cards

├── ContactSection.tsx     # contact methods with icons

│

├── ContactButton.tsx      # gradient pill CTA

├── LiveProjectButton.tsx  # ghost outline pill

├── FadeIn.tsx             # whileInView animation wrapper

└── CursorTrail.tsx        # mouse-following particle trail
