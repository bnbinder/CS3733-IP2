"use client";

import styles from "./MainPage.module.css";
import { useRouter, useSearchParams } from "next/navigation";
import ListComponent from "./ListItem/ListComponent";
import React from "react";
import { Item, Model } from '@/model';
import CurrentItemComponent from "./CurrentItem/CurrentItemComponent";
import AddItem from "./AddItem/AddItem";
import SoldItemComponent from "./SoldItem/SoldItemComponent";
import CurrentBidsListComponent from "./CurrentBidsList/CurrentBidsListComponent";

export default function MainPage() {
    const searchParams = useSearchParams();
    const eventStr = searchParams.get("name") || "No Event Name Given";
    const [model, setModel] = React.useState(new Model(eventStr))
    const [item, setItem] = React.useState(new Item("", -1, ""));
    const [redraw, forceRedraw] = React.useState(0)
    const router = useRouter();

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

    function resetEverything() {
        router.push(`../`)
        andRefreshDisplay()
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
                        <div>
                            <h2>Total Funds: {0 + model.getTotalFunds()}</h2>
                            <button onClick={resetEverything} className={styles.startauction}>End Auction</button>
                        </div>
                    )}
                </div>
                <br />
                <div className={styles.info}>
                    <ListComponent andRefreshDisplay={andRefreshDisplay} model={model} sendUp={setItem} />
                    <CurrentItemComponent andRefreshDisplay={andRefreshDisplay} model={model} item={item} sendUp={setItem}
                        getStarted={getStarted} />
                    <AddItem andRefreshDisplay={andRefreshDisplay} model={model} getStarted={getStarted} item={item} />
                    <SoldItemComponent andRefreshDisplay={andRefreshDisplay} model={model} sendUp={setItem} />
                    <CurrentBidsListComponent andRefreshDisplay={andRefreshDisplay} model={model} item={item} />
                </div>
            </main>
        </div>
    );
}