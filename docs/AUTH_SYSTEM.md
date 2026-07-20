# Authentication System 🔐

## Overview
SmartQuiz-App uses a hardened Firebase-based authentication flow with a custom middleware layer for role management and branded emails via EmailJS.

## Authentication Flow
1.  **Identity Verification**: Handled by Firebase Auth.
2.  **Metadata Fetching**: Upon login, the system immediately pulls the user's document from the `users` collection.
3.  **Role Synchronization**: The `AuthContext` determines if the user is a `student` or `admin`.
4.  **Route Protection**: `ProtectedRoute.jsx` ensures users are only allowed in their authorized areas.

## Email Verification Flow
1.  **Registration**: On signup, Firebase generates a verification link.
2.  **Custom Email**: EmailJS sends a branded email with your custom design.
3.  **Verification**: User clicks the link to verify their email address.

## Password Reset Flow
1.  **Request**: User submits their email on the forgot password page.
2.  **Firebase Link**: Firebase generates a reset link.
3.  **Custom Email**: EmailJS sends a branded password reset email.
4.  **Reset**: User clicks the link to set a new password.

## Master Admin Continuity
The system includes a **Persistent Administrative Bypass**:
*   **Target User**: `admin@smartquiz.com`
*   **Logic**: Even if the database record is changed, the frontend code contains a "Self-Healing" mechanism that forces this specific UID into the `admin` role upon session start.

## Security Features
*   **Automatic Role Repair**: The system validates admin status on every login.
*   **Session Persistence**: Users stay logged in across refreshes via Firebase's local persistence.
*   **Protected Nav**: Sidebars and Headers dynamically render only the links appropriate for the user's role.
*   **Email Enumeration Prevention**: Password reset always returns success, even if user doesn't exist.

## Email Templates
Configure these templates in your EmailJS dashboard:

**Verification Email Template Variables:**
*   `{{to_email}}` - Recipient email
*   `{{to_name}}` - User's display name
*   `{{verification_link}}` - Firebase verification link
*   `{{app_name}}` - "SmartQuiz"

**Password Reset Template Variables:**
*   `{{to_email}}` - Recipient email
*   `{{to_name}}` - User's display name
*   `{{reset_link}}` - Firebase reset link
*   `{{app_name}}` - "SmartQuiz"
