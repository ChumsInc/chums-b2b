import dayjs from "dayjs";

export interface DateStringProps {
    date?: dayjs.ConfigType;
    format?: string;
}

export default function DateString({date = new Date(), format = "MM/DD/YYYY"}: DateStringProps) {
    if (date === null) {
        return null;
    }
    return (<>{dayjs(date).format(format)}</>);
}
