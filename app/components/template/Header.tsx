"use client";
import React from "react";
import { useRouter } from "next/navigation";

export default function Header() {
    const router = useRouter();

    const handleLogout = () => {
        localStorage.removeItem("auth");
        router.push("/login");
    };

    return (
        <header className="bg-white shadow-md px-6 py-4 flex items-center justify-between">
            <div className="flex items-center gap-4">
                <img
                    src="./2.png"
                    alt="Logo"
                    className="h-10 w-20 object-contain"
                />
                <h1 className="text-xl md:text-2xl font-bold text-gray-800">
                    Sistema de organização de Eventos
                </h1>
            </div>
            <button
                onClick={handleLogout}
                className="text-sm md:text-base text-red-600 font-medium hover:underline"
            >
                Sair
            </button>
        </header>
    );
}
