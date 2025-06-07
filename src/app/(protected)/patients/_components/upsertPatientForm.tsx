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
const UpsertPatientForm = () => {
  const form = useForm<z.infer<typeof formShema>>({
    resolver: zodResolver(formShema),
    defaultValues: {
      name: "",
      email: "",
      phoneNumber: "",
      sex: "male",
    },
  });

  const handleSubmit = (values: z.infer<typeof formShema>) => {
    console.log(values);
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
            <Button type="submit" disabled={form.formState.isSubmitting}>
                {
                    form.formState.isSubmitting  &&
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
