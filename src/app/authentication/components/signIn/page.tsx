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
import { useRouter } from 'next/navigation';
import { Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import Image from 'next/image';
import { createAuthClient } from 'better-auth/react';

const formSchema = z.object({
  email: z.string().trim().min(1,{message:"Preencha este campo"}).email({message:"Email inválido"}),
  password: z.string().trim().min(1,{message:"Preencha este campo"}),
})

// import { Container } from './styles';

const SingIn: React.FC = () => {
const router  = useRouter()
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
          email: "",
          password:""
        },
      })
    
    
      async function onSubmit(values: z.infer<typeof formSchema>) {
     await authClient.signIn.email({
      email:values.email,
      password:values.password,
     },
    {
      onSuccess:()=> {
        router.push("/dashboard")
      },
      onError:(error)=> {
      if(error.error.code ==='INVALID_EMAIL_OR_PASSWORD'){
        toast.error("Email ou senha inválidos")
      }
  
      }
    }
    )
      }

      async function handleLoginWithGoogle(){
    const authClient = createAuthClient()
    const data = await authClient.signIn.social({
      provider: "google",
      callbackURL:'/dashboard',
   
    })
   
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
       name="email"
       render={({ field }) => (
         <FormItem>
           <FormLabel>Email</FormLabel>
           <FormControl>
             <Input placeholder="Digite seu email" {...field} />
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
             <Input placeholder="Digite sua senha" {...field}  type='password'/>
           </FormControl>
           <FormMessage />
         </FormItem>
       )}
     />
       </CardContent>
       <CardFooter>
        <div className='flex flex-col gap-2 w-full'>
 <Button type="submit" className='w-full'
       disabled ={form.formState.isSubmitting}
       >{form.formState.isSubmitting ? <Loader2 className='w-4 h-4 animate-spin' /> : "Entrar"}</Button>
      
      <Button variant='outline' type='button' onClick={handleLoginWithGoogle}>
        <Image src="/google.png" alt="Google" width={20} height={20} />
        Entrar com Google
      </Button>
        </div>
      
       </CardFooter>
     
     
       </form>
       </Form>
     </Card>
  )
}

export default SingIn;