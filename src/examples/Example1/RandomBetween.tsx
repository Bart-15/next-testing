export function randomBetween(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1) + min)
}

export function randomAdd(num: number): number {
    return Math.floor(Math.random() + num);
}