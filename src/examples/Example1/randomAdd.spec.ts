import { randomAdd } from "./RandomBetween";

const randomSpy = jest.spyOn(Math, 'random');

describe("Random Add", () => {

    describe("When math.random is called and equal to 7", () => {
        beforeEach(() => {
            randomSpy.mockClear().mockReturnValue(7);
        })

        test("Math.ranmdom = 7 and number = 3, the return value is 10", () => {
            expect(randomAdd(3)).toBe(10);
            expect(Math.random).toHaveBeenCalledTimes(1);
        })

    });

    describe("When math.random is called and equal to 5", () => {
        beforeEach(() => {
            randomSpy.mockClear().mockReturnValue(5);
        })

        test("Math.ranmdom = 5 and number = 3, the return value is 8", () => {
            expect(randomAdd(3)).toBe(8);
            expect(Math.random).toHaveBeenCalledTimes(1);
        })

    })

    
    describe("When math.random is called and equal to 10", () => {
        beforeEach(() => {
            randomSpy.mockClear().mockReturnValue(10);
        })

        test("Math.ranmdom = 5 and number = 3, the return value is 8", () => {
            expect(randomAdd(3)).toBe(13);
            expect(Math.random).toHaveBeenCalledTimes(1);
        })

    })


})