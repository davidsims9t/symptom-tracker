import prisma from "../../../shared/infra/prisma/client";
import { User } from "../../../users/domain/user";
import { LabResult } from "../../domain/lab-result";
import { LabRepo } from "../lab";

export class PrismaLabRepo implements LabRepo {
    async getLabs(lab: string, user: User) {
        const users = await prisma.user.findMany({
        });

        return users;
    }

    async getLabById(id: string, user: User) {
        const lab = await prisma.lab.find({
            where: {
                id
            }
        });

        return lab;
    }

    async save(user: LabResult) {
        if (!user.id) {
            const saved = await prisma.lab.create();
            return !!saved;
        }

        const updated = await prisma.lab.update();
        return !!updated;
    }
};

export default PrismaLabRepo;