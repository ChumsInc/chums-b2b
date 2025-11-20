import React from 'react';
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import Avatar from "@mui/material/Avatar";
import {selectLoggedIn, selectProfilePicture, selectUserProfile} from "@/ducks/user/userProfileSlice";
import Box, {type BoxProps} from "@mui/material/Box";
import {useAppSelector} from "@/app/hooks";


function stringToColor(string: string) {
    let hash = 0;
    let i;

    for (i = 0; i < string.length; i += 1) {
        hash = string.charCodeAt(i) + ((hash << 5) - hash);
    }

    let color = '#';

    for (i = 0; i < 3; i += 1) {
        const value = (hash >> (i * 8)) & 0xff;
        color += `00${value.toString(16)}`.slice(-2);
    }

    return color;
}

function stringAvatar(name: string) {
    const initials = name.split(' ')
        .filter(name => name.length > 1)
        .filter((name, index) => index < 2)
        .map(name => name[0]).join('')
    return {
        sx: {
            bgColor: stringToColor(name),
        },
        children: `${initials}`,
    };
}

const UserAvatar = (props: BoxProps) => {
    const isLoggedIn = useAppSelector(selectLoggedIn);
    const profile = useAppSelector(selectUserProfile);
    const profilePic = useAppSelector(selectProfilePicture);

    return (
        <Box {...props}>
            {(!isLoggedIn || !profile) && (
                <Avatar aria-label="Please log in">
                    <AccountCircleIcon aria-hidden="true"/>
                </Avatar>
            )}
            {isLoggedIn && profile && profilePic && (
                <Avatar alt={profile.name} src={profilePic} slotProps={{img: {referrerPolicy: 'no-referrer'}}}/>
            )}
            {isLoggedIn && profile && !profilePic && (
                <Avatar {...stringAvatar(profile.name)} />
            )}
        </Box>
    )
}

export default UserAvatar;
