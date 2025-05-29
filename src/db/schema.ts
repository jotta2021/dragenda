
import { relations } from "drizzle-orm";
import { uuid } from "drizzle-orm/pg-core";
import {
  pgTable,
  text,
  timestamp,
  integer,
  time,
  pgEnum,
  boolean,
  
} from "drizzle-orm/pg-core";




export const usersTable = pgTable("users", {
    id: text('id').primaryKey(),
    name: text('name').notNull(),
email: text('email').notNull().unique(),
emailVerified: boolean('email_verified').$defaultFn(() => false).notNull(),
image: text('image'),
createdAt: timestamp('created_at').$defaultFn(() => /* @__PURE__ */ new Date()).notNull(),
updatedAt: timestamp('updated_at').$defaultFn(() => /* @__PURE__ */ new Date()).notNull()
});

export const usersTableRelations = relations(usersTable, ({ many }) => ({
    usersToClinics : many(userToClinicsTable)
}))

export const clinicsTable = pgTable("clinics", {
  id: uuid("id").defaultRandom().primaryKey(),
  name: text("name").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updateAt: timestamp("updated_at")
    .defaultNow()
    .$onUpdate(() => new Date()),
});


export const userToClinicsTable = pgTable("user_to_clinics_table",{
    userId: text("user_id").references(()=> usersTable.id, { onDelete: "cascade" }),
    clinicId: uuid("clinic_id").references(()=> clinicsTable.id ,{ onDelete: "cascade" }),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at")
    .defaultNow()
    .$onUpdate(() => new Date()),
})

export const userToClinicsTableRelations = relations(
    userToClinicsTable, ({one}) => ({
        user: one(usersTable,{
            fields: [userToClinicsTable.userId],
            references: [usersTable.id]
        }),
        clinic: one(clinicsTable,{
            fields: [userToClinicsTable.clinicId],
            references: [clinicsTable.id]
        })
    })
)




//define as relações
export const clinicsTableRelations = relations(clinicsTable, ({ many }) => ({
    doctors:many(doctorsTable),
    patients: many(patientsTable),
    appointments:many(appointmentsTable),
    usersToClinics : many(userToClinicsTable)
    
    }))

export const doctorsTable = pgTable("doctors", {
  id: uuid("id").defaultRandom().primaryKey(),
  name: text("name").notNull(),
  avatarImageUrl: text("avatar_image_url"),
  speciality: text("speciality").notNull(),
  appointmentsPriceInCents: integer("appointments_price_in_centes").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updateAt: timestamp("updated_at")
    .defaultNow()
    .$onUpdate(() => new Date()),
  // 0-6 (0 is sunday)
  availableFromWeekDay: integer("available_from_week_day").notNull(),
  availableToWeekDay: integer("available_to_week_day").notNull(),
  availableFromTime: time("available_from_time").notNull(),
  availableToTime: time("available_to_time").notNull(),
  clinicId: uuid("clinic_id")
    .references(() => clinicsTable.id, { onDelete: "cascade" })
    .notNull(),
});


export const doctorTableRelations = relations(doctorsTable, ({ many,one }) => ({
 clinic: one(clinicsTable,{
    fields: [doctorsTable.clinicId],
    references: [clinicsTable.id]
 }),
 appointments: many(appointmentsTable)
    }))

export const patientsSexEnum = pgEnum("patients_sex", ["male", "female"]);
export const patientsTable = pgTable("patients", {
  id: uuid("id").defaultRandom().primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  phoneNumber: text("phone_number").notNull().unique(),
  sex: patientsSexEnum("sex").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updateAt: timestamp("updated_at")
    .defaultNow()
    .$onUpdate(() => new Date()),
  clinicId: uuid("clinic_id")
    .references(() => clinicsTable.id, { onDelete: "cascade" })
    .notNull(),
});

export const patientsTableRelations = relations(patientsTable, ({ many,one }) => ({
    clinic: one(clinicsTable,{
       fields: [patientsTable.clinicId],
       references: [clinicsTable.id]
    }),
    appointments :many(appointmentsTable)
       }))

export const appointmentsTable = pgTable("appointments", {
  id: uuid("id").defaultRandom().primaryKey(),
  patientId: uuid("patient_id").references(() => patientsTable.id, {
    onDelete: "cascade",
  }),
  doctorId: uuid("doctor_id").references(() => doctorsTable.id, {
    onDelete: "cascade",
  }),
  clinicId: uuid("clinic_id").references(() => clinicsTable.id, {
    onDelete: "cascade",
  }),
  date: timestamp("date").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});


export const appointmentsTableRelations = relations(appointmentsTable, ({ one }) => ({
    patient: one(patientsTable,{
        fields: [appointmentsTable.patientId],
        references: [patientsTable.id]
    }),
    doctor: one(doctorsTable,{
        fields: [appointmentsTable.doctorId],
        references: [doctorsTable.id]
    }),
    clinic: one(clinicsTable,{
        fields: [appointmentsTable.clinicId],
        references: [clinicsTable.id]
    })
    
}))




export const sessionsTable = pgTable("sessions", {
    id: text('id').primaryKey(),
    expiresAt: timestamp('expires_at').notNull(),
token: text('token').notNull().unique(),
createdAt: timestamp('created_at').notNull(),
updatedAt: timestamp('updated_at').notNull(),
ipAddress: text('ip_address'),
userAgent: text('user_agent'),
userId: text('user_id').notNull().references(()=> usersTable.id, { onDelete: 'cascade' })
});

export const accountsTable = pgTable("accounts", {
    id: text('id').primaryKey(),
    accountId: text('account_id').notNull(),
providerId: text('provider_id').notNull(),
userId: text('user_id').notNull().references(()=> usersTable.id, { onDelete: 'cascade' }),
accessToken: text('access_token'),
refreshToken: text('refresh_token'),
idToken: text('id_token'),
accessTokenExpiresAt: timestamp('access_token_expires_at'),
refreshTokenExpiresAt: timestamp('refresh_token_expires_at'),
scope: text('scope'),
password: text('password'),
createdAt: timestamp('created_at').notNull(),
updatedAt: timestamp('updated_at').notNull()
});

export const verificationsTable = pgTable("verifications", {
    id: text('id').primaryKey(),
    identifier: text('identifier').notNull(),
value: text('value').notNull(),
expiresAt: timestamp('expires_at').notNull(),
createdAt: timestamp('created_at').$defaultFn(() => /* @__PURE__ */ new Date()),
updatedAt: timestamp('updated_at').$defaultFn(() => /* @__PURE__ */ new Date())
});