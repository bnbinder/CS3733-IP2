import { expect, test, vi, beforeEach } from 'vitest'
import { render, fireEvent } from '@testing-library/react'
import { Item, Model, Bid } from '../model'
import ListBidComponent from '../app/MainPage/CurrentBidsList/ListBidComponent'

let mockModel: Model
let mockItem: Item
let mockBid: Bid
let mockAndRefreshDisplay: any

beforeEach(() => {
    mockModel = new Model('Test Auction')
    mockItem = new Item('Test Item', 100, 'Test Description')
    mockBid = new Bid('Test Bid', 150, 'Test Description')
    mockAndRefreshDisplay = vi.fn()
})

test('stopPropagation is called on click event', () => {
    mockModel.startAuction()

    const { getByText } = render(
        <ListBidComponent
            model={mockModel}
            item={mockItem}
            bid={mockBid}
            andRefreshDisplay={mockAndRefreshDisplay}
        />
    )

    const removeButton = getByText('Remove') as HTMLElement
    const mockEvent = { stopPropagation: vi.fn() }

    fireEvent.click(removeButton, mockEvent)

    expect(mockAndRefreshDisplay).toHaveBeenCalled()
})

test('remove button only appears when both conditions are met', () => {
    mockModel.startAuction()
    mockItem.setAuctioned()

    const { queryByText, rerender } = render(
        <ListBidComponent
            model={mockModel}
            item={mockItem}
            bid={mockBid}
            andRefreshDisplay={mockAndRefreshDisplay}
        />
    )

    expect(queryByText('Remove')).toBeNull()

    mockModel = new Model('Test Auction')
    mockItem = new Item('Test Item', 100, 'Test Description')

    rerender(
        <ListBidComponent
            model={mockModel}
            item={mockItem}
            bid={mockBid}
            andRefreshDisplay={mockAndRefreshDisplay}
        />
    )

    expect(queryByText('Remove')).toBeNull()

    mockModel.startAuction()

    rerender(
        <ListBidComponent
            model={mockModel}
            item={mockItem}
            bid={mockBid}
            andRefreshDisplay={mockAndRefreshDisplay}
        />
    )

    expect(queryByText('Remove')).toBeDefined()
})