# SmartQuiz-App: The Ultimate JS Mastery Platform 🚀🛡️

<img src="./public/banner.png" width="100%" height="360" alt="SmartQuiz Banner" style="object-fit: cover;" />

<div align="center">
  <a href="https://smart-quiz-ai-platform.vercel.app">
    <img src="https://img.shields.io/badge/LIVE_APP-VERCEL-000000?style=for-the-badge&logo=vercel" alt="Live App" />
  </a>
  <img src="https://img.shields.io/badge/STACK-REACT_%2B_VITE-61DAFB?style=for-the-badge&logo=react&logoColor=black" alt="Stack" />
  <img src="https://img.shields.io/badge/DATABASE-FIRESTORE-FFCA28?style=for-the-badge&logo=firebase&logoColor=black" alt="Database" />
  <img src="https://img.shields.io/badge/AI_ENGINE-OPENAI_%2B_GEMINI-743481?style=for-the-badge&logo=openai" alt="AI Engine" />
  <img src="https://img.shields.io/badge/STYLING-TAILWIND_CSS-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white" alt="Styling" />
  <img src="https://img.shields.io/badge/STATUS-PRODUCTION_READY-4CAF50?style=for-the-badge" alt="Status" />
</div>

SmartQuiz is a production-grade, educational SaaS ecosystem designed to transform students into JavaScript masters. It features a hardened security architecture, real-time data persistence and a pro-level AI tutor.

---

## ✨ Core Features

### 👨‍🎓 Student Ecosystem
*   **Adaptive Quiz Engine**: Real-time challenges pulled from Firestore with dynamic difficulty scaling.
*   **Theory Vault**: A deep-dive library covering 15+ advanced JS concepts (Event Loop, Closures, etc.).
*   **Interactive Code Lab**: A sandbox with 30+ pre-built snippets for practicing professional patterns.
*   **Cybersecurity Academy**: Hands-on labs focusing on web security (XSS, API protection).
*   **Gamified Progression**: Earn XP, maintain daily streaks and climb the **Global Leaderboard**.

### 🤖 Pro AI Integration
*   **Google Gemini 1.5 Support**: Unlimited tutoring via a secure "Bring Your Own Key" (BYOK) model.
*   **Specialized Mentorship**: System-governed AI focused strictly on JS and Web Development.
*   **Markdown Rendering**: Professional formatting for code blocks and technical explanations.

### 🛡️ Admin & Security
*   **Role-Based Access Control (RBAC)**: Strict separation between Student and Admin namespaces.
*   **Admin Command Center**: Real-time platform metrics, user moderation and question management.
*   **Master Admin Bypass**: Secure backdoor for administrative continuity.
*   **Firestore Security**: Hardened security rules for data integrity.

---

## 📸 Screenshots

Here is a preview of the SmartQuiz interface:

| Dashboard | Quiz Arena |
| :---: | :---: |
| ![Dashboard](./public/screenshot1.png) | ![Quiz Arena](./public/screenshot2.png) |
| **AI Assistant** | **Code Lab** |
| ![AI Assistant](./public/screenshot3.png) | ![Code Lab](./public/screenshot4.png) |
| **Theory Vault** | **Leaderboard** |
| ![Theory Vault](./public/screenshot5.png) | ![Leaderboard](./public/screenshot6.png) |

---

## 🛠️ Tech Stack

| Layer | Technologies |
| :--- | :--- |
| **Frontend** | React 19, Vite, Tailwind CSS |
| **Backend/Auth** | Firebase (Auth, Firestore) |
| **Email Service** | EmailJS (Custom branded emails) |
| **Animations** | Framer Motion |
| **AI Engine** | OpenAI API (`gpt-4o-mini`) & Google Gemini |
| **Icons** | Lucide React |
| **Charts** | Recharts |

---

## 🚀 Getting Started

### Prerequisites
*   Node.js (v18+)
*   Firebase Project
*   EmailJS Account (free)
*   Google AI Studio API Key (Optional for AI)

### Installation
1.  **Clone the repository**:
    ```bash
    git clone https://github.com/gemachistesfaye/SmartQuiz-App.git
    cd SmartQuiz-App
    ```
2.  **Install dependencies**:
    ```bash
    npm install
    ```
3.  **Setup EmailJS**:
    *   Create free account at https://www.emailjs.com/
    *   Create an Email Service (Gmail, Outlook, etc.)
    *   Create 2 Email Templates (Verification & Password Reset)
    *   Add your keys to `.env`:
        ```
        VITE_EMAILJS_PUBLIC_KEY=your_public_key
        VITE_EMAILJS_SERVICE_ID=your_service_id
        VITE_EMAILJS_TEMPLATE_VERIFICATION=your_template_id
        VITE_EMAILJS_TEMPLATE_PASSWORD_RESET=your_template_id
        ```
4.  **Setup Firebase**:
    *   Update `src/services/firebase.js` with your Firebase config.
5.  **Run locally**:
    ```bash
    npm run dev
    ```

---

## 📚 Documentation

For a deep dive into the platform's architecture and systems, explore our official documentation:

*   **[Project Overview](./docs/project_overview.md)**: Mission and core philosophy.
*   **[Features](./docs/features.md)**: Detailed breakdown of Student and Admin tools.
*   **[Architecture](./docs/architecture.md)**: Tech stack and data flow diagrams.
*   **[Authentication](./docs/auth_system.md)**: Role management and security flow.
*   **[Database Schema](./docs/firebase_schema.md)**: Firestore collections and data model.
*   **[Security](./docs/security.md)**: RBAC enforcement and safety guardrails.
*   **[AI System](./docs/ai_system.md)**: Gemini 1.5 integration and prompt engineering.
*   **[Roadmap](./docs/roadmap.md)**: Future goals and development phases.

---

## 🔐 Professional Credentials

To access the **SuperAdmin Dashboard**, use the following master credentials:
*   **Email**: `admin@smartquiz.com`
*   **Password**: `Admin123!`

### 📱 Mobile Login (Testing)
*   **OTP Code**:
    ```text
    000000
    ```

---

## 🤝 Contributing & License
This project is open for enhancements! Feel free to fork and submit PRs for new features or learning modules.

MIT License - Created with ❤️ by Gemachis.
