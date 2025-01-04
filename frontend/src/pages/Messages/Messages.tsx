import styles from "./Messages.module.scss";

import nikita_avatar from "../../assets/messages/nikita_avatar.png";
import sasha_avatar from "../../assets/messages/sasha_avatar.png";
import {InterlocutorCard} from "../../components";

export const Messages = () => {
    return (
        <div className={styles.messages}>
            <div className={styles.interlocutors_container}>
                <h1>itcareerhub</h1>
                <div className={styles.interlocutors_list}>
                    <InterlocutorCard name="Nikita" message="" time="2 wek" avatar={nikita_avatar} />

                    <InterlocutorCard name="Sasha" message="" time="2 wek" avatar={sasha_avatar} />

                    <InterlocutorCard name="Nikita" message="" time="2 wek" avatar={nikita_avatar} />

                    <InterlocutorCard name="Sasha" message="" time="2 wek" avatar={sasha_avatar} />

                    <InterlocutorCard name="Nikita" message="" time="2 wek" avatar={nikita_avatar} />

                    <InterlocutorCard name="Sasha" message="" time="2 wek" avatar={sasha_avatar} />

                    <InterlocutorCard name="Nikita" message="" time="2 wek" avatar={nikita_avatar} />


                </div>
            </div>
            <div className={styles.current_interlocutor}>
                <div className={styles.current_interlocutor_details}>
                    <img src={nikita_avatar} alt="nikita_avatar"/>
                    <h1>nikita</h1>
                </div>

                <div>

                </div>
            </div>
        </div>
    );
};