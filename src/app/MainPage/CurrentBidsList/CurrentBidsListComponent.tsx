"use client";

import React from "react";
import styles from "./CurrentBidsListComponent.module.css";
import { Bid, Item } from "@/model";
import ListBidComponent from "./ListBidComponent";

function CurrentBidsListComponent(props: any) {

    const [model, setModel] = React.useState(props.model)

    function andRefreshDisplay() {
        props.refreshDisplay();
    }

    return (
        <div>
            <div className={styles.roundedbox}>
                <h1 className={styles.header}>Current Bids</h1>
                <ul id="items" className={styles.list}>
                    {props.item.getBids().toReversed().map((bid: Bid) => (
                        <li key={bid.getKey()}>
                            <ListBidComponent bid = {bid} item={props.item} model={model} refreshDisplay={andRefreshDisplay}/>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default CurrentBidsListComponent;