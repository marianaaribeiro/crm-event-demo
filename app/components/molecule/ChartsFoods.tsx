"use client";

import React, { useEffect, useState } from "react";
import {
    PieChart,
    Pie,
    Sector,
    Cell,
    ResponsiveContainer,
} from "recharts";
import { baseURL } from "../../util/urls";

export default function ChartsFoods({ refreshKey }) {
    const [totais, setTotais] = useState({
        salgados: 0,
        comidas: 0,
        doces: 0,
        bebidas: 0,
    });

    const [activeIndex, setActiveIndex] = useState(0);

    useEffect(() => {
        async function fetchData() {
            const salgadosRes = await fetch(`/api/salgados`);
            const docesRes = await fetch(`/api/doces`);

            const salgados = await salgadosRes.json();
            const doces = await docesRes.json();

            const totalSalgados = salgados.filter((item: any) => item.tipo === "Salgado").length;
            const totalComidas = salgados.filter((item: any) => item.tipo === "Comida").length;
            const totalDoces = doces.length;

            const bebidasSalgado = salgados.filter((item: any) => item.bebida).length;
            const bebidasDoce = doces.filter((item: any) => item.bebida).length;
            const totalBebidas = bebidasSalgado + bebidasDoce;

            setTotais({
                salgados: totalSalgados,
                comidas: totalComidas,
                doces: totalDoces,
                bebidas: totalBebidas,
            });
        }

        fetchData();
    }, [refreshKey]);

    const data = [
        { name: "Salgados", value: totais.salgados },
        { name: "Comida", value: totais.comidas },
        { name: "Doces", value: totais.doces },
        { name: "Bebidas", value: totais.bebidas },
    ];

    const COLORS = ["#FBBF24", "#10B981", "#EC4899", "#3B82F6"]; // amarelo, verde, rosa, azul

    const renderActiveShape = (props: any) => {
        const RADIAN = Math.PI / 180;
        const {
            cx, cy, midAngle, innerRadius, outerRadius,
            startAngle, endAngle, fill, payload, value,
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
                <Sector {...{ cx, cy, innerRadius, outerRadius, startAngle, endAngle, fill }} />
                <Sector
                    cx={cx}
                    cy={cy}
                    innerRadius={outerRadius + 6}
                    outerRadius={outerRadius + 10}
                    startAngle={startAngle}
                    endAngle={endAngle}
                    fill={fill}
                />
                <path d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`} stroke={fill} fill="none" />
                <circle cx={ex} cy={ey} r={2} fill={fill} stroke="none" />
                <text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} textAnchor={textAnchor} fill="#fff">
                    {value}
                </text>
            </g>
        );
    };

    return (
        <ResponsiveContainer width="100%" height={280}>
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
            </PieChart>
            {/* <p className="text-sm text-gray-500 text-center">Total de salgados, comidas e doces</p> */}
        </ResponsiveContainer>
    );
}
