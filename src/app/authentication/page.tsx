

import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import SignUp from './components/signUp/page';
import SingIn from './components/signIn/page';
import { auth } from '@/lib/auth';
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';




const AuthenticationPage = async () => {

  const session = await auth.api.getSession({
    headers: await headers()
  })

  if(session){
    redirect("/dashboard")
  }

  return (
    <div className='h-screen w-screen flex items-center justify-center'>
       <Tabs defaultValue="login" className="w-[400px]">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="login">Login</TabsTrigger>
        <TabsTrigger value="register">Criar conta</TabsTrigger>
      </TabsList>
      <TabsContent value="login">
      <SingIn/>
      </TabsContent>
      <TabsContent value="register">

        <SignUp/>
       
      </TabsContent>
    </Tabs>
    </div>
  )
}

export default AuthenticationPage;