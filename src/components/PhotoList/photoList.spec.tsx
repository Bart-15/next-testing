import { fireEvent, render, screen, waitFor, waitForElementToBeRemoved } from "@testing-library/react";
import PhotoList from "./index";
import userEvent from '@testing-library/user-event';
import { rest } from 'msw';
import { mswServer } from "@/mocks/mswServer";

const user = userEvent.setup()

describe("Photo List component", () => {

  beforeEach( async() => {
    render(<PhotoList />);
    await waitForElementToBeRemoved(() => screen.getByText('Loading...'));
  })

  
  describe('initial render', () => {
    
    test('name = "" ', () => {
      const input = screen.getByLabelText('name-input')
      expect(input).toHaveValue("");
    })
  
    test('renders the Bart Tabusao as title', () => {
      expect(screen.getByText('Unknown: Bart Tabusao')).toBeInTheDocument()
    })
  })

  describe('the name state = "hello" ', () => {
    beforeEach(async () => {

      const input = screen.getByLabelText('name-input')
      await waitFor(() => user.type(input, "hello"))
    })

    test('expects to have value of "hello" ', () => {      
      const input = screen.getByLabelText('name-input')
      expect(input).toHaveValue("hello");
    });

  });


  describe('When the user typed "Test1"', () => {
    beforeEach(async () => {
        const input = screen.getByLabelText('name-input')
        await waitFor(() => user.type(input, "Test1"));
        await waitForElementToBeRemoved(() => screen.getByText('Loading...'));
    })

    test('it renders: Test1: Bart Tabusao', () => {
      expect(screen.getByText('Test1: Bart Tabusao')).toBeInTheDocument()
    })

  })

  describe('When the refresh button is clicked and the server returns status 500', () => {
    beforeEach(async() => {
      mswServer.use(
        rest.get<any, {message: string}>('/api/photos', (req, res, ctx) => {
          return res(ctx.delay(100),ctx.status(500), ctx.json({message: "Ooops something went wrong, please try again later."}));
        })
      );  

      const refreshBtn = screen.getByRole('button', {
        name: /refresh/i
      })

      await user.click(refreshBtn);
      await waitForElementToBeRemoved(() => screen.getByText('Loading...'));
    });

    test('it renders: "Ooops something went wrong, please try again later." ', () => {
      expect(screen.getByText('Ooops something went wrong, please try again later.')).toBeInTheDocument();
    })
  });

  describe('when clicking the "Add To Favourites" changes the button text', () => {
    beforeEach(async () => {
      const addFavBtn = screen.getByRole('button', {
        name: 'Add to Favourites'
      })
      
      await user.click(addFavBtn);
      await waitForElementToBeRemoved(() => screen.getByRole('button', {
        name: 'Add to Favourites'
      }));

    });

    test('it renders remove from favourites', () => {
      expect(screen.getByRole('button', { name: 'Remove from Favourites'})).toBeInTheDocument()
      expect(screen.queryByRole('button', { name: 'Add to Favourites'})).not.toBeInTheDocument()
    })
  })

});
