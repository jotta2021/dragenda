'use server'

import db from "@/db";
import { doctorsTable } from "@/db/schema";
import { auth } from "@/lib/auth";
import { actionClient } from "@/lib/safe-action";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { headers } from "next/headers";
import { z } from "zod";

const deleteDoctorSchema = z.object({
  doctorId: z.string().uuid(),
})
export const deleteDoctorAction  =actionClient.schema(deleteDoctorSchema).action(async ({parsedInput})=> {
const session = await auth.api.getSession({
    headers: await headers()
})
if(!session?.user){
    throw new Error("Unauthorized")
}
if(!session.user.clinicId){
    throw new Error("Clinic not found")
}


await db.delete(doctorsTable).where(eq(doctorsTable.id, parsedInput.doctorId))
revalidatePath("/doctors")
})


