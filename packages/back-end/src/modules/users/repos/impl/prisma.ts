import prisma from "../../../shared/infra/prisma/client";
import { User } from "../../domain/user";
import { fromPersistence, toDomain } from "../mappers";
import { UserRepo } from "../user";

export class PrismaUserRepo implements UserRepo {
    async getUsers() {
        const users = await prisma.user.findMany({});
        if (!users) return;

        return users.map(fromPersistence);
    }

    async getUserById(id: number | string) {
        const user = await prisma.user.findFirst({
            where: {
                id: +id
            }
        });

        if (!user) return;

        return fromPersistence(user);
    }

    async save(user: User) {
        if (!user.id) {
            const saved = await prisma.user.create();
            return !!saved;
        }

        const updated = await prisma.user.update();
        return !!updated;
    }
};

export default PrismaUserRepo;