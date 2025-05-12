"use client";

import React, { ReactNode } from "react";

interface IContainerBlack {
    content?: ReactNode;
    text: ReactNode | string;
}

export default function ContainerBlack({ text, content }: IContainerBlack) {
    return (
        <div className="bg-gray-900 text-white py-6 px-6 rounded-b-2xl shadow-lg">
            <div className="max-w-screen-xl mx-auto">
                {typeof text === "string" ? <h1 className="text-2xl font-bold mb-4">Evento: Almoço com a Família do Jardim de Infância da escola Santo Amaro</h1> : text}
                <div className=" p-4 rounded-xl">
                    {content ?? null}
                </div>
            </div>
        </div>
    );
}
