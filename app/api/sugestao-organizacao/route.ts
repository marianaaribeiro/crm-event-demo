import { OpenAI } from "openai";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export async function GET() {
    try {
        const organizacoes = await prisma.organizacao.findMany({
            select: { descricao: true },
        });

        const descricoes = organizacoes.map(d => d.descricao).filter(Boolean);

        const prompt = `
Estamos organizando um evento escolar que é um almoço dos paises com a familia. Aqui estão os itens organizacionais já cadastrados: ${descricoes.join(", ")}.
Sugira 3 novos itens organizacionais criativos e úteis que ainda não estão listados. Apenas a lista simples:
`;

        const completion = await openai.chat.completions.create({
            model: "gpt-3.5-turbo",
            messages: [{ role: "user", content: prompt }],
        });

        const sugestoes = completion.choices[0].message.content || "";
        return new Response(JSON.stringify({ sugestoes }), { status: 200 });
    } catch (error) {
        console.error("Erro ao gerar sugestão IA:", error);
        return new Response(JSON.stringify({ error: "Erro ao gerar sugestões" }), {
            status: 500,
        });
    }
}
