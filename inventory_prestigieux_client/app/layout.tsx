import "./../styles/globals.css";
import type { Metadata } from "next";
import { Geist, Geist_Mono, Poppins } from "next/font/google";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";
import { Toaster } from "@/components/ui/toaster";

/* Custom Components */
import { ThemeProvider } from "@/context/theme-provider";
import { AppSidebar } from "@/components/shared/sidebar/app-sidebar";
import { BreadcrumbComponent } from "@/utils/breadcrumb";
import AppHeader from "@/components/shared/app-header";
import { ToggleTheme } from "@/components/shared/toggle-theme";
import AuthButtons from "@/components/shared/auth";
import { UserProvider } from "@/context/user-provider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "Megoz",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased ${poppins.variable} antialiased`}
      >
        <UserProvider>
          <ThemeProvider
            attribute={"class"}
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <SidebarProvider
              defaultOpen={false}
              style={{ "--sidebar-width": "280px" } as React.CSSProperties}
            >
              <AppSidebar />
              <SidebarInset>
                <header className="sticky justify-between top-0 flex bg-white dark:bg-black shrink-0 items-center border-b p-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
                  <div className="flex items-center gap-1 text-left text-sm leading-tight">
                    <SidebarTrigger className="-ml-1" />
                    <AppHeader />
                    <Separator
                      orientation="vertical"
                      className="mr-2 ml-2 h-4"
                    />
                    <BreadcrumbComponent />
                  </div>
                  <div className="flex items-center gap-7">
                    <AuthButtons />
                    <ToggleTheme />
                  </div>
                </header>
                {children}
              </SidebarInset>
            </SidebarProvider>
          </ThemeProvider>
        </UserProvider>
        <Toaster key={"toaster"} />
      </body>
    </html>
  );
}