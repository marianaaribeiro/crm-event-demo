import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(req: Request) {
  const data = await req.json();

  const salgado = await prisma.salgado.create({
    data: {
      nome: data.nome,
      telefone: data.telefone,
      sala: data.sala,
      origem: data.origem,
      tipo: data.tipo,
      descricao: data.descricao,
      bebida: data.bebida,
      pessoas: data.pessoas,
    },
  });

  return new Response(JSON.stringify(salgado), { status: 201 });
}

export async function GET() {
  const dados = await prisma.salgado.findMany();
  return new Response(JSON.stringify(dados));
}

export async function DELETE(req: Request) {
  const { searchParams } = new URL(req.url);
  const id = Number(searchParams.get("id"));
  await prisma.salgado.delete({ where: { id } });
  return new Response(null, { status: 204 });
}

export async function PUT(req: Request) {
  const data = await req.json();
  const { searchParams } = new URL(req.url);
  const id = Number(searchParams.get("id"));

  if (!id) return new Response("ID não informado", { status: 400 });

  const updated = await prisma.salgado.update({
    where: { id },
    data: {
      nome: data.nome,
      telefone: data.telefone,
      sala: data.sala,
      origem: data.origem,
      tipo: data.tipo,
      descricao: data.descricao,
      bebida: data.bebida,
      pessoas: Number(data.pessoas),
    },
  });

  return new Response(JSON.stringify(updated), { status: 200 });
}
