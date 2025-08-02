import React, { ReactNode } from "react";


export const metadata = {
    title: "Crowdfunding",
};

interface LayoutProps {
    children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
    return <>{children}</>;
}