"use client";

import React from "react";
import styles from "./ListBidComponent.module.css";
import { Item } from "@/model";

function ListComponent(props: any) {

    const [model, setModel] = React.useState(props.model)

    function andRefreshDisplay() {
        props.refreshDisplay();
    }

    function deleteBid() {
        props.item.removeBid(props.bid.getKey());
        andRefreshDisplay();
    }

    return (
        <div className={styles.roundedbox}>
            <div className={styles.name}>
                <p className={styles.par}>{props.bid.name}</p>
            </div>
            <div className={styles.bid}>
                <p className={styles.par}>Bid: {props.bid.bid}</p>
            </div>
            {!props.model.getAuctionStarted() && (
                <div className={styles.remove}>
                    <button onClick={(e) => {
                        e.stopPropagation(); // prevents div's onClick
                        deleteBid();
                    }}>Remove</button>
                </div>
            )}
        </div>
    );
}

export default ListComponent;