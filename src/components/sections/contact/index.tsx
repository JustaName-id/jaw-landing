"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Send, Mail, MapPin } from "lucide-react";
import Image from "next/image";

interface FormData {
  name: string;
  email: string;
  role: string;
  company: string;
  message: string;
  privacy: boolean;
}

export const Contact = () => {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    role: "",
    company: "",
    message: "",
    privacy: false,
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleRoleChange = (value: string) => {
    setFormData((prev) => ({ ...prev, role: value }));
  };

  const handlePrivacyChange = (checked: boolean) => {
    setFormData((prev) => ({ ...prev, privacy: checked }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
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
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <Label
                  htmlFor="name"
                  className="text-sm font-medium text-gray-900 mb-2 block"
                >
                  Name <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="name"
                  name="name"
                  type="text"
                  placeholder="Name"
                  required
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-white border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent h-auto"
                />
              </div>

              <div>
                <Label
                  htmlFor="email"
                  className="text-sm font-medium text-gray-900 mb-2 block"
                >
                  Email <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="Email"
                  required
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-white border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent h-auto"
                />
              </div>

              {/* Company + I am a row */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label
                    htmlFor="company"
                    className="text-sm font-medium text-gray-900 mb-2 block"
                  >
                    Company <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="company"
                    name="company"
                    type="text"
                    placeholder="Company name"
                    required
                    value={formData.company}
                    onChange={handleInputChange}
                    className="w-full px-4 !h-[50px] bg-white border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
                  />
                </div>

                <div>
                  <Label
                    htmlFor="role"
                    className="text-sm font-medium text-gray-900 mb-2 block"
                  >
                    I am a <span className="text-red-500">*</span>
                  </Label>
                  <Select
                    value={formData.role}
                    onValueChange={handleRoleChange}
                    required
                  >
                    <SelectTrigger className="w-full px-4 !h-[50px] bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-black">
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
                </div>
              </div>

              <div>
                <Label
                  htmlFor="message"
                  className="text-sm font-medium text-gray-900 mb-2 block"
                >
                  Message
                </Label>
                <Textarea
                  id="message"
                  name="message"
                  placeholder="Type your message"
                  rows={4}
                  value={formData.message}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-white border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent resize-none"
                />
              </div>

              <Button
                type="submit"
                className="w-full bg-black text-white hover:bg-gray-800 py-3 h-auto rounded-lg font-medium"
              >
                Send message
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};
