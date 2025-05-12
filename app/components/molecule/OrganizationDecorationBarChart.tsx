"use client";

import React, { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { baseURL } from "../../util/urls";

export default function OrganizationDecorationBarChart({ refreshKey }) {
  const [data, setData] = useState([
    { name: "Total de inscrição de Organização", total: 0 },
    { name: "Total de inscrição de Decoração", total: 0 },
  ]);

  useEffect(() => {
    async function fetchData() {
      const orgRes = await fetch(`/api/organization`);
      const decoRes = await fetch(`/api/decoration`);

      const organizacao = await orgRes.json();
      const decoracao = await decoRes.json();

      setData([
        { name: "Total de inscrição de Organização", total: organizacao.length },
        { name: "Total de inscrição de Decoração", total: decoracao.length },
      ]);
    }

    fetchData();
  }, [refreshKey]);

  return (
    <div className="w-full h-[300px]">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={data}
          margin={{
            top: 20,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis allowDecimals={false} />
          <Tooltip />
          <Legend />
          <Bar dataKey="total" fill="#3B82F6" barSize={40} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
