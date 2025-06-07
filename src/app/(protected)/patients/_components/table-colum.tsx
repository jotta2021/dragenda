"use client";
import React from "react";
import { ColumnDef } from "@tanstack/react-table";
import { patientsTable } from "@/db/schema";

// import { Container } from './styles';

type Patient = typeof patientsTable.$inferSelect;

export const columns: ColumnDef<Patient>[] = [
  {
    accessorKey: "name",
    header: "NOME",
  },
  {
    accessorKey: "email",
    header: "EMAIL",
  },
  {
    accessorKey: "phoneNumber",
    header: "NÚMERO DE CELULAR",
  },
  {
    accessorKey: "sex",
    header: "SEXO",
    cell: ({row})=> (
      <div>
        <p>{row.original.sex === "male" ? "Masculino" : "Feminino"}</p>
      </div>
    )
  },
  {
    accessorKey: "actions",
    cell: ({row})=> (
      <div>
        <p>Editar/Excluir</p>
      </div>
    )
  },
];
