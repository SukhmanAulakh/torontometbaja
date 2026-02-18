"use client";

import { Link } from "@heroui/link";
import { Snippet } from "@heroui/snippet";
import { Code } from "@heroui/code";
import { button as buttonStyles } from "@heroui/theme";
import Image from "next/image";

import { title, subtitle } from "@/components/primitives";
import { LinkedInIcon } from "@/components/icons";
import "../styles/globals.css";

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center">
      {/* HERO SECTION */}
      <section className="relative w-full overflow-hidden bg-theme text-white w-screen">
        {/* Background image */}
        <div className="absolute inset-0">
          <Image
            src={require("../resources/LavalBaja201942.jpg")}
            alt="Baja car on track"
            position="fixed"
            fill
            priority
            className="object-cover"
          />
          {/* Dark overlay */}
          <div className="absolute inset-0 bg-black/55" />

          {/* Blur layer — transparent so we can SEE the image */}
          <div className="absolute inset-0 bg-transparent" />
        </div>

        {/* Banner content */}
        <div className="
          relative z-10 flex 
          min-h-[50vh]
          sm:min-h-[55vh]
          md:min-h-[60vh]
          lg:min-h-[70vh]
          flex-col items-center justify-start     /* not centered vertically */
          px-4
          pt-20 sm:pt-28 md:pt-32 lg:pt-40        /* PUSH CONTENT DOWN */
        "
        >
          <div className="max-w-4xl w-full mx-auto flex justify-center">
            <div
              id="banner"
              className="flex flex-wrap items-center justify-center gap-4 backdrop-blur-lg rounded-[2vw] py-[1vw] px-[3vw] shadow-md 
                translate-x-0
                sm:translate-x-1/3
                md:translate-x-1/3
                lg:translate-x-1/3
                xl:translate-x-3/7

                translate-y-0
                sm:translate-y-5/7
                md:translate-y-6/11
                lg:translate-y-1/5
                xl:translate-y-1/3
              "
            >
              {/* Text block */}
              <div className="flex flex-col text-right">
                <span className={title({ size: "xl" })}>TMBR</span>
                <span className={title({ color: "red" })}>
                  Toronto Metropolitan
                </span>
                <span className={title()}>Baja Racing</span>
                <span
                  className={title({
                    color: "red",
                    size: "xs",
                    class: "mt-1 block",
                  })}
                >
                  since 1983
                </span>
              </div>

              {/* Logo */}
              <div className="flex items-center justify-center">
                <Image
                  src={require("../resources/new_logo_sm.png")}
                  alt="Banner graphic"
                  className="bannerImg"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Curved bottom edge */}
        <div className="pointer-events-none absolute bottom-0 left-0 right-0">
          <svg
            viewBox="0 0 1440 320"
            className="block h-24 w-full text-background fill-current mask-b-to-t"
            preserveAspectRatio="none"
          >
            <path d="M0,256L80,240C160,224,320,192,480,170.7C640,149,800,139,960,144C1120,149,1280,171,1360,181.3L1440,192L1440,320L0,320Z" />
          </svg>
        </div>
      </section>

      {/* CONTENT BELOW HERO */}
      <section className="flex flex-col items-center gap-4 pb-16 pt-8 bg-background w-full">
        <div className="inline-block max-w-xl text-center justify-center">
          <span className={title()}>Make&nbsp;</span>
          <span className={title({ color: "violet" })}>beautiful&nbsp;</span>
          <br />
          <span className={title()}>
            websites regardless of your design experience.
          </span>
          <div className={subtitle({ class: "mt-4" })}>
            Beautiful, fast and modern React UI library.
          </div>
        </div>

        <div className="flex gap-3">
          <Link
            isExternal
            className={buttonStyles({
              color: "primary",
              radius: "full",
              variant: "shadow",
            })}
            href={"siteConfig.links.docs"} // make sure siteConfig is imported
          >
            Documentation
          </Link>
          <Link
            isExternal
            className={buttonStyles({ variant: "bordered", radius: "full" })}
            href={"siteConfig.links.github"}
          >
            <LinkedInIcon size={20} />
            GitHub
          </Link>
        </div>

        <div className="mt-8">
          <Snippet hideCopyButton hideSymbol variant="bordered">
            <span>
              Get started by editing <Code color="primary">app/page.tsx</Code>
            </span>
          </Snippet>
        </div>
      </section>
    </main>
  );
}
