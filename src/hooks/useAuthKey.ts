import {useParams, useSearchParams} from "react-router";
import {useEffect, useState} from "react";

export interface AuthKey {
    key: string | null;
    hash: string | null;
}
export default function useAuthKey():AuthKey {
    const params = useParams<{ hash: string; key: string }>();
    const [searchParams] = useSearchParams();
    const [auth, setAuth] = useState<AuthKey>({
        key: params.key ?? searchParams.get('key') ?? null,
        hash: params.hash ?? searchParams.get('hash') ?? searchParams.get('h') ?? null
    });

    useEffect(() => {
        setAuth({
            key: params.key ?? searchParams.get('key') ?? null,
            hash: params.hash ?? searchParams.get('hash') ?? searchParams.get('h') ?? null,
        })
    }, [params, searchParams]);

    return auth;
}
