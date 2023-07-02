"use client";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { HiArrowNarrowLeft } from "react-icons/hi";

import { widthStore } from "@/common/width";
import { ErrorBanner } from "@/components/Error";
import { ListTab } from "@/components/List";
import { ApiV1GuildsGetResponse, RouteErrorResponse } from "@/typings";

export default function Home() {
    const width = widthStore((w) => w);

    const [error, setError] = useState<string>();
    const [guild, setGuild] = useState<Partial<ApiV1GuildsGetResponse> | undefined>({});
    const [tab, setTab] = useState<string>("overview");

    const params = useParams();

    useEffect(() => {
        fetch(`${process.env.NEXT_PUBLIC_API}/guilds/${params.guildId}`, {
            headers: {
                authorization: localStorage.getItem("token") as string
            }
        })
            .then(async (res) => {
                const response = await res.json() as ApiV1GuildsGetResponse;
                if (!response) return;

                switch (res.status) {
                    case 200: {
                        setGuild(response);
                        break;
                    }
                    default: {
                        setGuild(undefined);
                        setError((response as unknown as RouteErrorResponse).message);
                        break;
                    }
                }

            })
            .catch(() => {
                setError("Error while fetching guilds");
            });
    }, []);

    if (!guild && error) return (
        <div className="flex flex-col w-full">
            <ErrorBanner message={error} />
        </div>
    );

    if (guild === undefined) return <></>;

    return (
        <div className="flex flex-col w-full">

            {error && <ErrorBanner message={error} />}
            <div className="flex mb-4">
                <Link href="/dashboard" className="flex bg-wamellow hover:bg-wamellow-light hover:text-white py-2 px-3 rounded-md duration-200 drop-shadow-lg text-sm">
                    <HiArrowNarrowLeft className="relative top-1" />
                    <span className="ml-2">Serverlist</span>
                </Link>
            </div>

            <span className="text-lg flex items-center">
                <Image src={guild?.icon ? `https://cdn.discordapp.com/icons/${guild.id}/${guild.icon}.webp?size=64` : "https://cdn.waya.one/r/discord.png"} width={52} height={52} alt="Server" className="rounded-full h-14 w-14 mr-3" />
                <div>
                    <div className="text-xl text-slate-200 font-medium">{guild?.name}</div>
                    <div className="text-sm">Lorem ipsum</div>
                </div>
            </span>

            <ListTab
                tabs={[
                    {
                        name: "Overview",
                        value: "overview"
                    },
                    {
                        name: "Levels",
                        value: "levels"
                    }
                ]}
                stateHook={setTab}
                state={tab}
            />

        </div>
    );
}