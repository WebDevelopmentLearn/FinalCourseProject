import styles from "./Separator.module.scss";

export const Separator = () => {
    return (
        <div className={styles.separator}>
            <hr/>
            <span>OR</span>
            <hr/>
        </div>
    );
};