import { expect, test, vi, beforeEach } from 'vitest'
import { render } from '@testing-library/react'
import { Item, Model } from '../model'
import CurrentBidsListComponent from '../app/MainPage/CurrentBidsList/CurrentBidsListComponent'

let mockModel: Model
let mockItem: Item
let mockAndRefreshDisplay: any

beforeEach(() => {
    mockModel = new Model('Test Auction')
    mockItem = new Item('Test Item', 100, 'Test Description')
    mockAndRefreshDisplay = vi.fn()
})

test('renders single bid in the list', () => {
    mockItem.addBid('Test Bid', 150, 'Test Description')

    const { container } = render(
        <CurrentBidsListComponent
            item={mockItem}
            model={mockModel}
            andRefreshDisplay={mockAndRefreshDisplay}
        />
    )

    const list = container.querySelector('#items') as HTMLElement
    expect(list).toBeDefined()
    expect(list.children.length).toBe(1)
})