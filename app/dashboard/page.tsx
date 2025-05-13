"use client";

import React from "react";
import Header from "../components/template/Header";
import Dashboard from "../components/template/Dashboard";
import Footer from "../components/atom/Footer";
import FloatingChatButton from "../components/molecule/chatbot/FloatingChatButton";

export default function HomePage() {
  return (
    <>
      <Header />
      <main className="px-6">
        <Dashboard />
        <FloatingChatButton />
      </main>
      <Footer />
    </>
  );
}