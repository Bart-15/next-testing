import { rest } from 'msw'

const mockedGermanCars = ['Mercedes', 'BMW', 'Audi', 'Porsche', 'VW', 'etc...']
const mockedFranceCars = ['Peugeot', 'Citroen', 'Renault', 'Alpine', 'etc...']
export const carsHandlers = [
    rest.get('/api/cars', (req, res, ctx) => {
        const query = req.url.searchParams.get('query');
        console.log(query);

        if(query === 'Germany') {
            return res(
                ctx.delay(100),
                ctx.status(200),
                ctx.json(mockedGermanCars)
            )
        };

        if(query === 'France') {
            return res(
                ctx.delay(100),
                ctx.status(200),
                ctx.json(mockedGermanCars)
            )
        };


        if(query === 'Italy') {
            return res(
                ctx.delay(100),
                ctx.status(500),
                ctx.json({
                    message: "Ooops, something went wrong"
                })
            )
        }
    }),
]