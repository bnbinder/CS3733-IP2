interface IBid {
    getKey: () => number
    getBid: () => number
    getName: () => string
}

export class Bid implements IBid {
    private name: string;
    private bid: number;
    private imageSrc: string;
    private key: number;

    constructor(name: string, bid: number, description: string) {
        this.name = name;
        this.bid = bid;
        this.imageSrc = "do i really want to implement this";
        this.key = Date.now();
    }

    getKey() {
        return this.key;
    }

    getBid() {
        return this.bid
    }

    getName() {
        return this.name
    }
}

interface IItem {
    removeBid: (key: number) => void
    addBid: (name: string, initialBid: number, description: string) => void
    getKey: () => number
    getAuctioned: () => boolean
    setAuctioned: () => void
    getBids: () => Bid[]
    getInitialBid: () => number
    itemISbeingBiddedOn: () => void
    itemISNOTbeingBiddedOn: () => void
    getItemBeingBidded: () => boolean
    setTopBid: (bid: Bid) => void
    getTopBid: () => Bid
    getName: () => string
    getDescription: () => string
}

export class Item implements IItem {
    private name: string;
    private initialBid: number;
    private description: string;
    private imageSrc: string;
    private auctioned: boolean;
    private itemBeingBidded: boolean;
    private bids: Bid[];
    private topBid: Bid;
    private key: number;

    constructor(name: string, initialBid: number, description: string) {
        this.name = name;
        this.initialBid = initialBid;
        this.description = description;
        this.imageSrc = "do i really want to implement this";
        this.auctioned = false;
        this.bids = [];
        this.key = Date.now();
        this.itemBeingBidded = false;
        this.topBid = new Bid("", -1, "")
    }

    removeBid(key: number) {
        var bid: Bid = new Bid("", 0, "");
        this.bids.forEach(bidd => {
            if (bidd.getKey() == key) {
                bid = bidd;
            }
        });
        this.bids.splice(this.bids.indexOf(bid), 1)
    }

    addBid(name: string, initialBid: number, description: string): void {
        this.bids.push(new Bid(name, initialBid, description));
    }

    getKey() {
        return this.key;
    }

    getAuctioned() {
        return this.auctioned;
    }

    setAuctioned() {
        this.auctioned = true;
    }

    getBids() {
        return this.bids
    }

    getInitialBid() {
        return this.initialBid;
    }

    itemISbeingBiddedOn() {
        this.itemBeingBidded = true;
    }

    itemISNOTbeingBiddedOn() {
        this.itemBeingBidded = false;
    }

    getItemBeingBidded() {
        return this.itemBeingBidded;
    }

    setTopBid(bid: Bid) {
        this.topBid = bid
    }

    getTopBid() {
        return this.topBid
    }

    getName() {
        return this.name;
    }

    getDescription() {
        return this.description
    }
}

interface IModel {
    addItem: (name: string, initialBid: number, description: string) => void
    removeItem: (key: number) => void
    sellItem: (key: number) => void
    getItems: () => Item[]
    getSoldItems: () => Item[]
    startAuction: () => void
    getAuctionStarted: () => boolean
    getTotalFunds: () => number
    itemISbeingBiddedOn: () => void
    itemISNOTbeingBiddedOn: () => void
    getItemBeingBidded: () => boolean
}

export class Model implements IModel {
    private itemsToAuction: Item[];
    private itemsSold: Item[];
    private auctionName: string;
    private isAuctionStarted: boolean
    private totalFunds: number
    private itemBeingBidded: boolean;

    constructor(auctionName: string) {
        this.itemsToAuction = []
        this.itemsSold = []
        this.auctionName = auctionName;
        this.isAuctionStarted = false;
        this.totalFunds = 0;
        this.itemBeingBidded = false;
    }

    addItem(name: string, initialBid: number, description: string): void {
        this.itemsToAuction.push(new Item(name, initialBid, description));
    }

    removeItem(key: number) {
        var item: Item = new Item("", 0, "");
        this.itemsToAuction.forEach(itemm => {
            if (itemm.getKey() == key) {
                item = itemm;
            }
        });
        this.itemsToAuction.splice(this.itemsToAuction.indexOf(item), 1)
    }

    sellItem(key: number) {
        var item: Item = new Item("", -1, "");
        this.itemsToAuction.forEach(itemm => {
            if (itemm.getKey() == key) {
                item = itemm;
            }
        });
        if (item.getInitialBid() >= 0 && item.getBids().length != 0) {
            var topBid: number = Math.max(...item.getBids().map(bid => bid.getBid()))
            var topBidObject = item.getBids().reduce((max, bid) =>
                bid.getBid() > max.getBid() ? bid : max)
            var iteminitbid: number = item.getInitialBid()
            if (topBid > iteminitbid) {
                this.totalFunds += topBid - iteminitbid;
                item.setTopBid(topBidObject);
                console.log(this.totalFunds)
                item.setAuctioned();
                item.itemISNOTbeingBiddedOn();
                this.itemISNOTbeingBiddedOn();
                this.itemsSold.push(item);
                this.itemsToAuction.splice(this.itemsToAuction.indexOf(item), 1)
            }
        }
        else {
            alert("Please make sure the item has at least one valid bid.")
        }
    }

    getItems(): Item[] {
        return this.itemsToAuction;
    }

    getSoldItems(): Item[] {
        return this.itemsSold;
    }

    startAuction() {
        this.isAuctionStarted = true
    }

    getAuctionStarted(): boolean {
        return this.isAuctionStarted;
    }

    getTotalFunds() {
        return this.totalFunds;
    }

    itemISbeingBiddedOn() {
        this.itemBeingBidded = true;
    }

    itemISNOTbeingBiddedOn() {
        this.itemBeingBidded = false;
    }

    getItemBeingBidded() {
        return this.itemBeingBidded;
    }
}