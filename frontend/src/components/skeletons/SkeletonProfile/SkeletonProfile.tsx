import styles from './SkeletonProfile.module.scss';

export const SkeletonProfile = () => {
    return (
        <div className={styles.profile_container_skeleton}>
            <div className={styles.profile_main_skeleton}>
                <div className={`${styles.profile_avatar_skeleton} ${styles.skeletonBox}`}></div>

                <div className={`${styles.profile_info_skeleton} ${styles.skeletonBox}`}></div>
            </div>

            <div className={styles.profile_posts_skeleton}>
                {new Array(12).fill(0).map((_, i) => (
                    <div key={i} className={`${styles.post_card_skeleton} ${styles.skeletonBox}`}></div>
                ))}
            </div>
        </div>
    );
};