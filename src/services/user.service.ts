import { UserRecord } from 'firebase-admin/auth';
import db from '../utils/db';
import { User } from '@prisma/client';

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

export const updateUser = async (id: string, data: Partial<User>) => {
    return db.user.update({
        where: {
            id
        },
        data
    });
}