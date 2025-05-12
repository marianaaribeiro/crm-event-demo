import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(req: Request) {
  const data = await req.json();
  const gasto = await prisma.gasto.create({ data });
  return new Response(JSON.stringify(gasto), { status: 201 });
}

export async function GET() {
  const dados = await prisma.gasto.findMany();
  return new Response(JSON.stringify(dados));
}

export async function DELETE(req: Request) {
  const { searchParams } = new URL(req.url);
  const id = Number(searchParams.get("id"));
  await prisma.gasto.delete({ where: { id } });
  return new Response(null, { status: 204 });
}
export async function PUT(req: Request) {
  const data = await req.json();
  const { searchParams } = new URL(req.url);
  const id = Number(searchParams.get("id"));
  if (!id) return new Response("ID não informado", { status: 400 });

  const updated = await prisma.gasto.update({
    where: { id },
    data: {
      nome: data.nome,
      item: data.item,
      valor: Number(data.valor),
      sala: data.sala,
    },
  });

  return new Response(JSON.stringify(updated), { status: 200 });
}
