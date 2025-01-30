import {useState} from "react";

import styles from "./ExpandableText.module.scss";

interface ExpandableTextProps {
    textClass?: string;
    text: string;
    maxHeight?: number;
}

export const ExpandableText = ({textClass, text, maxHeight = 150}: ExpandableTextProps) => {

    const [isExpanded, setIsExpanded] = useState<boolean>(false);

    const toggleExpand = () => {
        setIsExpanded(!isExpanded);
    }

    return (
        <div className={styles.expandableTextContainer}>
            <div
                className={`${textClass} ${isExpanded ? styles.expandableText : ""}`}
                style={{maxHeight: isExpanded ? "100%" : `${maxHeight}px`}}>
                <p>{text}</p>
            </div>
            <button onClick={toggleExpand} className={styles.expandBtn}>
                {isExpanded ? "Hidden" : "Read more"}
            </button>
        </div>
    );
};