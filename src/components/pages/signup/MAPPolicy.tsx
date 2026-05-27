import {useEffect} from 'react';
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import CardContent from "@mui/material/CardContent";
import HTMLContent from "@/components/common/HTMLContent.tsx";
import {useContentPage} from "@/components/pages/useContentPage.ts";
import LinearProgress from "@mui/material/LinearProgress";
import Skeleton from "@mui/material/Skeleton";
import Alert from "@mui/material/Alert";

const MAPPolicy = () => {
    const {page, status, error, loadPage} = useContentPage();

    useEffect(() => {
        loadPage('map-policy', false)
            .catch(err => {
                // eslint-disable-next-line no-console
                console.error(err)
            });
    }, []);

    return (
        <Card variant="outlined">
            <CardContent>
                <Typography gutterBottom variant="h3" component="h3">{page?.title}</Typography>
                {status === 'loading' && <LinearProgress variant="indeterminate"/>}
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

export default MAPPolicy;
