import ContentPageProvider from "@/components/pages/ContentPageProvider.tsx";
import ContentPage from "@/components/pages/ContentPage.tsx";

export default function ContentPageContainer() {
    return (
        <ContentPageProvider>
            <ContentPage />
        </ContentPageProvider>
    )
}
