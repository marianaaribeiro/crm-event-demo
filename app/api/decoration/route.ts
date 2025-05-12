import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(req: Request) {
    const data = await req.json();

    const payload = {
        nome: data.nome,
        whatsapp: data.whatsapp,
        sala: data.sala,
        descricao: data.descricao,
        quantidade: parseInt(data.quantidade) || 0,
        indeciso: Boolean(data.indeciso) || false,
    };

    const decoracao = await prisma.decoracao.create({ data: payload });

    return new Response(JSON.stringify(decoracao), { status: 201 });
}

export async function GET() {
    const registros = await prisma.decoracao.findMany({
        orderBy: { createdAt: "desc" },
    });
    return new Response(JSON.stringify(registros));
}

export async function DELETE(req: Request) {
    const { searchParams } = new URL(req.url);
    const id = Number(searchParams.get("id"));
    await prisma.decoracao.delete({ where: { id } });
    return new Response(null, { status: 204 });
}
export async function PUT(req: Request) {
    const { searchParams } = new URL(req.url);
    const id = Number(searchParams.get("id"));
    if (!id) return new Response("ID é obrigatório", { status: 400 });

    const data = await req.json();

    const atualizado = await prisma.decoracao.update({
        where: { id },
        data: {
            nome: data.nome,
            whatsapp: data.whatsapp,
            sala: data.sala,
            descricao: data.descricao,
            quantidade: Number(data.quantidade),
            indeciso: Boolean(data.indeciso),
        },
    });

    return new Response(JSON.stringify(atualizado), { status: 200 });
}

