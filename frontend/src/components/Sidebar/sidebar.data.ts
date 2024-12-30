import logo from "../../assets/logo.svg";
import homeIcon from "../../assets/sidebar/home_icon.svg";
import searchIcon from "../../assets/sidebar/search_icon.svg";
import exploreIcon from "../../assets/sidebar/explore_icon.svg";
import messageIcon from "../../assets/sidebar/message_icon.svg";
import notificationIcon from "../../assets/sidebar/notification_icon.svg";
import createIcon from "../../assets/sidebar/create_icon.svg";

export interface ISidebarItem {
    id: number;
    icon: string;
    name: string;
    link: string;
}

export const SidebarList: ISidebarItem[] = [
    {
        id: 0,
        icon: logo,
        name: "",
        link: "/"
    },
    {
        id: 1,
        icon: homeIcon,
        name: "Home",
        link: "/"
    },
    {
        id: 2,
        icon: searchIcon,
        name: "Search",
        link: "/search"
    },
    {
        id: 3,
        icon: exploreIcon,
        name: "Explore",
        link: "/explore"
    },
    {
        id: 4,
        icon: messageIcon,
        name: "Messages",
        link: "/messages"
    },
    {
        id: 5,
        icon: notificationIcon,
        name: "Notifications",
        link: "/notifications"
    },
    {
        id: 6,
        icon: createIcon,
        name: "Create",
        link: "/create"
    }
]