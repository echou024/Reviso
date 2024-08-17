"use client"; // Add this to indicate a client component

import { ClerkProvider } from '@clerk/nextjs';
import '../styles/globals.css'; // Ensure the path is correct

export default function RootLayout({ children }) {
  return (
    <ClerkProvider publishableKey={""}>
      <html lang="en">
        <body>{children}</body>
      </html>
    </ClerkProvider>
  );
}

