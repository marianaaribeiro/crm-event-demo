// /app/api/sugestao-item/route.ts
import { OpenAI } from "openai";
import { PrismaClient } from "@prisma/client";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
const prisma = new PrismaClient();

export async function GET() {
    const decoracoes = await prisma.decoracao.findMany({
        select: { descricao: true },
    });

    const descricoes = decoracoes.map((d) => d.descricao).filter(Boolean);
    const prompt = `
Estamos organizando um evento escolar com ajuda dos pais.
Com base nos itens já listados: ${descricoes.join(", ")}.
Sugira 3 novos itens de decoração diferentes, criativos e fáceis para um almoço infantil dos paises.
Em português responda apenas com uma lista simples.
`;

    const completion = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [{ role: "user", content: prompt }],
    });

    const sugestoes = completion.choices[0].message.content || "";
    return new Response(JSON.stringify({ sugestoes }), { status: 200 });
}
