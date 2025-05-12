"use client";

import { useState, useEffect } from "react";
import SelectOption from "../atom/SelectOption";
import ModalDynamic from "../atom/ModalDynamic";
import ConfettiExplosion from "../atom/ConfettiExplosion";
import ContentSideBySide from "../atom/ContentSideBySide";
import { baseURL } from "../../util/urls";

export default function OrganizationModal({
  onClose,
  onSuccess,
  initialData,
}: {
  onClose: () => void;
  onSuccess: () => void;
  initialData?: any;
}) {
  const [form, setForm] = useState({
    nome: "",
    whatsapp: "",
    descricao: "",
    sala: "",
    quantidade: "",
    indeciso: false,
  });

  const [showConfetti, setShowConfetti] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // preenche o form se for edição
  useEffect(() => {
    if (initialData) {
      setForm({
        nome: initialData.nome || "",
        whatsapp: initialData.whatsapp || "",
        descricao: initialData.descricao || "",
        sala: initialData.sala || "",
        quantidade: initialData.quantidade?.toString() || "",
        indeciso: !!initialData.indeciso,
      });
    }
  }, [initialData]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const target = e.target as HTMLInputElement;
    const { name, value, type, checked } = target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    const method = initialData?.id ? "PUT" : "POST";
    const endpoint = `/api/organization${initialData?.id ? `?id=${initialData.id}` : ""}`;

    const res = await fetch(endpoint, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...form, quantidade: parseInt(form.quantidade) }),
    });

    if (res.ok) {
      setShowConfetti(true);
      setTimeout(() => {
        setShowConfetti(false);
        onSuccess();
        setIsLoading(false);
        onClose();
      }, 1500);
    }
  };

  return (
    <ModalDynamic
      title="Inscrição de itens de organização"
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
                    Não decidi o item ainda, vou perguntar à organizadora <b>Jéssica Peixoto</b> qual item levar
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
                onClick={onClose}
                disabled={isLoading}
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

