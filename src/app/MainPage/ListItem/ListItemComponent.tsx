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
        if (!item.getAuctioned()) {
            props.sendUp(item);
        }
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
                {(!props.model.getAuctionStarted() &&
                    < p className={styles.par}>Initial Bid: {props.item.initialBid}</p>
                )}
                {(props.model.getAuctionStarted() && props.item.getAuctioned() &&
                    <div>
                        <p className={styles.par}>Final Bid: {props.item.getTopBid().getBid()}</p>
                        <p className={styles.par}>Name: {props.item.getTopBid().getName()}</p>
                    </div>
                )}
            </div>
            {
                !props.model.getAuctionStarted() && (
                    <div className={styles.remove}>
                        <button onClick={(e) => {
                            e.stopPropagation(); // prevents div's onClick
                            deleteItem();
                        }}>Remove</button>
                    </div>
                )
            }
        </div >
    );
}

export default ListComponent;