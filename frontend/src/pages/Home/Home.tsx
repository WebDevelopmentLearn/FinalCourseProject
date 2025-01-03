import {PostCard} from "../../components";
import styles from "./Home.module.scss";

import check from "../../assets/home/check_in_circle.svg";

export const Home = () => {
    const posts = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20];

    return (
        <div>
            <div className={styles.home}>
                <div className={styles.home_posts__list}>
                    {posts.map((_el, index) => (
                        <PostCard key={index}/>
                    ))}

                </div>
                <div className={styles.home_end}>
                    <img src={check} alt="check"/>
                    <h2>You've seen all the updates</h2>
                    <h3>You have viewed all new publications</h3>
                </div>
            </div>

        </div>
    );
};