"use client";

import { title } from "@/components/primitives";
import { sponsors } from "@/config/data";
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

  return (
    <div className="container mx-auto max-w-[80vw] flex flex-col gap-8 py-8 md:py-10">
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
                        width="100%"
                        alt={sponsor.name}
                        className="w-full h-auto object-contain"
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
