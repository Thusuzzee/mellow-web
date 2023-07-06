import React, { FunctionComponent } from "react";

import Highlight from "./Markdown";

interface Props {
    children: React.ReactNode;
    mode: "DARK" | "LIGHT";

    title?: string;
    color: number;
    thumbnail?: string;
    image?: string;
    footer?: {
        icon_url?: string;
        text: string;
    }
}

const DiscordMessageEmbed: FunctionComponent<Props> = ({ children, title, color, thumbnail, image, footer, mode }) => {
    if (!title && !image && !footer?.text && !children) return <></>;

    return (
        <div className={`w-full ${mode === "DARK" ? "text-neutral-200" : "text-neutral-800"} font-light p-3 rounded border-l-4 mt-2`} style={{ backgroundColor: mode === "DARK" ? "rgb(43, 45, 49)" : "rgb(242, 243, 245)", borderLeftColor: `#${color?.toString(16)}` }}>

            <div className="flex w-full max-w-full">
                <div className={thumbnail ? "w-9/12" : "w-full"}>
                    {title &&
                        <div className={`${mode === "DARK" ? "text-neutral-100" : "text-neutral-900"} font-semibold text-lg mb-2`}>
                            <Highlight mode={mode} text={title} discord={false} />
                        </div>
                    }
                    {children}
                </div>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                {thumbnail && <img src={thumbnail} alt="" className="ml-auto h-20 w-20 rounded-md" />}
            </div>

            {/* eslint-disable-next-line @next/next/no-img-element */}
            {image && <img src={image} alt="" className="ml-auto rounded-md h-full w-full mt-4" />}

            {footer?.text &&
                <div className="flex gap-1 items-center mt-3">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    {footer.icon_url && <img src={footer.icon_url} alt="" className="rounded-full h-5 w-5" />}
                    <span className="text-xs">
                        <Highlight mode={mode} text={footer.text} discord={false} />
                    </span>
                </div>
            }

        </div>
    );
};

export default DiscordMessageEmbed;