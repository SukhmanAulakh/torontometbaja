"use client";

import { title, subtitle } from "@/components/primitives";
import { subteams } from "@/config/data";
import { Button } from "@heroui/button";
import { Card, CardHeader, CardBody } from "@heroui/card";
import { Link } from "@heroui/link";
import { DiscordIcon } from "@/components/icons";

export default function JoinPage() {
    return (
        <div className="flex flex-col gap-12 py-8 md:py-10">

            {/* Hero Section */}
            <div className="text-center flex flex-col items-center gap-6">
                <h1 className={title({ size: "lg" })}>Join the Team</h1>
                <p className={subtitle({ class: "max-w-2xl" })}>
                    Whether you're an engineer, designer, or business student, there's a place for you at Toronto Met Baja Racing.
                </p>

                <div className="flex gap-4 items-center">
                    <Button
                        as={Link}
                        color="primary"
                        href="https://discord.com/invite/UVMvRb9VdV"
                        variant="shadow"
                        size="lg"
                        isExternal
                        startContent={<DiscordIcon size={24} />}
                    >
                        Join our Discord
                    </Button>
                </div>
                <p className="text-default-500 text-small">
                    The best way to get involved is to join our Discord server and attend our general meetings.
                </p>
            </div>

            {/* Subteams Grid */}
            <div className="flex flex-col gap-6">
                <h2 className={title({ size: "sm" })}>Our Subteams</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {subteams.map((team, index) => (
                        <Card key={index} className="py-4">
                            <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
                                <h4 className="font-bold text-2xl text-primary">{team.name}</h4>
                                <small className="text-default-500 mt-2 text-left">{team.description}</small>
                            </CardHeader>
                            <CardBody className="overflow-visible py-2">
                                <div className="mt-4">
                                    <p className="text-sm font-semibold mb-2">What you will learn:</p>
                                    <ul className="list-disc pl-5 text-sm text-default-600 space-y-1">
                                        {team.learn.map((item, i) => (
                                            <li key={i}>{item}</li>
                                        ))}
                                    </ul>
                                </div>
                            </CardBody>
                        </Card>
                    ))}
                </div>
            </div>

        </div>
    );
}
