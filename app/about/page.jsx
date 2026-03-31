"use client";

import { title, subtitle } from "@/components/primitives";
import { aboutContent, competitionEvents } from "@/config/data";
import { Card, CardBody, CardHeader } from "@heroui/card";
import { Divider } from "@heroui/divider";
import { Chip } from "@heroui/chip";
import { Image as HeroImage } from "@heroui/image";
import carManuveringImg from "../../resources/car_manuvering_green.jpeg";

export default function AboutPage() {
  return (
    <div className="flex flex-col gap-16 py-8 md:py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto overflow-hidden relative">
      {/* Background Racing Accents */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#EE3124]/5 -rotate-45 translate-x-48 -translate-y-48 pointer-events-none"></div>
      
      {/* HEADER SECTION */}
      <div className="text-center flex flex-col gap-4 relative z-10">
        <h1 className={title({ size: "lg", italic: true })}>A LEGACY OF <span className="text-[#EE3124]">DRIVE</span></h1>
        <p className="text-xl text-default-500 max-w-3xl mx-auto italic">
          Toronto Met Baja Racing: Engineering the future through 100% student-designed off-road racers.
        </p>
      </div>

      {/* MISSION & VISION */}
      <div className="grid gap-8 md:grid-cols-2 relative z-10">
        <Card className="border-none bg-default-50/50 dark:bg-default-100/50 backdrop-blur-sm shadow-sm group">
          <div className="absolute top-0 left-0 w-1 h-full bg-[#EE3124] opacity-75 group-hover:w-2 transition-all"></div>
          <CardBody className="p-8 flex flex-col gap-4">
            <h2 className="text-2xl font-black italic tracking-wide text-default-800 dark:text-default-200">OUR MISSION</h2>
            <p className="text-lg text-default-600 dark:text-default-400 leading-relaxed italic">
              {aboutContent.mission}
            </p>
          </CardBody>
        </Card>

        <Card className="border-none bg-default-50/50 dark:bg-default-100/50 backdrop-blur-sm shadow-sm group">
          <div className="absolute top-0 left-0 w-1 h-full bg-[#EE3124] opacity-75 group-hover:w-2 transition-all"></div>
          <CardBody className="p-8 flex flex-col gap-4">
            <h2 className="text-2xl font-black italic tracking-wide text-default-800 dark:text-default-200">OUR VISION</h2>
            <p className="text-lg text-default-600 dark:text-default-400 leading-relaxed italic">
              {aboutContent.vision}
            </p>
          </CardBody>
        </Card>
      </div>

      <Divider className="my-4 opacity-50" />

      {/* THE CHALLENGE SECTION */}
      <div className="flex flex-col gap-12 relative z-10">
        <div className="flex flex-col lg:flex-row gap-12 items-center">
          <div className="flex flex-col gap-4 lg:w-2/3">
            <h2 className={title({ size: "md", italic: true })}>THE <span className="text-[#EE3124]">SAE BAJA</span> CHALLENGE</h2>
            <p className="text-lg text-default-600 leading-relaxed italic">
              {aboutContent.challenge}
            </p>
          </div>
          <div className="lg:w-1/3">
            <HeroImage
              src={carManuveringImg.src}
              alt="Car maneuvering in green environment"
              radius="lg"
              className="object-cover shadow-lg border-2 border-default-100"
            />
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Static Events */}
          <div className="flex flex-col gap-6">
            <div className="flex items-center gap-3">
              <span className="h-px flex-1 bg-default-200"></span>
              <Chip variant="dot" style={{ color: '#EE3124' }} className="font-bold border-none">STATIC EVENTS</Chip>
              <span className="h-px flex-1 bg-default-200"></span>
            </div>
            <div className="flex flex-col gap-4">
              {competitionEvents.static.map((event, idx) => (
                <div key={idx} className="flex flex-col gap-1 p-4 rounded-xl bg-default-50/30 border-l-2 border-default-200 hover:border-[#EE3124] transition-colors">
                  <span className="font-black italic text-default-800">{event.name}</span>
                  <p className="text-small text-default-500">{event.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Dynamic Events */}
          <div className="flex flex-col gap-6">
            <div className="flex items-center gap-3">
              <span className="h-px flex-1 bg-default-200"></span>
              <Chip variant="dot" style={{ color: '#EE3124' }} className="font-bold border-none uppercase">Dynamic Events</Chip>
              <span className="h-px flex-1 bg-default-200"></span>
            </div>
            <div className="flex flex-col gap-4">
              {competitionEvents.dynamic.map((event, idx) => (
                <div key={idx} className="flex flex-col gap-1 p-4 rounded-xl bg-default-50/30 border-l-2 border-default-200 hover:border-[#EE3124] transition-colors">
                  <span className="font-black italic text-default-800">{event.name}</span>
                  <p className="text-small text-default-500">{event.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* HISTORY SECTION */}
      <div className="flex flex-col gap-8 bg-default-50 dark:bg-default-100/30 p-10 sm:p-14 rounded-[3rem] relative z-10 shadow-sm border border-default-100/50">
        <div className="flex flex-col sm:flex-row items-baseline gap-4">
          <h2 className="text-5xl font-black italic text-[#EE3124]">SINCE 1983</h2>
          <span className="text-tiny font-bold uppercase tracking-[0.5em] text-default-400">Our History</span>
        </div>
        <p className="text-xl text-default-600 dark:text-default-400 leading-relaxed italic max-w-5xl font-medium">
          {aboutContent.history}
        </p>
      </div>
    </div>
  );
}
