# AWS Cloud Club SRMIST — Recruitment Portal

A multi-step recruitment application portal for the AWS Cloud Club at SRM Institute of Science and Technology (SRMIST). Built with React and backed by Firebase and Google Sheets via Google Apps Script.

---

## Features

- **Certificate Gate** — Only applicants with an AWS certification can proceed
- **3-Step Application Form**
  - Step 1: Personal information with real-time validation
  - Step 2: Domain preferences and document links
  - Step 3: Review and submit
- **Domain Tracks** — Tech, Corp, and Creatives with dynamic sub-domain selection
- **Form Validation** — Touch-based, field-level validation with regex enforcement
- **Google Sheets Backend** — Submissions are sent to a Google Sheet via Apps Script
- **Confirmation Page** — Unique reference ID generated on successful submission
- **Deployed on Vercel** — SPA routing configured out of the box

---

## Tech Stack

| Layer       | Technology                          |
|-------------|-------------------------------------|
| Frontend    | React 19, React Router DOM 7        |
| Styling     | Bootstrap 5, Custom CSS             |
| Icons       | React Icons (FontAwesome)           |
| Storage     | Firebase Cloud Storage              |
| Backend     | Google Apps Script → Google Sheets  |
| Hosting     | Vercel                              |

---

## Getting Started

### Prerequisites

- Node.js 18+
- npm
- A Firebase project with Cloud Storage enabled
- A deployed Google Apps Script Web App (see below)

### Installation

```bash
git clone https://github.com/your-org/Recruitment_Portal.git
cd Recruitment_Portal
npm install
```

### Environment Variables

Copy `.env.example` to `.env` and fill in the values:

```bash
cp .env.example .env
```

```env
REACT_APP_FIREBASE_API_KEY=
REACT_APP_FIREBASE_AUTH_DOMAIN=
REACT_APP_FIREBASE_PROJECT_ID=
REACT_APP_FIREBASE_STORAGE_BUCKET=
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=
REACT_APP_FIREBASE_APP_ID=
REACT_APP_SCRIPT_URL=         # Google Apps Script Web App URL
```

### Running Locally

```bash
npm start
```

Opens at `http://localhost:3000`.

### Building for Production

```bash
npm run build
```

---

## Google Apps Script Setup

1. Open your target Google Sheet.
2. Go to **Extensions → Apps Script**.
3. Paste a script that reads `e.postData.contents` and appends a row to the sheet.
4. Deploy as a **Web App** with access set to **Anyone**.
5. Copy the deployment URL into `REACT_APP_SCRIPT_URL` in your `.env`.

---

## Firebase Setup

1. Create a project at [console.firebase.google.com](https://console.firebase.google.com).
2. Enable **Cloud Storage**.
3. Copy the config values into your `.env` file.
4. Set Storage Rules to allow reads/writes as appropriate for your use case.

---

## Project Structure

```
src/
├── App.js                          # Routes: /, /apply, /success
├── firebase.js                     # Firebase initialization
└── components/
    ├── LandingPage/                # Hero, benefits, domain cards
    ├── ApplicationForm/
    │   ├── ApplicationForm.jsx     # Step orchestrator & state management
    │   ├── CertificateGate.jsx     # Eligibility check before form
    │   ├── Step1PersonalInfo.jsx   # Name, email, reg no, year, degree
    │   ├── Step2DocsAndDomains.jsx # Certs, domain, resume, socials
    │   └── Step3Review.jsx         # Summary + submit
    └── SuccessPage/                # Confirmation with reference ID
```

---

## Validation Rules

| Field               | Rule                                          |
|---------------------|-----------------------------------------------|
| SRM Email           | Must end with `@srmist.edu.in`                |
| Registration Number | Format: `RA` followed by 10–13 digits         |
| Contact Number      | 10-digit Indian mobile (starts with 6–9)      |
| AWS Cert Links      | 1–3 valid URLs required                       |
| GitHub              | Required for Tech domain only                 |
| LinkedIn            | Valid LinkedIn profile URL                    |
| Resume              | Valid shareable URL                           |

---

## Deployment

The project is configured for Vercel. The `vercel.json` rewrites all routes to `index.html` for client-side routing.

```bash
vercel deploy
```

Or connect the GitHub repository to a Vercel project for automatic deployments on push.

---

## License

MIT License — Copyright 2026 AWSCC - SRMIST
