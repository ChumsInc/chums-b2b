import {createContext, useContext} from "react";

export interface MetaImage {
    url: string;
    alt: string;
}
export interface TitleProps {
    title: string;
    description?: string;
    image?: MetaImage;
    url?: string;
}

export interface TitleContextProps {
    title: string;
    setPageTitle: (arg: TitleProps) => void;
}

export const TitleContext = createContext<TitleContextProps>({
    title: 'Home',
    setPageTitle: () => {},
});

export const useTitle = () => useContext(TitleContext);
