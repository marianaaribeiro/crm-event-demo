"use client";

import React, { useEffect, useState } from "react";
import {
  PieChart,
  Pie,
  Sector,
  Cell,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { useIsMobile } from "../../hook/useIsMobile";
import { baseURL } from "../../util/urls";

export default function Charts({ refreshKey }) {
  const [gastos, setGastos] = useState(0);
  const [pessoas, setPessoas] = useState(0);
  const [activeIndex, setActiveIndex] = useState(0);
  const isMobile = useIsMobile();

  useEffect(() => {
    async function fetchData() {
      const gastosRes = await fetch(`/api/gastos`);
      const gastosData = await gastosRes.json();
      const totalGastos = gastosData.reduce((sum, g) => sum + Number(g.valor || 0), 0);

      const salgadosRes = await fetch(`/api/salgados`);
      const docesRes = await fetch(`/api/doces`);
      const salgados = await salgadosRes.json();
      const doces = await docesRes.json();

      const totalPessoas = [...salgados, ...doces].reduce(
        (sum, p) => sum + (p.pessoas || 0),
        0
      );

      setGastos(totalGastos);
      setPessoas(totalPessoas);
    }
    fetchData();
  }, [refreshKey]);

  const data = [
    { name: "Total Gastos (€)", value: gastos },
    { name: "Participantes", value: pessoas },
  ];

  const COLORS = ["#34D399", "#60A5FA"];

  const renderActiveShape = (props: any) => {
    const RADIAN = Math.PI / 180;
    const {
      cx,
      cy,
      midAngle,
      innerRadius,
      outerRadius,
      startAngle,
      endAngle,
      fill,
      payload,
      percent,
      value,
    } = props;

    const sin = Math.sin(-RADIAN * midAngle);
    const cos = Math.cos(-RADIAN * midAngle);
    const sx = cx + (outerRadius + 10) * cos;
    const sy = cy + (outerRadius + 10) * sin;
    const mx = cx + (outerRadius + 30) * cos;
    const my = cy + (outerRadius + 30) * sin;
    const ex = mx + (cos >= 0 ? 1 : -1) * 22;
    const ey = my;
    const textAnchor = cos >= 0 ? "start" : "end";

    return (
      <g>
        <text x={cx} y={cy} dy={8} textAnchor="middle" fill={fill} className="font-bold">
          {payload.name}
        </text>
        <Sector
          cx={cx}
          cy={cy}
          innerRadius={innerRadius}
          outerRadius={outerRadius}
          startAngle={startAngle}
          endAngle={endAngle}
          fill={fill}
        />
        <Sector
          cx={cx}
          cy={cy}
          startAngle={startAngle}
          endAngle={endAngle}
          innerRadius={outerRadius + 6}
          outerRadius={outerRadius + 10}
          fill={fill}
        />
        <path
          d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`}
          stroke={fill}
          fill="none"
        />
        <circle cx={ex} cy={ey} r={2} fill={fill} stroke="none" />
        <text
          x={ex + (cos >= 0 ? 1 : -1) * 12}
          y={ey}
          textAnchor={textAnchor}
          fill="#fff"
        >{`${value}`}</text>

      </g>
    );
  };

  return (
    <ResponsiveContainer width={isMobile ? "100%" : "110%"} height={250}>
      <PieChart>
        <Pie
          activeIndex={activeIndex}
          activeShape={renderActiveShape}
          data={data}
          cx="50%"
          cy="50%"
          innerRadius={60}
          outerRadius={80}
          fill="#8884d8"
          dataKey="value"
          onMouseEnter={(_, index) => setActiveIndex(index)}
        >
          {data.map((_, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        {/* <Tooltip /> */}
      </PieChart>
      {/*  <p className="text-sm text-gray-500 text-center">Total de participantes e gastos</p> */}
    </ResponsiveContainer>
  );
}
