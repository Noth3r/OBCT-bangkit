import {getAuth } from 'firebase-admin/auth';

export const getBearerToken = (authorization: string) => {
    return authorization?.split('Bearer ')[1];
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



