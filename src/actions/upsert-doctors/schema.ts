import React from 'react';
import { z } from 'zod';

// import { Container } from './styles';

const upsertDoctorSchema = z.object({
  
    id: z.string().uuid().optional(),
    name: z.string().min(1, { message: "Nome é obrigatório" }),
    speciality: z.string().min(1, { message: "Especialidade é obrigatório" }),
    appointmentPriceInCents: z
      .number()
      .min(1, { message: "Preço da consulta é obrigatório" }),
    availableFromWeekDay: z.number().min(0).max(6),
    availableToWeekDay: z.number().min(0).max(6),
    availableFromTime: z.string().min(1, { message: "Horário inicial é obrigatório" }),
      availableToTime: z.string(),
  }).refine((data)=>  {
    if(data.availableFromTime < data.availableToTime) {
    return  true
    }
   
  }, {
    message: "Horário inicial deve ser menor que o horário final",
    path: ["availableFromTime"],
  });
export default upsertDoctorSchema;





export type UpsertDoctorSchema = z.infer<typeof upsertDoctorSchema>;