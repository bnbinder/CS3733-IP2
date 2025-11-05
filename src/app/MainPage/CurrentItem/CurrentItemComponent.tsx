"use client";

import { Item } from "@/model";
import styles from "./CurrentItemComponent.module.css";

export default function CurrentItemComponent(props: any) {

    function sellItem() {
        if (props.item.initialBid != -1) {
            props.model.sellItem(props.item.getKey())
        }
        props.sendUp(new Item("", -1, ""))
        props.andRefreshDisplay();
    }

    function startBidForItem() {
        props.item.itemISbeingBiddedOn()
        props.model.itemISbeingBiddedOn()
        props.andRefreshDisplay();
    }

    return (
        <div className={styles.roundedbox}>
            <ul id="items" className={styles.list}>
                <li className={styles.name}><p className={styles.par}>{props.item.getName() != "" ? props.item.getName() : "Select Item"}</p></li>
                <li className={styles.initialBid}><p className={styles.par}>Initial Bid: {props.item ? props.item.initialBid : null}</p></li>
                <li className={styles.description}><p className={styles.par}>{props.item ? props.item.getDescription() : null}</p></li>
            </ul>
            {props.started() && props.item.getItemBeingBidded() && props.model.getItemBeingBidded() && props.item.getInitialBid() != -1 && (
                <button onClick={sellItem} type="submit" className={styles.sellItem}>Sell Item</button>
            )}
            {props.started() && !props.item.getItemBeingBidded() && !props.model.getItemBeingBidded() && props.item.getInitialBid() != -1 && !props.item.getAuctioned() && (
                <button onClick={startBidForItem} type="submit" className={styles.sellItem}>Start Auction</button>
            )}
        </div>
    );
}

