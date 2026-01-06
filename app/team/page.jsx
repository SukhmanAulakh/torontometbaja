import { title } from "@/components/primitives";
import { teamMembers } from "@/config/demo-data";
import { Card, CardHeader, CardBody } from "@heroui/card";
import { Avatar } from "@heroui/avatar";

export default function TeamPage() {
  return (
    <div className="flex flex-col gap-8 py-8 md:py-10">
      <div className="text-center">
        <h1 className={title()}>Meet the Team</h1>
        <p className="mt-4 text-lg text-default-500">
          The minds behind the machine.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {teamMembers.map((member, index) => (
          <Card key={index} className="py-4">
            <CardHeader className="pb-0 pt-2 px-4 flex-col items-center">
              <Avatar
                isBordered
                color="primary"
                src={member.imageUrl}
                className="w-24 h-24 text-large mb-2"
              />
              <p className="text-tiny uppercase font-bold">{member.role}</p>
              <h4 className="font-bold text-large">{member.name}</h4>
            </CardHeader>
            <CardBody className="overflow-visible py-2 text-center">
              <p className="text-default-500 px-4">
                {member.bio}
              </p>
            </CardBody>
          </Card>
        ))}
      </div>
    </div>
  );
}
