import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import {useContentPage} from "@/components/pages/useContentPage.ts";
import {useEffect} from "react";
import Skeleton from "@mui/material/Skeleton";
import Alert from "@mui/material/Alert";
import HTMLContent from "@/components/common/HTMLContent.tsx";

const UsagePolicy = () => {
    const {page, status, error, loadPage} = useContentPage();

    useEffect(() => {
        loadPage('usage-policy', false)
            .catch(err => {
                // eslint-disable-next-line no-console
                console.error(err)
            });
    }, []);

    return (
        <Card variant="outlined">
            <CardContent>
                <Typography gutterBottom variant="h3" component="h3">Usage Policy</Typography>
                <Typography variant="body1" sx={{fontSize: 'small'}}>
                    {!page?.content || status === 'loading' && (
                        <div>
                            <Skeleton variant="text" />
                            <Skeleton variant="text" />
                            <Skeleton variant="text" />
                        </div>
                    )}
                    {error && (<Alert color="warning">Error loading MAP Policy</Alert>)}
                    <HTMLContent html={page?.content ?? ''}/>
                </Typography>
            </CardContent>
        </Card>
    )
};

export default UsagePolicy;
