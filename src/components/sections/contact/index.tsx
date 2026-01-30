"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { contactFormSchema, type ContactFormData } from "@/lib/validations/contact";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Send, Mail, MapPin } from "lucide-react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { useEffect, useRef } from "react";

export const Contact = () => {
  const errorRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    setValue,
    watch,
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: "",
      email: "",
      company: "",
      role: undefined,
      message: "",
    },
  });

  // Add shake animation to error fields
  useEffect(() => {
    Object.keys(errors).forEach((key) => {
      const element = errorRefs.current[key];
      if (element) {
        element.classList.remove("animate-shake");
        // Trigger reflow to restart animation
        void element.offsetWidth;
        element.classList.add("animate-shake");
      }
    });
  }, [errors]);

  const onSubmit = async (data: ContactFormData) => {
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Failed to submit form");
      }

      toast.success("Message sent successfully!", {
        description: "We'll get back to you as soon as possible.",
      });
      reset();
    } catch (error) {
      console.error("Form submission error:", error);
      toast.error("Failed to send message", {
        description: error instanceof Error ? error.message : "Please try again later.",
      });
    }
  };

  return (
    <section id="contact" className="min-h-0 lg:min-h-[600px]">
      <div className="grid grid-cols-1 lg:grid-cols-2 min-h-0 lg:min-h-[600px]">
        {/* Left Section - Light with logo background */}
        <div className="relative flex items-center overflow-hidden py-12 md:py-16 lg:py-0 bg-[#f5f5f5]">
          {/* JAW Logo Icon Background */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <Image
              src="/assets/jawlogoicon.svg"
              alt=""
              width={500}
              height={500}
              className="w-[400px] h-[400px] md:w-[500px] md:h-[500px] opacity-[0.06]"
            />
          </div>

          {/* Text Content */}
          <div className="relative z-10 text-left px-6 md:pl-16 lg:pl-24 md:pr-8 max-w-full md:max-w-[500px]">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 md:mb-5 font-['Space_Grotesk',sans-serif] text-gray-900">
              Get in touch
            </h2>
            <p className="text-gray-600 text-base md:text-lg mb-8 md:mb-10 whitespace-nowrap">
              Ready to build with JAW? Drop us a message.
            </p>

            <div className="space-y-5 md:space-y-6">
              <a
                href="https://t.me/+RsFLPfky7-YxZjVk"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-gray-900 hover:text-gray-600 transition-colors"
              >
                <Send className="w-5 h-5" strokeWidth={1.5} />
                <span className="font-medium">Developers Chat</span>
              </a>

              <a
                href="mailto:hello@justalab.co"
                className="flex items-center gap-3 text-gray-900 hover:text-gray-600 transition-colors"
              >
                <Mail className="w-5 h-5" strokeWidth={1.5} />
                <span className="font-medium">hello@justalab.co</span>
              </a>

              <div className="flex items-center gap-3 text-gray-900">
                <MapPin className="w-5 h-5 flex-shrink-0" strokeWidth={1.5} />
                <span className="font-medium">
                  Dover, DE 19901, United States.
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Section - Form */}
        <div className="bg-white flex items-center justify-center px-6 md:px-12 lg:px-16 py-12 md:py-16">
          <div className="w-full max-w-md">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
              <div ref={(el) => { errorRefs.current.name = el; }}>
                <Label
                  htmlFor="name"
                  className="text-sm font-medium text-gray-900 mb-2 block"
                >
                  Name <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="name"
                  type="text"
                  placeholder="Name"
                  {...register("name")}
                  className={cn(
                    "w-full px-4 py-3 bg-white border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent h-auto transition-all duration-200",
                    errors.name && "border-red-500"
                  )}
                />
                {errors.name && (
                  <p className="text-sm text-red-500 mt-1 animate-in fade-in duration-200">{errors.name.message}</p>
                )}
              </div>

              <div ref={(el) => { errorRefs.current.email = el; }}>
                <Label
                  htmlFor="email"
                  className="text-sm font-medium text-gray-900 mb-2 block"
                >
                  Email <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Email"
                  {...register("email")}
                  className={cn(
                    "w-full px-4 py-3 bg-white border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent h-auto transition-all duration-200",
                    errors.email && "border-red-500"
                  )}
                />
                {errors.email && (
                  <p className="text-sm text-red-500 mt-1 animate-in fade-in duration-200">{errors.email.message}</p>
                )}
              </div>

              {/* Company + I am a row */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div ref={(el) => { errorRefs.current.company = el; }}>
                  <Label
                    htmlFor="company"
                    className="text-sm font-medium text-gray-900 mb-2 block"
                  >
                    Company <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="company"
                    type="text"
                    placeholder="Company name"
                    {...register("company")}
                    className={cn(
                      "w-full px-4 !h-[50px] bg-white border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent transition-all duration-200",
                      errors.company && "border-red-500"
                    )}
                  />
                  {errors.company && (
                    <p className="text-sm text-red-500 mt-1 animate-in fade-in duration-200">{errors.company.message}</p>
                  )}
                </div>

                <div ref={(el) => { errorRefs.current.role = el; }}>
                  <Label
                    htmlFor="role"
                    className="text-sm font-medium text-gray-900 mb-2 block"
                  >
                    I am a <span className="text-red-500">*</span>
                  </Label>
                  <Select
                    value={watch("role") || ""}
                    onValueChange={(value) => setValue("role", value as "developer" | "business" | "other")}
                  >
                    <SelectTrigger className={cn(
                      "w-full px-4 !h-[50px] bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-black transition-all duration-200",
                      errors.role && "border-red-500"
                    )}>
                      <SelectValue placeholder="Select your Role" />
                    </SelectTrigger>
                    <SelectContent className="bg-white border border-gray-300 shadow-lg">
                      <SelectItem
                        value="developer"
                        className="bg-white hover:bg-gray-100"
                      >
                        Developer
                      </SelectItem>
                      <SelectItem
                        value="business"
                        className="bg-white hover:bg-gray-100"
                      >
                        Business
                      </SelectItem>
                      <SelectItem
                        value="other"
                        className="bg-white hover:bg-gray-100"
                      >
                        Other
                      </SelectItem>
                    </SelectContent>
                  </Select>
                  {errors.role && (
                    <p className="text-sm text-red-500 mt-1 animate-in fade-in duration-200">{errors.role.message}</p>
                  )}
                </div>
              </div>

              <div ref={(el) => { errorRefs.current.message = el; }}>
                <Label
                  htmlFor="message"
                  className="text-sm font-medium text-gray-900 mb-2 block"
                >
                  Message
                </Label>
                <Textarea
                  id="message"
                  placeholder="Type your message"
                  rows={4}
                  {...register("message")}
                  className={cn(
                    "w-full px-4 py-3 bg-white border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent resize-none transition-all duration-200",
                    errors.message && "border-red-500"
                  )}
                />
                {errors.message && (
                  <p className="text-sm text-red-500 mt-1 animate-in fade-in duration-200">{errors.message.message}</p>
                )}
              </div>

              <Button
                type="submit"
                disabled={isSubmitting}
                className={cn(
                  "w-full bg-black text-white hover:bg-gray-800 py-3 h-auto rounded-lg font-medium",
                  isSubmitting && "opacity-50 cursor-not-allowed animate-pulse"
                )}
              >
                {isSubmitting ? (
                  <span className="flex items-center gap-2">
                    <span className="inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Sending...
                  </span>
                ) : (
                  "Send message"
                )}
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};
