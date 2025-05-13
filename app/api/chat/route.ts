import { NextRequest } from "next/server";

const faqs = [
    {
        question: "onde vai ser o evento",
        answer: "O evento será realizado na Escola Santo Amaro, no salão principal.",
    },
    {
        question: "que horas começa o almoço",
        answer: "O almoço começa às 12h no refeitório principal.",
    },
    {
        question: "posso levar convidados",
        answer: "Sim! Cada família pode levar até 2 convidados extras.",
    },
    {
        question: "qual o tema do evento",
        answer: "O tema do evento é 'União das Culturas' com decoração multicultural.",
    },
];

export async function POST(req: NextRequest) {
    try {
        const { question } = await req.json();

        const respostaLocal = faqs.find(f =>
            question.toLowerCase().includes(f.question.toLowerCase())
        );

        if (respostaLocal) {
            return new Response(JSON.stringify({ resposta: respostaLocal.answer }), {
                status: 200,
            });
        }

        // Fallback para OpenAI
        const openaiRes = await fetch("https://api.openai.com/v1/chat/completions", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
            },
            body: JSON.stringify({
                model: "gpt-3.5-turbo",
                messages: [
                    {
                        role: "system",
                        content: "Você é um assistente que ajuda com dúvidas sobre um evento escolar de almoço em família. Seja claro e breve.",
                    },
                    {
                        role: "user",
                        content: question,
                    },
                ],
                temperature: 0.7,
            }),
        });

        const aiData = await openaiRes.json();

        const respostaIA = aiData.choices?.[0]?.message?.content?.trim() || "Desculpe, não consegui entender.";

        return new Response(JSON.stringify({ resposta: respostaIA }), {
            status: 200,
        });
    } catch (err) {
        console.error("Erro no Chatbot:", err);
        return new Response(JSON.stringify({ resposta: "Erro ao processar a mensagem." }), {
            status: 500,
        });
    }
}
