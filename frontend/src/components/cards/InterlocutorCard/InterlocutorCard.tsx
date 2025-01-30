import styles from "./InterlocutorCard.module.scss";

interface InterlocutorCardProps {
    name: string;
    message: string;
    time: string;
    avatar: string;
}

export const InterlocutorCard = ({name, time, avatar}: InterlocutorCardProps) => {
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