# GenXEraAI — Official Platform & Internship Portal

> **Where Curiosity Meets Clarity.**  
> High-performance, SEO-optimized official web portal for **GenXEraAI**, offering 12 specialized industry-grade internship programs, hands-on project roadmaps, live evaluation operations, and verifiable digital credentials.

[![Build Status](https://img.shields.io/badge/Build-Passing-10b981?style=for-the-badge&logo=vite)](https://www.genxeraai.com)
[![Vercel Ready](https://img.shields.io/badge/Vercel-Production%20Ready-000000?style=for-the-badge&logo=vercel)](https://vercel.com)
[![SEO Ready](https://img.shields.io/badge/SEO-100%25%20Optimized-3b82f6?style=for-the-badge&logo=google)](https://www.genxeraai.com/sitemap.xml)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.9-3178c6?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org)

---

## 🌟 Key Features

- **🚀 Ultra-Fast Responsive Experience**: Clean glassmorphism styling, dark/light theme switching, and optimized micro-interactions.
- **🎓 12 Specialized Internship Tracks**:
  1. `AI / ML` — Machine learning algorithms, deep learning, PyTorch, and generative AI.
  2. `Data Science` — Predictive modeling, exploratory data analysis, and business intelligence.
  3. `Cloud (Azure / AWS)` — Cloud infrastructure, serverless architectures, and scalability.
  4. `DevOps` — CI/CD automation, Docker containers, and infrastructure as code.
  5. `Salesforce` — CRM architectures, Apex, Lightning Web Components, and enterprise automations.
  6. `Python Full Stack` — Web application development with Python, Django/FastAPI, and modern frontends.
  7. `Java Full Stack` — Enterprise services with Spring Boot and reactive client architectures.
  8. `Full Stack Web` — Modern responsive web apps with TypeScript, React, and RESTful APIs.
  9. `IoT` — Microcontroller integration, sensor telemetry, and cloud connectivity.
  10. `Embedded Systems` — Firmware programming, RTOS, and low-level hardware controllers.
  11. `VLSI` — Digital IC design, Verilog HDL synthesis, and semiconductor workflows.
  12. `Final Year Offline` — Academic major project engineering, IEEE documentation, and viva defense coaching.
- **⚡ Deep Internal Back-linking & Cross-Track Discovery**: Bidirectional links, semantic breadcrumb navigation, and an "Explore Other Tracks" discovery grid across all 12 tracks to boost organic page rank flow and user retention.
- **📈 Complete Search Engine Optimization (SEO)**:
  - Valid XML Sitemap with all 13 canonical URLs (`https://www.genxeraai.com/sitemap.xml`).
  - Search engine directives in `robots.txt`.
  - Comprehensive OpenGraph and Twitter Card metadata for rich link previews on WhatsApp, LinkedIn, X/Twitter, and Facebook.
  - JSON-LD Structured Data Schema (`EducationalOrganization`, `Course`, `WebSite`, `ItemList`).
- **💬 Direct WhatsApp Admissions Integration**: Direct one-tap routing to WhatsApp Admissions Counselor (`+91 93905 60407`) with program-specific pre-filled messages.
- **🛡️ Integrated Legal Modals**: Accessible dialogs for Privacy Policy, Terms of Service, and Security guarantees.

---

## 📁 Repository Structure

```
.
├── artifacts/
│   ├── genxeraai-home/              # Main production frontend application
│   │   ├── index.html               # Homepage with Hero, Bento Grid, 12 Tracks & Contact
│   │   ├── internship.html          # Dynamic program track template
│   │   ├── script.js                # Core interactive client logic & theme management
│   │   ├── internship.js            # 12-track data engine, dynamic SEO, and curriculum render
│   │   ├── style.css                # Custom modern design system & glassmorphism theme
│   │   ├── assets/logos/logo.png    # Official high-resolution brand asset
│   │   ├── public/
│   │   │   ├── sitemap.xml          # Search engine XML sitemap
│   │   │   ├── robots.txt           # Crawler instructions linking to sitemap
│   │   │   └── favicon.svg          # Brand favicon
│   │   ├── vite.config.ts           # Production build configuration with route rewrites
│   │   └── package.json             # Package dependencies and scripts
│   ├── api-server/                  # Optional backend API server
│   └── mockup-sandbox/              # UI testing environment
├── scripts/
│   ├── test-robot.mjs               # Automated robot testing and verification suite
│   └── setup-git.mjs                # Environment automation script
├── vercel.json                      # Vercel deployment configuration with SPA rewrites
├── pnpm-workspace.yaml              # Monorepo workspace configuration
├── package.json                     # Monorepo root scripts
└── README.md                        # Documentation
```

---

## 🚀 One-Click Hosting on Vercel

This repository is **100% Vercel-ready** and can be directly imported without manual configuration.

### Option A: Standard Import (Recommended)
1. Go to your [Vercel Dashboard](https://vercel.com/new).
2. Click **Import Project** and select `Mahesh33053/Genxeraai`.
3. Keep default settings:
   - **Framework Preset**: Other (or Vite)
   - **Root Directory**: `./` (leave default)
   - **Build Command**: Automatically handled by `vercel.json` (`pnpm --filter @workspace/genxeraai-home run build`)
   - **Output Directory**: Automatically handled by `vercel.json` (`artifacts/genxeraai-home/dist/public`)
4. Click **Deploy**. Vercel will install dependencies, build the distribution bundle, and publish the site.

### Option B: Subdirectory Root Import
If you set the Vercel **Root Directory** setting to `artifacts/genxeraai-home`:
- Vercel will read `artifacts/genxeraai-home/vercel.json`.
- Build Command: `vite build --config vite.config.ts`
- Output Directory: `dist/public`

---

## 🔐 Environment Variables

Copy `.env.example` to `.env` or set these in your **Vercel Project Settings > Environment Variables**:

| Variable | Description | Default |
| :--- | :--- | :--- |
| `PORT` | Local preview server port | `3000` |
| `BASE_PATH` | Base URL path for assets | `/` |
| `VITE_SITE_URL` | Canonical public URL | `https://www.genxeraai.com` |
| `VITE_WHATSAPP_NUMBER` | Admissions WhatsApp phone number | `919390560407` |
| `VITE_SUPPORT_EMAIL` | Official support email | `genxeraai@gmail.com` |

---

## 💻 Local Development

### 1. Prerequisites
- **Node.js**: v20 or higher
- **pnpm**: v9 or higher (`npm install -g pnpm`)

### 2. Installation
```bash
# Clone the repository
git clone https://github.com/Mahesh33053/Genxeraai.git
cd Genxeraai

# Install all workspace dependencies
pnpm install
```

### 3. Run Development Server
```bash
# Start frontend dev server
pnpm --filter @workspace/genxeraai-home run dev:local
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### 4. Run Automated Robot Audit
```bash
node ./scripts/test-robot.mjs
```
Validates core files, link integrity, track slugs, sitemap URLs, robots.txt, and metadata tags with zero errors.

### 5. Production Build & Preview
```bash
# Typecheck and build all workspace packages
pnpm run build

# Preview production build locally
pnpm --filter @workspace/genxeraai-home run serve
```

---

## 📞 Support & Inquiries

- **WhatsApp Admissions**: [+91 93905 60407](https://wa.me/919390560407)
- **Email**: [genxeraai@gmail.com](mailto:genxeraai@gmail.com)
- **Instagram**: [@genxeraai](https://www.instagram.com/genxeraai/)
- **Campus Base**: Praneeth Colony, Krishnareddypet, Beeramguda, Hyderabad, Telangana 502319

---

© 2025–2026 GenXEraAI. All rights reserved.
