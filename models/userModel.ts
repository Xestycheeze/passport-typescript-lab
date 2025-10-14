const database = [
    {
        id: 1,
        name: "Jimmy Smith",
        email: "jimmy123@gmail.com",
        password: "jimmy123!",
        role: "user",
    },
    {
        id: 2,
        name: "Johnny Doe",
        email: "johnny123@gmail.com",
        password: "johnny123!",
        role: "user",
    },
    {
        id: 3,
        name: "Jonathan Chen",
        email: "jonathan123@gmail.com",
        password: "jonathan123!",
        role: "admin",
    },
];

const userModel = {

    /* FIXED ME (types) 😭 */
    findOne: (email: string) => {
        const user = database.find((user) => user.email === email);
        if (user) {
            return user;
        }
        throw new Error(`Couldn't find user with email: ${email}`);
    },
    /* FIXED ME (types) 😭 */
    findById: (id: number) => {
        const user = database.find((user) => user.id === id);
        if (user) {
            return user;
        }
        throw new Error(`Couldn't find user with id: ${id}`);
    },
};

export { database, userModel };
