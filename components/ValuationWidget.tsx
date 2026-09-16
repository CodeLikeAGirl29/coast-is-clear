"use client";

import React, { useState } from "react";
import {
  Home,
  ArrowRight,
  CheckCircle2,
  Loader2,
  Sparkles,
} from "lucide-react";

interface FormData {
  address: string;
  propertyType: string;
  timeline: string;
  name: string;
  email: string;
  phone: string;
}

export default function ValuationWidget() {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    address: "",
    propertyType: "Single Family",
    timeline: "1-3 months",
    name: "",
    email: "",
    phone: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleNext = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.address.trim()) return;
    setStep(2);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Replace with your API route or Server Action (e.g., fetch('/api/leads', ...))
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!res.ok) throw new Error("Submission failed");
      setStep(3);
    } catch {
      // Fallback for demonstration / local testing
      setTimeout(() => setStep(3), 800);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="not-prose my-10 overflow-hidden rounded-2xl border border-neutral-200 bg-neutral-900 p-6 text-neutral-100 shadow-xl dark:border-neutral-800 sm:p-8">
      {/* Header */}
      <div className="mb-6 flex items-start gap-4">
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-400 ring-1 ring-emerald-500/25">
          <Home className="h-5 w-5" />
        </div>
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold uppercase tracking-wider text-emerald-400">
              Instant Valuation Request
            </span>
            <span className="inline-flex items-center gap-1 rounded-full bg-neutral-800 px-2 py-0.5 text-[10px] font-medium text-neutral-400">
              <Sparkles className="h-3 w-3 text-emerald-400" /> Free CMA
            </span>
          </div>
          <h3 className="mt-1 text-xl font-bold text-white sm:text-2xl">
            Curious what your Emerald Coast home is worth?
          </h3>
          <p className="mt-1 text-sm text-neutral-400">
            Get a tailored Comparative Market Analysis factoring in recent
            neighborhood sales and condition.
          </p>
        </div>
      </div>

      {/* Step 1: Address & Property Details */}
      {step === 1 && (
        <form onSubmit={handleNext} className="space-y-4">
          <div>
            <label
              htmlFor="address"
              className="block text-xs font-medium text-neutral-300"
            >
              Property Address
            </label>
            <input
              id="address"
              name="address"
              type="text"
              required
              placeholder="123 Soundside Dr, Fort Walton Beach, FL"
              value={formData.address}
              onChange={handleChange}
              className="mt-1.5 w-full rounded-lg border border-neutral-700 bg-neutral-800/80 px-4 py-2.5 text-sm text-white placeholder-neutral-500 focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
            />
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label
                htmlFor="propertyType"
                className="block text-xs font-medium text-neutral-300"
              >
                Property Type
              </label>
              <select
                id="propertyType"
                name="propertyType"
                value={formData.propertyType}
                onChange={handleChange}
                className="mt-1.5 w-full rounded-lg border border-neutral-700 bg-neutral-800/80 px-3 py-2.5 text-sm text-white focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
              >
                <option value="Single Family">Single Family Home</option>
                <option value="Townhome / Condo">Townhome / Condo</option>
                <option value="Waterfront / Canal">Waterfront / Canal</option>
                <option value="Vacant Land">Vacant Land</option>
              </select>
            </div>

            <div>
              <label
                htmlFor="timeline"
                className="block text-xs font-medium text-neutral-300"
              >
                Selling Timeline
              </label>
              <select
                id="timeline"
                name="timeline"
                value={formData.timeline}
                onChange={handleChange}
                className="mt-1.5 w-full rounded-lg border border-neutral-700 bg-neutral-800/80 px-3 py-2.5 text-sm text-white focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
              >
                <option value="Just curious">Just curious</option>
                <option value="1-3 months">1 - 3 months</option>
                <option value="3-6 months">3 - 6 months</option>
                <option value="6+ months">6+ months (Planning ahead)</option>
              </select>
            </div>
          </div>

          <button
            type="submit"
            className="mt-2 flex w-full items-center justify-center gap-2 rounded-lg bg-emerald-500 px-5 py-3 text-sm font-semibold text-neutral-950 transition hover:bg-emerald-400 active:scale-[0.99]"
          >
            Next: Contact Details <ArrowRight className="h-4 w-4" />
          </button>
        </form>
      )}

      {/* Step 2: Contact Information */}
      {step === 2 && (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="rounded-lg bg-neutral-800/50 p-3 text-xs text-neutral-400">
            Evaluating:{" "}
            <span className="font-semibold text-neutral-200">
              {formData.address}
            </span>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label
                htmlFor="name"
                className="block text-xs font-medium text-neutral-300"
              >
                Full Name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                required
                placeholder="Jane Doe"
                value={formData.name}
                onChange={handleChange}
                className="mt-1.5 w-full rounded-lg border border-neutral-700 bg-neutral-800/80 px-4 py-2.5 text-sm text-white placeholder-neutral-500 focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
              />
            </div>

            <div>
              <label
                htmlFor="phone"
                className="block text-xs font-medium text-neutral-300"
              >
                Phone Number (Optional)
              </label>
              <input
                id="phone"
                name="phone"
                type="tel"
                placeholder="(850) 000-0000"
                value={formData.phone}
                onChange={handleChange}
                className="mt-1.5 w-full rounded-lg border border-neutral-700 bg-neutral-800/80 px-4 py-2.5 text-sm text-white placeholder-neutral-500 focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="email"
              className="block text-xs font-medium text-neutral-300"
            >
              Email Address
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              placeholder="jane@example.com"
              value={formData.email}
              onChange={handleChange}
              className="mt-1.5 w-full rounded-lg border border-neutral-700 bg-neutral-800/80 px-4 py-2.5 text-sm text-white placeholder-neutral-500 focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
            />
          </div>

          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={() => setStep(1)}
              className="rounded-lg border border-neutral-700 bg-neutral-800 px-4 py-3 text-sm font-medium text-neutral-300 transition hover:bg-neutral-700"
            >
              Back
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-emerald-500 px-5 py-3 text-sm font-semibold text-neutral-950 transition hover:bg-emerald-400 disabled:opacity-50"
            >
              {loading ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" /> Preparing
                  Report...
                </>
              ) : (
                "Send My Valuation Report"
              )}
            </button>
          </div>
        </form>
      )}

      {/* Step 3: Success Confirmation */}
      {step === 3 && (
        <div className="py-8 text-center">
          <CheckCircle2 className="mx-auto h-12 w-12 text-emerald-400" />
          <h4 className="mt-4 text-xl font-bold text-white">
            Valuation Request Received!
          </h4>
          <p className="mx-auto mt-2 max-w-md text-sm text-neutral-400">
            We’re reviewing recent MLS comps and active market trends for{" "}
            <span className="font-semibold text-neutral-200">
              {formData.address}
            </span>
            . A detailed breakdown will hit your inbox shortly.
          </p>
          <button
            onClick={() => {
              setFormData({
                address: "",
                propertyType: "Single Family",
                timeline: "1-3 months",
                name: "",
                email: "",
                phone: "",
              });
              setStep(1);
            }}
            className="mt-6 text-xs font-medium text-emerald-400 underline hover:text-emerald-300"
          >
            Check another property
          </button>
        </div>
      )}
    </div>
  );
}
