import { title } from "@/components/primitives";
import { aboutContent } from "@/config/data";
import { Card, CardBody, CardHeader } from "@heroui/card";
import { Divider } from "@heroui/divider";

export default function AboutPage() {
  return (
    <div className="container mx-auto max-w-[80vw] flex flex-col gap-8 py-8 md:py-10">
      <div className="text-center">
        <h1 className={title()}>About Us</h1>
        <p className="mt-4 text-lg text-default-500">
          Driving innovation off-road.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card className="p-4">
          <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
            <h2 className="text-xl font-bold uppercase text-primary">Mission</h2>
          </CardHeader>
          <CardBody className="overflow-visible py-2">
            <p className="text-default-500">{aboutContent.mission}</p>
          </CardBody>
        </Card>

        <Card className="p-4">
          <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
            <h2 className="text-xl font-bold uppercase text-secondary">Vision</h2>
          </CardHeader>
          <CardBody className="overflow-visible py-2">
            <p className="text-default-500">{aboutContent.vision}</p>
          </CardBody>
        </Card>
      </div>

      <Divider className="my-4" />

      <div className="flex flex-col gap-4">
        <h2 className={title({ size: "sm" })}>Our History</h2>
        <p className="text-lg text-default-500 leading-relaxed">
          {aboutContent.history}
        </p>
      </div>
    </div>
  );
}
