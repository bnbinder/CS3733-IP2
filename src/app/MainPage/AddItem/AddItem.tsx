"use client";

import React from "react";
import styles from "./AddItem.module.css";

function ListComponent(props: any) {
    const [model, setModel] = React.useState(props.model)
    const [formData, setFormData] = React.useState({
        name: '',
        initialBid: 0,
        description: '',
    });

    function andRefreshDisplay() {
        props.refreshDisplay();
    }

    const handleChange = (e: any) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
        andRefreshDisplay();
    };

    const addItem = () => {
        if (formData.name == "" || formData.description == "") {
            alert("can you please type something? thanks. cant bid on nothing.")
            return
        }
        else if (Number.isNaN(formData.initialBid)) {
            alert("can you please type a number? thanks.")
            return
        }

        setFormData({ name: "", initialBid: 0, description: "" })
        model.addItem(formData.name, formData.initialBid, formData.description)
        andRefreshDisplay()
    }

    const addBids = () => {
        if (formData.name == "" || formData.description == "") {
            alert("can you please type something? thanks. we need the guy to exist.")
            return
        }
        else if (Number.isNaN(formData.initialBid)) {
            alert("can you please type a number? thanks.")
            return
        }
        if (props.item.getInitialBid() != -1 && !props.item.getAuctioned()) {
            props.item.addBid(formData.name, formData.initialBid, formData.description)
        }

        setFormData({ name: "", initialBid: 0, description: "" })
        andRefreshDisplay()
    }

    function warningTextConditional() {
        return props.started() && !props.item.getItemBeingBidded() && !props.model.getItemBeingBidded()
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
                {!props.started() && (
                    <button onClick={addItem} type="submit" className={styles.additem}>Add Item</button>
                )}
                {props.started() && props.item.getItemBeingBidded() && props.model.getItemBeingBidded() && (
                    <button onClick={addBids} type="submit" className={styles.additem}>Add Bid</button>
                )}
                {props.started() && !props.item.getItemBeingBidded() && props.model.getItemBeingBidded() && (
                    <h3 className={styles.addItem}>Something Is Currently Being Auctioned</h3>
                )}
                {warningTextConditional() && (
                    <h1 className={styles.addItem} key = {"e"}>Please Start An Auction</h1>
                )}
            </div>
        </div>
    );
}

export default ListComponent;