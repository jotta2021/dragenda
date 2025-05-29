'use client'

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
import { authClient } from '@/lib/auth-client';
import { Loader2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
const formSchema = z.object({
  username: z.string().trim().min(1,{message:"Nome é obrigatório"}),
  email: z.string().trim().min(1,{message:"Email é obrigatório"}).email({message:"Email inválido"}),
  password: z.string().trim().min(8,{message:"A senha deve conter no mínimo 8 caracteres"}),
})

// import { Container } from './styles';

const SignUp: React.FC = () => {

  const router = useRouter()
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
          username: "",
          email: "",
          password:""
        },
      })
    
    
     async  function onSubmit(values: z.infer<typeof formSchema>) {
     await  authClient.signUp.email({
        email:values.email,
        name:values.username,
        password:values.password,
      
      },
    {
      onSuccess:()=> {
        router.push("/dashboard")
      },
      onError:(error)=> {
        if(error.error.code ==="USER_ALREADY_EXISTS"){
          toast.error("Já existe um usuário com este email")
        }
    
      }
    }
    )
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
             <Input {...field} placeholder='Digite seu nome completo'/>
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
             <Input {...field} placeholder='Digite seu email'/>
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
             <Input {...field} type='password' placeholder='Digite sua senha'/>
           </FormControl>
           <FormMessage />
         </FormItem>
       )}
     />
       </CardContent>
       <CardFooter>
       <Button type="submit" className='w-full'
       disabled={form.formState.isSubmitting}
       >{form.formState.isSubmitting ? <Loader2 className='w-4 h-4 animate-spin' /> : "Criar conta"}</Button>

       <Button>
        Google
       </Button>
       </CardFooter>
     
     
       </form>
       </Form>
     </Card>
  )
}

export default SignUp;