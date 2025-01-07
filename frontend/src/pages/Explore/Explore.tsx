import styles from "./Explore.module.scss";

import firstImage from "../../assets/explore/1.png";
import secondImage from "../../assets/explore/2.png";
import thirdImage from "../../assets/explore/3.png";
import fourthImage from "../../assets/explore/4.png";
import fifthImage from "../../assets/explore/5.png";
import sixthImage from "../../assets/explore/6.png";
import seventhImage from "../../assets/explore/7.png";
import eighthImage from "../../assets/explore/8.png";
import ninthImage from "../../assets/explore/9.png";
import tenthImage from "../../assets/explore/10.png";
import {Link} from "react-router-dom";

interface Post {
    id: number;
    image: string;

}

export const Explore = () => {

    const posts: Post[] = [
        {
            id: 1,
            image: thirdImage
        },
        {
            id: 2,
            image: secondImage
        },
        {
            id: 3,
            image: thirdImage
        },
        {
            id: 4,
            image: fourthImage
        },
        {
            id: 5,
            image: fifthImage
        },
        {
            id: 6,
            image: sixthImage
        },
        {
            id: 7,
            image: seventhImage
        },
        {
            id: 8,
            image: eighthImage
        },
        {
            id: 9,
            image: ninthImage
        },
        {
            id: 10,
            image: tenthImage
        },

        {
            id: 11,
            image: firstImage
        },
        {
            id: 12,
            image: secondImage
        },
        {
            id: 13,
            image: thirdImage
        },
        {
            id: 14,
            image: fourthImage
        },
        {
            id: 15,
            image: fifthImage
        },
        {
            id: 16,
            image: sixthImage
        },
        {
            id: 17,
            image: seventhImage
        },
        {
            id: 18,
            image: eighthImage
        },
        {
            id: 19,
            image: ninthImage
        },
        {
            id: 20,
            image: tenthImage
        },


        {
            id: 21,
            image: firstImage
        },
        {
            id: 22,
            image: secondImage
        },
        {
            id: 23,
            image: thirdImage
        },
        {
            id: 24,
            image: fourthImage
        },
        {
            id: 25,
            image: fifthImage
        },
        {
            id: 26,
            image: sixthImage
        },
        {
            id: 27,
            image: seventhImage
        },
        {
            id: 28,
            image: eighthImage
        },
        {
            id: 29,
            image: ninthImage
        },
        {
            id: 30,
            image: tenthImage
        },
    ];


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