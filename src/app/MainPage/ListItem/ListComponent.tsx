"use client";

import styles from "./ListComponent.module.css";
import { Item, Model } from "@/model";
import ListItemComponent from "./ListItemComponent";

interface ListComponentProps {
    model: Model
    sendUp: (item: Item) => void
    andRefreshDisplay: () => void
}

export default function ListComponent(props: ListComponentProps) {

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