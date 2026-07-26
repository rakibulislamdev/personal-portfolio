"use client";

import React, { useState } from "react";
import { toast } from "sonner";
import { sendEmailAction } from "../actions";

interface FormErrors {
  name?: string;
  email?: string;
  subject?: string;
  message?: string;
}

export const ContactFormFields = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validate = (): boolean => {
    const newErrors: FormErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!formData.name.trim()) {
      newErrors.name = "Name is required.";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required.";
    } else if (!emailRegex.test(formData.email.trim())) {
      newErrors.email = "Please enter a valid email address.";
    }

    if (!formData.subject.trim()) {
      newErrors.subject = "Subject is required.";
    }

    if (!formData.message.trim()) {
      newErrors.message = "Message is required.";
    } else if (formData.message.trim().length < 10) {
      newErrors.message = "Message must be at least 10 characters long.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!validate()) {
      return;
    }

    setIsSubmitting(true);
    const data = new FormData();
    data.append("name", formData.name);
    data.append("email", formData.email);
    data.append("subject", formData.subject);
    data.append("message", formData.message);

    try {
      const response = await sendEmailAction(data);

      if (response.success) {
        toast.success(response.message);
        setFormData({ name: "", email: "", subject: "", message: "" });
        setErrors({});
      } else {
        toast.error(response.message);
      }
    } catch (error) {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4" noValidate>
      {/* Name Input */}
      <div>
        <input
          className={`w-full px-5 py-4 bg-zinc-100 dark:bg-[#1a1a1a] border rounded-2xl text-zinc-900 dark:text-white placeholder-zinc-400 dark:placeholder-zinc-500 focus:outline-none transition-colors text-sm font-medium ${
            errors.name
              ? "border-rose-500 focus:border-rose-500"
              : "border-zinc-200/80 dark:border-zinc-800/80 focus:border-[var(--theme-color)]"
          }`}
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Your Name *"
        />
        {errors.name && (
          <p className="mt-1.5 ml-2 text-xs text-rose-500 font-medium animate-in fade-in duration-200">
            {errors.name}
          </p>
        )}
      </div>

      {/* Email Input */}
      <div>
        <input
          className={`w-full px-5 py-4 bg-zinc-100 dark:bg-[#1a1a1a] border rounded-2xl text-zinc-900 dark:text-white placeholder-zinc-400 dark:placeholder-zinc-500 focus:outline-none transition-colors text-sm font-medium ${
            errors.email
              ? "border-rose-500 focus:border-rose-500"
              : "border-zinc-200/80 dark:border-zinc-800/80 focus:border-[var(--theme-color)]"
          }`}
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Your Email *"
        />
        {errors.email && (
          <p className="mt-1.5 ml-2 text-xs text-rose-500 font-medium animate-in fade-in duration-200">
            {errors.email}
          </p>
        )}
      </div>

      {/* Subject Input */}
      <div>
        <input
          className={`w-full px-5 py-4 bg-zinc-100 dark:bg-[#1a1a1a] border rounded-2xl text-zinc-900 dark:text-white placeholder-zinc-400 dark:placeholder-zinc-500 focus:outline-none transition-colors text-sm font-medium ${
            errors.subject
              ? "border-rose-500 focus:border-rose-500"
              : "border-zinc-200/80 dark:border-zinc-800/80 focus:border-[var(--theme-color)]"
          }`}
          type="text"
          name="subject"
          value={formData.subject}
          onChange={handleChange}
          placeholder="Your Subject *"
        />
        {errors.subject && (
          <p className="mt-1.5 ml-2 text-xs text-rose-500 font-medium animate-in fade-in duration-200">
            {errors.subject}
          </p>
        )}
      </div>

      {/* Message Input */}
      <div>
        <textarea
          className={`w-full px-5 py-4 bg-zinc-100 dark:bg-[#1a1a1a] border rounded-2xl text-zinc-900 dark:text-white placeholder-zinc-400 dark:placeholder-zinc-500 focus:outline-none transition-colors text-sm font-medium resize-none ${
            errors.message
              ? "border-rose-500 focus:border-rose-500"
              : "border-zinc-200/80 dark:border-zinc-800/80 focus:border-[var(--theme-color)]"
          }`}
          name="message"
          rows={5}
          value={formData.message}
          onChange={handleChange}
          placeholder="Your Message *"
        />
        {errors.message && (
          <p className="mt-1.5 ml-2 text-xs text-rose-500 font-medium animate-in fade-in duration-200">
            {errors.message}
          </p>
        )}
      </div>

      {/* Submit Button */}
      <button
        disabled={isSubmitting}
        className="w-full py-4 px-6 bg-zinc-900 hover:bg-zinc-800 dark:bg-[#252525] dark:hover:bg-[#303030] text-white font-bold rounded-2xl border border-zinc-700/50 hover:border-[var(--theme-color)] transition-all duration-300 shadow-md cursor-pointer text-sm tracking-wide disabled:opacity-50 disabled:cursor-not-allowed"
        type="submit"
      >
        {isSubmitting ? "Sending..." : "Send Message"}
      </button>
    </form>
  );
};
