"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { 
  containerVariants, 
  itemVariants, 
  fadeInUp, 
  buttonVariants 
} from "@/constants/variants";
import { 
  Mail, 
  Phone, 
  MapPin, 
  Clock, 
  Send, 
  MessageSquare,
  Globe,
  Users,
  Building,
  CheckCircle
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission here
    console.log("Form submitted:", formData);
  };

  const contactInfo = [
    {
      icon: Mail,
      title: "Email Us",
      details: ["info@smagritrade.com", "support@smagritrade.com"],
      description: "Get in touch with our team"
    },
    {
      icon: Phone,
      title: "Call Us",
      details: ["+233 536002451", "+233 244123456"],
      description: "Speak with our experts"
    },
    {
      icon: MapPin,
      title: "Visit Us",
      details: ["Tarkwa, Ghana", "Kumasi, Ghana"],
      description: "Our main offices"
    },
    {
      icon: Clock,
      title: "Business Hours",
      details: ["Mon - Fri: 8:00 AM - 6:00 PM", "Sat: 9:00 AM - 3:00 PM"],
      description: "We're here to help"
    }
  ];

  const departments = [
    {
      icon: Users,
      title: "Customer Support",
      description: "Get help with orders, products, and general inquiries",
      email: "support@smagritrade.com",
      response: "Within 2 hours"
    },
    {
      icon: Building,
      title: "Business Development",
      description: "Partnership opportunities and business inquiries",
      email: "business@smagritrade.com",
      response: "Within 24 hours"
    },
    {
      icon: Globe,
      title: "Farmer Relations",
      description: "Support for farmers and agricultural partnerships",
      email: "farmers@smagritrade.com",
      response: "Within 4 hours"
    }
  ];

  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <motion.section
        className="relative bg-gradient-to-br from-green-600 via-green-700 to-green-800 text-white py-20 lg:py-32"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <div className="absolute inset-0 bg-black/20" />
        <div className="relative container mx-auto px-4">
          <motion.div
            className="max-w-4xl mx-auto text-center"
            variants={containerVariants}
          >
            <motion.div
              className="inline-block mb-6 px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-sm font-medium"
              variants={fadeInUp}
            >
              Get In Touch
            </motion.div>
            
            <motion.h1
              className="text-4xl md:text-6xl font-bold mb-6 leading-tight"
              variants={itemVariants}
            >
              Let's Connect
              <span className="block text-green-200">Together</span>
            </motion.h1>
            
            <motion.p
              className="text-xl md:text-2xl text-green-100 mb-8 max-w-3xl mx-auto"
              variants={itemVariants}
            >
              Have questions about our services? Want to partner with us? 
              We're here to help you succeed in the agricultural revolution.
            </motion.p>
          </motion.div>
        </div>
      </motion.section>

      {/* Contact Info Section */}
      <motion.section
        className="py-16 bg-white"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={containerVariants}
      >
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {contactInfo.map((info, index) => (
              <motion.div
                key={index}
                className="text-center p-6 rounded-xl bg-gray-50 hover:bg-green-50 transition-colors duration-300"
                variants={itemVariants}
                whileHover={{ y: -5 }}
              >
                <div className="flex justify-center mb-4">
                  <div className="p-3 bg-green-100 rounded-full">
                    <info.icon className="w-8 h-8 text-green-600" />
                  </div>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  {info.title}
                </h3>
                <p className="text-gray-600 mb-4">
                  {info.description}
                </p>
                <div className="space-y-2">
                  {info.details.map((detail, idx) => (
                    <p key={idx} className="text-green-600 font-medium">
                      {detail}
                    </p>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Contact Form & Map Section */}
      <motion.section
        className="py-16 bg-gray-50"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={containerVariants}
      >
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <motion.div variants={itemVariants}>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Send Us a Message
              </h2>
              <p className="text-lg text-gray-600 mb-8">
                Fill out the form below and we'll get back to you as soon as possible.
              </p>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-colors duration-200"
                      placeholder="Enter your full name"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-colors duration-200"
                      placeholder="Enter your email"
                    />
                  </div>
                </div>
                
                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                    Subject *
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-colors duration-200"
                    placeholder="What's this about?"
                  />
                </div>
                
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                    Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    rows={6}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-colors duration-200 resize-none"
                    placeholder="Tell us more about your inquiry..."
                  />
                </div>
                
                <motion.button
                  type="submit"
                  className="w-full md:w-auto px-8 py-4 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-xl transition-colors duration-300 flex items-center justify-center gap-2"
                  variants={buttonVariants}
                  whileHover="hover"
                  whileTap="tap"
                >
                  <Send className="w-5 h-5" />
                  Send Message
                </motion.button>
              </form>
            </motion.div>
            
            {/* Map/Office Info */}
            <motion.div variants={itemVariants}>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Visit Our Office
              </h2>
              <p className="text-lg text-gray-600 mb-8">
                Come visit us at our main office in Tarkwa, Ghana. We'd love to meet you in person!
              </p>
              
              <div className="relative h-96 rounded-2xl overflow-hidden shadow-2xl mb-6">
                <Image
                  src="/images/cabbage3.png"
                  alt="Office location"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                <div className="absolute bottom-4 left-4 text-white">
                  <p className="font-semibold">Smagritrade Headquarters</p>
                  <p className="text-sm">Tarkwa, Ghana</p>
                </div>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <MapPin className="w-6 h-6 text-green-600 mt-1 flex-shrink-0" />
                  <div>
                    <p className="font-semibold text-gray-900">Main Office</p>
                    <p className="text-gray-600">123 Agriculture Street, Tarkwa, Ghana</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Clock className="w-6 h-6 text-green-600 mt-1 flex-shrink-0" />
                  <div>
                    <p className="font-semibold text-gray-900">Business Hours</p>
                    <p className="text-gray-600">Monday - Friday: 8:00 AM - 6:00 PM</p>
                    <p className="text-gray-600">Saturday: 9:00 AM - 3:00 PM</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Departments Section */}
      <motion.section
        className="py-16 bg-white"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={containerVariants}
      >
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center mb-12"
            variants={itemVariants}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Contact the Right Team
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Not sure who to contact? Find the right department for your specific needs.
            </p>
          </motion.div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {departments.map((dept, index) => (
              <motion.div
                key={index}
                className="p-6 rounded-xl bg-gray-50 hover:bg-green-50 transition-colors duration-300"
                variants={itemVariants}
                whileHover={{ y: -5 }}
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 bg-green-100 rounded-lg">
                    <dept.icon className="w-6 h-6 text-green-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900">
                    {dept.title}
                  </h3>
                </div>
                <p className="text-gray-600 mb-4">
                  {dept.description}
                </p>
                <div className="space-y-2">
                  <p className="text-green-600 font-medium">
                    {dept.email}
                  </p>
                  <p className="text-sm text-gray-500">
                    Response time: {dept.response}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* FAQ Section */}
      <motion.section
        className="py-16 bg-gray-50"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={containerVariants}
      >
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center mb-12"
            variants={itemVariants}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Find quick answers to common questions about our services and platform.
            </p>
          </motion.div>
          
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <motion.div
              className="p-6 bg-white rounded-xl shadow-lg"
              variants={itemVariants}
            >
              <h3 className="text-lg font-semibold text-gray-900 mb-3">
                How do I become a farmer partner?
              </h3>
              <p className="text-gray-600">
                Contact our Farmer Relations team at farmers@smagritrade.com or call us directly. 
                We'll guide you through the registration process and help you get started.
              </p>
            </motion.div>
            
            <motion.div
              className="p-6 bg-white rounded-xl shadow-lg"
              variants={itemVariants}
            >
              <h3 className="text-lg font-semibold text-gray-900 mb-3">
                What payment methods do you accept?
              </h3>
              <p className="text-gray-600">
                We accept mobile money (MTN, Vodafone, AirtelTigo), bank transfers, 
                and major credit cards. All payments are secure and encrypted.
              </p>
            </motion.div>
            
            <motion.div
              className="p-6 bg-white rounded-xl shadow-lg"
              variants={itemVariants}
            >
              <h3 className="text-lg font-semibold text-gray-900 mb-3">
                How long does delivery take?
              </h3>
              <p className="text-gray-600">
                Delivery times vary by location. In Tarkwa, we offer same-day delivery. 
                For other regions, delivery typically takes 1-3 business days.
              </p>
            </motion.div>
            
            <motion.div
              className="p-6 bg-white rounded-xl shadow-lg"
              variants={itemVariants}
            >
              <h3 className="text-lg font-semibold text-gray-900 mb-3">
                Can I invest in agricultural projects?
              </h3>
              <p className="text-gray-600">
                Yes! Visit our crowdfunding section to explore investment opportunities. 
                We offer various agricultural investment options with competitive returns.
              </p>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* CTA Section */}
      <motion.section
        className="py-16 bg-gradient-to-r from-green-600 to-green-700 text-white"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={containerVariants}
      >
        <div className="container mx-auto px-4 text-center">
          <motion.div
            className="max-w-3xl mx-auto"
            variants={containerVariants}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Ready to Get Started?
            </h2>
            <p className="text-xl text-green-100 mb-8">
              Join thousands of farmers and consumers who are already part of the 
              agricultural revolution. Let's build a better future together.
            </p>
            <motion.div
              className="flex flex-col sm:flex-row gap-4 justify-center"
              variants={containerVariants}
            >
              <motion.div variants={buttonVariants}>
                <Link
                  href="/signup"
                  className="inline-block px-8 py-4 bg-white text-green-600 font-semibold rounded-xl hover:bg-gray-100 transition-colors duration-300"
                >
                  Create Account
                </Link>
              </motion.div>
              <motion.div variants={buttonVariants}>
                <Link
                  href="/products"
                  className="inline-block px-8 py-4 border-2 border-white text-white font-semibold rounded-xl hover:bg-white hover:text-green-600 transition-colors duration-300"
                >
                  Browse Products
                </Link>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </motion.section>
    </main>
  );
};

export default ContactPage;
