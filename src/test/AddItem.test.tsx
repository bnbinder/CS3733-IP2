import { expect, test, vi, beforeEach } from 'vitest'
import { screen, render, fireEvent } from '@testing-library/react'
import { Item, Model } from '../model'
import AddItem from '../app/MainPage/AddItem/AddItem'

let mockModel: Model
let mockItem: Item
let mockAndRefreshDisplay: any
let mockGetStarted: any
let alertSpy: any

beforeEach(() => {
    mockModel = new Model('Test Auction')
    mockItem = new Item('Test Item', 100, 'Test Description')
    mockAndRefreshDisplay = vi.fn()
    mockGetStarted = vi.fn()
    alertSpy = vi.fn()
    global.alert = alertSpy
})

test('alerts if description is empty when adding item', () => {
    mockGetStarted.mockReturnValue(false)
    const { getByLabelText, getByText } = render(
        <AddItem
            item={mockItem}
            model={mockModel}
            andRefreshDisplay={mockAndRefreshDisplay}
            getStarted={mockGetStarted}
        />
    )

    const nameInput = getByLabelText(/Name:/i) as HTMLInputElement
    fireEvent.change(nameInput, { target: { name: 'name', value: 'Test' } })

    const addButton = getByText('Add Item') as HTMLElement
    fireEvent.click(addButton)

    expect(alertSpy).toHaveBeenCalledWith('please type a name and description.')
})

test('alerts if initialBid is e when adding item', () => {
    mockGetStarted.mockReturnValue(false)
    const { getByLabelText, getByText } = render(
        <AddItem
            item={mockItem}
            model={mockModel}
            andRefreshDisplay={mockAndRefreshDisplay}
            getStarted={mockGetStarted}
        />
    )

    const nameInput = getByLabelText(/Name:/i) as HTMLInputElement
    const descInput = getByLabelText(/Description:/i) as HTMLTextAreaElement
    const bidInput = getByLabelText(/Initial Bid:/i) as HTMLInputElement

    fireEvent.change(nameInput, { target: { name: 'name', value: 'Test' } })
    fireEvent.change(descInput, { target: { name: 'description', value: 'Test Description' } })
    fireEvent.change(bidInput, { target: { name: 'initialBid', value: 'e' } })

    const addButton = getByText('Add Item') as HTMLElement
    fireEvent.click(addButton)

    expect(alertSpy).toHaveBeenCalledWith('please type a valid number.')
})


test('resets form after successful item add', () => {
    mockGetStarted.mockReturnValue(false)

    const { getByLabelText, getByText } = render(
        <AddItem
            item={mockItem}
            model={mockModel}
            andRefreshDisplay={mockAndRefreshDisplay}
            getStarted={mockGetStarted}
        />
    )

    const nameInput = getByLabelText(/Name:/i) as HTMLInputElement
    const bidInput = getByLabelText(/Initial Bid:/i) as HTMLInputElement
    const descInput = getByLabelText(/Description:/i) as HTMLTextAreaElement

    fireEvent.change(nameInput, { target: { name: 'name', value: 'Valid Item' } })
    fireEvent.change(bidInput, { target: { name: 'initialBid', value: '200' } })
    fireEvent.change(descInput, { target: { name: 'description', value: 'Valid Description' } })

    const addButton = getByText('Add Item') as HTMLElement
    fireEvent.click(addButton)

    expect(nameInput.value).toBe('')
    expect(bidInput.value).toBe('0')
    expect(descInput.value).toBe('')
})

test('alerts if name is empty when adding bid', () => {
    mockGetStarted.mockReturnValue(true)
    mockItem.itemISbeingBiddedOn()
    mockModel.itemISbeingBiddedOn()

    const { getByText } = render(
        <AddItem
            item={mockItem}
            model={mockModel}
            andRefreshDisplay={mockAndRefreshDisplay}
            getStarted={mockGetStarted}
        />
    )

    const addBidButton = getByText('Add Bid') as HTMLElement
    fireEvent.click(addBidButton)

    expect(alertSpy).toHaveBeenCalledWith('please type a name.')
})

