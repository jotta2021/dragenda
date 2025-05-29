"use client";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { createClinic } from "@/actions/create-clinic";
import { Loader2 } from "lucide-react";
import { isRedirectError } from "next/dist/client/components/redirect-error";

// import { Container } from './styles';
const schema = z.object({
  name: z.string().min(1, { message: "Informe o nome da clinica" }),
});
const FormComponent = () => {
  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: "",
    },
  });

  async function onSubmit(values: z.infer<typeof schema>) {
    try {
      await createClinic(values.name);
      form.reset();
      toast.success("Clinica criada com sucesso");
    } catch (error) {
        if(isRedirectError(error)){
            toast.success("Clinica criada com sucesso");
            return  
        }
      toast.error("Erro ao criar clinica");
    }
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Clinica</FormLabel>
              <FormControl>
                <Input placeholder="Nome da clinica" {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
            />
            <Button type="submit" className="w-full" disabled={form.formState.isSubmitting}>
            {form.formState.isSubmitting && <Loader2 className="w-4 h-4 animate-spin"/>  }
            Confirmar
        </Button>
      </form>
    </Form>
  );
};

export default FormComponent;
