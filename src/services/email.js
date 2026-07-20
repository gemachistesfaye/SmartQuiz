import emailjs from '@emailjs/browser';

const EMAILJS_PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;
const EMAILJS_SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
const EMAILJS_TEMPLATE_VERIFICATION = import.meta.env.VITE_EMAILJS_TEMPLATE_VERIFICATION;
const EMAILJS_TEMPLATE_PASSWORD_RESET = import.meta.env.VITE_EMAILJS_TEMPLATE_PASSWORD_RESET;

const NETLIFY_FUNCTION_URL = import.meta.env.VITE_NETLIFY_FUNCTION_URL || '/.netlify/functions/generate-link';

export const initEmailJS = () => {
  if (EMAILJS_PUBLIC_KEY) {
    emailjs.init(EMAILJS_PUBLIC_KEY);
  }
};

// Call Netlify function to generate real Firebase action link
const generateLink = async (email, type) => {
  const response = await fetch(NETLIFY_FUNCTION_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, type }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error || 'Failed to generate link');
  }

  return data.link;
};

export const sendVerificationEmail = async (toEmail, toName) => {
  if (!EMAILJS_SERVICE_ID || !EMAILJS_TEMPLATE_VERIFICATION) {
    throw new Error('EmailJS not configured');
  }

  // Get real Firebase action link from Netlify function
  const verificationLink = await generateLink(toEmail, 'verifyEmail');

  return emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_VERIFICATION, {
    to_email: toEmail,
    to_name: toName,
    verification_link: verificationLink,
    app_name: 'SmartQuiz',
  });
};

export const sendPasswordResetEmail = async (toEmail, toName) => {
  if (!EMAILJS_SERVICE_ID || !EMAILJS_TEMPLATE_PASSWORD_RESET) {
    throw new Error('EmailJS not configured');
  }

  // Get real Firebase action link from Netlify function
  const resetLink = await generateLink(toEmail, 'resetPassword');

  return emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_PASSWORD_RESET, {
    to_email: toEmail,
    to_name: toName,
    reset_link: resetLink,
    app_name: 'SmartQuiz',
  });
};
