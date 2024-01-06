import prisma from "../../../shared/infra/prisma/client";
import { User } from "../../domain/user";
import { IUserRepo } from "../user";

export class PrismaUserRepo implements IUserRepo {
    async getUsers() {
        const users = await prisma.user.findMany({
        });

        return users;
    }

    async getUserById(id: string) {
        const user = await prisma.user.find({
        });

        return user;
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