import fs from 'node:fs/promises';


const userModel = {

    /* FIXED ME (types) 😭 */
    findOne: async (email: string) => {
        let jsonDB: Express.User[];
        let user: Express.User | undefined;
        return fs.readFile('database.json', 'utf8').then((data: string) => {
            jsonDB = JSON.parse(data);
        }).then(() => {
            const user = jsonDB.find((user) => user.email === email);
            if (user) {
                return user;
            }
            throw new Error(`Couldn't find user with email: ${email}`);
        }).catch((error) => {
            throw new Error('Error reading or parsing the JSON file:');
        })
    },
    /* FIXED ME (types) 😭 */
    findById: async (id: number | string) => {
        let jsonDB: Express.User[];
        let user: Express.User | undefined;
        return fs.readFile('database.json', 'utf8').then((data: string) => {
            jsonDB = JSON.parse(data);
        }).then(() => {
            user = jsonDB.find((user) => user.id === id);
            if (user) {
                return user
            }
            throw new Error(`Couldn't find user with id: ${id}`);
        }).catch((error) => {
            throw new Error('Error reading or parsing the JSON file:');
        })
    },
};

declare global {
    namespace Express {
        export interface User {
            id?: number | string;
            name: string;
            email?: string;
            password?: string;
            role?: string;
        }
    }
}

export {userModel};
