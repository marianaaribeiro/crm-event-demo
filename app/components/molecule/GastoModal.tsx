"use client";

import React, { useState, useEffect } from "react";
import SelectOption from "../atom/SelectOption";
import ModalDynamic from "../atom/ModalDynamic";
import ConfettiExplosion from "../atom/ConfettiExplosion";
import { baseURL } from "../../util/urls";

export default function GastoModal({ onClose, onSuccess, initialData }) {
  const [sala, setSala] = useState(initialData?.sala || "");
  const [showConfetti, setShowConfetti] = useState(false);
  const [form, setForm] = useState({
    nome: "",
    item: "",
    valor: "",
  });
  const [isLoading, setIsLoading] = React.useState(false);

  useEffect(() => {
    if (initialData) {
      setForm({
        nome: initialData.nome || "",
        item: initialData.item || "",
        valor: initialData.valor?.toString() || "",
      });
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  async function handleSubmit(e) {
    e.preventDefault();
    setIsLoading(true)
    const payload = {
      ...form,
      valor: parseFloat(form.valor),
      sala,
    };

    const isEdit = !!initialData?.id;
    const res = await fetch(`/api/gastos${isEdit ? `?id=${initialData.id}` : ""}`, {
      method: isEdit ? "PUT" : "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (res.ok) {
      setShowConfetti(true);
      setTimeout(() => {
        setShowConfetti(false);
        onSuccess();
        setIsLoading(false)
        onClose();
      }, 1500);
    }
  }

  return (
    <ModalDynamic
      title="Registro de Gasto"
      onClose={onClose}
      children={
        <>
          {showConfetti && <ConfettiExplosion />}
          <form onSubmit={handleSubmit}>
            <label className="block mb-2">
              Nome da mãe:
              <input
                name="nome"
                value={form.nome}
                required
                onChange={handleChange}
                className="w-full border px-2 py-1 rounded"
              />
            </label>
            <label className="block mb-2">
              Descrição do item:
              <input
                name="item"
                value={form.item}
                required
                onChange={handleChange}
                className="w-full border px-2 py-1 rounded"
              />
            </label>
            <SelectOption
              label="Qual a sala do aluno/a"
              name="sala"
              value={sala}
              options={["Sala 7", "Sala 6", "Sala 5"]}
              onChange={(e) => setSala(e.target.value)}
            />
            <label className="block mb-2">
              Valor (€):
              <input
                type="number"
                name="valor"
                step="0.01"
                value={form.valor}
                required
                onChange={handleChange}
                className="w-full border px-2 py-1 rounded"
              />
            </label>

            <div className="flex justify-end mt-4 gap-2">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
              >
                Cancelar
              </button>
              <button
                type="submit"
                disabled={isLoading}
                className={`px-4 py-2 rounded text-white transition ${isLoading
                    ? "bg-blue-300 cursor-not-allowed"
                    : "bg-blue-500 hover:bg-blue-600"
                  }`}
              >
                {isLoading ? "Salvando..." : "Gravar"}
              </button>

            </div>
          </form>
        </>
      }
    />
  );
}
