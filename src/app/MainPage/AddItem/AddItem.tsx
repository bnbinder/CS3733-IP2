"use client";

import React from "react";
import styles from "./AddItem.module.css";
import { Item, Model } from "@/model";

export interface AddItemProps {
    item: Item
    model: Model
    andRefreshDisplay: () => void
    getStarted: () => boolean
}


export default function AddItem(props: AddItemProps) {
    const [formData, setFormData] = React.useState({
        name: '',
        initialBid: 0,
        description: '',
    });

    const handleChange = (e: any) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
        props.andRefreshDisplay();
    };

    function addItem() {
        if (formData.name == "" || formData.description == "") {
            alert("can you please type something? thanks. cant bid on nothing.")
            return
        }
        else if (Number.isNaN(formData.initialBid)) {
            alert("can you please type a number? thanks.")
            return
        }

        setFormData({ name: "", initialBid: 0, description: "" })
        props.model.addItem(formData.name, formData.initialBid, formData.description)
        props.andRefreshDisplay()
    }

    function addBids() {
        if (formData.name == "") {
            alert("can you please type something? thanks. we need the guy to exist.")
            return
        }
        else if (Number.isNaN(formData.initialBid)) {
            alert("can you please type a number? thanks.")
            return
        }
        if (props.item.getInitialBid() != -1 && !props.item.getAuctioned() && props.item.getInitialBid() <= formData.initialBid) {
            props.item.addBid(formData.name, formData.initialBid, formData.description)
        }
        else {
            alert("the bid needs to be higher than the inital bid!!! thanks")
        }

        setFormData({ name: "", initialBid: 0, description: "" })
        props.andRefreshDisplay()
    }

    function pleaseStartAuctionConditional() {
        return props.getStarted() && !props.item.getItemBeingBidded() && !props.model.getItemBeingBidded()
    }

    return (
        <div>
            <div className={styles.roundedbox}>
                <form>
                    <label className={styles.name}>
                        Name:
                        <input
                            className={styles.inputName}
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                        />
                    </label>
                    <label className={styles.initialBid}>
                        Bid:
                        <input
                            type="number"
                            className={styles.inputBid}
                            name="initialBid"
                            value={formData.initialBid}
                            onChange={handleChange}
                        />
                    </label>
                    <label className={styles.description}>
                        Description:
                        <textarea
                            className={styles.inputDesc}
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                        />
                    </label>
                </form>
            </div>
            <br />
            <div className={styles.buttons}>
                {!props.getStarted() && (
                    <button onClick={addItem} type="submit" className={styles.additem}>Add Item</button>
                )}
                {props.getStarted() && props.item.getItemBeingBidded() && props.model.getItemBeingBidded() && (
                    <button onClick={addBids} type="submit" className={styles.additem}>Add Bid</button>
                )}
                {props.getStarted() && !props.item.getItemBeingBidded() && props.model.getItemBeingBidded() && (
                    <h3 className={styles.addItem}>Something Is Currently Being Auctioned</h3>
                )}
                {pleaseStartAuctionConditional() && (
                    <h1 className={styles.addItem} key={"e"}>Please Start An Auction</h1>
                )}
            </div>
        </div>
    );
}