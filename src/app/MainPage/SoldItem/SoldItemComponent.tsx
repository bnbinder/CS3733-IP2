"use client";

import { Item } from "@/model";
import styles from "./SoldItemComponent.module.css"
import ListItemComponent from "../ListItem/ListItemComponent";

export default function SoldItemComponent(props: any) {

    function sendUp (item: Item) {
        props.sendUp(item);
        props.andRefreshDisplay();
    };

    return (
        <div>
            <div className={styles.roundedbox}>
                <h1 className={styles.header}>Sold Items</h1>
                <ul id="items" className={styles.list}>
                    {props.model.getSoldItems().map((item: Item) => (
                        <li key={item.getKey()} onClick={() => sendUp(item)}>
                            <ListItemComponent  item={item} model={props.model} andRefreshDisplay={props.andRefreshDisplay} sendUp={sendUp} />
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}