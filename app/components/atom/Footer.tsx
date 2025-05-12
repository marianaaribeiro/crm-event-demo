"use client";

import React from "react";

export default function Footer() {
  return (
    <footer className="bg-black text-white py-4 mt-10">
      <div className="flex flex-col items-center justify-center text-center space-y-2">
        <div className="flex items-center gap-2">
          <img src="./5.png" alt="Logo" className="h-14 w-14 object-contain" />
          <span className="text-sm">© 2025 Direitos reservados</span>
          <p className="text-sm"> - mali.itcontact@gmail.com</p>
        </div>
      </div>
    </footer>
  );
}
