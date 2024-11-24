import "./globals.css";

import { Divider } from "@nextui-org/react";
import type { Metadata, Viewport } from "next";
import { Montserrat, Outfit } from "next/font/google";
import { cookies } from "next/headers";
import Image from "next/image";
import Link from "next/link";
import Script from "next/script";
import { CookiesProvider } from "next-client-cookies/server";
import { HiBookOpen } from "react-icons/hi";
import { SiKofi } from "react-icons/si";

import Header from "@/components/header";
import LoginButton from "@/components/login-button";
import Notice, { NoticeType } from "@/components/notice";
import { cn } from "@/utils/cn";
import { getBaseUrl } from "@/utils/urls";

import { Provider } from "./provider";

const outfit = Outfit({ subsets: ["latin"] });
const montserrat = Montserrat({ subsets: ["latin"] });

export const viewport: Viewport = {
    themeColor: "#8957ff",
    initialScale: 0.85
};

export const generateMetadata = (): Metadata => {

    const title = "Wamellow: Next-gen of Discord Bots & Apps";
    const description = "Engage with leaderboards, starboards, and welcoming atmosphere. Dive into anime discussions, enjoy free /image AI and unleash the power of Text-To-Speech.";

    return {
        metadataBase: new URL(getBaseUrl()),

        manifest: "/manifest.json",
        appleWebApp: {
            capable: true,
            title: "Wamellow",
            startupImage: "/waya-v3.webp",
            statusBarStyle: "black-translucent"
        },

        title: {
            default: title,
            template: "%s"
        },

        description,
        keywords: [
            "discord",
            "bot",
            "app",
            "intefration",
            "discord bot",
            "discord app",
            "discord application",
            "app list",
            "waya",
            "waya bot",
            "waya.one",
            "mwya",
            "mellow",
            "wamellow",
            "mwlica",
            "lunish",
            "Luna-devv",
            "mee6 alternative",
            "arcane alternative",
            "dyno alternative",
            "starboard",
            "ranks",
            "leaderboard",
            "lb",
            "leaderboards",
            "text to speech",
            "captcha",
            "passport",
            "verification",
            "verify",
            "captcha.bot",
            "security",
            "tts",
            "text to speech",
            "free",
            "customizable",
            "next-gen",
            "next generation",
            "ai",
            "ai images",
            "nsfw detection",
            "moderation",
            "anime",
            "nekos",
            "waifus",
            "chat to speech",
            "accessibility",
            "aphonia",
            "dysphonia",
            "mute",
            "liapew",
            "wumpus",
            "wumpus store",
            "wumpus bots",
            "youtube notifications",
            "youtube notifis",
            "youtube to discord",
            "twitch notifications",
            "twitch notifis",
            "twitch to discord"
        ],

        alternates: {
            canonical: getBaseUrl()
        },

        openGraph: {
            title: {
                default: title,
                template: "%s on Wamellow"
            },
            description,
            type: "website",
            url: getBaseUrl(),
            images: `${getBaseUrl()}/waya-v3.webp?v=3`
        },

        twitter: {
            card: "summary",
            site: "wamellow.com",
            title,
            description,
            images: `${getBaseUrl()}/waya-v3.webp?v=3`
        },

        creator: "Luna (lunish.nl)",
        publisher: "Luna (lunish.nl)",

        robots: "index, follow"
    };
};

export default function RootLayout({
    children
}: {
    children: React.ReactNode;
}) {

    return (
        <CookiesProvider>
            <html
                suppressHydrationWarning
                data-theme="dark"
                lang="en"
                className="dark flex justify-center min-h-screen max-w-screen overflow-x-hidden"
            >
                <Script defer data-domain="wamellow.com" src="https://analytics.wamellow.com/js/script.js" />

                <body
                    className={cn("w-full max-w-7xl overflow-x-hidden xl:!overflow-visible", outfit.className)}
                    style={{ overflow: "visible" }}
                >
                    <div id="bg" className="absolute top-0 right-0 w-screen h-screen -z-10" />


                    <NoScript />
                    <NavBar />

                    <Provider>
                        {children}
                    </Provider>

                </body>
            </html>
        </CookiesProvider>
    );
}

function NoScript() {
    return (
        <noscript className="p-4 pb-0 flex">
            <Notice
                className="mb-0"
                message="This site needs JavaScript to work - Please either enable JavaScript or update to a supported Browser."
                type={NoticeType.Info}
            />
        </noscript>
    );
}

async function NavBar() {
    const jar = await cookies();

    return (
        <nav className="p-4 flex items-center gap-2 text-base font-medium dark:text-neutral-300 text-neutral-700 select-none h-20">
            <Link
                aria-label="Go to Wamellow's homepage"
                className={cn("font-semibold flex items-center mr-2", montserrat.className)}
                href="/?utm_source=wamellow.com&utm_medium=header"
            >
                <Image src="/waya-v3.webp" width={64} height={64} alt="" className="rounded-full mr-2 w-8 h-8 shrink-0" />
                <span className="text-xl dark:text-neutral-100 text-neutral-900 hidden sm:block">Wamellow</span>
            </Link>

            <Divider
                className="h-10 rotate-6 mx-1"
                orientation="vertical"
            />

            <div className="flex">
                <Link
                    href="https://ko-fi.com/mwlica"
                    className="dark:hover:bg-wamellow-alpha hover:bg-wamellow-100-alpha py-1 px-3 rounded-md duration-200 hidden sm:flex items-center gap-2 group"
                >
                    <SiKofi className="group-hover:text-[#ff6c6b] duration-200 mt-0.5" />
                    Donate
                </Link>
                <Link
                    href="/docs/index?utm_source=wamellow.com&utm_medium=header"
                    className="dark:hover:bg-wamellow-alpha hover:bg-wamellow-100-alpha py-1 px-3 rounded-md duration-200 flex items-center gap-2 group"
                >
                    <HiBookOpen className="group-hover:text-neutral-300 duration-200 h-5 w-5 mt-0.5" />
                    Docs
                </Link>
            </div>

            {jar.get("session")?.value
                ? <Header className="ml-auto" />
                : <LoginButton />
            }
        </nav>
    );
}