import styles from "./SearchModal.module.scss";
import React, {FC, useState} from "react";
import {Link} from "react-router-dom";

export const SearchModal: FC = () => {
    const [searchInput, setSearchInput] = useState<string>("");

    return (
        <div>
            <h2>Search</h2>
            <input type="search" placeholder="Search" value={searchInput} onChange={(event) => {
                setSearchInput(event.target.value);
            }}/>
            <h2>Recent</h2>
        </div>
    );
};