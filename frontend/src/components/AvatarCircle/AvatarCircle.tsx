import {FC} from "react";

type AvatarCircleProps = {
    avatar: string,
    className?: string,
}


export const AvatarCircle: FC<AvatarCircleProps> = ({avatar, className}) => {

    return (
        <svg className={className} width="30" height="30" viewBox="0 0 200 200"
             xmlns="http://www.w3.org/2000/svg">

            <defs>
                <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#ff0000"/>
                    <stop offset="50%" stopColor="#ff00ff"/>
                    <stop offset="100%" stopColor="#ffff00"/>
                </linearGradient>
                <clipPath id="circleClip">
                    <circle cx="100" cy="100" r="80"/>
                </clipPath>
            </defs>


            <circle cx="100" cy="100" r="90" stroke="url(#gradient)" strokeWidth="10" fill="none"/>


            <circle cx="100" cy="100" r="80" fill="#ffffff"/>

            <image href={avatar}

                   x="0" y="0"
                   width="90%" height="90%"
                   clipPath="url(#circleClip)"
            />
        </svg>
    );
};