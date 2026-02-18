import { title } from "@/components/primitives";
import { teamMembers } from "@/config/data";
import { Card, CardHeader, CardBody } from "@heroui/card";
import { Avatar } from "@heroui/avatar";

export default function TeamPage() {
  return (
    <div className="container mx-auto max-w-[80vw] flex flex-col gap-8 py-8 md:py-10">
      <div className="text-center">
        <h1 className={title()}>Meet the Team</h1>
        <p className="mt-4 text-lg text-default-500">
          The minds behind the machine.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {teamMembers.map((member, index) => (
          <Card key={index} className="py-6">
            <CardHeader className="pb-0 pt-2 px-4 flex-col items-center">
              <Avatar
                isBordered
                color="primary"
                src={member.imageUrl}
                className="w-44 h-44 text-large mb-4"
              />
              <p className="text-small uppercase font-bold text-default-500 mt-2">{member.role}</p>
              <h4 className="font-bold text-2xl">{member.name}</h4>
            </CardHeader>
            <CardBody className="overflow-visible py-2 text-center">
              <p className="text-default-500 px-6 text-lg">
                {member.bio}
              </p>
            </CardBody>
          </Card>
        ))}
      </div>
    </div>
  );
}
