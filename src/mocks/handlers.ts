import { photosHandler } from "./api/photos";
import { jsonPlaceHolderHandlers } from "./api/jsonplaceholder";
import { carsHandlers } from "./api/cars";

export const handlers = [
    ...photosHandler,
    ...jsonPlaceHolderHandlers,
    ...carsHandlers
]