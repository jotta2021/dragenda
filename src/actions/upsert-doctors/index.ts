'use server'
import upsertDoctorSchema, { UpsertDoctorSchema } from './schema';
import { auth } from '@/lib/auth';
import { headers } from 'next/headers';
import db from '@/db';
import { doctorsTable } from '@/db/schema';
import { actionClient } from '@/lib/safe-action';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';

// import { Container } from './styles';

const UpsertDoctor = actionClient.schema(upsertDoctorSchema).action(async ({parsedInput})=> {
dayjs.extend(utc)
const session = await auth.api.getSession({
    headers: await headers()
})
const availlableFromTime = parsedInput.availableFromTime
const availlableToTime = parsedInput.availableToTime

const availableFromTimeUtc = dayjs()
.set('hour',parseInt( availlableFromTime.split(':')[0]))
.set('minute',parseInt( availlableFromTime.split(':')[1]))
.set('second',parseInt(availlableFromTime.split(':')[2]))
.utc();


const availableToTimeUtc = dayjs()
.set('hour',parseInt( availlableToTime.split(':')[0]))
.set('minute',parseInt( availlableToTime.split(':')[1]))
.set('second',parseInt(availlableToTime.split(':')[2]))
.utc();

if(!session?.user){
    throw new Error("Unauthorized")
}
if(!session.user.clinicId){
    throw new Error("Clinic not found")
}

await db.insert(doctorsTable).values({
    ...parsedInput,
    clinicId: session.user.clinicId,
    appointmentsPriceInCents: parsedInput.appointmentPriceInCents,
    availableFromTime: availableFromTimeUtc.format('HH:mm:ss'),
    availableToTime: availableToTimeUtc.format(' HH:mm:ss')
  


}).onConflictDoUpdate({
    target: [doctorsTable.id],
    set:{
    ...parsedInput,
    availableFromTime: availableFromTimeUtc.format('HH:mm:ss'),
    availableToTime: availableToTimeUtc.format('HH:mm:ss')
    }
       
})

})





export default UpsertDoctor;