"use client";

import { Item, Model } from "@/model";
import styles from "./CurrentItemComponent.module.css";

interface CurrentItemComponentProps {
    model: Model
    item: Item
    andRefreshDisplay: () => void
    sendUp: (item: Item) => void
    getStarted: () => boolean
}

export default function CurrentItemComponent(props: CurrentItemComponentProps) {

    function sellItem() {
        if (props.item.getInitialBid() != -1) {
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
                <li className={styles.initialBid}><p className={styles.par}>Initial Bid: {props.item ? props.item.getInitialBid() : null}</p></li>
                <li className={styles.description}><p className={styles.par}>{props.item ? props.item.getDescription() : null}</p></li>
            </ul>
            {props.getStarted() && props.item.getItemBeingBidded() && props.model.getItemBeingBidded() && props.item.getInitialBid() != -1 && (
                <button onClick={sellItem} type="submit" className={styles.sellItem}>Sell Item</button>
            )}
            {props.getStarted() && !props.item.getItemBeingBidded() && !props.model.getItemBeingBidded() && props.item.getInitialBid() != -1 && !props.item.getAuctioned() && (
                <button onClick={startBidForItem} type="submit" className={styles.sellItem}>Start Auction</button>
            )}
        </div>
    );
}

