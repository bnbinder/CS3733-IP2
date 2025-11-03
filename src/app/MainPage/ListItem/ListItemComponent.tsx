"use client";

import React from "react";
import styles from "./ListItemComponent.module.css";
import { Item } from "@/model";

function ListComponent(props: any) {

    const [model, setModel] = React.useState(props.model)

    function andRefreshDisplay() {
        props.refreshDisplay();
    }

    const sendItem = (item: Item) => {
        props.sendUp(item);
        andRefreshDisplay();
    };

    function deleteItem() {
        model.removeItem(props.item.getKey());
        sendItem(new Item("", -1, ""))
        andRefreshDisplay();
    }

    return (
        <div onClick={() => sendItem(props.item)} className={styles.roundedbox}>
            <div className={styles.name}>
                <p className={styles.par}>{props.item.name}</p>
            </div>
            <div className={styles.bid}>
                <p className={styles.par}>Initial Bid: {props.item.initialBid}</p>
            </div>
            {!props.model.getAuctionStarted() && (
                <div className={styles.remove}>
                    <button onClick={(e) => {
                        e.stopPropagation(); // prevents div's onClick
                        deleteItem();
                    }}>Remove</button>
                </div>
            )}
        </div>
    );
}

export default ListComponent;