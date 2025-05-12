import React from "react";

interface AvatarCardProps {
    name: string;
    imageUrl: string;
    subTitle: string;
    contact: string;
    role?: string;
}

export default function AvatarCard({ name, imageUrl, role = "Organizadora da equipe", subTitle, contact }: AvatarCardProps) {
    return (

        <div className="flex flex-col items-center bg-white p-4 rounded-xl shadow transition-transform duration-200 hover:scale-105 w-full max-w-[200px] mx-auto">
            <img
                src={imageUrl}
                alt={name}
                className="w-20 h-20 rounded-full object-cover border-2 border-gray-300 mb-3"
            />
            <p className="text-base font-semibold text-center">{name}</p>
            <p className="text-sm text-gray-500 text-center">{subTitle}</p>
            <p className="text-base font-semibold text-center">{role}</p>
            <p className="text-sm text-gray-500 text-center">{contact}</p>
        </div>
    );
}


