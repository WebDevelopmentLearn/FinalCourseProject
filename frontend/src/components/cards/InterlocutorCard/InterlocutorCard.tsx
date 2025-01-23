import styles from "./InterlocutorCard.module.scss";
import {InterlocutorCardProps} from "../../../utils/Entitys.ts";


export const InterlocutorCard = ({name, message = "", time, avatar}: InterlocutorCardProps) => {
    return (
        <div className={styles.interlocutor}>
            <img src={avatar} alt="avatar"/>
            <div className={styles.interlocutor_details}>
                <h4>{name}</h4>
                <div className={styles.interlocutor_msg_info}>
                    <span>{name} sent a message.</span>
                    <span>{time}</span>
                </div>
            </div>
        </div>
    );
};