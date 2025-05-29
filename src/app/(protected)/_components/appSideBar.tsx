"use client";

import {
  CalendarDays,
  EllipsisVertical,
  Gem,
  LayoutDashboard,
  LogOut,
  Stethoscope,
  User,
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import Link from "next/link";
import Image from "next/image";
import { auth } from "@/lib/auth";
import { authClient } from "@/lib/auth-client";
import { toast } from "sonner";
import { redirect } from "next/navigation";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

// Menu items.
const items = [
  {
    title: "Dashboard",
    url: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Agendamentos",
    url: "/appointments",
    icon: CalendarDays,
  },
  {
    title: "Médicos",
    url: "/doctors",
    icon: Stethoscope,
  },
  {
    title: "Pacientes",
    url: "/patients",
    icon: User,
  },
];

export function AppSidebar() {
  const session = authClient.useSession();

  const handleSignout = async () => {
    const session = await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          toast.success("Deslogado com sucesso");
          redirect("/authentication");
        },
      },
    });
  };

  
  return (
    <Sidebar>
      <SidebarHeader className="border-b p-4">
        <Image src="/logo.svg" alt="Doutor Agenda" width={100} height={100} />
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="text-[#9CA7B2]">
            Menu Principal
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <Link href={item.url}>
                      <item.icon />
                      <span className="text-[#5B7189]">{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
              <SidebarGroup>
                <SidebarGroupLabel className="text-[#9CA7B2]">
                  Outros
                </SidebarGroupLabel>

                <SidebarMenuItem>
                  <SidebarMenuButton asChild>
                    <Link href="/plans">
                      <Gem />
                      <span className="text-[#5B7189]">Planos</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarGroup>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuButton asChild>
            <DropdownMenu>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <Avatar>
                  <AvatarFallback>JL</AvatarFallback>
                </Avatar>
                <div className="text-sm flex flex-col">
                  <span className="font-medium">{session?.data?.user?.clinicName}</span>
                  <span className="text-muted-foreground text-xs">{session?.data?.user?.email}</span>
                </div>
                </div>
              
                <DropdownMenuTrigger >
                  <EllipsisVertical className="text-primary" />
                </DropdownMenuTrigger>
              </div>

              <DropdownMenuContent>
                <DropdownMenuLabel>Minha conta</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleSignout}>
                  <LogOut />
                  Sair
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuButton>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
