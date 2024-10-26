import { readFile } from "fs/promises";
import { Metadata } from "next";

import { CopyToClipboardButton } from "@/components/copy-to-clipboard";
import BeautifyMarkdown from "@/components/markdown";
import { getBaseUrl, getCanonicalUrl } from "@/utils/urls";

export const revalidate = false;

export const generateMetadata = async (): Promise<Metadata> => {

    const title = "Terms of Service";
    const description = "Read about Wamellow's Terms of Service.";
    const url = getCanonicalUrl("terms");

    return {
        title,
        description,
        alternates: {
            canonical: url
        },
        openGraph: {
            title,
            description,
            type: "website",
            url,
            images: `${getBaseUrl()}/waya-v3.webp`
        },
        twitter: {
            card: "summary",
            site: "wamellow.com",
            title,
            description,
            images: `${getBaseUrl()}/waya-v3.webp`
        }
    };
};

const PATH = `${process.cwd()}/public/legal/terms.md` as const;

export default async function Home() {
    const terms = await readFile(PATH, { encoding: "utf-8" });

    return (
        <div>

            <div className="flex gap-2 mb-5 text-sm">
                <CopyToClipboardButton text={getCanonicalUrl("terms")} />
            </div>

            <BeautifyMarkdown markdown={terms} />

        </div>
    );
}