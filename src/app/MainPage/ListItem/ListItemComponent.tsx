"use client";

import styles from "./ListItemComponent.module.css";
import { Item, Model } from "@/model";

interface ListItemComponentProps {
    model: Model
    item: Item
    andRefreshDisplay: () => void
    sendUp: (item: Item) => void
}

export default function ListItemComponent(props: ListItemComponentProps) {

    function sendUp(item: Item) {
        if (!item.getAuctioned()) {
            props.sendUp(item);
        }
        props.andRefreshDisplay();
    };

    function deleteItem() {
        props.model.removeItem(props.item.getKey());
        sendUp(new Item("", -1, ""))
        props.andRefreshDisplay();
    }

    return (
        <div onClick={() => sendUp(props.item)} className={styles.roundedbox}>
            <div className={styles.name}>
                <p className={styles.par}>{props.item.getName()}</p>
            </div>
            <div className={styles.bid}>
                {(!props.model.getAuctionStarted() &&
                    < p className={styles.par}>Initial Bid: {props.item.getInitialBid()}</p>
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
                            e.stopPropagation();
                            deleteItem();
                        }}>Remove</button>
                    </div>
                )
            }
        </div >
    );
}