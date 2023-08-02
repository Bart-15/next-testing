import type { NextApiRequest, NextApiResponse } from 'next';
import { Photo } from '@/models/Photo';
import { NextResponse } from 'next/server';

const makeResponseSlow = async () => new Promise((a) => setTimeout(a, 1000));

export async function GET(req: Request, res: NextApiResponse<Photo[] | { message: string }>) {
    const url = new URL(req.url);

    const name = url.searchParams.get('name');

    try {
    await makeResponseSlow();

    // return NextResponse.json({
    //     message: "Ooops, something went wrong"
    // }, {status: 500})


    return NextResponse.json([
        {
            id: 1,
            title: `${
                name?.toString() || 'Unknown'
            }: accusamus beatae ad facilis cum similique qui sunt`,
            thumbnailUrl: `https://picsum.photos/150/150?${Math.random()}`,
            favourite: false,
        },
        {
            id: 2,
            title: 'reprehenderit est deserunt velit ipsam',
            thumbnailUrl: `https://picsum.photos/150/150?${Math.random()}`,
            favourite: false,
        },
        {
            id: 3,
            title: 'officia porro iure quia iusto qui ipsa ut modi',
            thumbnailUrl: `https://picsum.photos/150/150?${Math.random()}`,
            favourite: false,
        },
        {
            id: 4,
            title: 'culpa odio esse rerum omnis laboriosam voluptate repudiandae',
            thumbnailUrl: `https://picsum.photos/150/150?${Math.random()}`,
            favourite: false,
        },
        {
            id: 5,
            title: 'natus nisi omnis corporis facere molestiae rerum in',
            thumbnailUrl: `https://picsum.photos/150/150?${Math.random()}`,
            favourite: false,
        },
    ], {status: 200})


    } catch(e) {
        return NextResponse.json({
            message: "Ooops something went wrong, please try again later.",
        }, {status: 500})
    }
}
