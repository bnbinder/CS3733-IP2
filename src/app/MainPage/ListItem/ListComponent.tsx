"use client";

import styles from "./ListComponent.module.css";
import { Item } from "@/model";
import ListItemComponent from "./ListItemComponent";

export default function ListComponent(props: any) {

    function sendUp(item: Item) {
        props.sendUp(item);
        props.andRefreshDisplay();
    };

    return (
        <div>
            <div className={styles.roundedbox}>
                <h1 className={styles.header}>Current Items</h1>
                <ul id="items" className={styles.list}>
                    {props.model.getItems().map((item: Item) => (
                        <li key={item.getKey()}>
                            <ListItemComponent item={item} model={props.model} andRefreshDisplay={props.andRefreshDisplay} sendUp={sendUp} />
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}