"use client";

import styles from "./ListBidComponent.module.css";

export default function ListBidComponent(props: any) {

    function deleteBid() {
        props.item.removeBid(props.bid.getKey());
        props.andRefreshDisplay();
    }

    return (
        <div className={styles.roundedbox}>
            <div className={styles.name}>
                <p className={styles.par}>{props.bid.name}</p>
            </div>
            <div className={styles.bid}>
                <p className={styles.par}>Bid: {props.bid.bid}</p>
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