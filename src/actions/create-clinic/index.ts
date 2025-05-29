"use server"

import db from "@/db"
import { clinicsTable, userToClinicsTable } from "@/db/schema"
import { auth } from "@/lib/auth"
import { redirect } from 'next/navigation'
import { headers } from "next/headers"

export async function createClinic(name:string){
    const session = await auth.api.getSession({
        headers: await headers()
    })
    if(!session?.user){
        throw new Error("Unauthorized")
    }
    const [clinic] = await db.insert(clinicsTable).values({
        name
    }).returning()
    // depois que cria a clinica, faz o vinculo dela com o usuario
    await db.insert(userToClinicsTable).values({
        userId:session?.user.id,
        clinicId:clinic.id
    })
    redirect('/dashboard')
    
}
