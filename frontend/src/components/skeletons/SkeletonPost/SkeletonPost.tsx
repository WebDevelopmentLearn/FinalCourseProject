import styles from "./SkeletonPost.module.scss";


export const SkeletonPost = () => {
    return (
        <div className={`${styles.post_card_skeleton}`}>
            <div className={styles.post_card__author_skeleton}>
                <div className={`${styles.post_card__avatar_skeleton} ${styles.skeletonBox}`}></div>

                <div className={`${styles.post_card__author__right_block_skeleton} ${styles.skeletonBox}`}></div>
            </div>

            <div className={`${styles.post_card__image_skeleton} ${styles.skeletonBox}`}></div>

            <div className={`${styles.post_card__content_skeleton} ${styles.skeletonBox}`}></div>

        </div>
    );
};