import React, {useEffect} from "react";
import {useAppDispatch, useAppSelector} from "@/app/configureStore";
import {loadPage} from "@/ducks/page/actions";
import {selectPageContent} from "@/ducks/page/selectors";
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import CardContent from "@mui/material/CardContent";

const MAPPolicy = () => {
    const dispatch = useAppDispatch();
    const content = useAppSelector(selectPageContent);

    useEffect(() => {
        dispatch(loadPage('map-policy'));
    }, []);

    if (!content || content.keyword !== 'map-policy') {
        return null
    }

    return (
        <Card variant="outlined">
            <CardContent>
                <Typography gutterBottom variant="h3" component="h3">{content.title}</Typography>
                <Typography variant="body1" sx={{fontSize: 'small'}}
                            dangerouslySetInnerHTML={{__html: content?.content ?? ''}}/>
            </CardContent>
        </Card>
    )
};

export default MAPPolicy;
