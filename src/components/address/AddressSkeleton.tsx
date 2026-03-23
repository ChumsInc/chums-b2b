import Skeleton from "@mui/material/Skeleton";

export default function AddressSkeleton() {
    return (
        <div>
            <Skeleton variant="rectangular" width="100%" height="2rem" />
            <Skeleton variant="rectangular" width="100%" height="2rem" />
            <Skeleton variant="rectangular" width="100%" height="2rem" />
            <Skeleton variant="rectangular" width="100%" height="2rem" />
        </div>
    )
}
