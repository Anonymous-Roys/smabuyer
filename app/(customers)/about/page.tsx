"use client";
import React from "react";
import { motion } from "framer-motion";
import { 
  containerVariants, 
  itemVariants, 
  fadeInUp, 
  buttonVariants 
} from "@/constants/variants";
import { 

  Users, 
  Target, 
  Award, 
  Globe, 
  Heart, 
  Shield, 
  TrendingUp,
  CheckCircle,

} from "lucide-react";
import Image from "next/image";
import Link from "next/link";



const AboutPage = () => {
  const stats = [
    { icon: Users, value: "10,000+", label: "Farmers Connected" },
    { icon: Globe, value: "50+", label: "Regions Covered" },
    { icon: TrendingUp, value: "95%", label: "Success Rate" },
    { icon: Award, value: "5+", label: "Years Experience" },
  ];

  const values = [
    {
      icon: Heart,
      title: "Sustainability",
      description: "Committed to environmentally responsible farming practices that protect our planet for future generations."
    },
    {
      icon: Shield,
      title: "Trust & Quality",
      description: "Ensuring the highest quality standards and building lasting relationships with our farming community."
    },
    {
      icon: Target,
      title: "Innovation",
      description: "Leveraging technology to revolutionize agricultural practices and market access."
    },
    {
      icon: Users,
      title: "Community",
      description: "Fostering strong partnerships between farmers, consumers, and stakeholders."
    }
  ];

  const team = [
    {
      name: "Kwame Addo",
      role: "CEO & Founder",
      image: "/images/team-1.jpg",
      description: "Agricultural technology expert with 15+ years in sustainable farming."
    },
    {
      name: "Ama Osei",
      role: "Head of Operations",
      image: "/images/team-2.jpg", 
      description: "Supply chain specialist focused on connecting farmers to markets."
    },
    {
      name: "Kofi Mensah",
      role: "Technology Lead",
      image: "/images/team-3.jpg",
      description: "Digital innovation expert driving our platform development."
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
              About Smagritrade
            </motion.div>
            
            <motion.h1
              className="text-4xl md:text-6xl font-bold mb-6 leading-tight"
              variants={itemVariants}
            >
              Empowering African
              <span className="block text-green-200">Agriculture</span>
            </motion.h1>
            
            <motion.p
              className="text-xl md:text-2xl text-green-100 mb-8 max-w-3xl mx-auto"
              variants={itemVariants}
            >
              We believe in better agriculture for a better future. Connecting farmers, 
              consumers, and investors through innovative technology and sustainable practices.
            </motion.p>
          </motion.div>
        </div>
      </motion.section>

      {/* Stats Section */}
      <motion.section
        className="py-16 bg-white"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={containerVariants}
      >
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                className="text-center"
                variants={itemVariants}
              >
                <div className="flex justify-center mb-4">
                  <div className="p-3 bg-green-100 rounded-full">
                    <stat.icon className="w-8 h-8 text-green-600" />
                  </div>
                </div>
                <div className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
                  {stat.value}
                </div>
                <div className="text-gray-600">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Mission Section */}
      <motion.section
        className="py-16 bg-gray-50"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={containerVariants}
      >
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div variants={itemVariants}>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Our Mission
              </h2>
              <p className="text-lg text-gray-600 mb-6">
                To revolutionize African agriculture by creating a sustainable ecosystem 
                that connects farmers directly with consumers and investors, ensuring 
                fair prices, quality products, and economic growth for all stakeholders.
              </p>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-6 h-6 text-green-600 mt-1 flex-shrink-0" />
                  <p className="text-gray-600">
                    Provide farmers with access to modern technology and market opportunities
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-6 h-6 text-green-600 mt-1 flex-shrink-0" />
                  <p className="text-gray-600">
                    Ensure consumers receive fresh, quality agricultural products
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-6 h-6 text-green-600 mt-1 flex-shrink-0" />
                  <p className="text-gray-600">
                    Create sustainable investment opportunities in agriculture
                  </p>
                </div>
              </div>
            </motion.div>
            
            <motion.div
              className="relative"
              variants={itemVariants}
            >
              <div className="relative h-96 rounded-2xl overflow-hidden shadow-2xl">
                <Image
                  src="/images/cabbage2.png"
                  alt="Farmers working in field"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
              </div>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Values Section */}
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
              Our Core Values
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              These principles guide everything we do and shape our commitment to 
              transforming African agriculture.
            </p>
          </motion.div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={index}
                className="text-center p-6 rounded-xl bg-gray-50 hover:bg-green-50 transition-colors duration-300"
                variants={itemVariants}
                whileHover={{ y: -5 }}
              >
                <div className="flex justify-center mb-4">
                  <div className="p-3 bg-green-100 rounded-full">
                    <value.icon className="w-8 h-8 text-green-600" />
                  </div>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  {value.title}
                </h3>
                <p className="text-gray-600">
                  {value.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Team Section */}
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
              Meet Our Team
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Passionate individuals dedicated to transforming African agriculture 
              through innovation and sustainable practices.
            </p>
          </motion.div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <motion.div
                key={index}
                className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300"
                variants={itemVariants}
                whileHover={{ y: -5 }}
              >
                <div className="relative h-48 mb-4 rounded-lg overflow-hidden">
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-1">
                  {member.name}
                </h3>
                <p className="text-green-600 font-medium mb-3">
                  {member.role}
                </p>
                <p className="text-gray-600">
                  {member.description}
                </p>
              </motion.div>
            ))}
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
              Join the Agricultural Revolution
            </h2>
            <p className="text-xl text-green-100 mb-8">
              Whether you&#39;re a farmer, consumer, or investor, there&#39;s a place for you 
              in our mission to transform African agriculture.
            </p>
            <motion.div
              className="flex flex-col sm:flex-row gap-4 justify-center"
              variants={containerVariants}
            >
              <motion.div variants={buttonVariants}>
                <Link
                  href="/products"
                  className="inline-block px-8 py-4 bg-white text-green-600 font-semibold rounded-xl hover:bg-gray-100 transition-colors duration-300"
                >
                  Explore Products
                </Link>
              </motion.div>
              <motion.div variants={buttonVariants}>
                <Link
                  href="/crowdfunding"
                  className="inline-block px-8 py-4 border-2 border-white text-white font-semibold rounded-xl hover:bg-white hover:text-green-600 transition-colors duration-300"
                >
                  Invest in Agriculture
                </Link>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </motion.section>
    </main>
  );
};

export default AboutPage;
