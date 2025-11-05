"use client";

import { Bid, Item, Model } from "@/model";
import styles from "./ListBidComponent.module.css";

interface ListBidComponentProps {
    model: Model
    item: Item
    bid: Bid
    andRefreshDisplay: () => void
}

export default function ListBidComponent(props: ListBidComponentProps) {

    function deleteBid() {
        props.item.removeBid(props.bid.getKey());
        props.andRefreshDisplay();
    }

    return (
        <div className={styles.roundedbox}>
            <div className={styles.name}>
                <p className={styles.par}>{props.bid.getName()}</p>
            </div>
            <div className={styles.bid}>
                <p className={styles.par}>Bid: {props.bid.getBid()}</p>
            </div>
            {props.model.getAuctionStarted() && !props.item.getAuctioned() && (
                <div className={styles.remove}>
                    <button onClick={(e) => {
                        e.stopPropagation();
                        deleteBid();
                    }}>Remove</button>
                </div>
            )}
        </div>
    );
}