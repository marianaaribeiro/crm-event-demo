import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(req: Request) {
  const data = await req.json();
  const doce = await prisma.doce.create({ data });
  return new Response(JSON.stringify(doce), { status: 201 });
}

export async function GET() {
  const dados = await prisma.doce.findMany();
  return new Response(JSON.stringify(dados));
}

export async function DELETE(req: Request) {
  const { searchParams } = new URL(req.url);
  const id = Number(searchParams.get("id"));
  await prisma.doce.delete({ where: { id } });
  return new Response(null, { status: 204 });
}

export async function PUT(req: Request) {
  const data = await req.json();
  const { searchParams } = new URL(req.url);
  const id = Number(searchParams.get("id"));

  if (!id) return new Response("ID não informado", { status: 400 });

  const updated = await prisma.doce.update({
    where: { id },
    data: {
      nome: data.nome,
      telefone: data.telefone,
      sala: data.sala,
      origem: data.origem,
      descricao: data.descricao,
      bebida: data.bebida,
      pessoas: Number(data.pessoas),
    },
  });

  return new Response(JSON.stringify(updated), { status: 200 });
}
