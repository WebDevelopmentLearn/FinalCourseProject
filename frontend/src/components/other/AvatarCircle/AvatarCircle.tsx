import {FC} from "react";
import {NavigateFunction, useNavigate} from "react-router-dom";

import {AvatarCircleProps} from "../../../utils/Entitys.ts";
import {Loader} from "../Loader/Loader.tsx";

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


    if (hasLink) {
        return (
            <div onClick={() => {
                navigate(`/profile/${user._id}`);
            }}>
                {user ? (
                    <svg className={className} width={getSize()} height={getSize()} viewBox="0 0 200 200"
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

                        <image href={user?.avatar}

                               x="0" y="0"
                               width="100%" height="100%"
                               clipPath="url(#circleClip)"
                        />
                    </svg>
                ) : (
                    <Loader size={getSize()}/>
                )}
            </div>

        )
    } else {
        return (
            user ? (
                <svg className={className} width={getSize()} height={getSize()} viewBox="0 0 200 200"
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

                    <image href={user?.avatar}

                           x="0" y="0"
                           width="100%" height="100%"
                           clipPath="url(#circleClip)"
                    />
                </svg>
            ) : (
                <Loader size={getSize()}/>
            )
        )
    }
};