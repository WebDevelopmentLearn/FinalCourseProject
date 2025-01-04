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

                <div className={styles.chat_container}>
                    <div className={styles.chat_interlocutor}>
                        <img src={nikita_avatar} alt=""/>
                        <h3>Nikita</h3>
                        <div className={styles.chat_interlocutor_details}>
                            <span>Nikita.</span>
                            <span>ICHgram</span>
                        </div>
                        <button className={styles.view_profile_btn}>View Profile</button>
                    </div>
                    <h4>Jun 26, 2024, 08:49 PM.</h4>

                    <div className={styles.chat_history}>
                        <div className={styles.message_of_interlocutor}>
                            <img src={nikita_avatar} alt=""/>
                            <div className={styles.message_of_interlocutor_text}>
                                <p>Hey, how are you?</p>
                                <span>2 wek</span>
                            </div>
                        </div>

                        <div className={styles.my_message}>
                            <div className={styles.my_message_text}>
                                <p>Hey, I'm fine. How about you?</p>
                                <span>2 wek</span>
                            </div>
                            <img src={sasha_avatar} alt=""/>
                        </div>


                        <div className={styles.message_of_interlocutor}>
                            <img src={nikita_avatar} alt=""/>
                            <div className={styles.message_of_interlocutor_text}>
                                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor
                                    incididunt ut labore et dolore magna aliqua.</p>
                                <span>2 wek</span>
                            </div>
                        </div>

                        <div className={styles.my_message}>
                            <div className={styles.my_message_text}>
                                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor
                                    incididunt ut labore et dolore magna aliqua.</p>
                                <span>2 wek</span>
                            </div>
                            <img src={sasha_avatar} alt=""/>
                        </div>


                        <div className={styles.message_of_interlocutor}>
                            <img src={nikita_avatar} alt=""/>
                            <div className={styles.message_of_interlocutor_text}>
                                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor
                                    incididunt ut labore et dolore magna aliqua.</p>
                                <span>2 wek</span>
                            </div>
                        </div>

                        <div className={styles.message_of_interlocutor}>
                            <img src={nikita_avatar} alt=""/>
                            <div className={styles.message_of_interlocutor_text}>
                                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                                <span>2 wek</span>
                            </div>
                        </div>

                        <div className={styles.my_message}>
                            <div className={styles.my_message_text}>
                                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor
                                    incididunt ut labore et dolore magna aliqua.</p>
                                <span>2 wek</span>
                            </div>
                            <img src={sasha_avatar} alt=""/>
                        </div>


                    </div>

                    <div className={styles.chat_input_container}>
                        <input className={styles.chat_input} type="text" placeholder="Write message"/>
                    </div>

                </div>
            </div>
        </div>
    );
};