"use client";

import { title } from "@/components/primitives";
import { sponsors } from "@/config/demo-data";
import { Card, CardBody, CardFooter } from "@heroui/card";
import { Image } from "@heroui/image";
import { Chip } from "@heroui/chip";

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

  return (
    <div className="flex flex-col gap-8 py-8 md:py-10">
      <div className="text-center">
        <h1 className={title()}>Our Sponsors</h1>
        <p className="mt-4 text-lg text-default-500">
          Thank you to our partners who make this possible.
        </p>
      </div>

      <div className="flex flex-col gap-12">
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

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {tierSponsors.map((sponsor, index) => (
                  <Card shadow="sm" key={index} isPressable onPress={() => console.log("item pressed")}>
                    <CardBody className="overflow-visible p-0 items-center justify-center">
                      <Image
                        shadow="sm"
                        radius="lg"
                        width="100%"
                        alt={sponsor.name}
                        className="w-full object-cover h-[200px]"
                        src={sponsor.logoUrl}
                      />
                    </CardBody>
                    <CardFooter className="text-small justify-between">
                      <b>{sponsor.name}</b>
                      {/* <p className="text-default-500">{sponsor.tier}</p> */}
                    </CardFooter>
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
