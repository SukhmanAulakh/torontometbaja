"use client";

import { title, subtitle } from "@/components/primitives";
import { subteams } from "@/config/data";
import { Button } from "@heroui/button";
import { Card, CardHeader, CardBody } from "@heroui/card";
import { Divider } from "@heroui/divider";
import { Link } from "@heroui/link";
import { Image as HeroImage } from "@heroui/image";
import { DiscordIcon } from "@/components/icons";
import teamPhotoImg from "../../resources/team_photo_winter_2026.jpeg";

export default function JoinPage() {
    return (
        <div className="container mx-auto max-w-[80vw] flex flex-col gap-12 py-8 md:py-10">

            {/* Hero Section */}
            <div className="text-center flex flex-col items-center gap-6">
                <h1 className={title({ size: "lg", class: "!text-5xl md:!text-7xl" })}>Join the Team</h1>
                <p className={subtitle({ class: "max-w-2xl" })}>
                    No experience required — just passion. Whether you study engineering, business, or design, Toronto Met Baja Racing has a place for you to grow, build, and compete.
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
                <p className="text-default-500 text-small max-w-lg">
                    Discord is your starting point. Join the server, introduce yourself, and attend a general meeting to get plugged in to real projects from day one.
                </p>
            </div>

            {/* Subteams Grid */}
            <div className="flex flex-col gap-8">
                {/* Team Photo */}
                <div className="w-full overflow-hidden rounded-2xl shadow-lg">
                    <img
                        src={teamPhotoImg.src}
                        alt="TMU Baja Racing team photo — Winter 2026"
                        className="w-full h-[300px] md:h-[400px] object-cover"
                    />
                </div>
                <h2 className={title({ size: "sm" })}>Our Subteams</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {subteams.map((team, index) => (
                        <Card key={index} className="py-0 overflow-hidden">
                            {team.image && (
                                <div className="w-full h-[180px] overflow-hidden">
                                    <img
                                        src={team.image}
                                        alt={team.name}
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                            )}
                            <CardHeader className="pb-0 pt-4 px-4 flex-col items-start">
                                <h4 className="font-bold text-2xl text-primary">{team.name}</h4>
                                <small className="text-default-500 mt-2 text-left">{team.description}</small>
                            </CardHeader>
                            <CardBody className="overflow-visible py-2">
                                {team.responsibilities && (
                                    <div className="mt-4">
                                        <p className="text-sm font-semibold mb-2">Responsibilities:</p>
                                        <ul className="list-disc pl-5 text-sm text-default-600 space-y-1">
                                            {team.responsibilities.map((item, i) => (
                                                <li key={i}>{item}</li>
                                            ))}
                                        </ul>
                                    </div>
                                )}
                                <Divider className="my-3 opacity-40" />
                                <div>
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

