import {getUser} from "./getUsers";
import {findUser} from "./";

jest.mock('./'); // will mock the whole file


describe.skip("When testing getUser with jest mock", () => {
    const findUserMock = findUser as jest.Mock

    describe("should return active user", () => {
        beforeEach(() => {
            findUserMock.mockResolvedValue({
                id: 10,
                username: 'mocked username',
                active: true
            })
        });

        afterEach(() => {
            findUserMock.mockClear();
        })

        test('it returns: id = "10", username = "mocked username", and active = true ', async() => {
            const user = await getUser(10); // any number 

            expect(findUserMock).toBeCalledTimes(1);

            expect(user.id).toBe(10);
            expect(user.username).toBe('mocked username');
            expect(user.active).toBeTruthy();
        })

    });

    describe('should return inactive user', () => {
        beforeEach(() => {
            findUserMock.mockResolvedValue({
                id: 11,
                username: 'mocked username',
                active: false
            })
        })

        test('it returns: id = "11", username = "mocked username", and active = true ', async() => {
            const user = await getUser(10); // any number 

            expect(findUserMock).toBeCalledTimes(1); 

            expect(user.id).toBe(11);
            expect(user.username).toBe('mocked username');
            expect(user.active).toBeFalsy();
        })
    });

});
