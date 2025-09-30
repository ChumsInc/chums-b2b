import React, {useEffect, useId} from 'react';
import ListItem, {ListItemProps} from "@mui/material/ListItem";
import {CookieConsentSection, CookieConsentSectionInfo} from "b2b-types";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemButton from "@mui/material/ListItemButton";
import CheckBox from "@mui/material/Checkbox";
import ListItemText from "@mui/material/ListItemText";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import IconButton from "@mui/material/IconButton";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import Collapse from "@mui/material/Collapse";
import {useAppSelector} from "@/app/configureStore";
import {selectCookieConsentDetails} from "@/ducks/cookie-consent";


export interface CookieConsentItemProps extends Omit<ListItemProps, 'onChange'> {
    consentSection: CookieConsentSection;
    checked: boolean;
    onChange: (checked: boolean) => void;
}

export default function CookieConsentItem({consentSection, checked, onChange, ...rest}: CookieConsentItemProps) {
    const detail = useAppSelector(selectCookieConsentDetails);
    const [section, setSection] = React.useState<CookieConsentSectionInfo|null>(detail?.[consentSection] ?? null);
    const [expanded, setExpanded] = React.useState(false);
    const labelId = useId();
    const checkboxId = useId();

    useEffect(() => {
        setSection(detail?.[consentSection] ?? null);
    }, [detail, consentSection]);

    if (!section) {
        return null;
    }

    return (
        <ListItem alignItems="flex-start" {...rest} disablePadding>
            <ListItemButton role="checkbox" onClick={() => onChange(!checked)} disabled={section.required}>
                <ListItemIcon>
                    <CheckBox edge="start" checked={checked} tabIndex={-1} disableRipple role="presentation"
                              disabled={section.required}
                              onChange={() => onChange(!checked)}
                              id={checkboxId}
                              slotProps={{input: {'aria-labelledby': labelId}}}/>
                </ListItemIcon>
            </ListItemButton>
            <ListItemText id={labelId}
                          slots={{primary: 'div', secondary: 'div'}}
                          primary={(
                              <Stack direction="row" spacing={1} justifyContent="space-between" alignItems="center">
                                  <Typography component="label" htmlFor={checkboxId} variant="body1">{section.title}</Typography>
                                  <IconButton onClick={() => setExpanded(!expanded)} aria-expanded={expanded} aria-label="show more">
                                      {expanded && <ExpandLess />}
                                      {!expanded && <ExpandMore />}
                                  </IconButton>
                              </Stack>
                          )}
                          secondary={(
                              <div>
                                  <Typography component="div" variant="body2" color="text.primary" sx={{mb: 1}}>
                                      {section.description}
                                  </Typography>
                                  <Collapse in={expanded}>
                                      {section.cookies?.map((cookie, index) => (
                                          <Typography component="div" key={index} variant="caption" color="text.secondary" sx={{mb: 1}}>
                                              {cookie}
                                          </Typography>
                                      ))}
                                  </Collapse>
                              </div>
                          )}/>
        </ListItem>
    )
}
