"use client";
import { useState } from "react";

export default function ChatModal({ onClose }: { onClose: () => void }) {
    const [messages, setMessages] = useState<string[]>([]);
    const [input, setInput] = useState("");
    const [loading, setLoading] = useState(false);

    const sendMessage = async () => {
        if (!input.trim()) return;

        const userMessage = input.trim();
        setMessages((prev) => [...prev, `👤: ${userMessage}`]);
        setInput("");
        setLoading(true);

        try {
            const res = await fetch("/api/chat", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ question: userMessage }),
            });

            const data = await res.json();
            setMessages((prev) => [...prev, `🤖: ${data.resposta}`]);
        } catch (err) {
            setMessages((prev) => [...prev, "❌: Erro ao obter resposta."]);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed bottom-20 right-4 w-80 bg-white shadow-xl rounded-xl border z-50 p-4">
            <div className="flex justify-between items-center mb-2">
                <h2 className="font-semibold text-gray-800">Chat IA - Dúvidas Frequentes</h2>
                <button onClick={onClose} className="text-red-500 hover:underline">Fechar</button>
            </div>
            <div className="h-64 overflow-y-auto mb-2 border rounded p-2 text-sm space-y-1 bg-gray-50">
                {messages.map((msg, i) => (
                    <div key={i}>{msg}</div>
                ))}
                {loading && <div className="italic text-gray-400">Digitando...</div>}
            </div>
            <div className="flex gap-2">
                <input
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                    className="flex-1 px-2 py-1 border rounded text-sm"
                    placeholder="Digite sua dúvida..."
                />
                <button
                    onClick={sendMessage}
                    disabled={loading}
                    className="bg-blue-500 text-white px-3 rounded text-sm hover:bg-blue-600 disabled:opacity-50"
                >
                    Enviar
                </button>
            </div>
        </div>
    );
}
