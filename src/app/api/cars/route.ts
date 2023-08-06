import { NextResponse } from "next/server";


export async function GET(req: Request, res: Response) {

    await sleep1Second();

    const url = new URL(req.url);

    const name = url.searchParams.get('query');

    try {
        
        if(name === 'Italy') {
            return NextResponse.json({
                message: "Ooops, something went wrong"
            }, {status: 500})

        }

        if(name === 'France') {
            return NextResponse.json(['Peugeot', 'Citroen', 'Renault', 'Alpine', 'etc...'], { status: 200 })
        }

        if(name === 'Germany') {
            return NextResponse.json(['Mercedes', 'BMW', 'Audi', 'Porsche', 'VW', 'etc...'], { status: 200 });
        }
        
    }catch(e){
        return new Response("Could not fetch cars", { status: 500})
    }
}

function sleep1Second() {
    return new Promise((res) => {
        setTimeout(res, 1000);
    });
}