// footer.types.ts

import { ReactNode } from 'react';

export interface FooterLinkProps {
  href: string;
  children: ReactNode;
}

export interface FooterSectionProps {
  title: string;
  children: ReactNode;
}

export interface PaymentIconProps {
    icon: string;
  }