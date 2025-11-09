import { expect, test, vi, beforeEach } from 'vitest'
import { render, fireEvent } from '@testing-library/react'
import { Item, Model } from '../model'
import ListItemComponent from '../app/MainPage/ListItem/ListItemComponent'

let mockModel: Model
let mockItem: Item
let mockAndRefreshDisplay: any
let mockSendUp: any

beforeEach(() => {
    mockModel = new Model('Test Auction')
    mockItem = new Item('Test Item', 100, 'Test Description')
    mockAndRefreshDisplay = vi.fn()
    mockSendUp = vi.fn()
})

test('stopPropagation is called on click event', () => {
    const { getByText } = render(
        <ListItemComponent
            model={mockModel}
            item={mockItem}
            andRefreshDisplay={mockAndRefreshDisplay}
            sendUp={mockSendUp} />
    )

    const removeButton = getByText('Remove') as HTMLElement
    const mockEvent = { stopPropogration: vi.fn() }

    fireEvent.click(removeButton, mockEvent)

    expect(mockAndRefreshDisplay).toHaveBeenCalled()
})

test('remove button only appears when condition is met', () => {

    const { queryByText, rerender } = render(
        <ListItemComponent
            model={mockModel}
            item={mockItem}
            andRefreshDisplay={mockAndRefreshDisplay}
            sendUp={mockSendUp}
        />
    )

    expect(queryByText('Remove')).toBeDefined()

    mockModel.startAuction()

    rerender(
        <ListItemComponent
            model={mockModel}
            item={mockItem}
            andRefreshDisplay={mockAndRefreshDisplay}
            sendUp={mockSendUp}
        />
    )

    expect(queryByText('Remove')).toBeNull()
})

test('sendUp is called when pressed', () => {
    const { getByText } = render(
        <ListItemComponent
            model={mockModel}
            item={mockItem}
            andRefreshDisplay={mockAndRefreshDisplay}
            sendUp={mockSendUp} />
    )

    const clickableItem = getByText('Test Item') as HTMLElement

    fireEvent.click(clickableItem)

    expect(mockSendUp).toHaveBeenCalled()
})

test('different text is displayed when auction is started and item is auctioned', () => {

    mockModel.startAuction()
    mockItem.setAuctioned()

    const { queryByText } = render(
        <ListItemComponent
            model={mockModel}
            item={mockItem}
            andRefreshDisplay={mockAndRefreshDisplay}
            sendUp={mockSendUp} />
    )

    expect(queryByText('Final Bid')).toBeDefined()
})