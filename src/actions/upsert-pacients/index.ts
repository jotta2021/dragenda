'use server'

import { z } from "zod";
import { actionClient } from "@/lib/safe-action";
import upsertDoctorSchema from "../upsert-doctors/schema";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import db from "@/db";
import { upsertPatientSchema } from "./schema";
import { patientsTable } from "@/db/schema";
import { revalidatePath } from "next/cache";

export const upsertPatient = actionClient.schema(upsertPatientSchema).action(async ({parsedInput})=> {
    const session = await auth.api.getSession({
        headers: await headers()
    })
    if(!session?.user){
        throw new Error("Unauthorized")
    }
    if(!session.user.clinicId){
        throw new Error("Clinic not found")
    }
    

    await db.insert(patientsTable).values({
        ...parsedInput,
        clinicId: session.user.clinicId,
        
    }).onConflictDoUpdate({
        target: [patientsTable.id],
        set: {
            ...parsedInput,
        }
    })
    revalidatePath('/patients')
})