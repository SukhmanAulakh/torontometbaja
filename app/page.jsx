"use client";

import { Button } from "@heroui/button";
import Image from "next/image";
import { Card, CardBody } from "@heroui/card";
import { Image as HeroImage } from "@heroui/image";

import { title } from "@/components/primitives";
import { sponsors } from "@/config/data";
import "../styles/globals.css";

export default function Home() {
  const platinumSponsors = sponsors.filter(s => s.tier === 'Platinum');

  return (
    <main className="flex flex-col items-center justify-center">
      {/* HERO SECTION */}
      <section className="relative w-full overflow-hidden bg-theme text-white w-screen">
        {/* Background image */}
        <div className="absolute inset-0">
          <Image
            src={require("../resources/LavalBaja201942.jpg")}
            alt="Baja car on track"
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
          flex-col items-center justify-start
          px-4
          pt-20 sm:pt-28 md:pt-32 lg:pt-40
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

      {/* CONTENT SECTION */}
      <section className="flex flex-col items-center gap-12 pb-16 pt-16 bg-background w-full px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        
        {/* PLATINUM SPONSORS SECTION - NOW ON TOP */}
        <div className="flex flex-col gap-8 w-full bg-default-50 dark:bg-default-100/30 p-8 sm:p-12 rounded-[2.5rem]">
          <div className="text-center">
            <h3 className="text-tiny font-bold uppercase tracking-[0.5em] text-[#EE3124] mb-2">Powered By</h3>
            <h2 className="text-2xl font-black italic text-default-800 ">OUR OFFICIAL PARTNERS</h2>
          </div>
          
          <div className="flex flex-wrap items-center justify-center gap-12 md:gap-16">
            {platinumSponsors.map((sponsor, idx) => (
              <a 
                key={idx} 
                href={sponsor.website} 
                target="_blank" 
                rel="noreferrer"
                className="transition-all duration-300 transform hover:scale-110 active:scale-95"
              >
                <HeroImage
                  src={sponsor.logoUrl}
                  alt={sponsor.name}
                  height={60}
                  className="max-h-[60px] w-auto max-w-[140px] object-contain"
                  radius="none"
                />
              </a>
            ))}
          </div>
          
          <div className="text-center mt-4">
            <Button 
                variant="flat"
                className="font-bold uppercase tracking-widest text-tiny border-b-2 border-[#EE3124] rounded-none hover:bg-default-100 transition-colors"
                onPress={() => window.location.href = '/sponsors'}
            >
              View our Sponsors
            </Button>
          </div>
        </div>

        {/* OVERVIEW SECTION - NOW BELOW */}
        <div className="flex flex-col lg:flex-row gap-12 items-center mt-8">
          <div className="flex-1 text-left flex flex-col gap-6">
            <h2 className={title({ size: "lg", italic: true })}>A LEGACY OF <span className="text-[#EE3124]">EXCELLENCE</span></h2>
            <div className="flex flex-col gap-4 text-default-600 leading-relaxed text-lg italic">
              <p>
                Toronto Met Baja Racing (TMBR) is a student-led engineering design team at Toronto Metropolitan University. 
                Competing since 1983, we are the oldest design team on campus, dedicated to designing, building, and racing 
                a high-performance off-road vehicle from the ground up every season.
              </p>
              <p>
                Our mission is to bridge the gap between classroom theory and real-world implementation, 
                preparing the next generation of engineers through hands-on fabrication, advanced simulation, and 
                international competitions.
              </p>
            </div>
          </div>
          
          <div className="flex-1 grid grid-cols-2 gap-4 w-full">
            <Card className="border-none bg-default-50 dark:bg-default-100/50 shadow-none hover:bg-default-100 transition-colors">
              <CardBody className="p-6 text-center flex flex-col items-center justify-center gap-2">
                <span className="text-4xl font-black italic text-[#EE3124]">40+</span>
                <span className="text-tiny font-bold uppercase tracking-widest text-default-500">Years of History</span>
              </CardBody>
            </Card>
            <Card className="border-none bg-default-50 dark:bg-default-100/50 shadow-none hover:bg-default-100 transition-colors">
              <CardBody className="p-6 text-center flex flex-col items-center justify-center gap-2">
                <span className="text-4xl font-black italic text-[#EE3124]">75+</span>
                <span className="text-tiny font-bold uppercase tracking-widest text-default-500">Active Members</span>
              </CardBody>
            </Card>
            <Card className="border-none bg-default-50 dark:bg-default-100/50 shadow-none col-span-2 hover:bg-default-100 transition-colors">
              <CardBody className="p-6 text-center flex flex-col items-center justify-center gap-2">
                <span className="text-3xl font-black italic text-[#EE3124]">International</span>
                <span className="text-tiny font-bold uppercase tracking-widest text-default-500">SAE Competitions</span>
              </CardBody>
            </Card>
          </div>
        </div>
      </section>
    </main>
  );
}
