import {type ReactNode, useCallback, useEffect, useMemo, useState} from "react";
import ContentPageContext, {type ContentPageContextData} from "@/components/pages/ContentPageContext.tsx";
import {generatePath, useNavigate, useParams} from "react-router";
import {fetchPage} from "@/api/page.ts";
import {useTitle} from "@/components/app/TitleContext.tsx";
import {useAppSelector} from "@/app/hooks.ts";
import {selectPageContent, selectPageKeyword} from "@/ducks/page";

export interface ContentPageProviderProps {
    children: ReactNode;
}

export default function ContentPageProvider({children}: ContentPageProviderProps) {
    const params = useParams<{ keyword: string }>();
    const ssrKeyword = useAppSelector(selectPageKeyword);
    const ssrContent = useAppSelector(selectPageContent);
    const navigate = useNavigate();
    const [status, setStatus] = useState<ContentPageContextData['status']>('idle');
    const [error, setError] = useState<ContentPageContextData['error']>(null);
    const [page, setPage] = useState<ContentPageContextData['page']>(ssrKeyword === params.keyword ? ssrContent : null);
    const {setPageTitle} = useTitle();
    const loadPage = useCallback(async (keyword: string, updateTitle: boolean = true) => {
        try {
            setStatus('loading');
            if (updateTitle) {
                setPageTitle({
                    title: `Loading: ${keyword}`
                })
            }
            const _page = await fetchPage(keyword);
            if (!_page?.status && _page?.redirectTo) {
                navigate(generatePath('/pages/:keyword', {keyword: _page.redirectTo}), {replace: true});
                return;
            }
            setPage(_page);
            if (updateTitle) {
                setPageTitle({
                    title: _page?.title ?? keyword,
                })
            }
            setStatus('idle');
        } catch (err: unknown) {
            if (err instanceof Error) {
                setError(err.message)
            } else {
                setError('Unknown error loading page content');
            }
            setStatus('rejected');
        }
    }, [])

    useEffect(() => {
        if (params.keyword) {
            loadPage(params.keyword)
                .then(() => {
                    // do nothing
                });
        }
    }, [params.keyword]);

    const value = useMemo<ContentPageContextData>(() => ({
        page,
        status,
        error,
        loadPage,
    }), [page, status, error, loadPage]);

    return (
        <ContentPageContext value={value}>
            {children}
        </ContentPageContext>
    )
}
