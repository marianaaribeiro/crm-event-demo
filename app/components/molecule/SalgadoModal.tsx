"use client";

import React from "react";
import SelectOption from "../atom/SelectOption";
import { allCountries } from "../../util/listPais";
import ContentSideBySide from "../atom/ContentSideBySide";
import ModalDynamic from "../atom/ModalDynamic";
import ConfettiExplosion from "../atom/ConfettiExplosion";

export default function SalgadoModal({ onClose, onSuccess, initialData }) {
  const [sala, setSala] = React.useState(initialData?.sala || "");
  const [pais, setPais] = React.useState(initialData?.origem || "");
  const [tipoItem, setTipoItem] = React.useState(initialData?.tipo || "");
  const [showConfetti, setShowConfetti] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);

  async function handleSubmit(e: any) {
    e.preventDefault();
    setIsLoading(true)
    const data: any = Object.fromEntries(new FormData(e.target).entries());
    data.sala = sala;
    data.origem = pais;
    data.tipo = tipoItem;

    if (data.pessoas) data.pessoas = parseInt(data.pessoas);

    const isEditing = !!initialData?.id;
    const res = await fetch(`/api/salgados${isEditing ? `?id=${initialData.id}` : ""}`, {
      method: isEditing ? "PUT" : "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
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
    onClose();
  }

  return (
    <ModalDynamic
      children={<>
        {showConfetti && <ConfettiExplosion />}
        <p className="text-sm mb-4 text-gray-700">Informar alguns ingredientes e caso levem carne informar o tipo porque há pessoas com alergia ou restrições religiosas.</p>
        <form onSubmit={handleSubmit}>
          <label className="block mb-2">
            Nome da mãe:
            <input name="nome" required className="w-full border px-2 py-1 rounded" defaultValue={initialData?.nome || ""} />
          </label>
          <ContentSideBySide
            contentOne={
              <>
                <label className="block mb-2">
                  Telemóvel WhatsApp:
                  <input name="telefone" required className="w-full border px-2 py-1 rounded" defaultValue={initialData?.telefone || ""} />
                </label>
                <SelectOption
                  label="Qual a sala do aluno/a"
                  name="sala"
                  value={sala}
                  options={["Sala 7", "Sala 6", "Sala 5"]}
                  onChange={(e) => setSala(e.target.value)}
                />
                <SelectOption
                  label="Origem do país da salgado/comida"
                  name="origem"
                  value={pais}
                  options={allCountries}
                  onChange={(e) => setPais(e.target.value)}
                />
              </>
            }
            contentTwo={
              <>
                <SelectOption
                  label="Categoria do item:"
                  name="tipo"
                  value={tipoItem}
                  options={["Salgado", "Comida"]}
                  onChange={(e) => setTipoItem(e.target.value)}
                />
                <label className="block mb-2">
                  Nome da bebida:
                  <input name="bebida" required className="w-full border px-2 py-1 rounded" defaultValue={initialData?.bebida || ""} />
                </label>
                <label className="block mb-2">
                  Quantas pessoas são?
                  <p className="text-sm mb-1 text-gray-700">incluindo você.</p>
                  <input type="number" name="pessoas" required className="w-full border px-2 py-1 rounded" defaultValue={initialData?.pessoas || ""} />
                </label>
              </>
            }
          />
          <label className="block mb-2">
            Descrição:
            <textarea name="descricao" required className="w-full border px-2 py-1 rounded" defaultValue={initialData?.descricao || ""} />
          </label>
          <div className="flex justify-end mt-4 gap-2">
            <button type="button" disabled={isLoading} onClick={onClose} className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300">Cancelar</button>
            <button type="submit" disabled={isLoading} className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">Gravar</button>
          </div>
        </form>
      </>}
      onClose={() => onClose()}
      title="Inscrição para os salgados ou comidas"
    />
  );
}