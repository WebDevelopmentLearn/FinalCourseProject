import styles from "./CommentCard.module.scss";
import {AvatarCircle} from "../../other/AvatarCircle/AvatarCircle.tsx";
import {ICommentCard} from "../../../utils/Entitys.ts";
import {getTimeAgo} from "../../../utils/Utils.ts";

export const CommentCard = ({author, commentDesc, createdAt, likes}: ICommentCard) => {

    return (
        <li className={styles.post_comment}>
            <div className={styles.post_comment_details}>
                <AvatarCircle user={author} avatarSize="small"/>
                <div className={styles.comment_desc_and_stats}>
                    <div className={styles.comment_desc}>
                        <span>{author?.username}</span>
                        <span>{commentDesc}</span>
                    </div>
                    <div className={styles.comment_stats}>
                        <span>{getTimeAgo(createdAt)}</span>
                        <span>Likes: {likes?.length}</span>
                    </div>
                </div>
            </div>
            <div className={styles.comment_like}>
                <svg width="11" height="10" viewBox="0 0 11 10" fill="none"
                     xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="M7.6539 1.81261C8.21084 1.8434 8.73304 2.09306 9.1067 2.5072C9.48036 2.92134 9.67519 3.46638 9.64874 4.02354C9.64874 5.32519 8.52505 6.12474 7.4467 7.08361C6.38233 8.034 5.80905 8.55347 5.62346 8.67338C5.42135 8.54245 4.71544 7.90095 3.80022 7.08361C2.71721 6.12093 1.59818 5.31375 1.59818 4.02354C1.57172 3.46638 1.76656 2.92134 2.14022 2.5072C2.51388 2.09306 3.03608 1.8434 3.59302 1.81261C3.90155 1.80326 4.20722 1.87412 4.48016 2.01828C4.75309 2.16243 4.98395 2.37494 5.15017 2.63503C5.50609 3.1329 5.56541 3.38204 5.62473 3.38204C5.68405 3.38204 5.74252 3.1329 6.09505 2.63376C6.26033 2.37247 6.49127 2.15912 6.76482 2.01502C7.03836 1.87092 7.34493 1.80113 7.6539 1.81261ZM7.6539 0.965178C7.26913 0.952859 6.88655 1.0275 6.53463 1.18354C6.18272 1.33958 5.87054 1.573 5.62134 1.86642C5.37235 1.57385 5.06081 1.34097 4.70974 1.18498C4.35866 1.02899 3.97703 0.95387 3.59302 0.965178C2.81121 0.99575 2.07332 1.33465 1.5407 1.90777C1.00807 2.48089 0.724052 3.2416 0.750749 4.02354C0.750749 5.55315 1.83122 6.49253 2.87567 7.40054C2.99558 7.50478 3.11677 7.60986 3.2371 7.71706L3.67226 8.10603C4.14683 8.55761 4.64437 8.98443 5.16288 9.3848C5.30007 9.47363 5.46002 9.52089 5.62346 9.52089C5.7869 9.52089 5.94685 9.47363 6.08404 9.3848C6.61906 8.97221 7.1319 8.53164 7.62042 8.06493L8.01109 7.71579C8.13524 7.60562 8.26108 7.49588 8.38607 7.38783C9.37502 6.52981 10.4962 5.55739 10.4962 4.02354C10.5229 3.2416 10.2388 2.48089 9.70622 1.90777C9.1736 1.33465 8.4357 0.99575 7.6539 0.965178Z"
                        fill="#262626"/>
                </svg>
            </div>
        </li>
    );
};