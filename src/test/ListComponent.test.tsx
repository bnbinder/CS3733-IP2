import { expect, test, vi, beforeEach } from 'vitest'
import { render } from '@testing-library/react'
import { Model } from '../model'
import ListComponent from '../app/MainPage/ListItem/ListComponent'

let mockModel: Model
let mockAndRefreshDisplay: any
let mockSendUp: any

beforeEach(() => {
    mockModel = new Model('Test Auction')
    mockAndRefreshDisplay = vi.fn()
    mockSendUp = vi.fn()
})

test('each item has unique key', () => {
    mockModel.addItem('First Item', 100, 'First Item')
    mockModel.addItem('Second Item', 100, 'Second Item')

    const { container } = render(
        <ListComponent
            model={mockModel}
            andRefreshDisplay={mockAndRefreshDisplay}
            sendUp={mockSendUp}
        />
    )

    const listItems = container.querySelectorAll('li')
    expect(listItems.length).toBe(2)
})