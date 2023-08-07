import { screen, render, waitForElementToBeRemoved, waitFor, fireEvent } from '@testing-library/react';
import SignIn from '.';
import userEvent from '@testing-library/user-event';
import debug from 'debug';

const user = userEvent.setup();

describe('SignIn Component', () => {

    beforeEach(async () => {
        jest.mock("react-hook-form", () => ({
            ...jest.requireActual("react-hook-form"),
            useFormContext: () => ( {
                handleSubmit: () => jest.fn(),
                getValues: () => jest.fn(),
            } ),
        }))

        render(<SignIn />)

        const submitBtn = screen.getByRole('button', {
            name: /sign in/i
        })

        await user.click(submitBtn);
    });


    describe('If the button is clicked and the email and password input are empty', () => {

        test('it renders: email: "This field is required", password: "Password must be at least 6 characters" ', () => {
            expect(screen.getByLabelText(/error-email/i)).toHaveTextContent('This field is required')
            expect(screen.getByLabelText(/error-password/i)).toHaveTextContent('Password must be at least 6 characters')
        })
    });

    describe('If user start typing at email field', () => {
        beforeEach(async() => {

            const emailInput = screen.getByRole('textbox', {
                name: /email address/i
            });

            await user.type(emailInput, 'hello');
            expect(screen.queryByText('This field is required')).not.toBeInTheDocument();
        });

        test('it renders: "Invalid email" If user input invalid', async () => {
            expect(screen.getByLabelText(/error-email/i)).toHaveTextContent('Invalid email')
        })

    });

    describe('User start typing on password field', () => {
        beforeEach(async () => {
            const passwordInput = screen.getByLabelText(/password-input/)

            await user.type(passwordInput, '{selectall}hi')
        })

        test('it renders: "Password must be at least 6 characters" If the password input length < 6', () => {
            expect(screen.getByLabelText(/error-password/i)).toHaveTextContent('Password must be at least 6 characters');
            expect(screen.getByLabelText(/password-input/)).toHaveValue('hi');
        });
    });


    describe('Signin inputs are valid', () => {
        beforeEach(async () => {
            const passwordInput = screen.getByLabelText(/password-input/)

            const emailInput = screen.getByRole('textbox', {
                name: /email address/i
            });
            
            await user.type(emailInput, '{selectall}balongtabusao@gmail.com');
            await user.type(passwordInput, '{selectall}hello12345')
        });

        test('it renders: email: "balongtabusao@gmail.com" No Email error message', async () => {
            expect(screen.getByRole('textbox', {
                name: /email address/i
            })).toHaveValue('balongtabusao@gmail.com');
            expect(screen.queryByText('Invalid email')).not.toBeInTheDocument();
        })  

        test('No Password error message', () => {
            expect(screen.getByLabelText(/password-input/)).toHaveValue('hello12345');
            expect(screen.queryByText('Password must be at least 6 characters')).not.toBeInTheDocument();
        })  
    })

})