import styles from "./SidebarItem.module.scss";
import {ISidebarItem} from "../sidebar.data.ts";
import {Link} from "react-router-dom";

export const SidebarItem = ({item}: { item: ISidebarItem}) => {

    console.log("Item: ", item);

    return (
        <Link className={`${styles.sidebar_item} ${item.name === "" ? styles.empty : ""}`} to={item.link} >
            <img src={item.icon} alt={item.icon}/>
            <span>{item.name}</span>
        </Link>
    );
};