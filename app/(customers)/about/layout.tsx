import { Metadata } from "next";

export const metadata: Metadata = {
    title: "About Us",
    description: "Learn about Smagritrade - Empowering African agriculture through technology and smart trade.",
  keywords:
    "agriculture, farming, marketplace, crowdfunding, logistics, farm-to-table, about us",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
        {children}
    </div>
  );
}
