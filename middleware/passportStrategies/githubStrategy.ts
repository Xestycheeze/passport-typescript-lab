import { Strategy as GitHubStrategy } from 'passport-github2';
import { Profile } from 'passport';
import { VerifyCallback } from 'passport-oauth2'
import { PassportStrategy } from '../../interfaces/index';
import { Request } from 'express';
import fs from 'node:fs/promises';
import dotenv from 'dotenv'
dotenv.config();

const githubStrategy: GitHubStrategy = new GitHubStrategy(
    {
        clientID: process.env.CLIENT_ID!,
        clientSecret: process.env.CLIENT_SECRET!,
        callbackURL: "http://localhost:8000/auth/github/callback",
        passReqToCallback: true,
    },
    
    /* FIXED ME 😭 */
    async (req: Request, accessToken: string, refreshToken: string, profile: Profile, done: VerifyCallback) => {
        let data: Express.User[];
        try {
            const file = await fs.readFile('database.json', 'utf8');
            data = JSON.parse(file);
        } catch (e) {
            data = []
        }
        let user = data.find((account) => account.id === `${profile.id}-github`)
        if (!user) {
            const newUser = {
                id: `${profile.id}-${profile.provider}`,
                name: profile.username? profile.username : profile.displayName,
                role: 'user',
            }
            data.push(newUser);
            await fs.writeFile('database.json', JSON.stringify(data), 'utf8');
            user = newUser;
        }
        return done(null, user);


    },
);

const passportGitHubStrategy: PassportStrategy = {
    name: 'github',
    strategy: githubStrategy,
};

export default passportGitHubStrategy;
