"use client";

import { Item } from "@/model";
import styles from "./CurrentItemComponent.module.css";

function ListComponent(props: any) {
    /*
    function ihatejavascript() {
        console.log(props.started() + " i hate javascript")
        return props.started()
        //i have been debugging this for god knows how long.
        //this made it work. i am not changing it unless i am
        //with heineman himself. javascript and css are the
        //devils creations. i am not a religious person but i
        //see how people can beleive in it. these two languages
        //make me beleive there are sinister forces. 
        //god bless java
    }
    */

    function sellItem() {
        if (props.item.initialBid != -1) {
            props.model.sellItem(props.item.getKey())
        }
        props.sendUp(new Item("", -1, ""))
        props.refreshDisplay();
    }

    return (
        <div className={styles.roundedbox}>
            <ul id="items" className={styles.list}>
                <li className={styles.name}><p className={styles.par}>{props.item.name != "" ? props.item.name : "Select Item"}</p></li>
                <li className={styles.initialBid}><p className={styles.par}>Initial Bid: {props.item ? props.item.initialBid : null}</p></li>
                <li className={styles.description}><p className={styles.par}>{props.item ? props.item.description : null}</p></li>
            </ul>
            {props.started() && (
                <button onClick={sellItem} type="submit" className={styles.sellItem}>Sell Item</button>
            )}
        </div>
    );
}

export default ListComponent;