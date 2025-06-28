"use client";
import React, { useState } from "react";
import { ColumnDef } from "@tanstack/react-table";
import { patientsTable } from "@/db/schema";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { EllipsisVertical, Pencil } from "lucide-react";
import { Trash } from "lucide-react";
import { useAction } from "next-safe-action/hooks";
import handleDeletePacient from "@/actions/delete-pacient";
import { toast } from "sonner";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import UpsertPatientForm from "./upsertPatientForm";
import { AlertDialog, AlertDialogDescription, AlertDialogContent, AlertDialogHeader, AlertDialogTitle, AlertDialogCancel, AlertDialogFooter, AlertDialogAction } from "@/components/ui/alert-dialog";

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
    cell: ({row})=> {
      const handleDelete = useAction(handleDeletePacient,{
        onSuccess:()=>{
          toast.success("Paciente excluído com sucesso")
        },
        onError:(error)=>{
          toast.error("Erro ao excluir paciente")
        }
      })


    const deletePacient = (id:string)=> {
      handleDelete.execute({id})
    }

    const [isOpen, setIsOpen] = useState(false)
    const [isOpenAlert, setIsOpenAlert] = useState(false)
     return (
      <div>
       <DropdownMenu>
       <DropdownMenuTrigger>
        <EllipsisVertical className="text-gray-900" />
       </DropdownMenuTrigger>
       <DropdownMenuContent>


    <DropdownMenuItem onClick={()=>setIsOpen(true)}>
          <Pencil className="text-gray-900" />
          Editar
        </DropdownMenuItem>

 
 

        
        
        <DropdownMenuItem onClick={()=>setIsOpenAlert(true)}>
          <Trash className="text-gray-900" />
          Excluir
        </DropdownMenuItem>
       </DropdownMenuContent>
       </DropdownMenu>
       <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent>
          <UpsertPatientForm
          patient={row.original}
          onSuccess={()=>{
            setIsOpen(false)
          }}
          />
        </DialogContent>
       </Dialog>

       <AlertDialog open={isOpenAlert} onOpenChange={setIsOpenAlert}  >
   
        <AlertDialogContent>
        <AlertDialogTitle>
            Deseja excluir o paciente?
          </AlertDialogTitle>
          <AlertDialogDescription>
            Esta ação não pode ser desfeita.
          </AlertDialogDescription>
          <AlertDialogFooter>
            <AlertDialogCancel>
              Cancelar
            </AlertDialogCancel>
            <AlertDialogAction onClick={()=>deletePacient(row.original.id)}>
              Excluir
            </AlertDialogAction>
          </AlertDialogFooter>
          
        </AlertDialogContent>
          </AlertDialog>

      </div>  
    )}
  },
];
