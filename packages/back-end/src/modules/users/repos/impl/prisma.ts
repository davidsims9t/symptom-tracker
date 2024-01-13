import prisma from "../../../shared/infra/prisma/client";
import { User } from "../../domain/user";
import { fromPersistence } from "../mappers";
import { UserRepo } from "../user";

export class PrismaUserRepo implements UserRepo {
    async getUsers() {
        const users = await prisma.user.findMany({});
        if (!users) return;

        return users.map(fromPersistence);
    }

    async getUserById(id: string) {
        const user = await prisma.user.findFirst({
            where: {
                id
            }
        });

        if (!user) return;

        return fromPersistence(user);
    }

    async save(user: User) {
        if (!user.id) {
            const saved = await prisma.user.create(user);
            return !!saved;
        }

        const updated = await prisma.user.update(user);
        return !!updated;
    }
};

export default PrismaUserRepo;