import { uuid } from 'drizzle-orm/pg-core';
import { pgTable ,text,timestamp,integer,time,pgEnum,} from "drizzle-orm/pg-core";
import { sql } from 'drizzle-orm';
import { availableMemory } from 'process';


export const usersTable = pgTable("users", {
  id: uuid("id").defaultRandom().primaryKey(),
});


export const clinicsTable = pgTable("clinics", {
    id:uuid("id").defaultRandom().primaryKey(),
    name: text("name").notNull(),
    createdAt:timestamp("created_at").defaultNow().notNull(),
    updateAt:timestamp("updated_at").defaultNow().$onUpdate(()=> new Date())
})

export const doctorsTable = pgTable("doctors",{
    id:uuid("id").defaultRandom().primaryKey(),
    name:text("name").notNull(),
    clinicId:uuid("clinic_id").references(()=>clinicsTable.id,{onDelete:"cascade"}).notNull(),
    avatarImageUrl:text("avatar_image_url"),
    speciality:text("speciality").notNull(),
    appointmentsPriceInCents:integer("appointments_price_in_centes").notNull(),
    createdAt:timestamp("created_at").defaultNow().notNull(),
    updateAt:timestamp("updated_at").defaultNow().$onUpdate(()=> new Date()),
    // 0-6 (0 is sunday)
    availableFromWeekDay: integer("available_from_week_day").notNull(),
    availableToWeekDay:integer("available_to_week_day").notNull(),
    availableFromTime:time("available_from_time").notNull(),
    availableToTime:time("available_to_time").notNull(),



})

export const patientsSexEnum = pgEnum("patients_sex",["male","female"])
export const patientsTable= pgTable("patients",{
    id:uuid("id").defaultRandom().primaryKey(),
    name:text("name").notNull(),
    email:text("email").notNull().unique(),
    clinicId:uuid("clinic_id").references(()=>clinicsTable.id,{onDelete:"cascade"}).notNull(),
    phoneNumber:text("phone_number").notNull().unique(),
    sex:patientsSexEnum("sex").notNull(),
    createdAt:timestamp("created_at").defaultNow().notNull(),
    updateAt:timestamp("updated_at").defaultNow().$onUpdate(()=> new Date())
})

export const appointmentsTable = pgTable("appointments",{

    id:uuid("id").defaultRandom().primaryKey(),
    patientId:uuid("patient_id").references(()=>patientsTable.id,{onDelete:"cascade"}),
    doctorId:uuid("doctor_id").references(()=>doctorsTable.id,{onDelete:"cascade"}),
    clinicId:uuid("clinic_id").references(()=>clinicsTable.id,{onDelete:"cascade"}),
    date: timestamp("date").notNull(),
    createdAt:timestamp("created_at").defaultNow().notNull(),
    
})
