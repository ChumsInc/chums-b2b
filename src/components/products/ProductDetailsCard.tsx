import CardContent from "@mui/material/CardContent";
import Box from "@mui/material/Box";
import HTMLContent from "@/components/common/HTMLContent.tsx";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import Stack from "@mui/material/Stack";

export interface ProductDetailsCardProps {
    description: string | null;
    details: string | null;
}

export default function ProductDetailsCard({description, details}: ProductDetailsCardProps) {
    if (!description && !details) {
        return null;
    }
    return (
        <Card sx={{mt: 5}} variant="outlined">
            <CardContent>
                <Stack direction="column" spacing={3}>
                    <ProductDescription description={description}/>
                    <ProductDetails details={details}/>
                </Stack>
            </CardContent>
        </Card>
    )
}

function ProductDescription({description}: { description: string | null }) {
    if (!description) {
        return null;
    }
    return (
        <Box>
            <Typography component="h2" variant="h3" sx={{mb: 0.5}}>Product Details</Typography>
            <HTMLContent html={description}/>
        </Box>
    )
}

function ProductDetails({details}: { details: string | null }) {
    if (!details) {
        return null;
    }
    return (
        <Box>
            <Typography component="h2" variant="h3" sx={{mb: 0.5}}>Features</Typography>
            <HTMLContent html={details}/>
        </Box>
    )
}
