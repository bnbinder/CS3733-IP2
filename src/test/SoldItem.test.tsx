import { expect, test, vi, beforeEach } from 'vitest'
import { render } from '@testing-library/react'
import { Model } from '../model'
import SoldItemComponent from '../app/MainPage/SoldItem/SoldItemComponent'

let mockModel: Model
let mockAndRefreshDisplay: any
let mockSendUp: any

beforeEach(() => {
    mockModel = new Model('Test Auction')
    mockAndRefreshDisplay = vi.fn()
    mockSendUp = vi.fn()
})

test('each item has unique key', () => {
    mockModel.addItem('First Item', 100, 'Test Description')
    mockModel.getItems()[0].addBid('Test Bid', 150, 'Bid Description')

    mockModel.addItem('Second Item', 100, 'Test Description')
    mockModel.getItems()[1].addBid('Test Bid', 150, 'Bid Description')

    mockModel.sellItem(mockModel.getItems()[0].getKey())
    mockModel.sellItem(mockModel.getItems()[0].getKey())

    const { container } = render(
        <SoldItemComponent
            model={mockModel}
            andRefreshDisplay={mockAndRefreshDisplay}
            sendUp={mockSendUp}
        />
    )

    const listItems = container.querySelectorAll('li')
    expect(listItems.length).toBe(2)
})