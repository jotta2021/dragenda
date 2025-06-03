"use client";

import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import React, { useState } from "react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import UpsertDoctorForm from "./upsert-doctor-form";
// import { Container } from './styles';


const ButtonAdd: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false)
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button>
          <Plus />
          Adicionar Médico
        </Button>
      </DialogTrigger>
      <DialogContent>
        <UpsertDoctorForm onSuccess={()=> setIsOpen(false)} />
      </DialogContent>
    </Dialog>
  );
};

export default ButtonAdd;
