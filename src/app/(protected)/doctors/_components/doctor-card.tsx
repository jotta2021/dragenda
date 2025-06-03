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
import { CalendarDaysIcon, ClockIcon, DollarSignIcon } from "lucide-react";

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

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-3">
          <Avatar className="w-[72px] h-[72px]">
            <AvatarFallback>{doctorInitials}</AvatarFallback>
          </Avatar>
          <div className="flex flex-col">
            <h3 className="text-sm font-medium">{doctor.name}</h3>
            <p className="text-muted-foreground text-sm">{doctor.speciality}</p>
          </div>
        </div>
       
      </CardHeader>
      <Separator />
      <CardContent >
        <div className="flex flex-col gap-2 ">
          <Badge variant={"outline"} className="rounded-xl p-2 bg-[#F6FAFF]">
            <CalendarDaysIcon size={16} />
            {days[doctor.availableFromWeekDay]} a{" "}
            {days[doctor.availableToWeekDay]}
          </Badge>
          <Badge variant={"outline"} className="rounded-xl p-2 bg-[#F6FAFF]">
            <ClockIcon size={16} />
            Das {doctor.availableFromTime} as {doctor.availableToTime}
          </Badge>
          <Badge variant={"outline"} className="rounded-xl p-2 bg-[#F6FAFF]">
            <DollarSignIcon size={16} />
            {doctor.appointmentsPriceInCents / 100}
          </Badge>
        </div>
      
      </CardContent>
      <Separator />
      <CardFooter className="w-full">
        <Button className="w-full">Ver detalhes</Button>
      </CardFooter>
    </Card>
  );
};

export default DoctorCard;
