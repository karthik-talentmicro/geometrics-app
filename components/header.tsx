"use client";

import { useState, useEffect } from "react";
import { useSession, signOut } from "next-auth/react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Menu, Settings, Globe, User, LogOut } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export function Header() {
  const { data: session } = useSession();
  const [detectedCountry, setDetectedCountry] = useState<string | null>(null);
  const [selectedCountry, setSelectedCountry] = useState<string | null>(null);
  const [isDetecting, setIsDetecting] = useState(false);

  // Detect user's country on mount
  useEffect(() => {
    detectCountry();
  }, []);

  const detectCountry = async () => {
    setIsDetecting(true);
    try {
      // Get user's IP
      const ipResponse = await fetch('https://api.ipify.org?format=json');
      const ipData = await ipResponse.json();

      // Lookup IP location
      const locationResponse = await fetch(`/api/ip-lookup?ip=${ipData.ip}`);
      const locationData = await locationResponse.json();

      if (locationData.status === 'success' && locationData.country) {
        setDetectedCountry(locationData.country);
        setSelectedCountry(locationData.country);
      }
    } catch (error) {
      console.error('Failed to detect country:', error);
    } finally {
      setIsDetecting(false);
    }
  };

  const popularCountries = [
    "United States", "United Kingdom", "Germany", "France", "Canada",
    "Australia", "Japan", "India", "Brazil", "Spain"
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center space-x-2">
          <span className="text-3xl font-bold tracking-wide bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
            LocaleOS
          </span>
        </Link>

        {/* Desktop Navigation */}
        <NavigationMenu className="hidden md:flex">
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuLink asChild>
                <Link href="/" className="group inline-flex h-10 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50">
                  Home
                </Link>
              </NavigationMenuLink>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <NavigationMenuTrigger>Features</NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                  <li className="row-span-3">
                    <NavigationMenuLink asChild>
                      <a
                        className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
                        href="/"
                      >
                        <div className="mb-2 mt-4 text-lg font-medium">
                          Locale OS
                        </div>
                        <p className="text-sm leading-tight text-muted-foreground">
                          Your location-based operating system
                        </p>
                      </a>
                    </NavigationMenuLink>
                  </li>
                  <li>
                    <NavigationMenuLink asChild>
                      <a
                        className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                        href="#"
                      >
                        <div className="text-sm font-medium leading-none">Feature 1</div>
                        <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                          Description of feature one
                        </p>
                      </a>
                    </NavigationMenuLink>
                  </li>
                  <li>
                    <NavigationMenuLink asChild>
                      <a
                        className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                        href="#"
                      >
                        <div className="text-sm font-medium leading-none">Feature 2</div>
                        <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                          Description of feature two
                        </p>
                      </a>
                    </NavigationMenuLink>
                  </li>
                  <li>
                    <NavigationMenuLink asChild>
                      <a
                        className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                        href="#"
                      >
                        <div className="text-sm font-medium leading-none">Feature 3</div>
                        <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                          Description of feature three
                        </p>
                      </a>
                    </NavigationMenuLink>
                  </li>
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <NavigationMenuLink asChild>
                <Link href="/docs" className="group inline-flex h-10 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50">
                  Docs
                </Link>
              </NavigationMenuLink>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <NavigationMenuLink asChild>
                <Link href="/about" className="group inline-flex h-10 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50">
                  About
                </Link>
              </NavigationMenuLink>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <NavigationMenuLink asChild>
                <Link href="/contact" className="group inline-flex h-10 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50">
                  Contact
                </Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>

        {/* CTA Button - Desktop */}
        <div className="hidden md:flex items-center space-x-2">
          {/* Country Settings Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="relative">
                <Globe className="h-5 w-5" />
                {selectedCountry && !isDetecting && (
                  <span className="absolute -top-1 -right-1 h-3 w-3 bg-green-500 rounded-full border-2 border-background" />
                )}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel className="flex items-center justify-between">
                <span>Location Settings</span>
                <Settings className="h-3.5 w-3.5" />
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              {isDetecting ? (
                <DropdownMenuItem disabled>
                  Detecting location...
                </DropdownMenuItem>
              ) : detectedCountry ? (
                <>
                  <DropdownMenuItem className="flex items-center justify-between">
                    <span className="flex items-center gap-2">
                      <Globe className="h-4 w-4" />
                      {detectedCountry}
                    </span>
                    <Badge variant="secondary" className="text-xs">Auto</Badge>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuLabel className="text-xs font-normal text-muted-foreground">
                    Popular Countries
                  </DropdownMenuLabel>
                  {popularCountries
                    .filter(c => c !== detectedCountry)
                    .slice(0, 5)
                    .map((country) => (
                      <DropdownMenuItem
                        key={country}
                        onClick={() => setSelectedCountry(country)}
                      >
                        {country}
                      </DropdownMenuItem>
                    ))}
                </>
              ) : (
                <DropdownMenuItem onClick={detectCountry}>
                  Detect my location
                </DropdownMenuItem>
              )}
            </DropdownMenuContent>
          </DropdownMenu>

          {session ? (
            <>
              <Link href="/dashboard">
                <Button variant="outline">Dashboard</Button>
              </Link>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <User className="h-5 w-5" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuLabel>
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium leading-none">{session.user?.name || "User"}</p>
                      <p className="text-xs leading-none text-muted-foreground">
                        {session.user?.email}
                      </p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link href="/profile" className="flex items-center cursor-pointer">
                      <User className="h-4 w-4 mr-2" />
                      Profile Settings
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => signOut({ callbackUrl: "/" })}>
                    <LogOut className="h-4 w-4 mr-2" />
                    Sign Out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </>
          ) : (
            <>
              <Link href="/login">
                <Button variant="outline">Sign In</Button>
              </Link>
              <Link href="/signup">
                <Button>Get Started</Button>
              </Link>
            </>
          )}
        </div>

        {/* Mobile Menu */}
        <Sheet>
          <SheetTrigger asChild className="md:hidden">
            <Button variant="outline" size="icon">
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="right">
            <SheetHeader>
              <SheetTitle>Menu</SheetTitle>
              <SheetDescription>Navigate through the app</SheetDescription>
            </SheetHeader>
            <nav className="flex flex-col space-y-4 mt-6">
              <Link
                href="/"
                className="text-lg font-medium hover:text-primary transition-colors"
              >
                Home
              </Link>
              <Link
                href="/docs"
                className="text-lg font-medium hover:text-primary transition-colors"
              >
                Docs
              </Link>
              <Link
                href="/about"
                className="text-lg font-medium hover:text-primary transition-colors"
              >
                About
              </Link>
              <Link
                href="/contact"
                className="text-lg font-medium hover:text-primary transition-colors"
              >
                Contact
              </Link>
              {session && (
                <Link
                  href="/dashboard"
                  className="text-lg font-medium hover:text-primary transition-colors"
                >
                  Dashboard
                </Link>
              )}
              <div className="pt-4 space-y-2">
                {session ? (
                  <>
                    <div className="px-2 py-3 text-sm">
                      <p className="font-medium">{session.user?.name || "User"}</p>
                      <p className="text-xs text-muted-foreground">{session.user?.email}</p>
                    </div>
                    <Link href="/profile">
                      <Button variant="outline" className="w-full">
                        <User className="h-4 w-4 mr-2" />
                        Profile Settings
                      </Button>
                    </Link>
                    <Button
                      variant="outline"
                      className="w-full"
                      onClick={() => signOut({ callbackUrl: "/" })}
                    >
                      <LogOut className="h-4 w-4 mr-2" />
                      Sign Out
                    </Button>
                  </>
                ) : (
                  <>
                    <Link href="/login">
                      <Button variant="outline" className="w-full">
                        Sign In
                      </Button>
                    </Link>
                    <Link href="/signup">
                      <Button className="w-full">Get Started</Button>
                    </Link>
                  </>
                )}
              </div>
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
