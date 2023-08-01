import { fireEvent, render, screen, act, waitFor, waitForElementToBeRemoved } from '@testing-library/react';
import Counter from './index';
import userEvent from '@testing-library/user-event';

const user = userEvent.setup()

type TestElement = Document | Element | Window | Node

function hasInputValue(e: TestElement, inputValue: string) {
  return screen.getByDisplayValue(inputValue) === e
}

describe("Counter Component",() => {

    describe('defaultCounter = 10, description="WWW"', () => {
        beforeEach(() => {
            render(<Counter description="WWW" defaultCounter={10}/> )
        })

        test("it renders: Current count: 10", () => {
            expect(screen.getByText('Current count: 10')).toBeInTheDocument();
        });

        test('it renders: description="WWW"', async() => {
            expect(screen.getByText(/www/i)).toBeInTheDocument();
        });

        describe('When the incrementor is change to 5 and the + button is clicked', () => {
            beforeEach(async () => {

                const input = screen.getByLabelText('inc-input')
                fireEvent.change(input,  {
                    target: {
                        value: `5`
                    }
                });
                fireEvent.click(screen.getByRole('button', { name : /increment/}));
                await waitForElementToBeRemoved(() => screen.queryByText('This is too small'));
            });

            test('Current count will be: Current count: 15', async () => {
                await waitFor(() => expect(screen.getByText("Current count: 15")).toBeInTheDocument())
            });

            // test('it renders isBig and will disappear after 300ms', async () => {
            // })
        })

        describe('When the incrementor is change to 25 and the - button is clicked', () => {
            beforeEach(() => {
                const input = screen.getByLabelText('inc-input')
                fireEvent.change(input,  {
                    target: {
                        value: `25`
                    }
                });
                fireEvent.click(screen.getByRole('button', { name : /decrement/}));
            });

            test('Current count will be: Current count: -15', () => {
                expect(screen.getByText("Current count: -15")).toBeInTheDocument();
            });
        })

        describe('When the reset click the Current Count = 0', () => {
            beforeEach(() => {
                fireEvent.click(screen.getByRole('button', { name: /reset/i }));
            });

            test('it renders: Current Count: 0', () => {
                expect(screen.getByText("Current count: 0")).toBeInTheDocument();
            })

            test('it renders: inc-input to 1', () => {
                const input = screen.getByLabelText('inc-input');

                expect(hasInputValue(input, "1")).toBe(true);

            })
        })
    })

    describe("defaultConter = 0 and description is 'Bart Counter'", () => {
        beforeEach(() => {
            render(<Counter defaultCounter={0} description="Bart Counter"/>)
        })

        test("it renders: Current count: 0", () => {
            expect(screen.getByText("Current count: 0")).toBeInTheDocument()
        });

        test("it renders: description: Bart Counter", () => {
            expect(screen.getByText("Bart Counter")).toBeInTheDocument()
        })
        

        describe("When the + is clicked", () =>{
            beforeEach(() => {
                fireEvent.click(screen.getByRole('button', { name : /increment/}));
            })

            test("it renders: default counter = 0 and Current count: 1", async () => {
                await waitFor(() => expect(screen.getByText("Current count: 1")).toBeInTheDocument())
            })

        })

        describe("When the - is clicked", () => {
            beforeEach(() => {
                fireEvent.click(screen.getByRole('button', { name : /decrement/}));
            });
            

            test("it renders: default counter = 0 and Current count: -1", () => {
                expect(screen.getByText("Current count: -1")).toBeInTheDocument();
            })        
        })

    })
})