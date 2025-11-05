"use client";

import styles from "./CurrentBidsListComponent.module.css";
import { Bid, Item, Model } from "@/model";
import ListBidComponent from "./ListBidComponent";

interface CurrentBidsListComponentProps {
    item: Item
    model: Model
    andRefreshDisplay: () => void
}

export default function CurrentBidsListComponent(props: CurrentBidsListComponentProps) {

    return (
        <div>
            <div className={styles.roundedbox}>
                <h1 className={styles.header}>Current Bids</h1>
                <ul id="items" className={styles.list}>
                    {props.item.getBids().toReversed().map((bid: Bid) => (
                        <li key={bid.getKey()}>
                            <ListBidComponent bid={bid} item={props.item} model={props.model} andRefreshDisplay={props.andRefreshDisplay} />
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}