export class Bid {
    private name: string;
    private bid: number;
    private imageSrc: string;

    constructor(name: string, bid: number, description: string) {
        this.name = name;
        this.bid = bid;
        this.imageSrc = "do i really want to implement this";
    }
}

export class Item {
    name: string;
    private initialBid: number;
    private description: string;
    private imageSrc: string;
    private auctioned: boolean;
    private bidders: Bid[];
    key: number;

    constructor(name: string, initialBid: number, description: string) {
        this.name = name;
        this.initialBid = initialBid;
        this.description = description;
        this.imageSrc = "do i really want to implement this";
        this.auctioned = false;
        this.bidders = [];
        this.key = Date.now();
    }

    getKey() {
        return this.key;
    }
}

export class Model {
    private itemsToAuction: Item[];
    private itemsSold : Item[];
    private auctionName: string;
    private isAuctionStarted : boolean

    constructor(auctionName: string) {
        this.itemsToAuction = []
        this.itemsSold = []
        this.auctionName = auctionName;
        this.isAuctionStarted = false;
    }

    addItem(name: string, initialBid: number, description: string): void {
        this.itemsToAuction.push(new Item(name, initialBid, description));
    }

    removeItem(key : number){
        var item : Item = new Item("",0,"");
        this.itemsToAuction.forEach(itemm => {
            if(itemm.getKey() == key){
                item = itemm;
            }
        });
        this.itemsToAuction.splice(this.itemsToAuction.indexOf(item), 1)
    }
    sellItem(key : number){
        var item : Item = new Item("",0,"");
        this.itemsToAuction.forEach(itemm => {
            if(itemm.getKey() == key){
                item = itemm;
            }
        });
        this.itemsSold.push(item);
        this.itemsToAuction.splice(this.itemsToAuction.indexOf(item), 1)
    }

    getItems(): Item[] {
        return this.itemsToAuction;
    }

    getSoldItems(): Item[]{
        return this.itemsSold;
    }

    getAuctionStarted(): boolean{
        return this.isAuctionStarted;
    }

    startAuction() {
        this.isAuctionStarted = !(this.isAuctionStarted);
    }
}