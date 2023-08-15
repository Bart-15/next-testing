import { getUser } from './getUsers';
import { findUser } from './index';
import * as userFunctions from './index'


jest.mock('./', () => {
    return {
        __esModule: true,    //    <----- this __esModule: true is important
        ...jest.requireActual('./')
    };
});

describe("When testing getUser with jest spy", () => {
    afterEach(()=>{
        jest.restoreAllMocks();
    })

    describe('should return active user', () => {
        beforeEach(() => {
            jest.spyOn(userFunctions, 'findUser').mockResolvedValueOnce({
                id:12,
                username: 'spy username',
                active: true
            });

        });

        test('it returns: id = 12, username = "spy username", and active = true', async() => {
            jest.spyOn(console, 'log').mockImplementation(); // no console-log
            
            // call the getUser
            const user = await getUser(12);  
            expect(user.id).toBe(12);
            expect(user.username).toBe('spy username');
            expect(user.active).toBeTruthy();
            expect(findUser).toHaveBeenCalledTimes(1);          
        })

    });

    
    describe('should return inactive user', () => {


        beforeEach(() => {
            jest.spyOn(userFunctions, 'findUser').mockResolvedValueOnce({
                id:13,
                username: 'spy username',
                active: false
            });
            
        });
        
        test('it returns: id = 13, username = "spy username", and active = false', async() => {
            
            // call the getUser
            const user = await getUser(13);            
            expect(user.id).toBe(13);
            expect(user.username).toBe('spy username');
            expect(user.active).toBeFalsy();

            expect(findUser).toHaveBeenCalledTimes(1);
        })

    });



})