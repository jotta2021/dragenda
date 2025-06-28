'use server'
import db from "@/db"
import { patientsTable } from "@/db/schema"
import { auth } from "@/lib/auth"
import { actionClient } from "@/lib/safe-action"
import { eq } from "drizzle-orm"
import { revalidatePath } from "next/cache";
import { headers } from "next/headers"
import { z } from "zod"

const pacientSchema = z.object({
    id: z.string().uuid()
})
const handleDeletePacient = actionClient.schema(pacientSchema).action(async ({parsedInput})=> {
    const session = await auth.api.getSession({
        headers:await headers()
    })
    if(!session?.user){
        throw new Error("Unauthorized")
    }
    if(!session.user.clinicId){
        throw new Error("Clinic not found")
    }

    await db.delete(patientsTable).where(eq(patientsTable.id, parsedInput.id))
    revalidatePath("/patients")
})

export default handleDeletePacient