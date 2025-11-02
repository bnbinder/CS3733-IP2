"use client";

import styles from "./MainPage.module.css";
import { useSearchParams } from "next/navigation";
import ListComponent from "./ListItem/ListComponent";
import React from "react";
import { Item, Model } from '@/model';
import CurrentItemComponent from "./CurrentItem/CurrentItemComponent";
import AddItem from "./AddItem/AddItem";
import SoldItemComponent from "./SoldItem/SoldItemComponent";

export default function MainPage() {
    const searchParams = useSearchParams();
    const eventStr = searchParams.get("name") || "No Event Name Given";
    const [model, setModel] = React.useState(new Model(eventStr))
    const [item, setItem] = React.useState(new Item("", 0, ""));

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

    return (
        <div className={styles.page}>
            <main className={styles.main}>
                <div className={styles.intro}>
                    <h1>{eventStr}</h1>
                    {!model.getAuctionStarted() && (
                        <button onClick={start} className={styles.startauction}>Start Auction</button>
                    )}
                </div>
                <br />
                <div className={styles.info}>
                    <ListComponent refreshDisplay={andRefreshDisplay} model={model} sendUp={setItem} />
                    <CurrentItemComponent refreshDisplay={andRefreshDisplay} model={model} item={item}
                        started={getStarted} />
                    <AddItem refreshDisplay={andRefreshDisplay} model={model} />
                    <SoldItemComponent refreshDisplay={andRefreshDisplay} model={model} />
                </div>
            </main>
        </div>
    );
}