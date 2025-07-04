import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import db from "@/db";
import * as schema from "@/db/schema";
import { eq } from "drizzle-orm";
import { customSession } from "better-auth/plugins";
export const auth = betterAuth({
    database: drizzleAdapter(db, {
        provider: "pg", 
        usePlural: true,
        schema:schema
      }), 
      socialProviders: {
        google: { 
            clientId: process.env.GOOGLE_CLIENT_ID as string, 
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string, 
        }, 
    },
    plugins:[
      customSession(async ({user,session})=> {
const clinics = await db.query.userToClinicsTable.findMany({
  where: eq(schema.userToClinicsTable.userId, user.id),
  with:{
    clinic:true
  }
});
const clinic = clinics[0]
return {
  user :{
    ...user,
clinicId: clinic?.clinicId || null,
clinicName:clinic?.clinic?.name || null
  },
  session
}
      })
    ],
      user:{
        modelName:"usersTable"
      },
      session:{
        modelName:"sessionsTable"
      },
      account:{
        modelName:"accountsTable"
      },
      verification:{
        modelName:"verificationsTable"
      },
      emailAndPassword:{
        enabled:true,
      },
     
        
})