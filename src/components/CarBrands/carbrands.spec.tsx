import { render, screen, waitFor, waitForElementToBeRemoved } from '@testing-library/react';
import { MySwrConfig } from './MySwrConfig';
import CarBrands from '.';
import userEvent from '@testing-library/user-event';
import { mswServer } from '@/mocks/mswServer';
import { rest } from 'msw';
import { renderWithSWRConfig } from './MySwrConfig';

const user = userEvent.setup();

describe('Carbrands component', () => {

    beforeEach(() => {
        renderWithSWRConfig(
            <CarBrands />
        )
    })

    describe('When "Germany" is selected', () => {
        beforeEach(async() => {
            await waitForElementToBeRemoved(() => screen.getByText('Loading...'))

        });

        test('renders: "Car Brands from Germany"', () => {
            expect(screen.getByText("Car Brands from Germany")).toBeInTheDocument();
        })

    });

    describe('When "France" is selected', () => {
        beforeEach(async() => {

            const franceBtn = screen.getByRole('button', {
                name: /france/i
            });

            await user.click(franceBtn);

            await waitForElementToBeRemoved(() => screen.getByText('Loading...'));

        });

        test('renders: "Car Brands from France"', () => {
            expect(screen.getByText("Car Brands from France")).toBeInTheDocument();
        })

    });

    describe('When "Italy" is selected', () => {
        beforeEach(async() => {
            
            const italyBtn = screen.getByRole('button', {
                name: /italy/i
            });

            await user.click(italyBtn);

            await waitForElementToBeRemoved(() => screen.getByText('Loading...'));

        });

        test('renders: "Ooops, something went wrong"', async() => {
            expect(screen.getByText('Ooops, something went wrong')).toBeInTheDocument();
        })

    })

    describe('if the dtaa is null', () => {
        beforeEach(async() => {
            mswServer.use(
                rest.get('/api/cars', (req, res, ctx) => {
                    return res(
                        ctx.delay(100),
                        ctx.status(200),
                        ctx.json([])
                    )
                })
            );
        
            await waitForElementToBeRemoved(() => screen.getByText('Loading...'));

        })

        test('it renders: No data to show...', async() => {
            await waitFor(() => {
                expect(screen.getByText('No data to show...')).toBeInTheDocument()
            })
        })

    })

})