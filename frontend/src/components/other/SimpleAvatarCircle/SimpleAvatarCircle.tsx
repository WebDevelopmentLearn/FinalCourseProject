import {FC} from "react";


interface SimpleAvatarCircleProps {
    url: string;
    avatarSize?:  "small" | "medium" | "big" | string,
    className?: string,
}

export const SimpleAvatarCircle: FC<SimpleAvatarCircleProps> = ({url, className, avatarSize = "small"}: SimpleAvatarCircleProps) => {
    const getSize = (): string => {
        switch (avatarSize) {
            case "small":
                return "30"
            case "medium":
                return "90"
            case "big":
                return "150"
            default:
                return avatarSize;
        }
    }

    return (
        <svg className={className} width={getSize()} height={getSize()} viewBox="0 0 200 200"
             xmlns="http://www.w3.org/2000/svg">

            <defs>
                <linearGradient id={`gradient-${avatarSize}`} x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#ff0000"/>
                    <stop offset="50%" stopColor="#ff00ff"/>
                    <stop offset="100%" stopColor="#ffff00"/>
                </linearGradient>
                <clipPath id={`circleClip-${avatarSize}`}>
                    <circle cx="100" cy="100" r="80"/>
                </clipPath>
            </defs>


            <circle cx="100" cy="100" r="90" stroke={`url(#gradient-${avatarSize})`} strokeWidth="10" fill="none"/>


            <circle cx="100" cy="100" r="80" fill="#ffffff"/>

            <image href={url}
                   x="0" y="0"
                   width="100%" height="100%"
                   clipPath={`url(#circleClip-${avatarSize})`}
            />
        </svg>
    )
};
