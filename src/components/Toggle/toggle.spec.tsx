import { render, screen, waitForElementToBeRemoved } from '@testing-library/react';
import Toggle from '.';
import userEvent from '@testing-library/user-event';


const user = userEvent.setup();

describe('Toggle Component', () => {
    beforeEach(() => {
        render(<Toggle />)
    })

    describe('Click the toggle button', () => {
        beforeEach( async() => {
            const toggleBtn = screen.getByRole('button', {
                name: /toggle/i
            })

            await user.click(toggleBtn);
        });


        test('after clicking the button it renders: Show content', () => {
            expect(screen.getByText(/Show content/)).toBeInTheDocument();
            expect(screen.getByRole('button', { name: /close/i }));
        });

        describe('click again: Show content will disappear', () => {
            beforeEach(async() => {
                const toggleBtn = screen.getByRole('button', {
                    name: /close/i
                })
    
                await user.click(toggleBtn);
            })

            test('Show content will disappear', () => {
                expect(screen.queryByText(/Show content/)).not.toBeInTheDocument();
                expect(screen.getByRole('button', { name: /toggle/i }));
            })
        })

    })

})