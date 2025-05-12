"use client";

import React, { useState, useEffect } from "react";
import SelectOption from "../atom/SelectOption";
import ModalDynamic from "../atom/ModalDynamic";
import ConfettiExplosion from "../atom/ConfettiExplosion";
import ContentSideBySide from "../atom/ContentSideBySide";
import { baseURL } from "../../util/urls";

export default function DecorationModal({ onClose, onSuccess, initialData }: { onClose: () => void, onSuccess: () => void, initialData?: any }) {
    const [form, setForm] = useState({
        nome: "",
        whatsapp: "",
        sala: "",
        descricao: "",
        quantidade: "",
        indeciso: false,
    });
    const [showConfetti, setShowConfetti] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        if (initialData) {
            setForm({
                nome: initialData.nome || "",
                whatsapp: initialData.whatsapp || "",
                sala: initialData.sala || "",
                descricao: initialData.descricao || "",
                quantidade: initialData.quantidade?.toString() || "",
                indeciso: initialData.indeciso || false,
            });
        }
    }, [initialData]);

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
    ) => {
        const target = e.target as HTMLInputElement;
        const { name, value, type, checked } = target;
        setForm({
            ...form,
            [name]: type === "checkbox" ? checked : value,
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true)
        const payload = {
            ...form,
            quantidade: parseInt(form.quantidade),
        };

        const isEdit = !!initialData?.id;
        const res = await fetch(`/api/decoration${isEdit ? `?id=${initialData.id}` : ""}`, {
            method: isEdit ? "PUT" : "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload),
        });

        if (res.ok) {
            setShowConfetti(true);
            setTimeout(() => {
                setShowConfetti(false);
                onClose();
                setIsLoading(false)
                onSuccess();
            }, 1500);
        }
    };

    return (
        <ModalDynamic
            title="Itens de Decoração"
            onClose={onClose}
            children={
                <>
                    {showConfetti && <ConfettiExplosion />}
                    <form onSubmit={handleSubmit} className="space-y-3">
                        <label className="block">
                            Nome da mãe:
                            <input
                                name="nome"
                                required
                                value={form.nome}
                                onChange={handleChange}
                                className="w-full border px-2 py-1 rounded"
                            />
                        </label>
                        <ContentSideBySide
                            contentOne={
                                <>
                                    <label className="block">
                                        Telemóvel WhatsApp:
                                        <input
                                            name="whatsapp"
                                            required
                                            value={form.whatsapp}
                                            onChange={handleChange}
                                            className="w-full border px-2 py-1 rounded"
                                        />
                                    </label>
                                    <SelectOption
                                        label="Qual a sala do aluno/a"
                                        name="sala"
                                        value={form.sala}
                                        options={["Sala 7", "Sala 6", "Sala 5"]}
                                        onChange={handleChange}
                                    />
                                </>
                            }
                            contentTwo={
                                <>
                                    <label className="block">
                                        Quantidade do item:
                                        <input
                                            type="number"
                                            name="quantidade"
                                            value={form.quantidade}
                                            onChange={handleChange}
                                            className="w-full border px-2 py-1 rounded"
                                        />
                                    </label>
                                    <label className="block text-sm text-gray-700 mt-2">
                                        <input
                                            type="checkbox"
                                            name="indeciso"
                                            checked={form.indeciso}
                                            onChange={handleChange}
                                            className="mr-2"
                                        />
                                        Não decidi o item ainda, vou perguntar à organizadora <b>Margarida Palma</b> qual item levar
                                    </label>
                                </>
                            }
                        />
                        <label className="block">
                            Descrição do item:
                            <textarea
                                name="descricao"
                                value={form.descricao}
                                onChange={handleChange}
                                className="w-full border px-2 py-1 rounded"
                            />
                        </label>
                        <div className="flex justify-end mt-4 gap-2">
                            <button
                                type="button"
                                disabled={isLoading}
                                onClick={onClose}
                                className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
                            >
                                Cancelar
                            </button>
                            <button
                                type="submit"
                                disabled={isLoading}
                                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                            >
                                Gravar
                            </button>
                        </div>
                    </form>
                </>
            }
        />
    );
}
