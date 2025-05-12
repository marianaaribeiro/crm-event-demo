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

    const item = await prisma.organizacao.create({ data: payload });

    return new Response(JSON.stringify(item), { status: 201 });
}

export async function GET() {
    const itens = await prisma.organizacao.findMany({
        orderBy: { createdAt: "desc" },
    });
    return new Response(JSON.stringify(itens));
}

export async function DELETE(req: Request) {
    const { searchParams } = new URL(req.url);
    const id = Number(searchParams.get("id"));
    await prisma.organizacao.delete({ where: { id } });
    return new Response(null, { status: 204 });
}

export async function PUT(req: Request) {
    const data = await req.json();
    const { searchParams } = new URL(req.url);
    const id = Number(searchParams.get("id"));
    if (!id) return new Response("ID não informado", { status: 400 });

    const updated = await prisma.organizacao.update({
        where: { id },
        data: {
            nome: data.nome,
            whatsapp: data.whatsapp,
            descricao: data.descricao,
            sala: data.sala,
            quantidade: Number(data.quantidade),
            indeciso: Boolean(data.indeciso),
        },
    });

    return new Response(JSON.stringify(updated), { status: 200 });
}
