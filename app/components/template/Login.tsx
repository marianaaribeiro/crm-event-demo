"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Eye, EyeOff } from "lucide-react";

export default function Login() {
    const router = useRouter();
    const [user, setUser] = useState("");
    const [pass, setPass] = useState("");
    const [error, setError] = useState("");
    const [showPass, setShowPass] = useState(false);

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        if (user === "admin" && pass === "eventoFamilia") {
            localStorage.setItem("auth", "true");
            router.push("/dashboard");
        } else {
            setError("Usuário ou senha incorretos.");
        }
    };

    return (
        <div className="min-h-screen flex">
            {/* IMAGEM */}
            <div className="hidden md:flex w-1/2 bg-gradient-to-br from-yellow-300 via-rose-400 to-purple-600 items-center justify-center">
                <img
                    src="/6.png" // Altere para sua imagem
                    alt="Evento Família"
                    className="w-3/4 rounded-xl shadow-xl"
                />
            </div>


            {/* FORMULÁRIO */}
            <div className="flex-1 flex items-center justify-center bg-white">
                <form
                    onSubmit={handleLogin}
                    className="w-full max-w-sm p-8 bg-white rounded-xl shadow-lg"
                >
                    <div className="flex flex-col items-center justify-center text-center mb-6">
                        <img
                            src="./1.png"
                            alt="Logo"
                            className="h-10 w-20 object-contain mb-2"
                        />
                        <h2 className="text-2xl font-bold bg-gradient-to-r from-orange-400 via-pink-500 to-purple-600 bg-clip-text text-transparent">
                            Login do Evento
                        </h2>
                    </div>

                    {error && (
                        <p className="text-red-500 text-sm mb-4 text-center">{error}</p>
                    )}

                    <label className="text-sm font-medium">Usuário</label>
                    <input
                        type="text"
                        required
                        value={user}
                        onChange={(e) => setUser(e.target.value)}
                        className="w-full mt-1 mb-4 px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-purple-400"
                    />

                    <label className="text-sm font-medium">Senha</label>
                    <div className="relative">
                        <input
                            type={showPass ? "text" : "password"}
                            required
                            value={pass}
                            onChange={(e) => setPass(e.target.value)}
                            className="w-full mt-1 mb-6 px-3 py-2 border rounded pr-10 focus:outline-none focus:ring-2 focus:ring-purple-400"
                        />
                        <span
                            onClick={() => setShowPass(!showPass)}
                            className="absolute right-3 top-3 text-gray-500 cursor-pointer"
                        >
                            {showPass ? <EyeOff size={18} /> : <Eye size={18} />}
                        </span>
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-gradient-to-r from-yellow-300 via-rose-400 to-purple-600 text-white py-2 rounded hover:opacity-90  font-bold transition"
                    >
                        Entrar
                    </button>
                </form>
            </div>
        </div>
    );
}
