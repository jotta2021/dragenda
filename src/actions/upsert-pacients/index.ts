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
import { eq } from "drizzle-orm";

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
    
    const patientData = {
        name: parsedInput.name,
        email: parsedInput.email,
        phoneNumber: parsedInput.phoneNumber,
        sex: parsedInput.sex,
        clinicId: session.user.clinicId,
    }

    if (parsedInput.id) {
        // Update existing patient
        await db.update(patientsTable)
            .set(patientData)
            .where(eq(patientsTable.id, parsedInput.id))
    } else {
        // Create new patient
        await db.insert(patientsTable).values(patientData)
    }
    
    revalidatePath('/patients')
})