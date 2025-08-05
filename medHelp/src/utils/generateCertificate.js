import jsPDF from "jspdf";
import { getUserFromToken } from "./auth";

const generateCertificate = (course) => {
  const volunteer = getUserFromToken();
  const doc = new jsPDF("portrait", "mm", "a4"); // A4 size: 210x297 mm

  // Constants
  const pageWidth = 210;
  const pageHeight = 297;

  // ==========================
  // 🎨 HEADER BAR (Blue)
  // ==========================
  doc.setFillColor(40, 78, 120); // Deep Blue
  doc.rect(0, 0, pageWidth, 30, "F");

  doc.setTextColor(255, 255, 255);
  doc.setFontSize(20);
  doc.setFont("helvetica", "bold");
  doc.text("MedHelp", pageWidth / 2, 20, null, null, "center");

  // ==========================
  // 🎓 CERTIFICATE TITLE
  // ==========================
  doc.setFontSize(26);
  doc.setTextColor(40, 78, 120);
  doc.setFont("times", "bold");
  doc.text(
    "Certificate of Completion",
    pageWidth / 2,
    60,
    null,
    null,
    "center"
  );

  // ==========================
  // 👤 Recipient Info
  // ==========================
  doc.setFontSize(14);
  doc.setTextColor(60);
  doc.setFont("helvetica", "normal");
  doc.text("This certifies that", pageWidth / 2, 80, null, null, "center");

  doc.setFontSize(18);
  doc.setTextColor(0);
  doc.setFont("times", "bold");
  doc.text(volunteer.name, pageWidth / 2, 95, null, null, "center");

  doc.setFont("helvetica", "normal");
  doc.setFontSize(14);
  doc.setTextColor(60);
  doc.text(
    "has successfully completed the course:",
    pageWidth / 2,
    110,
    null,
    null,
    "center"
  );

  doc.setFontSize(16);
  doc.setTextColor(40, 78, 120);
  doc.setFont("times", "bold");
  doc.text(course.courseName, pageWidth / 2, 125, null, null, "center");

  // ==========================
  // 📘 Course Details
  // ==========================
  doc.setFontSize(12);
  doc.setTextColor(80);
  doc.setFont("helvetica", "normal");

  doc.text(
    `Trainer: ${course.trainerName}`,
    pageWidth / 2,
    140,
    null,
    null,
    "center"
  );
  doc.text(
    `Start Date: ${new Date(course.startDate).toLocaleDateString()}`,
    pageWidth / 2,
    148,
    null,
    null,
    "center"
  );
  doc.text(
    `Duration: ${course.duration} months`,
    pageWidth / 2,
    156,
    null,
    null,
    "center"
  );

  // ==========================
  // 🎨 FOOTER BAR (Light Blue)
  // ==========================
  doc.setFillColor(220, 235, 245);
  doc.rect(0, pageHeight - 20, pageWidth, 20, "F");
  doc.setFont("helvetica", "normal"); // Switch to normal style for clarity
  doc.setFontSize(10); // Smaller font for footer text
  doc.setTextColor(0, 0, 0); // Black for readability
  doc.text(
    "All Rights Reserved to MedHelp",
    pageWidth / 2,
    pageHeight - 10,
    null,
    null,
    "center"
  );

  // ==========================
  // 📅 Footer (Date & Signature)
  // ==========================
  const today = new Date().toLocaleDateString();

  // Date
  doc.setFontSize(10);
  doc.setTextColor(100);
  doc.text(`Issued on: ${today}`, 20, pageHeight - 30);

  // Signature line
  doc.setDrawColor(0);
  doc.line(pageWidth - 70, pageHeight - 35, pageWidth - 20, pageHeight - 35);

  // Signature name italic
  doc.setFont("Allura", "italic");
  doc.setFontSize(14);
  doc.setTextColor(40, 78, 120);
  doc.text("Utsho Roy", pageWidth - 45, pageHeight - 40, null, null, "center");

  // Authorized signature label
  doc.setFont("helvetica", "normal");
  doc.setFontSize(10);
  doc.setTextColor(100);
  doc.text(
    "Authorized Signature",
    pageWidth - 45,
    pageHeight - 30,
    null,
    null,
    "center"
  );

  // Save PDF
  doc.save(`${course.courseName.replace(/\s+/g, "_")}_Certificate.pdf`);
};

export default generateCertificate;
