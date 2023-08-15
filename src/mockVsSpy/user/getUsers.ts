
import { User, findUser } from './'

const wrongUserIdError = new Error("wrong id.")

export const getUser = async (id: number): Promise<User> => {
    console.log('getUser()...');

    if(id <= 0) {
        throw wrongUserIdError;
    }

    const user = await findUser(id);
    return user;
}