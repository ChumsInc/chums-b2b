import {useEffect, useRef, useState} from "react";
import LinearProgress from "@mui/material/LinearProgress";
import Skeleton from "@mui/material/Skeleton";

export default function ContentPageSkeleton() {
    const [show, setShow] = useState(false);
    const timer = useRef<number>(0);
    useEffect(() => {
        timer.current = window.setTimeout(() => setShow(true), 250);
        return () => {
            window.clearTimeout(timer.current);
        }
    }, []);
    if (!show) {
        return null;
    }

    return (
        <div>
            <LinearProgress variant="indeterminate"/>
            <Skeleton variant="text" width="100%"/>
            <Skeleton variant="text" width="100%"/>
            <Skeleton variant="text" width="100%"/>
        </div>
    )
}
