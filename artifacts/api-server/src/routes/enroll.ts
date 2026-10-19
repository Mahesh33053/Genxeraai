import { Router, type Request, type Response } from "express";
import fs from "node:fs";
import path from "node:path";
import { db, enrollmentsTable, insertEnrollmentSchema } from "@workspace/db";

const router = Router();

// Ensure local persistence data directory exists
const DATA_DIR = path.resolve(process.cwd(), "data");
const ENROLLMENTS_FILE = path.join(DATA_DIR, "enrollments.json");

function saveLocalEnrollment(record: { id: string | number; fullName: string; email: string; phone: string; program: string; createdAt: string }) {
  try {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }
    let list: any[] = [];
    if (fs.existsSync(ENROLLMENTS_FILE)) {
      const content = fs.readFileSync(ENROLLMENTS_FILE, "utf-8");
      list = JSON.parse(content || "[]");
    }
    list.push(record);
    fs.writeFileSync(ENROLLMENTS_FILE, JSON.stringify(list, null, 2), "utf-8");
  } catch (err) {
    console.error("Failed to write to local enrollments file:", err);
  }
}

// Indian Phone Number regex: 10 digits starting with 6-9, optional +91 or 0 prefix
const INDIAN_PHONE_REGEX = /^(?:(?:\+|0{0,2})91[\s-]?)?[6-9]\d{9}$/;
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

router.post("/enroll", async (req: Request, res: Response): Promise<void> => {
  try {
    const { fullName, email, phone, program } = req.body || {};

    if (!fullName || typeof fullName !== "string" || fullName.trim().length < 2) {
      res.status(400).json({ success: false, error: "Please enter your full name (minimum 2 characters)." });
      return;
    }

    if (!email || typeof email !== "string" || !EMAIL_REGEX.test(email.trim())) {
      res.status(400).json({ success: false, error: "Please enter a valid email address." });
      return;
    }

    const cleanPhone = String(phone || "").replace(/[\s-]/g, "");
    if (!cleanPhone || !INDIAN_PHONE_REGEX.test(cleanPhone)) {
      res.status(400).json({ success: false, error: "Please enter a valid 10-digit Indian mobile number." });
      return;
    }

    if (!program || typeof program !== "string" || program.trim().length < 2) {
      res.status(400).json({ success: false, error: "Please select a valid program." });
      return;
    }

    const trimmedData = {
      fullName: fullName.trim(),
      email: email.trim().toLowerCase(),
      phone: cleanPhone,
      program: program.trim(),
    };

    let insertedId: string | number = Date.now();
    const createdAt = new Date().toISOString();

    // Persist to PostgreSQL if db pool is configured
    if (db) {
      try {
        const [inserted] = await db.insert(enrollmentsTable).values(trimmedData).returning();
        if (inserted?.id) {
          insertedId = inserted.id;
        }
      } catch (dbErr) {
        console.warn("Database insert failed, falling back to local persistent store:", dbErr);
      }
    }

    // Always persist to local file store as reliable audit/backup
    saveLocalEnrollment({
      id: insertedId,
      ...trimmedData,
      createdAt,
    });

    res.status(201).json({
      success: true,
      message: "Enrollment received successfully! Our admissions team will connect with you shortly.",
      data: {
        id: insertedId,
        ...trimmedData,
        createdAt,
      },
    });
  } catch (error: any) {
    console.error("Enrollment route error:", error);
    res.status(500).json({ success: false, error: "An unexpected error occurred while processing your enrollment. Please try again." });
  }
});

export default router;
