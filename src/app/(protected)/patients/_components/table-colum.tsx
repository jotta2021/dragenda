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
    cell: ({ row }) => {
      const formatPhoneNumber = (phone: string) => {
        // Remove any non-digit characters
        const cleaned = phone.replace(/\D/g, '');
        // Format as (XX) XXXXX-XXXX
        const match = cleaned.match(/^(\d{2})(\d{5})(\d{4})$/);
        if (match) {
          return `(${match[1]}) ${match[2]}-${match[3]}`;
        }
        return phone; // Return original if format doesn't match
      };

      return <div>{formatPhoneNumber(row.getValue("phoneNumber"))}</div>;
    }
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
    id:'actions',
    cell: ({row})=> (
      <div>
        <p>Editar/Excluir</p>
      </div>
    )
  },
];
