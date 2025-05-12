"use client";

import React, { useEffect, useState } from "react";
import ModalDynamic from "./ModalDynamic";
import { useIsMobile } from "../../hook/useIsMobile";

export default function Table({ endpoint, columns, title, onEdit, refreshKey, gradientHeader, onSuccess }) {
  const [data, setData] = useState([]);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(0);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);
  const isMobile = useIsMobile();

  const perPage = 4;

  useEffect(() => {
    fetch(endpoint)
      .then(res => res.json())
      .then(setData);
  }, [endpoint, refreshKey]);

  const confirmDelete = (item) => {
    setItemToDelete(item);
    setShowDeleteModal(true);
  };

  const handleConfirmedDelete = async () => {
    if (!itemToDelete) return;
    await fetch(`${endpoint}?id=${itemToDelete.id}`, { method: "DELETE" });
    setData((prev) => prev.filter((d) => d.id !== itemToDelete.id));
    setShowDeleteModal(false);
    setItemToDelete(null);
    onSuccess?.();
  };

  const filtered = data.filter(item =>
    Object.values(item).some(value =>
      String(value).toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").includes(
        search.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "")
      )
    )
  );

  const paginated = filtered.slice(page * perPage, (page + 1) * perPage);

  return (
    <div
      className={`mt-6 p-4 rounded-xl shadow-md ${isMobile ? `bg-gradient-to-r ${gradientHeader}` : "bg-white"
        }`}
    >
      <div className="flex justify-between items-center mb-4">
        <h2 className={`text-lg font-bold ${isMobile ? "text-white" : "text-gray-800"}`}>{title}</h2>
        <input
          type="text"
          placeholder="Pesquisar..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="px-2 py-1 border rounded"
        />
      </div>
      {!isMobile ? (
        <table className="w-full text-sm text-gray-700">
          <thead className={`bg-gradient-to-r ${gradientHeader} text-white`}>
            <tr>
              {columns.map(col => (
                <th key={col} className="p-3 text-left">{col}</th>
              ))}
              <th className="p-3 text-left">Ações</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {paginated.map((row, i) => (
              <tr key={i} className="hover:bg-gray-50 transition">
                {columns.map(col => (
                  <td key={col} className="p-3">
                    {typeof row[col.toLowerCase()] === "boolean"
                      ? row[col.toLowerCase()] ? "✅ Sim" : "❌ Não"
                      : row[col.toLowerCase()]}
                  </td>
                ))}
                <td className="p-3 flex gap-2 whitespace-nowrap">
                  <button
                    onClick={() => onEdit?.(row)}
                    className="text-sm px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
                  >
                    Editar
                  </button>
                  <button
                    onClick={() => confirmDelete(row)}
                    className="text-sm px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                  >
                    Excluir
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        // versão mobile (mantida igual)
        <div className="space-y-4">
          {paginated.map((row, i) => (
            <div key={i} className="bg-white shadow rounded-lg p-4 border">
              <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
                {columns.map(col => (
                  <div key={col}>
                    <strong className="capitalize">{col.toLowerCase()}:</strong>{" "}
                    {typeof row[col.toLowerCase()] === "boolean"
                      ? row[col.toLowerCase()] ? "✅ Sim" : "❌ Não"
                      : row[col.toLowerCase()]}
                  </div>
                ))}
              </div>
              <div className="mt-2 flex gap-2 justify-start w-full">
                <button
                  onClick={() => onEdit?.(row)}
                  className="text-sm px-3 py-1 bg-blue-500 text-white rounded"
                >
                  Editar
                </button>
                <button
                  onClick={() => confirmDelete(row)}
                  className="text-sm px-3 py-1 bg-red-500 text-white rounded"
                >
                  Excluir
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
      <div className="flex justify-between items-center mt-4">
        <div className="text-sm text-gray-600">
          Página {page + 1} de {Math.ceil(filtered.length / perPage)}
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setPage((p) => Math.max(0, p - 1))}
            disabled={page === 0}
            className="px-2 py-1 bg-gray-200 rounded disabled:opacity-50"
          >
            ← Anterior
          </button>

          {Array.from({ length: Math.ceil(filtered.length / perPage) }).map((_, i) => (
            <button
              key={i}
              onClick={() => setPage(i)}
              className={`px-2 py-1 rounded ${page === i ? "bg-blue-500 text-white" : "bg-gray-100"}`}
            >
              {i + 1}
            </button>
          ))}

          <button
            onClick={() => setPage((p) => Math.min(p + 1, Math.ceil(filtered.length / perPage) - 1))}
            disabled={(page + 1) * perPage >= filtered.length}
            className="px-2 py-1 bg-gray-200 rounded disabled:opacity-50"
          >
            Próximo →
          </button>
        </div>
      </div>
      {showDeleteModal && (
        <ModalDynamic
          title="Atenção!"
          onClose={() => setShowDeleteModal(false)}
          children={
            <div className="text-center space-y-4">
              <p>Tem certeza que deseja excluir este item?</p>
              <button
                onClick={handleConfirmedDelete}
                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
              >
                OK
              </button>
            </div>
          }
        />
      )}
    </div>
  );
}
