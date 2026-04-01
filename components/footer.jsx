import React from "react";
import { Link } from "@heroui/link";
import { InstagramIcon, LinkedInIcon, FacebookIcon, MailIcon, LinkIcon } from "./icons";

export const Footer = () => {
  return (
    <footer id="contacts" className="w-full py-8 px-4 flex flex-col align-items-center gap-6 bg-background border-t border-divider">
      <div className="flex justify-center gap-6">
        <Link isExternal href="https://www.instagram.com/torontometbaja/" title="Instagram">
          <InstagramIcon size={28} className="text-[#EE3124] hover:scale-110 transition-transform" />
        </Link>
        <Link isExternal href="https://www.linkedin.com/company/torontometbaja/" title="LinkedIn">
          <LinkedInIcon size={28} className="text-[#EE3124] hover:scale-110 transition-transform" />
        </Link>
        <Link isExternal href="https://www.facebook.com/RyersonBaja/" title="Facebook">
          <FacebookIcon size={28} className="text-[#EE3124] hover:scale-110 transition-transform" />
        </Link>
        <Link isExternal href="mailto:bajasae@torontomu.ca" title="Email">
          <MailIcon size={28} className="text-[#EE3124] hover:scale-110 transition-transform" />
        </Link>
        <Link isExternal href="https://linktr.ee/TorontoMetBajaRacing" title="Linktree">
          <LinkIcon size={28} className="text-[#EE3124] hover:scale-110 transition-transform" />
        </Link>
      </div>
      <div className="text-center flex flex-col gap-2">
        <p className="text-default-500 text-sm">
          © Toronto Metropolitan University (formerly Ryerson) 2026 - Toronto, Canada
        </p>
      </div>
    </footer>
  );
};
