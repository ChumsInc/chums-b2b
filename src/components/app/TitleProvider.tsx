import {type ReactNode, useState} from "react";
import {TitleContext, type TitleProps} from "@/components/app/TitleContext.tsx";

export default function TitleProvider({children}: { children: ReactNode }) {
    const [title, setTitle] = useState('Chums B2B');
    const [description, setDescription] = useState('');
    const [image, setImage] = useState<string | null>(null);
    const [imageAlt, setImageAlt] = useState<string | null>(null);
    const [url, setUrl] = useState<string | null>(null);

    const setPageTitle = (value: TitleProps) => {
        setTitle(value.title);
        setDescription(value.description ?? '');
        setImage(value.image?.url ?? null);
        setImageAlt(value.image?.alt ?? null);
        setUrl(value.url ?? null);
    }
    const contextValue = {title, setPageTitle};

    return (
        <TitleContext value={contextValue}>
            <title>{`${title} | CHUMS B2B`}</title>
            <meta name="description" content={description}/>
            <meta property="og:title" content={`${title} | CHUMS B2B`}/>
            {!!description && <meta property="og:description" content={description}/>}
            <meta property="og:image" content={image ?? '/images/logos/Chums-Logo-Badge-Red-RGB.png'}/>
            <meta property="og:image:alt" content={imageAlt ?? 'Chums Logo'}/>
            <meta property="og:url" content={`https://b2b.chums.com${url ?? ''}`}/>
            {children}
        </TitleContext>
    )
}

