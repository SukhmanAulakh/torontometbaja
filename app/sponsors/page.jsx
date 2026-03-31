"use client";

import { title } from "@/components/primitives";
import { sponsors, sponsorshipTiers } from "@/config/data";
import { Card, CardBody } from "@heroui/card";
import { Image } from "@heroui/image";
import { Chip } from "@heroui/chip";
import { Button } from "@heroui/button";
import { Link } from "@heroui/link";

export default function SponsorsPage() {
  // Group sponsors by tier for better display
  const tiers = ["Platinum", "Gold", "Silver", "Bronze"];

  const getTierColor = (tier) => {
    switch (tier) {
      case "Platinum": return "primary";
      case "Gold": return "warning";
      case "Silver": return "default";
      default: return "secondary";
    }
  };

  const getTierSize = (tier) => {
    switch (tier) {
      case "Platinum": return "max-w-md";
      case "Gold": return "max-w-[320px]";
      case "Silver": return "max-w-[220px]";
      default: return "max-w-[140px]";
    }
  };

  const getTierBackdrop = (tier) => {
    switch (tier) {
      case "Platinum": return "bg-gradient-to-br from-slate-100 to-blue-100 dark:from-slate-800 dark:to-blue-900";
      case "Gold": return "bg-gradient-to-br from-yellow-100 to-yellow-200 dark:from-yellow-400 dark:to-yellow-600";
      case "Silver": return "bg-gradient-to-br from-gray-100 to-slate-200 dark:from-gray-700 dark:to-slate-600";
      default: return "bg-gradient-to-br from-orange-50 to-amber-100 dark:from-orange-900 dark:to-amber-800";
    }
  };

  const getTierHeight = (tier) => {
    switch (tier) {
      case "Platinum": return "h-[180px]";
      case "Gold": return "h-[110px]";
      case "Silver": return "h-[80px]";
      default: return "h-[60px]";
    }
  };

  return (
    <div className="container mx-auto max-w-[80vw] flex flex-col gap-8 py-8 md:py-10">
      <div className="text-center">
        <h1 className={title()}>Our Sponsors</h1>
        <p className="mt-4 text-lg text-default-500">
          Thank you to our partners who make this possible.
        </p>
      </div>

      {/* Sponsorship Package Section */}
      <div className="flex flex-col gap-12 mt-8 relative overflow-hidden">
        {/* Racing decorative lines */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-[#EE3124]/5 -rotate-45 translate-x-32 -translate-y-32 pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#EE3124]/5 -rotate-45 -translate-x-32 translate-y-32 pointer-events-none"></div>

        <div className="text-center flex flex-col gap-4 relative z-10">
          <h2 className="text-3xl font-bold italic tracking-tight">
            SUPPORT THE <span className="text-[#EE3124]">FUTURE</span> OF ENGINEERING
          </h2>
          <p className="text-default-600 max-w-2xl mx-auto">
            Empower student innovation and join a legacy of excellence. Your partnership directly fuels our 
            vehicle development, advanced manufacturing, and international competition success.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative z-10">
          {sponsorshipTiers.map((tier) => (
            <Card key={tier.name} className="flex flex-col border-none bg-default-50/50 dark:bg-default-100/50 backdrop-blur-sm shadow-sm group hover:scale-[1.02] transition-transform duration-300">
              {/* Slanted accent corner */}
              <div className="absolute top-0 right-0 w-8 h-8 bg-[#EE3124] clip-path-slant pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity"></div>
              
              <CardBody className="p-6 flex flex-col gap-4 h-full">
                <div className="flex flex-col gap-1">
                  <Chip 
                    color={getTierColor(tier.name)}
                    classNames={{
                      base: "border-none text-white font-bold px-3 py-1 uppercase text-[10px]",
                    }}
                    variant="solid" 
                    size="sm" 
                    className="w-fit"
                  >
                    {tier.name}
                  </Chip>
                  <div className="flex items-baseline gap-1 mt-2">
                    <span className="text-3xl font-black italic">{tier.price}</span>
                  </div>
                </div>
                
                <p className="text-small text-default-500 min-h-[40px] font-medium">
                  {tier.description}
                </p>

                <div className="flex-1 mt-4">
                  <ul className="flex flex-col gap-3">
                    {tier.benefits.map((benefit, i) => (
                      <li key={i} className="flex items-start gap-2 text-tiny text-default-700 dark:text-default-300">
                        <span className="mt-0.5 text-[#EE3124]">
                          <svg width="14" height="14" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M10 3L4.5 8.5L2 6" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                        </span>
                        <span className="font-medium">{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </CardBody>
            </Card>
          ))}
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center py-6 relative z-10">
          <Button 
            as={Link}
            style={{ backgroundColor: '#EE3124' }}
            size="lg" 
            className="w-full sm:w-auto font-black italic tracking-widest text-white uppercase px-12 group"
            href={"https://new.express.adobe.com/id/urn:aaid:sc:VA6C2:1629f2c6-2603-5879-a556-42d02b16e3d5?accept=true%3Fpreload%3Dsharesheet"}
            target="_blank"
            rel="noopener noreferrer"
          >
            Become a Sponsor
            <span className="ml-2 group-hover:translate-x-1 transition-transform">→</span>
          </Button>
        </div>
      </div>

      <div className="h-px bg-gradient-to-r from-transparent via-default-200 to-transparent mt-12 mb-8"></div>

      <div className="text-center">
        <h2 className="text-3xl font-black italic text-default-800 dark:text-default-200">OUR CURRENT PARTNERS</h2>
      </div>
      <div className="flex flex-col gap-12 mt-8">
        {tiers.map((tier) => {
          const tierSponsors = sponsors.filter(s => s.tier === tier);
          if (tierSponsors.length === 0) return null;

          return (
            <div key={tier} className="flex flex-col gap-6">
              <div className="flex items-center gap-4">
                <h2 className="text-2xl font-bold">{tier} Sponsors</h2>
                <Chip color={getTierColor(tier)} variant="flat">{tierSponsors.length}</Chip>
                <div className="h-px bg-default-200 flex-1"></div>
              </div>

              <div className="flex flex-wrap justify-center gap-6">
                {tierSponsors.map((sponsor, index) => (
                  <Card
                    shadow="sm"
                    key={index}
                    isPressable
                    onPress={() => window.open(sponsor.website, '_blank')}
                    className={`${getTierSize(tier)} ${getTierBackdrop(tier)}`}
                  >
                    <div className="pt-2 px-4 flex-col items-start pb-0">
                      <b className="text-small">{sponsor.name}</b>
                    </div>
                    <CardBody className="overflow-visible p-6 items-center justify-center">
                      <Image
                        radius="lg"
                        alt={sponsor.name}
                        className={`${getTierHeight(tier)} w-auto object-contain`}
                        src={sponsor.logoUrl}
                      />
                    </CardBody>
                  </Card>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