test('alerts if bid is NaN when adding bid', () => {
    mockGetStarted.mockReturnValue(true)
    mockItem.itemISbeingBiddedOn()
    mockModel.itemISbeingBiddedOn()

    const { getByLabelText, getByText } = render(
        <AddItem
            item={mockItem}
            model={mockModel}
            andRefreshDisplay={mockAndRefreshDisplay}
            getStarted={mockGetStarted}
        />
    )

    const nameInput = getByLabelText(/Name:/i) as HTMLInputElement
    const bidInput = getByLabelText(/^Bid$/) as HTMLInputElement

    fireEvent.change(nameInput, { target: { name: 'name', value: 'Bidder' } })
    fireEvent.change(bidInput, { target: { name: 'initialBid', value: NaN } })

    const addBidButton = getByText('Add Bid') as HTMLElement
    fireEvent.click(addBidButton)

    expect(alertSpy).toHaveBeenCalledWith('please type a valid number.')
})

test('adds bid successfully when higher than both initial bid and top bid', () => {
    mockGetStarted.mockReturnValue(true)
    mockItem.itemISbeingBiddedOn()
    mockModel.itemISbeingBiddedOn()
    mockItem.addBid('Previous Bidder', 150, 'Previous bid')
    const addBidSpy = vi.spyOn(mockItem, 'addBid')

    const { getByLabelText, getByText } = render(
        <AddItem
            item={mockItem}
            model={mockModel}
            andRefreshDisplay={mockAndRefreshDisplay}
            getStarted={mockGetStarted}
        />
    )

    const nameInput = getByLabelText(/Name:/i) as HTMLInputElement
    const bidInput = getByLabelText(/^Bid$/) as HTMLInputElement

    fireEvent.change(nameInput, { target: { name: 'name', value: 'Higher Bidder' } })
    fireEvent.change(bidInput, { target: { name: 'initialBid', value: '250' } })

    const addBidButton = getByText('Add Bid') as HTMLElement
    fireEvent.click(addBidButton)

    expect(addBidSpy).toHaveBeenCalledWith('Higher Bidder', '250', '')
})

test('handles already auctioned item', () => {
    mockGetStarted.mockReturnValue(true)
    mockItem.itemISbeingBiddedOn()
    mockModel.itemISbeingBiddedOn()
    mockItem.setAuctioned()

    const { getByLabelText, getByText } = render(
        <AddItem
            item={mockItem}
            model={mockModel}
            andRefreshDisplay={mockAndRefreshDisplay}
            getStarted={mockGetStarted}
        />
    )

    const nameInput = getByLabelText(/Name:/i) as HTMLInputElement
    const bidInput = getByLabelText(/^Bid$/) as HTMLInputElement

    fireEvent.change(nameInput, { target: { name: 'name', value: 'Bidder' } })
    fireEvent.change(bidInput, { target: { name: 'initialBid', value: '200' } })

    const addBidButton = getByText('Add Bid') as HTMLElement
    fireEvent.click(addBidButton)

    expect(alertSpy).toHaveBeenCalledWith('Please make sure the bid is higher than the initial bid and any bids presently active.')
})

test('does not show "Please Start An Auction" when item is being bidded', () => {
    mockGetStarted.mockReturnValue(true)
    mockItem.itemISbeingBiddedOn()
    mockModel.itemISNOTbeingBiddedOn()

    render(
        <AddItem
            item={mockItem}
            model={mockModel}
            andRefreshDisplay={mockAndRefreshDisplay}
            getStarted={mockGetStarted}
        />
    )

    const messages = screen.queryAllByText('Please Start An Auction')
    expect(messages.length).toBe(0)
})

test('does not show "Please Start An Auction" when model is being bidded', () => {
    mockGetStarted.mockReturnValue(true)
    mockItem.itemISNOTbeingBiddedOn()
    mockModel.itemISbeingBiddedOn()

    render(
        <AddItem
            item={mockItem}
            model={mockModel}
            andRefreshDisplay={mockAndRefreshDisplay}
            getStarted={mockGetStarted}
        />
    )

    const messages = screen.queryAllByText('Please Start An Auction')
    expect(messages.length).toBe(0)
})