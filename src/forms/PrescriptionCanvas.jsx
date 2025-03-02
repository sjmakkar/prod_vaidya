import React, { useEffect, useRef } from "react";
import * as fabric from "fabric";

const PrescriptionCanvas = () => {
  const canvasRef = useRef(null);
  const fabricCanvasRef = useRef(null); // Store Fabric.js instance

  useEffect(() => {
    if (!canvasRef.current) return;

    // Destroy previous Fabric.js instance if it exists (prevents errors)
    if (fabricCanvasRef.current) {
      fabricCanvasRef.current.dispose();
    }

    // Wait for canvas element to be ready
    setTimeout(() => {
      const canvasElement = canvasRef.current;
      if (!canvasElement) return;

      // Initialize Fabric.js canvas
      const canvas = new fabric.Canvas(canvasElement, {
        width: 600,
        height: 800,
        backgroundColor: "#fff",
      });

      fabricCanvasRef.current = canvas; // Store Fabric instance

      // Add doctor details
      const doctorName = new fabric.Text("DOCTOR'S NAME", {
        left: 20,
        top: 20,
        fontSize: 20,
        fontWeight: "bold",
      });

      const specialization = new fabric.Text("Specialization", {
        left: 20,
        top: 50,
        fontSize: 16,
      });

      const clinicHours = new fabric.Text(
        "Clinic Hours:\nMWF: 13:00 - 18:00\nTTH: 9:00 - 15:00",
        { left: 20, top: 80, fontSize: 14 }
      );

      const address = new fabric.Text("123 Anywhere St.\nAny City ST", {
        left: 400,
        top: 80,
        fontSize: 14,
      });

      // Patient Details
      const patientDetails = new fabric.Text(
        "Patient's Name: __________\nPatient ID: __________\nAge: __________\nWeight: __________",
        { left: 20, top: 140, fontSize: 14 }
      );

      // Medical Fields
      const medicalFields = new fabric.Text(
        "Fever: __________\nBlood Pressure: __________\nSugar: __________\nTest: __________\nHistory: __________\nDate: __________",
        { left: 20, top: 200, fontSize: 14 }
      );

      // Prescription Box
      const prescriptionTitle = new fabric.Text("Prescription:", {
        left: 20,
        top: 350,
        fontSize: 16,
        fontWeight: "bold",
      });

      const prescriptionBox = new fabric.Rect({
        left: 20,
        top: 380,
        width: 550,
        height: 300,
        stroke: "black",
        strokeWidth: 1,
        fill: "transparent",
      });

      // Signature
      const signature = new fabric.Text("Signature", {
        left: 500,
        top: 720,
        fontSize: 14,
      });

      canvas.add(
        doctorName,
        specialization,
        clinicHours,
        address,
        patientDetails,
        medicalFields,
        prescriptionTitle,
        prescriptionBox,
        signature
      );
    }, 100); // Small delay to ensure React has rendered the canvas element

    return () => {
      if (fabricCanvasRef.current) {
        fabricCanvasRef.current.dispose();
        fabricCanvasRef.current = null;
      }
    };
  }, []);

  return (
    <div className="flex flex-col items-center p-6">
      <h1 className="text-2xl font-bold mb-4">Prescription Canvas</h1>
      <canvas ref={canvasRef} className="border shadow-lg bg-white" />
    </div>
  );
};

export default PrescriptionCanvas;
