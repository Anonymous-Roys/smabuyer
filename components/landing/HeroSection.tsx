"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

const Hero = () => {
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.7, ease: "easeOut" },
    },
  };

  const buttonVariants = {
    hidden: { scale: 0.9, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: { duration: 0.5 },
    },
    hover: {
      scale: 1.05,
      y: -5,
      transition: { duration: 0.3 },
    },
    tap: {
      scale: 0.95,
      transition: { duration: 0.1 },
    },
  };

  const fadeInUp = {
    hidden: { y: 60, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  const glowVariants = {
    initial: { opacity: 0.2 },
    animate: {
      opacity: [0.2, 0.3, 0.2],
      transition: { duration: 8, repeat: Infinity, ease: "easeInOut" },
    },
  };

  return (
    <motion.section
      className="relative  w-full h-screen overflow-hidden"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      {/* Dynamic Background with Parallax Effect */}
      <div className="absolute inset-0 z-0">
        <div className="relative h-full w-full">
          {/* Main Background Image */}
          <motion.div
            initial="initial"
            animate="animate"
            variants={{
              hidden: { scale: 0.9, opacity: 0 },
              visible: {
                scale: 1,
                opacity: 1,
                transition: { duration: 0.5 },
              },
              hover: {
                scale: 1.05,
                y: -5,
                transition: { duration: 0.3 },
              },
              tap: {
                scale: 0.95,
                transition: { duration: 0.1 },
              },
            }}
            className="h-full w-full"
          >
            <Image
              src="/images/hero-section.svg"
              alt="Organic farm field with crops"
              fill
              priority
              className="object-cover object-center"
              sizes="100vw"
            />
          </motion.div>

          {/* Overlay Gradient */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-transparent" />
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        {/* Animated grain pattern for texture */}
        <motion.div
          className="absolute inset-0 opacity-40 bg-black/100"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.4 }}
          transition={{ duration: 1.5 }}
        />

        {/* Subtle organic shapes */}
        <motion.div
          className="absolute -bottom-20 -right-20 w-96 h-96 bg-green-500/20 rounded-full blur-3xl"
          variants={glowVariants}
          initial="initial"
          animate="animate"
        />
        <motion.div
          className="absolute -top-20 -left-20 w-96 h-96 bg-green-600/10 rounded-full blur-3xl"
          variants={glowVariants}
          initial="initial"
          animate="animate"
          transition={{ delay: 4 }}
        />
      </div>

      {/* Content Container */}
      <div className="relative z-10  flex items-center justify-between h-full w-full px-4 sm:px-6 lg:px-8">
        <div className="w-[90%] mx-auto  mr-auto pl-8 max-md:pl:10">
          <div className="grid container grid-cols-1 lg:grid-cols-5 gap-6 items-center">
            {/* Text Content (3/5 width on desktop) */}
            <motion.div
              className="lg:col-span-3 text-left"
              variants={containerVariants}
            >
              {/* Badge/Tag */}
              <motion.div
                className="inline-block mb-6 px-4 py-1.5 bg-green-600/90 text-white text-sm font-medium rounded-full backdrop-blur-sm"
                variants={fadeInUp}
                initial="hidden"
                animate="visible"
                transition={{ delay: 0.2 }}
              >
                Premium Quality
              </motion.div>

              {/* Main Heading with Highlight */}
              <motion.h1
                className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight"
                variants={itemVariants}
              >
                Pure Agriculture
                <motion.span
                  className="block text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-green-600"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.8, duration: 0.8 }}
                >
                  Products
                </motion.span>
              </motion.h1>

              {/* Subtitle */}
              <motion.p
                className="text-lg md:text-xl text-gray-200 mb-8 max-w-md"
                variants={itemVariants}
              >
                Welcome to Smagritrade. We believe in better Agriculture for
                better Future!
              </motion.p>

              {/* CTA Section */}
              <motion.div
                className="flex flex-col sm:flex-row gap-4 "
                variants={containerVariants}
              >
                <motion.div
                  variants={buttonVariants}
                  whileHover="hover"
                  whileTap="tap"
                >
                  <Link
                    href="/products"
                    className="px-4 py-4 w-fit bg-green-600 hover:bg-green-700 text-white font-semibold rounded-xl transition-all duration-300 flex items-center shadow-lg shadow-green-900/20 hover:shadow-green-800/40"
                  >
                    Get Started
                    <motion.svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 ml-2"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      initial={{ x: 0 }}
                      animate={{ x: [0, 5, 0] }}
                      transition={{
                        duration: 1.5,
                        repeat: Infinity,
                        repeatDelay: 3,
                      }}
                    >
                      <path
                        fillRule="evenodd"
                        d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                        clipRule="evenodd"
                      />
                    </motion.svg>
                  </Link>
                </motion.div>
              </motion.div>
            </motion.div>

            {/* Product Showcase (2/5 width on desktop) */}
            <motion.div
              className="lg:col-span-1 relative hidden lg:block"
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <div className="relative h-[550px] w-full">
                {/* Main Product Image */}
                <motion.div
                  className="absolute top-0 right-0 w-full h-full"
                  initial={{ y: 30, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.8, delay: 0.9 }}
                ></motion.div>

                {/* Floating badges */}
                <motion.div
                  className="absolute -left-10 top-1/4 px-4 py-2 bg-white rounded-lg shadow-xl"
                  animate="animate"
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{
                    delay: 1.5,
                    duration: 3,
                    repeat: Infinity,
                    repeatType: "reverse",
                    ease: "easeInOut",
                  }}
                >
                  <div className="flex items-center gap-2">
                    <motion.div
                      className="w-3 h-3 bg-green-500 rounded-full"
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    />
                    <span className="font-medium text-gray-800">
                      100% Organic
                    </span>
                  </div>
                </motion.div>

                <motion.div
                  className="absolute -right-5 bottom-1/3 px-4 py-2 bg-white rounded-lg shadow-xl"
                  animate="animate"
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{
                    delay: 1.5,
                    duration: 3,
                    repeat: Infinity,
                    repeatType: "reverse",
                    ease: "easeInOut",
                  }}
                >
                  <div className="flex items-center gap-2">
                    <motion.div
                      className="w-3 h-3 bg-yellow-500 rounded-full"
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 2, repeat: Infinity, delay: 1 }}
                    />
                    <span className="font-medium text-gray-800">
                      Eco Friendly
                    </span>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
      >
        <motion.span
          className="text-sm text-white/80 mb-2"
          animate={{ opacity: [0.7, 1, 0.7] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          Scroll to explore
        </motion.span>
        <motion.div
          className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center p-1"
          animate={{ y: [0, 5, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          <motion.div
            className="w-1.5 h-1.5 bg-green-400 rounded-full"
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          />
        </motion.div>
      </motion.div>
    </motion.section>
  );
};

export default Hero;
