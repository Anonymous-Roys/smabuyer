import { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    default: "SmartGriTrade - Connecting Farmers and Consumers",
    template: "%s | SmartGriTrade",
  },
  description:
    "A platform connecting farmers, customers, logistics, and investors in the agricultural ecosystem.",
  keywords:
    "agriculture, farming, marketplace, crowdfunding, logistics, farm-to-table",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.className} min-h-screen flex flex-col`}>
        <div className=" flex-grow">
        <Navbar />
          {children}
          <ToastContainer position="top-right" autoClose={5000} />
          <Footer />
        </div>
      </body>
    </html>
  );
}
