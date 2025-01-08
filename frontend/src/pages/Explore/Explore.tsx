import styles from "./Explore.module.scss";

import {Link} from "react-router-dom";
import {posts} from "../../utils/DebugUtils.ts";


export const Explore = () => {




    return (
        <div className={styles.exploreContainer}>
            {posts.map((post) => {
                return (
                    <Link to={`/post/${post.id}`} key={post.id} className={styles.exploreItem}>
                        <img src={post.image} alt={`Post ${post.id}`} />
                    </Link>
                )
            })}

        </div>
    );
};