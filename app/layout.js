import "@/app/globals.css";
import { Inter as FontSans } from "next/font/google";
import Link from "next/link";
import { LineChart, Search, User } from "lucide-react";

import { Input } from "@/components/ui/input";
import { cn } from "@/app/lib/utils";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export default function RootLayout({ children, params }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <title>Scouter AI</title>
        <link rel="icon" href="/app-logo.png" />
      </head>
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          fontSans.variable
        )}
      >
        <div className="flex min-h-screen w-full flex-col">
          <header className="sticky top-0 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6 z-10">
            <nav className="hidden flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6">
              <Link
                href="#"
                className="flex items-center gap-2 text-lg font-semibold md:text-base"
              >
                <LineChart className="h-6 w-6" />
                <span className="sr-only">Scouting</span>
              </Link>
              <Link
                href="/players?page_id=0"
                className="text-muted-foreground transition-colors hover:text-foreground"
              >
                Players
              </Link>
              <Link
                href="/"
                className="text-muted-foreground transition-colors hover:text-foreground"
              >
                A.Search
              </Link>
            </nav>
            {/* <Sheet>
          <SheetTrigger asChild>
            <Button
              variant="outline"
              size="icon"
              className="shrink-0 md:hidden"
            >
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle navigation menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left">
            <nav className="grid gap-6 text-lg font-medium">
              <Link
                href="#"
                className="flex items-center gap-2 text-lg font-semibold"
              >
                <LineChart className="h-6 w-6" />
                <span className="sr-only">Acme Inc</span>
              </Link>
              <Link href="#" className="hover:text-foreground">
                Dashboard
              </Link>
              <Link
                href="#"
                className="text-muted-foreground hover:text-foreground"
              >
                Orders
              </Link>
              <Link
                href="#"
                className="text-muted-foreground hover:text-foreground"
              >
                Players
              </Link>
              <Link
                href="#"
                className="text-muted-foreground hover:text-foreground"
              >
                Customers
              </Link>
              <Link
                href="#"
                className="text-muted-foreground hover:text-foreground"
              >
                Analytics
              </Link>
            </nav>
          </SheetContent>
        </Sheet> */}
            <div className="flex w-full items-center gap-4 md:ml-auto md:gap-2 lg:gap-4">
              <Link href={"/players"} className="w-full flex justify-center">
                <div className="rounded-full border-2 p-1 md:hidden">
                  <User />
                </div>
              </Link>
              <Link href={"/"} className="w-full flex justify-center">
                <div className="rounded-full border-2 p-1 md:hidden">
                  <Search />
                </div>
              </Link>
              <form
                className="ml-auto flex-1 sm:flex-initial"
                action="/players"
              >
                <input type="hidden" value="0" name="page_id" />
                <div className="relative hidden md:block">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="search"
                    placeholder="Search players..."
                    name="player_name"
                    className="pl-8 sm:w-[300px] md:w-[200px] lg:w-[300px]"
                  />
                </div>
              </form>
              {/* <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="secondary"
                    size="icon"
                    className="rounded-full"
                  >
                    <CircleUser className="h-5 w-5" />
                    <span className="sr-only">Toggle user menu</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>Settings</DropdownMenuItem>
                  <DropdownMenuItem>Support</DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>Logout</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu> */}
            </div>
          </header>

          <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
