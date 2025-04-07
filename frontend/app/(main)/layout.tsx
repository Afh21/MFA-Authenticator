"use client";
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";

import Asidebar from "./__components/Asidebar";
import Header from "./__components/Header";
import { AuthProvider } from "@/context/auth-provider";

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <AuthProvider>
      <SidebarProvider>
        <Asidebar />
        <SidebarInset>
          <main className="w-full">
            <Header />
            {children}
          </main>
        </SidebarInset>
      </SidebarProvider>
    </AuthProvider>
  );
}
