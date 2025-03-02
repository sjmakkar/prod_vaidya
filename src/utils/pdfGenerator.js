import jsPDF from "jspdf";

const generatePrescriptionPDF = (formData, templateImage) => {
  const pdf = new jsPDF({
    orientation: "portrait",
    unit: "in",
    format: "a4",
  });

  const pageWidth = pdf.internal.pageSize.getWidth();
  const pageHeight = pdf.internal.pageSize.getHeight();

  pdf.addImage(templateImage, "PNG", 0, 0, pageWidth, pageHeight, undefined, "FAST");

  pdf.setFont("times");

  const coordinates = {
    doctorName: { x: 0.36, y: 0.38 },
    specialization: { x: 0.36, y: 0.66 },
    address: { x: 0.36, y: 1.26 },
    clinicHours: { x: 5.91, y: 1.26 },
    clinicName: { x: 6.00, y: 0.35 },
    patientName: { x: 1.74, y: 2.27 }, // Moved down from 2.17 to 2.27
    patientId: { x: 1.17, y: 2.71 },   // Moved down from 2.61 to 2.71
    age: { x: 3.1, y: 2.71 },          // Moved down from 2.61 to 2.71
    date: { x: 4.92, y: 2.71 },        // Moved down from 2.61 to 2.71
    weight: { x: 0.5, y: 3.5 },        // Adjusted x slightly
    fever: { x: 0.5, y: 3.8 },
    bloodPressure: { x: 0.5, y: 4.1 },
    sugar: { x: 0.5, y: 4.4 },
    tests: { x: 0.5, y: 4.7 },
    history: { x: 0.5, y: 5.0 },       // Adjusted x slightly
    prescription: { x: 3.94, y: 3.36 },
    signature: { x: 6.0, y: 10.50 },
  };

  console.log("Generating PDF with formData:", formData);

  pdf.setFontSize(18);
  pdf.setFont("times", "bold");
  pdf.text(String(formData.doctorName || "N/A"), coordinates.doctorName.x, coordinates.doctorName.y);

  pdf.setFontSize(12);
  pdf.setFont("times", "normal");
  pdf.text(String(formData.specialization || "N/A"), coordinates.specialization.x, coordinates.specialization.y);
  pdf.text(String(formData.address || "N/A"), coordinates.address.x, coordinates.address.y);
  pdf.text(`Clinic Hours: ${String(formData.clinicHours || "N/A")}`, coordinates.clinicHours.x, coordinates.clinicHours.y);

  pdf.setFontSize(14);
  pdf.setFont("times", "bold");
  pdf.text(String(formData.clinicName || "N/A"), coordinates.clinicName.x, coordinates.clinicName.y);

  pdf.setFontSize(12);
 
 // Shift label left
  pdf.setFont("times", "normal");
  pdf.text(String(formData.patientName || "N/A"), coordinates.patientName.x, coordinates.patientName.y);
  pdf.text(String(formData.patientId || "N/A"), coordinates.patientId.x, coordinates.patientId.y);
  pdf.text(String(formData.age || "N/A"), coordinates.age.x, coordinates.age.y);
  pdf.text(String(formData.date || "N/A"), coordinates.date.x, coordinates.date.y);

  pdf.setFontSize(12);
  pdf.setFont("times", "bold");
  pdf.text("Weight:", coordinates.weight.x, coordinates.weight.y);
  pdf.setFont("times", "normal");
  pdf.text(`${String(formData.weight || "N/A")} kg`, coordinates.weight.x + 0.6, coordinates.weight.y); // Increased offset

  pdf.setFont("times", "bold");
  pdf.text("Fever:", coordinates.fever.x, coordinates.fever.y);
  pdf.setFont("times", "normal");
  pdf.text(`${String(formData.fever || "N/A")} °C`, coordinates.fever.x + 0.6, coordinates.fever.y);

  pdf.setFont("times", "bold");
  pdf.text("BP:", coordinates.bloodPressure.x, coordinates.bloodPressure.y);
  pdf.setFont("times", "normal");
  pdf.text(
    `${String(formData.bloodPressureSystolic || "N/A")}/${String(formData.bloodPressureDiastolic || "N/A")} mmHg`,
    coordinates.bloodPressure.x + 0.6,
    coordinates.bloodPressure.y
  );

  pdf.setFont("times", "bold");
  pdf.text("Sugar:", coordinates.sugar.x, coordinates.sugar.y);
  pdf.setFont("times", "normal");
  pdf.text(`${String(formData.sugar || "N/A")} mg/dL`, coordinates.sugar.x + 0.6, coordinates.sugar.y);

  pdf.setFont("times", "bold");
  pdf.text("Tests:", coordinates.tests.x, coordinates.tests.y);
  pdf.setFont("times", "normal");
  pdf.text(String(formData.tests || "N/A"), coordinates.tests.x + 0.6, coordinates.tests.y, { maxWidth: 3 });

  pdf.setFont("times", "bold");
  pdf.text("History:", coordinates.history.x, coordinates.history.y);
  pdf.setFont("times", "normal");
  pdf.text(String(formData.history || "N/A"), coordinates.history.x + 0.6, coordinates.history.y, { maxWidth: 3 });

  pdf.setFontSize(14);
  pdf.setFont("times", "bold");
  pdf.text("Prescription:", coordinates.prescription.x, coordinates.prescription.y);
  pdf.setFontSize(12);
  pdf.setFont("times", "normal");
  pdf.text(String(formData.prescription || "N/A"), coordinates.prescription.x + 0.2, coordinates.prescription.y + 0.2, {
    maxWidth: 4,
  });

  pdf.setFontSize(12);
  pdf.setFont("times", "normal");
  pdf.text(`Signature: ${String(formData.doctorName || "N/A")}`, coordinates.signature.x, coordinates.signature.y);

  const patientName = String(formData.patientName || "Unknown").replace(/\s+/g, "_");
  const date = String(formData.date || "N/A");
  const filename = `${patientName}_${date}_prescription.pdf`;
  pdf.save(filename);
};

export default generatePrescriptionPDF;