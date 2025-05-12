"use client";

import React from "react";

interface CardProps {
  title: string;
  icon: string;
  onClick: () => void;
  gradient?: string; // novo: cor de fundo em degradê
}

export default function Card({ title, icon, onClick, gradient }: CardProps) {
  return (
    <div
      onClick={onClick}
      className={`cursor-pointer shadow-md rounded-2xl p-6 flex items-center gap-4 text-white hover:opacity-90 transition bg-gradient-to-r ${gradient} h-24`}
    >
      <div className="text-3xl">{icon}</div>
      <div className="text-lg font-semibold">{title}</div>
    </div>
  );
}
