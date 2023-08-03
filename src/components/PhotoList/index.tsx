"use client"

import { useState, useEffect } from "react";
import axios, { AxiosError } from 'axios';
import { Photo } from '@/models/Photo';
import Image from "next/image";


const PhotoList = () => {
    const [name, setName] = useState<string>("");
    const [refresh, setRefresh] = useState(0);


    return ( 
        <div>
            <button aria-label="refresh" className="text-white bg-zinc-900 rounded px-4 py-0.5 mb-6" onClick={() => setRefresh(prev => ++prev)}>Refresh</button>
            <h1 className="mb-6 font-bold md:text-2xl lg:text-3xl">Photo List</h1>
                <div className="container mb-4">
                    <input aria-label="name-input" value={name} onChange={(e) => setName(e.target.value)} type="text" className="w-full rounded-lg focus:outline-none px-3 py-2 max-w-full" placeholder="Search Here..."  />
                </div>
            <List refresh={refresh} name={name} />
        </div>
    );
}

export default PhotoList;


function List({ refresh, name }: { refresh: number; name: string }) {
    const [loading, setLoading] = useState(0);
    const [photos, setPhotos] = useState<Photo[]>([]);
    const [error, setError] = useState('');

    useEffect(() => {
    //     async function load() {
    //     setLoading((l) => l + 1);

    //     try {
    //         const r = await axios.get<Photo[]>(`/api/photos?name=${name}`);
    //         setPhotos(r.data);
    //         setError('');
    //     } catch (e) {
    //         if(e instanceof AxiosError) {
    //             setError(e.response?.data.message);
                
    //         }
    //     } finally {
    //         setLoading((l) => l - 1);
    //     }
    // }

    async function load() {
      setLoading(l => l+1);

      try {
        const r = await fetch(`/api/photos?name=${name}`);
        const json = await r.json();

        if (!r.ok) {
          throw new Error(json.message);
        }

        setPhotos(json);
        setError('');
      } catch (e) {
        setError(e.message);
      } finally {
        setLoading(l => l-1);
      }
    }

        void load();
    }, [refresh, name]);

    return (
        <div className="flex flex-col gap-6 relative">
            { loading ? <p>Loading...</p> : null}
            { error ? <p className="text-red-600">{error}</p> : null}
            {
                photos.map((photo) => {
                    return (
                        <PhotoDetail photo={photo} key={photo.id}/>
                    )
                })
            }
        </div>
    )
}

function PhotoDetail({ photo }: { photo: Photo }) {
    const [favourite, setFavourite] = useState(false);

    useEffect(() => {
        setFavourite(false);
    }, [photo]);


    async function handleAddFav(photo: Photo) {
        const res =  await axios.post<Photo>('/api/favourite', {...photo, favourite});
        setFavourite(res.data.favourite);
    }

    return (
        <div className="flex flex-col items-center grow-0 shrink-0 bg-white border border-gray-200 rounded-lg shadow md:flex-row md:max-w-xl hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700">
            <Image src={photo.thumbnailUrl} alt="image" width="200" height="300" className="object-fill w-full rounded-t-lg h-96 md:h-auto md:w-48 md:rounded-none md:rounded-l-lg"/>
            <div className="flex flex-col justify-between p-4 leading-normal">
                <h3 className="mb-2 text-1xl font-bold tracking-tight text-gray-900 dark:text-white">{photo.title}</h3>
                <button onClick={() => handleAddFav(photo)} className="text-white rounded-lg bg-zinc-900">{favourite ? 'Remove from Favourites' : 'Add to Favourites'}</button>
            </div>
        </div>
    )
}
