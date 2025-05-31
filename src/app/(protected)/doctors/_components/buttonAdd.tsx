"use client";

import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import React from "react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import UpsertDoctorForm from "./upsert-doctor-form";
// import { Container } from './styles';


const ButtonAdd: React.FC = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>
          <Plus />
          Adicionar Médico
        </Button>
      </DialogTrigger>
      <DialogContent>
        <UpsertDoctorForm />
      </DialogContent>
    </Dialog>
  );
};

export default ButtonAdd;
