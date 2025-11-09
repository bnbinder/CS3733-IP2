import { expect, test, vi, beforeEach } from 'vitest'
import { render, fireEvent } from '@testing-library/react'
import { Item, Model } from '../model'
import CurrentItemComponent from '../app/MainPage/CurrentItem/CurrentItemComponent'

let mockModel: Model
let mockItem: Item
let mockAndRefreshDisplay: any
let mockSendUp: any
let mockGetStarted: any

beforeEach(() => {
    mockModel = new Model('Test Auction')
    mockModel.addItem('Test Item', 100, 'Test Description')
    mockItem = mockModel.getItems()[0]
    mockAndRefreshDisplay = vi.fn()
    mockSendUp = vi.fn()
    mockGetStarted = vi.fn()
})

test('sendUp is called with empty item on sell', () => {
    mockGetStarted.mockReturnValue(true)
    mockItem.itemISbeingBiddedOn()
    mockModel.itemISbeingBiddedOn()
    mockItem.addBid('Bidder', 150, 'A bid')

    const { getByText } = render(
        <CurrentItemComponent
            model={mockModel}
            item={mockItem}
            andRefreshDisplay={mockAndRefreshDisplay}
            sendUp={mockSendUp}
            getStarted={mockGetStarted}
        />
    )

    const sellButton = getByText('Sell Item') as HTMLElement
    fireEvent.click(sellButton)

    expect(mockSendUp).toHaveBeenCalled()
    const calledArg = mockSendUp.mock.calls[0][0]
    expect(calledArg.getName()).toBe('')
    expect(calledArg.getInitialBid()).toBe(-1)
    expect(calledArg.getDescription()).toBe('')
})

test('calls startBidForItem when start auction button clicked', () => {
    mockGetStarted.mockReturnValue(true)
    mockItem.itemISNOTbeingBiddedOn()
    mockModel.itemISNOTbeingBiddedOn()
    const itemBiddingSpy = vi.spyOn(mockItem, 'itemISbeingBiddedOn')
    const modelBiddingSpy = vi.spyOn(mockModel, 'itemISbeingBiddedOn')

    const { getByText } = render(
        <CurrentItemComponent
            model={mockModel}
            item={mockItem}
            andRefreshDisplay={mockAndRefreshDisplay}
            sendUp={mockSendUp}
            getStarted={mockGetStarted}
        />
    )

    const startButton = getByText('Start Auction') as HTMLElement
    fireEvent.click(startButton)

    expect(itemBiddingSpy).toHaveBeenCalled()
    expect(modelBiddingSpy).toHaveBeenCalled()
    expect(mockAndRefreshDisplay).toHaveBeenCalled()
})