import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import FormComponent from "./components/formClinic";

const ClinicForm = () => {

  

  return (
    <div className="">
      <Dialog open={true}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Adicionar Clinica</DialogTitle>
            <DialogDescription>
              Adicione uma clinica para continuar
            </DialogDescription>
          </DialogHeader>

         <FormComponent/>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ClinicForm;
