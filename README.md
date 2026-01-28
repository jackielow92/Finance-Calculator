# Finance Calculator

A modern, responsive financial calculator suite designed for Malaysians. Built with React, TypeScript, and Tailwind CSS featuring a beautiful neumorphic design.

**Live Demo:** https://jackielow92.github.io/Finance-Calculator/

---

## What is this project?

Finance Calculator is a comprehensive web application that helps Malaysian professionals with three essential financial planning tools:

1. **Compound Interest Calculator** - Plan your investments with customizable parameters for initial investment, monthly contributions, annual top-ups, and interest rates. Visualize your wealth growth with interactive charts.

2. **Salary Calculator** - Understand your Malaysian salary deductions including EPF (KWSP), SOCSO (PERKESO), EIS, and PCB (income tax). Uses official LHDN tax schedules and supports all PCB categories.

3. **Housing Loan Calculator** - Evaluate property affordability with DSR (Debt Service Ratio) calculation, compare upfront costs between new and subsale properties, and factor in existing commitments.

All calculations run entirely in the browser - no server required, no data sent anywhere.

---

## Tech Stack

| Category | Technology |
|----------|------------|
| **Frontend Framework** | React 18 with TypeScript |
| **Build Tool** | Vite 5 |
| **Styling** | Tailwind CSS (Neumorphic design) |
| **Charts** | Chart.js + react-chartjs-2 |
| **State Management** | React Hooks (useState, useMemo, useCallback) |
| **Testing** | Vitest + React Testing Library |
| **Package Manager** | pnpm (monorepo with workspaces) |
| **CI/CD** | GitHub Actions → GitHub Pages |
| **Backend** | Express.js (scaffolded for future use) |
| **Code Quality** | ESLint + Prettier |

### Architecture

- **Monorepo structure** using pnpm workspaces
- **Pure calculation utilities** - All financial logic extracted as testable pure functions
- **Custom React hooks** - `useCompoundInterest`, `useSalaryCalculator`, `useHousingLoan`
- **Lazy-loaded data** - Large PCB tax table (2MB) is code-split for fast initial load
- **Type-safe** - Full TypeScript coverage with strict mode

---

## Project Structure

```
finance-calculator/
├── packages/
│   ├── frontend/                 # React + Vite application
│   │   ├── src/
│   │   │   ├── components/       # React components
│   │   │   │   ├── common/       # Reusable UI (Card, Input, etc.)
│   │   │   │   ├── layout/       # Header, Footer, Navigation
│   │   │   │   ├── compound-interest/
│   │   │   │   ├── salary/
│   │   │   │   └── housing-loan/
│   │   │   ├── hooks/            # Custom React hooks
│   │   │   ├── utils/            # Calculation utilities
│   │   │   ├── types/            # TypeScript definitions
│   │   │   └── data/             # Static data (EPF, PCB tables)
│   │   ├── tailwind.config.js
│   │   └── vite.config.ts
│   └── backend/                  # Express API (scaffolded)
│       └── src/
│           ├── routes/
│           ├── controllers/
│           └── middleware/
├── .github/workflows/            # CI/CD pipeline
├── Makefile                      # Build automation
├── pnpm-workspace.yaml
└── package.json
```

---

## Setup

### Prerequisites

- **Node.js** 18 or higher
- **pnpm** 8 or higher

```bash
# Install pnpm if you don't have it
npm install -g pnpm
```

### Quick Start

```bash
# Clone the repository
git clone https://github.com/jackielow92/Finance-Calculator.git
cd Finance-Calculator

# First-time setup (installs all dependencies)
make setup

# Start development server
make dev
```

The app will be available at **http://localhost:5173**

### Available Make Commands

Run `make help` to see all available commands:

| Command | Description |
|---------|-------------|
| `make setup` | First-time project setup |
| `make install` | Install all dependencies |
| `make dev` | Start frontend dev server |
| `make dev-backend` | Start backend dev server |
| `make build` | Build frontend for production |
| `make test` | Run all tests |
| `make lint` | Run linting |
| `make format` | Format code with Prettier |
| `make preview` | Preview production build |
| `make clean` | Remove build artifacts |
| `make clean-all` | Remove all generated files |

### Manual Setup (without Make)

If you prefer not to use Make:

```bash
# Install dependencies
pnpm install

# Start development server
pnpm dev

# Build for production
pnpm build

# Run tests
pnpm test
```

---

## Development

### Running Tests

```bash
# Run all tests
make test

# Run tests in watch mode
make test-watch

# Run with coverage
make test-coverage
```

### Code Quality

```bash
# Lint code
make lint

# Format code
make format

# Run both lint and tests
make check
```

### Building for Production

```bash
# Build frontend
make build

# Preview the build
make preview
```

---

## Deployment

### GitHub Pages (Automatic)

The project is configured for automatic deployment via GitHub Actions:

1. Push to `main` branch
2. GitHub Actions runs tests and builds
3. Deploys to GitHub Pages automatically

### Manual Deployment

```bash
make build
# Deploy packages/frontend/dist to any static host
```

Works with: GitHub Pages, Netlify, Vercel, Cloudflare Pages, or any static host.

---

## Data Sources

The calculators use official Malaysian government rates:

| Data | Source |
|------|--------|
| **EPF Rates** | Jadual Ketiga (Third Schedule) - KWSP |
| **PCB Tax** | LHDN Schedule of Monthly Tax Deductions (2018+) |
| **SOCSO** | PERKESO contribution schedule |
| **EIS** | Employment Insurance System rates |

---

## Disclaimer

All calculations are for **estimation and educational purposes only**. Actual figures may vary based on:
- Bank policies and approval criteria
- Tax regulation updates
- Individual circumstances
- Government policy changes

Consult a qualified financial advisor for personalized advice.

---

## License

MIT License

---

## Author

**Jackie Low**

Built with passion for finance, clarity, and practical tools for everyday Malaysians.
