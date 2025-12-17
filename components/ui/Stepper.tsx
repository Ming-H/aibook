import { ReactNode } from "react";

interface Step {
  index: number;
  title: string;
  description?: string;
}

interface StepperProps {
  steps: Step[];
  currentStep: number;
  className?: string;
}

export function Stepper({ steps, currentStep, className = "" }: StepperProps) {
  return (
    <div className={`flex flex-col gap-4 md:flex-row md:items-center md:justify-between ${className}`}>
      {steps.map((step, idx) => (
        <div key={step.index} className="flex items-center gap-3">
          <div className="flex items-center gap-3">
            <div
              className={`flex h-10 w-10 items-center justify-center rounded-full border-2 text-sm font-bold transition-all duration-300 ${
                currentStep > step.index
                  ? "border-emerald-500 bg-emerald-500 text-slate-950 shadow-lg shadow-emerald-500/40"
                  : currentStep === step.index
                    ? "border-blue-500 bg-blue-500 text-white shadow-lg shadow-blue-500/40 scale-110"
                    : "border-slate-600 bg-slate-900 text-slate-400"
              }`}
            >
              {currentStep > step.index ? "✓" : step.index}
            </div>
            <div className="flex-1">
              <div
                className={`text-sm font-semibold transition-colors ${
                  currentStep >= step.index ? "text-slate-100" : "text-slate-400"
                }`}
              >
                {step.title}
              </div>
              {step.description && (
                <div className="mt-0.5 text-xs text-slate-500">{step.description}</div>
              )}
            </div>
          </div>
          {idx < steps.length - 1 && (
            <div className="hidden flex-1 items-center md:flex">
              <div
                className={`h-0.5 w-full transition-all duration-300 ${
                  currentStep > step.index
                    ? "bg-gradient-to-r from-emerald-500 to-blue-500"
                    : "bg-gradient-to-r from-slate-700 to-slate-600"
                }`}
              />
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

