import React from "react";
import "../styles/globals.css";

export default function RootLayout({ children }) {
  return (
    <html lang="pt">
      <head />
      <body className="bg-gray-100 text-gray-900">{children}</body>
    </html>
  );
}