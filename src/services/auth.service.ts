import {getAuth, UserRecord } from 'firebase-admin/auth';
import db from '../utils/db';

export const getBearerToken = (authorization: string) => {
    return authorization.split('Bearer ')[1];
}

export const verifyToken = async (token: string) => {
    return getAuth().verifyIdToken(token).then((decodedToken) => {
        return decodedToken;
    }).catch((error) => {
        return null;
    });
}

export const getUser = async (token: string) => {
    return getAuth().getUser(token).then((user) => {
        return user;
    }).catch((error) => {
        return null;
    });
}

export const createUser = async (user: UserRecord) => {
    return await db.user.create({
        data: {
            id: user.uid,
            email: user.email!,
            name: user.displayName!,
            picture: user.photoURL
        }});
}

export const findUser = async (id: string) => {
    return db.user.findUnique({
        where: {
            id
        }
    });
}

