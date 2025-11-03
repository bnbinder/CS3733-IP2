export class Bid {
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
}

export class Item {
    name: string;
    private initialBid: number;
    private description: string;
    private imageSrc: string;
    private auctioned: boolean;
    private bids: Bid[];
    key: number;

    constructor(name: string, initialBid: number, description: string) {
        this.name = name;
        this.initialBid = initialBid;
        this.description = description;
        this.imageSrc = "do i really want to implement this";
        this.auctioned = false;
        this.bids = [];
        this.key = Date.now();
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
}

export class Model {
    private itemsToAuction: Item[];
    private itemsSold: Item[];
    private auctionName: string;
    private isAuctionStarted: boolean

    constructor(auctionName: string) {
        this.itemsToAuction = []
        this.itemsSold = []
        this.auctionName = auctionName;
        this.isAuctionStarted = false;
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
        var item: Item = new Item("", 0, "");
        this.itemsToAuction.forEach(itemm => {
            if (itemm.getKey() == key) {
                item = itemm;
            }
        });
        if (item) {
            if (item.getAuctioned()) {
                alert("cant sell what has been sold. words to live by")
            }
            else {
                item.setAuctioned();
                this.itemsSold.push(item);
                this.itemsToAuction.splice(this.itemsToAuction.indexOf(item), 1)
            }
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
}