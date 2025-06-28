'use client'
import { Button } from "@/components/ui/button";
import {
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectTrigger, SelectValue } from "@/components/ui/select";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Loader2 } from "lucide-react";
import { useAction } from "next-safe-action/hooks";
import { upsertPatient } from "@/actions/upsert-pacients";
import { toast } from "sonner";
import { patientsTable } from "@/db/schema";
// import { Container } from './styles';

const formShema = z.object({
 
  name: z.string().min(1, { message: "Nome é obrigatório" }),
  email: z
    .string()
    .min(1, { message: "Email é obrigatório" })
    .email({ message: "Email inválido" }),
  phoneNumber: z.string().min(1, { message: "Telefone é obrigatório" }),
  sex: z.enum(["male", "female"], { message: "Sexo é obrigatório" }),
});
interface UpsertPatientFormProps {
  onSuccess?: () => void;
  patient?: typeof patientsTable.$inferSelect;
}

const UpsertPatientForm = ({ onSuccess, patient }: UpsertPatientFormProps ) => {
  const form = useForm<z.infer<typeof formShema>>({
    resolver: zodResolver(formShema),
    defaultValues: {
   
      name: patient?.name ?? "",
      email: patient?.email ?? "",
      phoneNumber: patient?.phoneNumber ?? "",
      sex: patient?.sex ?? "male",
    },
  });

 

  const upsertPatientAction = useAction(upsertPatient, {
    onSuccess: () => {
      if(patient){
        toast.success("Paciente atualizado com sucesso");
      }else{
        toast.success("Paciente cadastrado com sucesso");
      }
      form.reset()
      onSuccess?.()
    },
    onError: (error) => {
      toast.error("Erro ao cadastrar paciente");
    },
  });
  const handleSubmit = (values: z.infer<typeof formShema>) => {
    upsertPatientAction.execute({
      ...values,
      id: patient?.id ?? undefined,
    })
  };
  return (
    <div>
      <DialogTitle>Cadastrar paciente</DialogTitle>
      <DialogDescription>
        Preencha os campos abaixo para cadastrar um novo paciente
      </DialogDescription>
      <Form {...form}>
        <form className="mt-4 space-y-4" onSubmit={form.handleSubmit(handleSubmit)}>
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nome</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="Nome do paciente" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="Email do paciente" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="phoneNumber"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Telefone</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="Telefone do paciente" type="tel" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="sex"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Sexo</FormLabel>
                <FormControl>
                  <RadioGroup defaultValue="male" onValueChange={field.onChange} value={field.value}>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="male" id="male" />
                      <label className="text-sm" htmlFor="male">Masculino</label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="female" id="female" />
                      <label className="text-sm" htmlFor="female">Feminino</label>
                    </div>
                  </RadioGroup>
                </FormControl>
              </FormItem>
            )}
          />
          <DialogFooter>
            <Button type="submit" disabled={upsertPatientAction.isPending}>
                {
                    upsertPatientAction.isPending &&
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                }
                Salvar</Button>
          </DialogFooter>
        </form>
      </Form>
    </div>
  );
};

export default UpsertPatientForm;
