"use client";

import React from "react";
import styles from "./ListComponent.module.css";
import { Item } from "@/model";
import ListItemComponent from "./ListItemComponent";

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
                <h1 className={styles.header}>Current Items</h1>
                <ul id="items" className={styles.list}>
                    {model.getItems().map((item: Item) => (
                        <li key={item.getKey()}>
                            <ListItemComponent item={item} model={model} refreshDisplay={andRefreshDisplay} sendUp={sendItem} />
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default ListComponent;