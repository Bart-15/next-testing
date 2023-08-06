import {rest} from "msw";
import { Photo } from "@/models/Photo";

export const photosHandler = [
  rest.post<Photo>('/api/favourite', async (req, res, ctx) => {
      const photo = await req.json();
      return res(
        ctx.delay(200),
        ctx.json({ ...photo, favourite: !photo.favourite })
      );
    }),
  
    rest.get('/api/photos', (req, res, ctx) => {
      const name = req.url.searchParams.get('name') || 'Unknown';
      return res(
          ctx.delay(100),
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
    
];
