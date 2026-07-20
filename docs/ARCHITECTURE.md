# System Architecture 🏗️

## High-Level Structure
SmartQuiz-App is built as a **Serverless SaaS Application** using a modern decoupled architecture.

### Frontend (The Interface)
*   **Framework**: React 19 (Vite)
*   **State Management**: Context API (Auth, Quiz)
*   **Styling**: Vanilla CSS + Tailwind Utility Classes
*   **Routing**: React Router v7 (Role-protected)

### Backend-as-a-Service (The Engine)
*   **Authentication**: Firebase Auth (Email/Password, Phone OTP)
*   **Database**: Firestore (NoSQL, Real-time)
*   **Email Service**: EmailJS (Custom branded transactional emails)
*   **Security**: Firestore Security Rules (RBAC Enforcement)

## Data Flow Diagram
1.  **User Action**: User submits a quiz answer.
2.  **Logic Layer**: `useQuiz` hook validates the answer and calculates XP.
3.  **Persistence Layer**: AuthContext communicates with Firestore via `updateDoc`.
4.  **UI Sync**: `onSnapshot` listeners update the Leaderboard and Dashboard metrics across the entire app instantly.

## Email Flow
1.  **Client**: AuthContext triggers Firebase Auth to generate action link.
2.  **EmailJS**: Sends branded email with custom template.
3.  **User**: Clicks link to verify email or reset password.

## Role-Based System Design
The application is architected into two distinct namespaces:
*   **Student Space**: `/dashboard`, `/quiz`, `/theory`, `/codelab`.
*   **Admin Space**: `/admin/dashboard`, `/admin/users`, `/admin/questions`.
Access between these spaces is gated by high-order components (HOCs) and Firestore rules.
