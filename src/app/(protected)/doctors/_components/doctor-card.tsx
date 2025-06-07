'use client'
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardTitle,
  CardDescription,
  CardFooter,
  CardHeader,
  CardContent,
  CardAction,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { doctorsTable } from "@/db/schema";
import { formatCurrency } from "@/helpers/currency";
import { CalendarDaysIcon, ClockIcon, DollarSignIcon } from "lucide-react";
import { getAvailability } from "../_helpers/availability";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import UpsertDoctorForm from "./upsert-doctor-form";
import { useState } from "react";

interface DoctorProps {
  doctor: typeof doctorsTable.$inferSelect;
}
const DoctorCard = ({ doctor }: DoctorProps) => {
  const doctorInitials = doctor.name
    .split(" ")
    .map((name) => name[0])
    .join("");

  const days = [
    "Domingo",
    "Segunda",
    "Terça",
    "Quarta",
    "Quinta",
    "Sexta",
    "Sábado",
  ];
  const availability = getAvailability(doctor);
  const [isUpsertDoctorFormOpen, setIsUpsertDoctorFormOpen] = useState(false);
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-3">
          <Avatar className="h-[72px] w-[72px]">
            <AvatarFallback>{doctorInitials}</AvatarFallback>
          </Avatar>
          <div className="flex flex-col">
            <h3 className="text-sm font-medium">{doctor.name}</h3>
            <p className="text-muted-foreground text-sm">{doctor.speciality}</p>
          </div>
        </div>
      </CardHeader>
      <Separator />
      <CardContent>
        <div className="flex flex-col gap-2">
          <Badge variant={"outline"} className="rounded-xl bg-[#F6FAFF] p-2">
            <CalendarDaysIcon size={16} />
            {days[doctor.availableFromWeekDay]} a{" "}
            {days[doctor.availableToWeekDay]}
          </Badge>
          <Badge variant={"outline"} className="rounded-xl bg-[#F6FAFF] p-2">
            <ClockIcon size={16} />
            Das {availability.from.format("HH:mm")} as{" "}
            {availability.to.format("HH:mm")}
          </Badge>
          <Badge variant={"outline"} className="rounded-xl bg-[#F6FAFF] p-2">
            <DollarSignIcon size={16} />
            {formatCurrency(doctor.appointmentsPriceInCents)}
          </Badge>
        </div>
      </CardContent>
      <Separator />
      <CardFooter className="w-full">
        
        <Dialog open={isUpsertDoctorFormOpen} onOpenChange={setIsUpsertDoctorFormOpen}>
          <DialogTrigger asChild>
            <Button className="w-full">Ver detalhes</Button>
          </DialogTrigger>
          <UpsertDoctorForm doctor={{
            ...doctor,
            availableFromTime: availability.from.format("HH:mm:ss"),
            availableToTime: availability.to.format("HH:mm:ss"),
          }} onSuccess={() => setIsUpsertDoctorFormOpen(false)}/>
        </Dialog>
      </CardFooter>
    </Card>
  );
};

export default DoctorCard;
