import { render, screen, waitFor, waitForElementToBeRemoved } from "@testing-library/react";
import PhotoList from "./index";
import { Photo } from "@/models/Photo";
import userEvent from '@testing-library/user-event';

import { setupServer } from 'msw/node';
import { rest } from 'msw';

const server = setupServer(
  rest.post('/api/favourite', async (req, res, ctx) => {
    const photo = await req.json();
    return res(
      ctx.delay(200),
      ctx.json({ ...photo, favourite: !photo.favourite })
    );
  }),

  rest.get('/api/photos', (req, res, ctx) => {
    const name = req.url.searchParams.get('name') || 'Unknown';
    return res(
      //   ctx.delay(100),
      ctx.json([
        {
          id: 1,
          thumbnailUrl: '/photo1.png',
          title: name + ': Bart Tabusao',
          favourite: false,
        },
      ])
    );
  })
);

beforeAll(() => server.listen());
afterAll(() => server.close());
afterEach(() => server.resetHandlers());


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
      expect(screen.getByText(/Bart Tabusao/i)).toBeInTheDocument()
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

});
