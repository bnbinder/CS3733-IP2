"use client";

import React from "react";
import styles from "./AddItem.module.css";
import { Bid, Item, Model } from "../../../model";

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
            alert("please type a name and description.")
            return
        }
        else if (Number.isNaN(parseInt(formData.initialBid.toString()))) {
            alert("please type a valid number.")
            return
        }

        setFormData({ name: "", initialBid: 0, description: "" })
        props.model.addItem(formData.name, formData.initialBid, formData.description)
        props.andRefreshDisplay()
    }

    function addBids() {
        var topBidObject: Bid = new Bid("", 0, "")
        if (props.item.getBids().length != 0) {
            topBidObject = props.item.getBids().reduce((max, bid) =>
                bid.getBid() > max.getBid() ? bid : max)
        }

        if (formData.name == "") {
            alert("please type a name.")
            return
        }
        else if (Number.isNaN(parseInt(formData.initialBid.toString()))) {
            alert("please type a valid number.")
            return
        }
        if (props.item.getInitialBid() != -1 && !props.item.getAuctioned() && props.item.getInitialBid() < Number(formData.initialBid) && topBidObject.getBid() < formData.initialBid) {
            props.item.addBid(formData.name, formData.initialBid, formData.description)
        }
        else {
            alert("Please make sure the bid is higher than the initial bid and any bids presently active.")
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
                        {!props.getStarted() ? (
                            "Initial Bid:"
                        ) : "Bid"}
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