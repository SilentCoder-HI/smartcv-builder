"use client";

import { useState, useRef, useEffect } from "react";
import { Progress } from "@/components/ui/progress";
import { CVForm } from "@/components/cv-form";
import { TemplateSelector } from "@/components/template-selector";
import { CVPreview } from "@/components/cv-preview";
import { ExportOptions } from "@/components/export-options";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store";
import { setTemplate } from "@/store/templateSlice";
import { updateCV } from "@/store/cvslice";

const steps = [
  { id: 1, title: "Personal Information", description: "Enter your details" },
  { id: 2, title: "Choose Template", description: "Select your style" },
  { id: 3, title: "Preview & Edit", description: "Customize your CV" },
  { id: 4, title: "Download", description: "Export your resume" },
];

export default function BuilderPage() {
  const [currentStep, setCurrentStep] = useState(1);
  const [templateCompleted, setTemplateCompleted] = useState(false);

  const cvData = useSelector((state: RootState) => state.cv);
  const dispatch = useDispatch();
  const selectedTemplate = useSelector(
    (state: RootState) => state.template.selectedTemplate
  );


  const progress = (currentStep / steps.length) * 100;
  const mainRef = useRef<HTMLDivElement>(null); // fixed

  const nextStep = () => {
    if (currentStep === 1 && templateCompleted) {
      setCurrentStep(3);
    } else if (currentStep === 2 && selectedTemplate) {
      setCurrentStep(3); // Skip 2 if already selected
    } else if (currentStep < steps.length) {
      setCurrentStep((prev) => prev + 1);
    }

    requestAnimationFrame(() => {
      mainRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  };


  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => prev - 1);
      requestAnimationFrame(() => {
        mainRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
      });
    }
  };

  useEffect(() => {
    if (mainRef.current) {
      mainRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [currentStep]);

  const renderStepContent = () => {

    switch (currentStep) {
      case 1:
        return (
          <CVForm
            cvData={cvData}
            setCvData={(data) => dispatch(updateCV(data))}
            onNext={nextStep}
            scrollRef={mainRef}
          />
        );
      case 2:
        return (
          <TemplateSelector
            selectedTemplate={selectedTemplate ?? ""}
            setSelectedTemplate={(templateId) => {
              dispatch(setTemplate(templateId));
              setTemplateCompleted(true); // ✅ ADD THIS!
            }}
            cvData={cvData}
            onNext={nextStep}
            onPrev={prevStep}
            scrollRef={mainRef}
          />
        );
      case 3:
        return (
          <CVPreview
            cvData={cvData}
            setCvData={(data) => dispatch(updateCV(data))}
            selectedTemplate={selectedTemplate ?? ""}
            onNext={nextStep}
            onPrev={prevStep}
            scrollRef={mainRef}
          />
        );
      case 4:
        return (
          <ExportOptions
            cvData={cvData}
            selectedTemplate={selectedTemplate ?? ""}
            onPrev={prevStep}
            isBuilderMode={true}
            setSelectedTemplate={() =>
              dispatch(setTemplate(selectedTemplate ?? ""))
            }
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Progress Bar */}
      <div className="bg-white border-b" ref={mainRef}>
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between mb-4">
            {steps.map((step, index) => (
              <div
                key={step.id}
                className={`flex items-center ${index < steps.length - 1 ? "flex-1" : ""}`}
              >
                <div className="flex items-center">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${currentStep >= step.id
                      ? "bg-blue-600 text-white"
                      : "bg-gray-200 text-gray-600"
                      }`}
                  >
                    {step.id}
                  </div>
                  <div className="ml-3 hidden sm:block">
                    <p
                      className={`text-sm font-medium ${currentStep >= step.id
                        ? "text-blue-600"
                        : "text-gray-500"
                        }`}
                    >
                      {step.title}
                    </p>
                    <p className="text-xs text-gray-500">
                      {step.description}
                    </p>
                  </div>
                </div>
                {index < steps.length - 1 && (
                  <div className="flex-1 mx-4 hidden sm:block">
                    <div className="h-0.5 bg-gray-200">
                      <div
                        className={`h-0.5 transition-all duration-300 ${currentStep > step.id
                          ? "bg-blue-600 w-full"
                          : "bg-gray-200 w-0"
                          }`}
                      />
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
          <Progress value={progress} className="h-2"/>
        </div>
      </div>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {renderStepContent()}
      </main>
    </div>
  );
}
