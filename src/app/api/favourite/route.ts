import { Photo } from '@/models/Photo';
import { NextResponse } from 'next/server';

const makeResponseSlow = async () => new Promise((a) => setTimeout(a, 1000));

export async function POST(req: Request, res: Response){

    try {    
    
        await makeResponseSlow();
    
        const body = await req.json() as Photo;

        const newPhoto = { ...body, favourite: !body.favourite };
        return NextResponse.json(newPhoto, { status: 200});

    }catch(e) {
        return new Response("Could not add on favorites", { status: 500})
    }
}