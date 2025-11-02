"use client";

import React from "react";
import { Item } from "@/model";
import styles from "./SoldItemComponent.module.css"
import ListItemComponent from "../ListItem/ListItemComponent";

function ListComponent(props: any) {

    const [model, setModel] = React.useState(props.model)

    function andRefreshDisplay() {
        props.refreshDisplay();
    }

    const sendItem = (item: Item) => {
        props.sendUp(item);
        andRefreshDisplay();
    };

    return (
        <div>
            <div className={styles.roundedbox}>
                <h1 className={styles.header}>Sold Items</h1>
                <ul id="items" className={styles.list}>
                    {model.getSoldItems().map((item: Item) => (
                        <li key={item.getKey()} onClick={() => sendItem(item)}>
                            <ListItemComponent item={item} />
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default ListComponent;