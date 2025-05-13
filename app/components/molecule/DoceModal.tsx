"use client";

import React from "react";
import SelectOption from "../atom/SelectOption";
import { allCountries } from "../../util/listPais";
import ContentSideBySide from "../atom/ContentSideBySide";
import ModalDynamic from "../atom/ModalDynamic";
import ConfettiExplosion from "../atom/ConfettiExplosion";
import { baseURL } from "../../util/urls";

export default function DoceModal({ onClose, onSuccess, initialData }) {
  const [sala, setSala] = React.useState(initialData?.sala || "");
  const [pais, setPais] = React.useState(initialData?.origem || "");
  const [showConfetti, setShowConfetti] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setIsLoading(true)
    const data: any = Object.fromEntries(new FormData(e.target).entries());
    data.sala = sala;
    data.origem = pais;

    if (data.pessoas) data.pessoas = parseInt(data.pessoas);

    const isEditing = !!initialData?.id;
    const res = await fetch(`/api/doces${isEditing ? `?id=${initialData.id}` : ""}`, {
      method: isEditing ? "PUT" : "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
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
      onClose={onClose}
      title="Inscrição para os doces"
      children={
        <>
          {showConfetti && <ConfettiExplosion />}
          <p className="text-sm mb-4 text-gray-700">
            Informar alguns ingredientes, pois há pessoas com alergia ou restrições religiosas.
          </p>
          <form onSubmit={handleSubmit}>
            <ContentSideBySide
              contentOne={
                <>
                  <label className="block mb-2">
                    Nome da mãe:
                    <input
                      name="nome"
                      required
                      defaultValue={initialData?.nome || ""}
                      className="w-full border px-2 py-1 rounded"
                    />
                  </label>
                  <label className="block mb-2">
                    Telemóvel WhatsApp:
                    <input
                      name="telefone"
                      required
                      defaultValue={initialData?.telefone || ""}
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
                </>
              }
              contentTwo={
                <>
                  <SelectOption
                    label="Origem do país do doce"
                    name="origem"
                    value={pais}
                    options={allCountries}
                    onChange={(e) => setPais(e.target.value)}
                  />
                  <label className="block mb-2">
                    Nome da bebida:
                    <input
                      name="bebida"
                      required
                      defaultValue={initialData?.bebida || ""}
                      className="w-full border px-2 py-1 rounded"
                    />
                  </label>
                  <label className="block mb-2">
                    Quantas pessoas são?
                    <input
                      type="number"
                      name="pessoas"
                      required
                      defaultValue={initialData?.pessoas || ""}
                      className="w-full border px-2 py-1 rounded"
                    />
                    <p className="text-sm mb-4 text-gray-700">incluindo você.</p>
                  </label>
                </>
              }
            />

            <label className="block mb-2">
              Descrição:
              <textarea
                name="descricao"
                required
                defaultValue={initialData?.descricao || ""}
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
