"use client";

import { useState } from "react";
import Card from "../molecule/Card";
import SalgadoModal from "../molecule/SalgadoModal";
import DoceModal from "../molecule/DoceModal";
import GastoModal from "../molecule/GastoModal";
import Charts from "../atom/Charts";
import Table from "../atom/Table";
import ContentLayout from "../atom/ContentLayout";
import DecorationModal from "../molecule/DecorationModal";
import ChartsFoods from "../molecule/ChartsFoods";
import ChartCountry from "../molecule/ChartCountry";
import OrganizationDecorationBarChart from "../molecule/OrganizationDecorationBarChart";
import ContainerFour from "../atom/ContainerFour";
import AvatarCard from "../atom/AvatarCard";
import withAuth from "./withAuth";
import ContainerBlack from "../atom/ContainerBlack";
import OrganizationModal from "../molecule/OrganizationModal";
import ContentSideBySide from "../atom/ContentSideBySide";

function Dashboard() {
  const [openModal, setOpenModal] = useState(null);
  const [refreshKey, setRefreshKey] = useState(0);
  const [selectedRow, setSelectedRow] = useState(null);

  const reloadAll = () => setRefreshKey((prev: any) => prev + 1);

  const handleEdit = (type: string, row: any) => {
    setSelectedRow(row);
    setOpenModal(type);
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      <ContentSideBySide
        contentOne={
          <ContainerBlack
            text="Evento: Almoço com a Família do Jardim de Infância da escola Santo Amaro"
            content={
              <>
                <ContentSideBySide
                  contentOne={<>
                    <Charts refreshKey={refreshKey} />
                  </>
                  }
                  contentTwo={<div className="mb-20">
                    <ChartsFoods refreshKey={refreshKey} />
                  </div>
                  }
                />
                <ContentLayout contentOne={
                  <ChartCountry refreshKey={refreshKey} />
                } />
              </>
            } />
        }
        contentTwo={
          <div className="pt-7">
            <ContentSideBySide
              contentOne={
                <>
                  <Card
                    title="Inscrição para os salgados ou comidas"
                    icon="🥟"
                    onClick={() => {
                      setSelectedRow(null);
                      setOpenModal("salgado");
                    }}
                    gradient="from-pink-500 to-rose-400"
                  />
                  <Card
                    title="Inscrição para os doces"
                    icon="🍬"
                    onClick={() => {
                      setSelectedRow(null);
                      setOpenModal("doce");
                    }}
                    gradient="from-yellow-400 to-orange-500"
                  />
                </>
              }
              contentTwo={
                <>
                  <Card
                    title="Inscrição de itens de organização"
                    icon="📋"
                    onClick={() => {
                      setSelectedRow(null);
                      setOpenModal("organização");
                    }}
                    gradient="from-blue-500 to-indigo-500"
                  />
                  <Card
                    title="Inscrição para itens de decoração"
                    icon="🎉"
                    onClick={() => {
                      setSelectedRow(null);
                      setOpenModal("decoracao");
                    }}
                    gradient="from-purple-500 to-pink-500"
                  />
                </>
              }
            />
            <div className="mt-6">
              <ContentLayout contentOne={
                <Card
                  title="Registro dos gastos do evento"
                  icon="💶"
                  onClick={() => {
                    setSelectedRow(null);
                    setOpenModal("gasto");
                  }}
                  gradient="from-green-400 to-teal-500"
                />
              } />
            </div>
            <div className="mt-20">
              <ContainerFour contents={[<AvatarCard
                name="Mariana Ali"
                imageUrl="./1.png"
                subTitle="Organizadora da equipe:"
                role="Salgados/comidas"
                contact="+351 96832-3375"
              />,
              <AvatarCard
                name="Mariana Ali"
                imageUrl="./1.png"
                subTitle="Organizadora da equipe:"
                role=" Doces"
                contact="+351 96832-3375"
              />,
              <AvatarCard
                name="Mariana Ali"
                imageUrl="./1.png"
                subTitle="Organizadora da equipe:"
                role=" Decoração"
                contact="+351 96832-3375"
              />,
              <AvatarCard
                name="Mariana Ali"
                imageUrl="./1.png"
                subTitle="Organizadora da equipe:"
                role="Organização"
                contact="+351 96832-3375"
              />
              ]} />
            </div>
          </div>
        }
      />

      <main className="max-w-screen-xl mx-auto px-6 py-6">
        {/* layout Modal */}
        {openModal === "salgado" && <SalgadoModal onClose={() => setOpenModal(null)} onSuccess={reloadAll} initialData={selectedRow} />}
        {openModal === "doce" && <DoceModal onClose={() => setOpenModal(null)} onSuccess={reloadAll} initialData={selectedRow} />}
        {openModal === "gasto" && <GastoModal onClose={() => setOpenModal(null)} onSuccess={reloadAll} initialData={selectedRow} />}
        {openModal === "organização" && <OrganizationModal onClose={() => setOpenModal(null)} onSuccess={reloadAll} initialData={selectedRow} />}
        {openModal === "decoracao" && <DecorationModal onClose={() => setOpenModal(null)} onSuccess={reloadAll} initialData={selectedRow} />}

        <ContentSideBySide
          contentOne={
            <Table
              endpoint={`/api/gastos`}
              title="Gastos Registrados"
              columns={["Nome", "Sala", "Item", "Valor"]}
              onEdit={(row: any) => handleEdit("gasto", row)}
              refreshKey={refreshKey}
              gradientHeader="from-green-400 to-teal-500"
              onSuccess={reloadAll}
            />
          }
          contentTwo={
            <div className="pt-4">
              <OrganizationDecorationBarChart refreshKey={refreshKey} />
            </div>
          }
        />
        <ContentLayout contentOne={
          <Table
            endpoint={`/api/decoration`}
            title="Inscrições de Itens de Decoração"
            columns={["Nome", "whatsapp", "sala", "descricao", "quantidade", "indeciso"]}
            onEdit={(row: any) => handleEdit("decoracao", row)}
            refreshKey={refreshKey}
            gradientHeader="from-purple-500 to-pink-500"
            onSuccess={reloadAll}
          />
        } />

        <ContentLayout contentOne={
          <Table
            endpoint={`/api/organization`}
            title="Inscrições de Itens de Organização"
            columns={["Nome", "whatsapp", "sala", "descricao", "quantidade", "indeciso"]}
            onEdit={(row: any) => handleEdit("organização", row)}
            refreshKey={refreshKey}
            gradientHeader="from-blue-500 to-indigo-500"
            onSuccess={reloadAll}
          />
        } />

        <ContentLayout contentOne={
          <Table
            endpoint={`/api/salgados`}
            title="Inscrições de Salgados ou Comidas"
            columns={["Nome", "Telefone", "Sala", "Origem", "Tipo", "Descricao", "Bebida", "Pessoas"]}
            onEdit={(row: any) => handleEdit("salgado", row)}
            refreshKey={refreshKey}
            gradientHeader="from-pink-500 to-rose-400"
            onSuccess={reloadAll}
          />
        } />

        <ContentLayout contentOne={
          <Table
            endpoint={`/api/doces`}
            title="Inscrições de Doces"
            columns={["Nome", "Telefone", "Sala", "Origem", "Descricao", "Bebida", "Pessoas"]}
            refreshKey={refreshKey}
            onEdit={(row: any) => handleEdit("doce", row)}
            gradientHeader="from-yellow-400 to-orange-500"
            onSuccess={reloadAll}
          />
        } />
      </main>
    </div>
  );
}

export default withAuth(Dashboard);