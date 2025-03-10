import {FC, useMemo} from "react";
import {NavigateFunction, useNavigate} from "react-router-dom";
import {IUser} from "../../../utils/types.ts";

interface AvatarCircleProps {
    user: IUser;
    avatarSize?:  "small" | "medium" | "big" | string,
    className?: string,
    hasLink?: boolean,
}

export const AvatarCircle: FC<AvatarCircleProps> = ({user, className, avatarSize = "small", hasLink = true}: AvatarCircleProps) => {
    const navigate: NavigateFunction = useNavigate();
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

    const numArray: (string | number)[] = [
        1, 2, 3, 4, 5, 6, 7, 8, 9, 0,
        'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j',
    ]

    const randId: string = useMemo(
        (): string => Array.from({ length: 10 }, (): string | number => numArray[Math.floor(Math.random() * numArray.length)]).join(''),
        []
    );

    if (hasLink) {
        return (
            <div onClick={() => {
                navigate(`/profile/${user._id}`);
            }}>
                <svg className={className} width={getSize()} height={getSize()} viewBox="0 0 200 200"
                     xmlns="http://www.w3.org/2000/svg">

                    <defs>
                        <linearGradient id={`gradient-${avatarSize}-${randId}`} x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" stopColor="#ff0000"/>
                            <stop offset="50%" stopColor="#ff00ff"/>
                            <stop offset="100%" stopColor="#ffff00"/>
                        </linearGradient>
                        <clipPath id={`circleClip-${avatarSize}-${randId}`}>
                            <circle cx="100" cy="100" r="80"/>
                        </clipPath>
                    </defs>


                    <circle cx="100" cy="100" r="90" stroke={`url(#gradient-${avatarSize}-${randId})`} strokeWidth="10" fill="none"/>


                    <circle cx="100" cy="100" r="80" fill="#ffffff"/>

                    <image href={user?.avatar}

                           x="0" y="0"
                           width="100%" height="100%"
                           clipPath={`url(#circleClip-${avatarSize}-${randId})`}
                    />
                </svg>
            </div>

        )
    } else {
        return (
            <svg className={className} width={getSize()} height={getSize()} viewBox="0 0 200 200"
                 xmlns="http://www.w3.org/2000/svg">

                <defs>
                    <linearGradient id={`gradient-${avatarSize}-${randId}`} x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#ff0000"/>
                        <stop offset="50%" stopColor="#ff00ff"/>
                        <stop offset="100%" stopColor="#ffff00"/>
                    </linearGradient>
                    <clipPath id={`circleClip-${avatarSize}-${randId}`}>
                        <circle cx="100" cy="100" r="80"/>
                    </clipPath>
                </defs>


                <circle cx="100" cy="100" r="90" stroke={`url(#gradient-${avatarSize}-${randId})`} strokeWidth="10" fill="none"/>


                <circle cx="100" cy="100" r="80" fill="#ffffff"/>

                <image href={user?.avatar}

                       x="0" y="0"
                       width="100%" height="100%"
                       clipPath={`url(#circleClip-${avatarSize}-${randId})`}
                />
            </svg>
        )
    }
};