import { expect, test, vi, beforeEach } from 'vitest'
import { Item, Model } from '../model'

let mockModel: Model
let alertSpy: any

beforeEach(() => {
    mockModel = new Model('Test Auction')
    alertSpy = vi.fn()
    global.alert = alertSpy
})

test('sellItem successfully sells item with valid bid higher than initial bid', () => {
    mockModel.addItem('Test Item', 100, 'Test Description')
    const item = mockModel.getItems()[0]
    item.addBid('Bidder', 150, 'Valid Bid')

    const itemKey = item.getKey()
    const initialFunds = mockModel.getTotalFunds()

    mockModel.sellItem(itemKey)

    expect(mockModel.getItems().length).toBe(0)
    expect(mockModel.getSoldItems().length).toBe(1)
    expect(mockModel.getTotalFunds()).toBe(initialFunds + 50)
})

test('sellItem shows alert when item has no bids', () => {
    mockModel.addItem('Test Item', 100, 'Test Description')
    const itemKey = mockModel.getItems()[0].getKey()

    mockModel.sellItem(itemKey)

    expect(alertSpy).toHaveBeenCalledWith('Please make sure the item has at least one valid bid.')
})

test('removeBid removes bid from item', () => {
    const item = new Item('Test Item', 100, 'Test Description')
    item.addBid('Bidder 1', 150, 'Bid 1')
    item.addBid('Bidder 2', 200, 'Bid 2')

    const bidToRemove = item.getBids()[0]
    item.removeBid(bidToRemove.getKey())

    expect(item.getBids().length).toBe(1)
})