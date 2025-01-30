import styles from './SkeletonProfile.module.scss';

export const SkeletonProfile = () => {
    return (
        <div className={styles.skeletonContainer}>
            {/*<div className={`${styles.header} ${styles.skeletonBox} ${styles.skeletonTitle}`}></div>*/}

            <div className={styles.profileSection}>
                <div className={styles.profileHeader}>
                    <div className={`${styles.profilePic} ${styles.skeletonBox}`}></div>
                    <div className={styles.profileInfo}>
                        <div className={styles.skeletonBox} style={{ width: '120px', height: '24px' }}></div>
                        <div className={styles.buttons}>
                            <div className={`${styles.btn} ${styles.skeletonBox}`}></div>
                            <div className={`${styles.btn} ${styles.skeletonBox}`}></div>
                        </div>
                        <div className={styles.stats}>
                            <div className={styles.skeletonBox} style={{ width: '80px', height: '16px' }}></div>
                            <div className={styles.skeletonBox} style={{ width: '80px', height: '16px' }}></div>
                            <div className={styles.skeletonBox} style={{ width: '80px', height: '16px' }}></div>
                        </div>
                    </div>
                </div>

                <div className={styles.posts_list}>
                    {new Array(12).fill(0).map((_, i) => (
                        <div key={i} className={`${styles.gridItem} ${styles.skeletonBox}`}></div>
                    ))}
                </div>
            </div>
        </div>
    );
};