import type { IncomingMessage, ServerResponse } from "node:http";

// Indian Phone Number regex: 10 digits starting with 6-9, optional +91 or 0 prefix
const INDIAN_PHONE_REGEX = /^(?:(?:\+|0{0,2})91[\s-]?)?[6-9]\d{9}$/;
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default async function handler(req: IncomingMessage & { body?: any }, res: ServerResponse) {
  // Set CORS headers
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET,OPTIONS,PATCH,DELETE,POST,PUT");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version"
  );

  if (req.method === "OPTIONS") {
    res.statusCode = 200;
    res.end();
    return;
  }

  if (req.method !== "POST") {
    res.statusCode = 405;
    res.setHeader("Content-Type", "application/json");
    res.end(JSON.stringify({ success: false, error: "Method Not Allowed" }));
    return;
  }

  // Parse body
  let body: any = req.body;
  if (!body) {
    try {
      const buffers = [];
      for await (const chunk of req) {
        buffers.push(chunk);
      }
      const data = Buffer.concat(buffers).toString();
      body = data ? JSON.parse(data) : {};
    } catch (e) {
      body = {};
    }
  }

  const { fullName, email, phone, program } = body || {};

  if (!fullName || typeof fullName !== "string" || fullName.trim().length < 2) {
    res.statusCode = 400;
    res.setHeader("Content-Type", "application/json");
    res.end(JSON.stringify({ success: false, error: "Please enter your full name (minimum 2 characters)." }));
    return;
  }

  if (!email || typeof email !== "string" || !EMAIL_REGEX.test(email.trim())) {
    res.statusCode = 400;
    res.setHeader("Content-Type", "application/json");
    res.end(JSON.stringify({ success: false, error: "Please enter a valid email address." }));
    return;
  }

  const cleanPhone = String(phone || "").replace(/[\s-]/g, "");
  if (!cleanPhone || !INDIAN_PHONE_REGEX.test(cleanPhone)) {
    res.statusCode = 400;
    res.setHeader("Content-Type", "application/json");
    res.end(JSON.stringify({ success: false, error: "Please enter a valid 10-digit Indian mobile number." }));
    return;
  }

  if (!program || typeof program !== "string" || program.trim().length < 2) {
    res.statusCode = 400;
    res.setHeader("Content-Type", "application/json");
    res.end(JSON.stringify({ success: false, error: "Please select a valid program." }));
    return;
  }

  const trimmedData = {
    id: Date.now(),
    fullName: fullName.trim(),
    email: email.trim().toLowerCase(),
    phone: cleanPhone,
    program: program.trim(),
    createdAt: new Date().toISOString(),
  };

  res.statusCode = 201;
  res.setHeader("Content-Type", "application/json");
  res.end(
    JSON.stringify({
      success: true,
      message: "Enrollment received successfully! Our academic admissions team will contact you shortly.",
      data: trimmedData,
    })
  );
}
