import { render, waitForElementToBeRemoved, screen, waitFor } from '@testing-library/react';
import User from '.';


describe('User Component', () => {
    beforeEach(async() => {
        render(<User />);
        await waitForElementToBeRemoved(() => screen.getByText('Loading...'))
    })

    test('It expect to have names of Bart, Yohan and Erwin', async () => {
        await waitFor(() => {
            const names = screen.getByText(/Bart/i)
    
            expect(names).toBeInTheDocument();
        })
    })  
})