import { initializeApp, cert, getApps } from "firebase-admin/app";
import { generateEmailVerificationLink, generatePasswordResetLink } from "firebase-admin/auth";

if (!getApps().length) {
  initializeApp({
    credential: cert({
      projectId: process.env.FIREBASE_PROJECT_ID,
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
      privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
    }),
  });
}

export default async (event) => {
  const headers = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "Content-Type",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
  };

  if (event.httpMethod === "OPTIONS") {
    return { statusCode: 204, headers, body: "" };
  }

  if (event.httpMethod !== "POST") {
    return { statusCode: 405, headers, body: JSON.stringify({ error: "Method not allowed" }) };
  }

  try {
    const { email, type } = JSON.parse(event.body);

    if (!email || !type) {
      return { statusCode: 400, headers, body: JSON.stringify({ error: "Email and type are required" }) };
    }

    let link;

    if (type === "verifyEmail") {
      link = await generateEmailVerificationLink(email, {
        url: "https://smartquiz-app-59260.web.app",
      });
    } else if (type === "resetPassword") {
      link = await generatePasswordResetLink(email, {
        url: "https://smartquiz-app-59260.web.app",
      });
    } else {
      return { statusCode: 400, headers, body: JSON.stringify({ error: "Invalid type" }) };
    }

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ link }),
    };
  } catch (error) {
    console.error("Error:", error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: "Failed to generate link" }),
    };
  }
};
