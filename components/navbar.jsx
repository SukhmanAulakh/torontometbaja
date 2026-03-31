"use client";

import React, { useEffect } from "react";
import {
  Navbar as HeroUINavbar,
  NavbarContent,
  NavbarMenu,
  NavbarMenuToggle,
  NavbarBrand,
  NavbarItem,
  NavbarMenuItem,
} from "@heroui/navbar";
import { Button } from "@heroui/button";
import { Link } from "@heroui/link";
import NextLink from "next/link";
import Image from "next/image";

import { ThemeSwitch } from "@/components/theme-switch";
import {
  InstagramIcon,
  LinkedInIcon,
  DiscordIcon,
} from "@/components/icons";

export const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const [selectedPage, setSelectedPage] = React.useState("Home");

  const menuItems = [
    { label: "Home", href: "/" },
    { label: "About", href: "/about" },
    { label: "Gallery", href: "/gallery" },
    { label: "Our Team", href: "/team" },
    { label: "Sponsorships", href: "/sponsors" },
    { label: "Join Us", href: "/join" },
    { label: "Contact Us", href: "/contact" },
  ];

  return (
    <HeroUINavbar
      isMenuOpen={isMenuOpen}
      onMenuOpenChange={setIsMenuOpen}
      maxWidth="2xl"
      position="sticky"
    >
      {/* Left Section (Logo + Links) */}
      <NavbarContent justify="start">
        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          className="lg:hidden"
        />
        <NavbarBrand>
          <NextLink href="/" className="flex items-center gap-2"
            onClick={() => setSelectedPage("Home")}
          >
            <img src="/favicon.ico" alt="TMU Baja Logo" width={32} height={32} />
            <p className="font-bold text-inherit">TMU Baja</p>
          </NextLink>
        </NavbarBrand>
        <div className="hidden lg:flex gap-6 ml-6">
          <NavbarItem>
            <Link color={
              ("About" == selectedPage)
                ? "danger"
                : "foreground"
            } href="/about"
              onClick={() => setSelectedPage("About")}
            >
              About Us
            </Link>
          </NavbarItem>
          <NavbarItem>
            <Link color={
              ("Gallery" == selectedPage)
                ? "danger"
                : "foreground"
            } href="/gallery"
              onClick={() => setSelectedPage("Gallery")}
            >
              Gallery
            </Link>
          </NavbarItem>
          <NavbarItem>
            <Link color={
              ("Sponsorships" == selectedPage)
                ? "danger"
                : "foreground"
            } href="/sponsors"
              onClick={() => setSelectedPage("Sponsorships")}
            >
              Sponsorships
            </Link>
          </NavbarItem>

          <NavbarItem>
            <Link color={
              ("Our Team" == selectedPage)
                ? "danger"
                : "foreground"
            } href="/team"
              onClick={() => setSelectedPage("Our Team")}
            >
              Our Team
            </Link>
          </NavbarItem>
          <NavbarItem>
            <Link color={
              ("Join Us" == selectedPage)
                ? "danger"
                : "foreground"
            } href="/join"
              onClick={() => setSelectedPage("Join Us")}
            >
              Join Us
            </Link>
          </NavbarItem>
          <NavbarItem>
            <Link color={
              ("Contact Us" == selectedPage)
                ? "danger"
                : "foreground"
            } href="/contact"
              onClick={() => setSelectedPage("Contact Us")}
            >
              Contact Us
            </Link>
          </NavbarItem>
        </div>
      </NavbarContent>
      {/* Right Section (Icons + Buttons) */}
      <NavbarContent justify="end" className="hidden lg:flex gap-4">
        <NavbarItem className="flex gap-2">
          <Link
            isExternal
            aria-label="Instagram"
            href={"https://www.instagram.com/torontometbaja/"}
          >
            <InstagramIcon className="text-default-500" />
          </Link>
          <Link
            isExternal
            aria-label="Discord"
            href={"https://discord.com/invite/UVMvRb9VdV"}
          >
            <DiscordIcon className="text-default-500" />
          </Link>
          <Link
            isExternal
            aria-label="LinkedIn"
            href={"https://www.linkedin.com/company/torontometbaja/"}
          >
            <LinkedInIcon className="text-default-500" />
          </Link>
          <ThemeSwitch />
        </NavbarItem>
        <NavbarItem>
          <Button
            as={Link}
            isExternal
            color="primary"
            href={"https://new.express.adobe.com/id/urn:aaid:sc:VA6C2:1629f2c6-2603-5879-a556-42d02b16e3d5?accept=true%3Fpreload%3Dsharesheet"}
            startContent={<Image
              src={require("./TMUBaja-PixelArt.png")}
              alt="TMU Baja Pixel Art"
              width={24}
              height={24}
              style={{ borderRadius: 4 }}
            />}
            variant="flat"
          >
            Sponsor Us
          </Button>
        </NavbarItem>
      </NavbarContent>

      {/* Mobile Right Section */}
      <NavbarContent className="lg:hidden" justify="end">
        <Link
          isExternal
          aria-label="Instagram"
          href={"https://www.instagram.com/torontometbaja/"}
        >
          <InstagramIcon className="text-default-500" />
        </Link>
        <Link
          isExternal
          aria-label="Discord"
          href={"https://discord.com/invite/UVMvRb9VdV"}
        >
          <DiscordIcon className="text-default-500" />
        </Link>
        <Link
          isExternal
          aria-label="LinkedIn"
          href={"https://www.linkedin.com/company/torontometbaja/"}
        >
          <LinkedInIcon className="text-default-500" />
        </Link>
        <ThemeSwitch />
      </NavbarContent>

      {/* Mobile Menu Drawer */}
      <NavbarMenu>
        {menuItems.map((item, index) => (
          <NavbarMenuItem key={item.label + index}>
            <Link
              className="w-full"
              onClick={() => {
                setIsMenuOpen(false);
                setSelectedPage(item.label);
              }}
              color={
                (item.label == selectedPage)
                  ? "danger"
                  : index === menuItems.length - 1
                    ? "primary"
                    : "foreground"
              }
              href={item.href || "#"}
              size="lg"
            >
              {item.label}
            </Link>
          </NavbarMenuItem>
        ))}
      </NavbarMenu>
    </HeroUINavbar >
  );
};