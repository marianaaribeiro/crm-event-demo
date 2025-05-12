"use client";

import React from "react";

interface ModalWrapperProps {
    title: string;
    onClose: () => void;
    children: React.ReactNode;
}

export default function ModalDynamic({ title, onClose, children }: ModalWrapperProps) {
    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 px-4">
            <div className="bg-white p-6 rounded-lg max-w-lg w-full max-h-[90vh] overflow-y-auto shadow-lg relative">
                <button
                    onClick={onClose}
                    className="absolute top-3 right-4 text-gray-500 hover:text-gray-700 text-lg"
                    aria-label="Fechar"
                >
                    ×
                </button>
                <h2 className="text-xl font-bold mb-4">{title}</h2>
                <div className="space-y-4">
                    {children}
                </div>
            </div>
        </div>
    );
}
