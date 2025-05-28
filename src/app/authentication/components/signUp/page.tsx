import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {z} from 'zod'
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"
const formSchema = z.object({
  username: z.string().trim().min(1,{message:"Nome é obrigatório"}),
  email: z.string().trim().min(1,{message:"Email é obrigatório"}).email({message:"Email inválido"}),
  password: z.string().trim().min(6,{message:"A senha deve conter no mínimo 6 caracteres"}),
})

// import { Container } from './styles';

const SignUp: React.FC = () => {

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
          username: "",
          email: "",
          password:""
        },
      })
    
    
      function onSubmit(values: z.infer<typeof formSchema>) {
        // Do something with the form values.
        // ✅ This will be type-safe and validated.
        console.log(values)
      }
  return (
    <Card>
       
    <Form {...form}>
       <form onSubmit={form.handleSubmit(onSubmit)} className=" space-y-4">
    
  
       <CardHeader>
         <CardTitle>Cadastro</CardTitle>
         <CardDescription>
           Preencha os campos abaixo para criar uma conta
         </CardDescription>
       </CardHeader>
       <CardContent className="space-y-2">
       <FormField
       control={form.control}
       name="username"
       render={({ field }) => (
         <FormItem>
           <FormLabel>Nome Completo</FormLabel>
           <FormControl>
             <Input placeholder="shadcn" {...field} />
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
             <Input placeholder="shadcn" {...field} />
           </FormControl>
           <FormMessage />
         </FormItem>
       )}
     />
      <FormField
       control={form.control}
       name="password"
       render={({ field }) => (
         <FormItem>
           <FormLabel>Senha</FormLabel>
           <FormControl>
             <Input placeholder="shadcn" {...field}  type='password'/>
           </FormControl>
           <FormMessage />
         </FormItem>
       )}
     />
       </CardContent>
       <CardFooter>
       <Button type="submit" className='w-full'>Criar conta</Button>
       </CardFooter>
     
     
       </form>
       </Form>
     </Card>
  )
}

export default SignUp;