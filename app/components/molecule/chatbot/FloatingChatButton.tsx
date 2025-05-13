
"use client";
import { useState } from "react";
import { MessageCircle } from "lucide-react";
import ChatModal from "./ChatModal";

export default function FloatingChatButton() {
    const [open, setOpen] = useState(false);

    return (
        <>
            <div
                className="fixed right-4 bottom-4 z-50 cursor-pointer p-3 bg-gradient-to-r from-pink-500 to-purple-600 rounded-full shadow-lg animate-bounce flex items-center gap-2"
                onClick={() => setOpen(true)}
            >
                <MessageCircle className="text-white" />
                <span className="text-white font-bold">IA</span>
            </div>
            {open && <ChatModal onClose={() => setOpen(false)} />}
        </>
    );
}
