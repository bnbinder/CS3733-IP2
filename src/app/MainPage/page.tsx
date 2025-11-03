"use client";

import styles from "./MainPage.module.css";
import { useSearchParams } from "next/navigation";
import ListComponent from "./ListItem/ListComponent";
import React from "react";
import { Bid, Item, Model } from '@/model';
import CurrentItemComponent from "./CurrentItem/CurrentItemComponent";
import AddItem from "./AddItem/AddItem";
import SoldItemComponent from "./SoldItem/SoldItemComponent";
import CurrentBidsListComponent from "./CurrentBidsList/CurrentBidsListComponent";

export default function MainPage() {
    const searchParams = useSearchParams();
    const eventStr = searchParams.get("name") || "No Event Name Given";
    const [model, setModel] = React.useState(new Model(eventStr))

    const [item, setItem] = React.useState(new Item("", -1, ""));
    const [bid, setBid] = React.useState(new Bid("", -1, ""));

    const [redraw, forceRedraw] = React.useState(0)

    function andRefreshDisplay() {
        forceRedraw(redraw + 1)
    }

    function start() {
        model.startAuction();
        andRefreshDisplay();
    }

    function getStarted() {
        return model.getAuctionStarted();
    }

    function inlineconditionalsdontallowsimplevoidfunctionsiactuallythinkthereforeiam() {
        alert("THIS IS THE END >:)")
        andRefreshDisplay();
    }

    return (
        <div className={styles.page}>
            <main className={styles.main}>
                <div className={styles.intro}>
                    <h1>{eventStr}</h1>
                    {!model.getAuctionStarted() && (
                        <button onClick={start} className={styles.startauction}>Start Auction</button>
                    )}
                    {model.getAuctionStarted() && (
                        <button onClick={inlineconditionalsdontallowsimplevoidfunctionsiactuallythinkthereforeiam} className={styles.startauction}>End Auction</button>
                    )}
                </div>
                <br />
                <div className={styles.info}>
                    <ListComponent refreshDisplay={andRefreshDisplay} model={model} sendUp={setItem} />
                    <CurrentItemComponent refreshDisplay={andRefreshDisplay} model={model} item={item} sendUp={setItem}
                        started={getStarted} />
                    <AddItem refreshDisplay={andRefreshDisplay} model={model} started={getStarted} item={item} />
                    <SoldItemComponent refreshDisplay={andRefreshDisplay} model={model} sendUp={setItem} />
                    <CurrentBidsListComponent refreshDisplay={andRefreshDisplay} model={model} item={item} />
                </div>
            </main>
        </div>
    );
}