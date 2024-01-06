import { PdfReader } from "pdfreader";
import { prisma } from "./index.js";

export const resolvers = {
  Query: {
    user: async (_, args, context) => {
      if (!context?.user?.sub) return;

      const users = await prisma.user.findMany({
        where: {
          sub: context.user.sub
        },
        include: {
          test: {
            include: {
              lab: true,
              result: true,
              orderedBy: true
            }
          },
          pcp: true,
        }
      });
      return users;
    },
    lab: async (_, data, context) => {
      const lab = await prisma.lab.findMany({
        where: data.id ? {
          id: +data.id,
          userId: context.user.id
        } : {
          userId: context.user.id
        },
        include: {
          test: true
        }
      });
      return lab;
    },
    test: async (_, data, context) => {
      const test = await prisma.test.findMany({
        where: data.id ? {
          id: +data.id,
          // userId: context.user.id
        } : {
          // userId: context.user.id
        },
        include: {
          lab: true,
          result: true,
          orderedBy: true,
          aggregateTestResult: true
        }
      });
      return test.map(test => ({
        ...test,
        resultOn: String(test.resultOn),
        collectedOn: String(test.collectedOn)
      }));
    },
    aggregateTestResult: async (_, data, context) => {
      const result = await prisma.aggregateTestResult.findMany({
        where: data.id ? {
          id: +data.id,
          userId: context.user.id
        } : {
          userId: context.user.id
        },
        include: {
          test: {
            include: {
              result: true
            }
          }
        }
      });

      return result.map(result => {
        return {
          ...result,
          test: result.test.map(test => {
            return {
              ...test,
              collectedOn: String(test.collectedOn),
              resultOn: String(test.resultOn),
            };
          })
        };
      });
    },
    result: async (_, data, context) => {
      const result = await prisma.result.findMany({
        where: data.id ? {
          id: +data.id,
          userId: context.user.id
        } : {
          userId: context.user.id
        },
      });
      return result;
    },
    provider: async (_, data, context) => {
      const provider = await prisma.provider.findMany({
        where: data.id ? {
          id: +data.id,
          userId: context.user.id
        } : {
          userId: context.user.id
        },
      });
      return provider;
    },
  },
  Mutation: {
    upsertUser: async (_, data, context) => {
      if (!context.user?.id) {
        const user = await prisma.user.create({
          data,
        });
        return user;
      }

      const user = await prisma.user.update({
        where: { id: context.user.id },
        data
      });
      return user;
    },
    upsertTest: async (_, data, context) => {
      if (!data.id) {
        try {
          const test = await prisma.test.create({
            data: {
              ...data,
              userId: context.user.id
            }
          });
          return test;
        } catch (err) {
          console.error(err);
        }
      }

      try {
        const test = await prisma.test.updateMany({
          where: { id: data.id, userId: context.user.id },
          data
        });
        return data;
      } catch (err) {
        console.error(err);
      }
    },
    upsertLab: async (_, data, context) => {
      if (!data.id) {
        const lab = await prisma.lab.create({
          data: {
            ...data,
            userId: context.user.id
          }
        });
        return lab;
      }

      const lab = await prisma.lab.updateMany({
        where: { id: data.id, userId: context.user.id },
        data
      });
      return data;
    },
    upsertAggregateTestResult: async (_, data, context) => {
      if (!data.id) {
        const aggregateTestResult = await prisma.aggregateTestResult.create({
          data: {
            ...data,
            userId: context.user.id
          }
        });
        return aggregateTestResult;
      }

      const aggregateTestResult = await prisma.aggregateTestResult.updateMany({
        where: { id: data.id, userId: context.user.id },
        data
      });
      return data;
    },
    upsertResult: async (_, data, context) => {
      const resultsWithIds = data.input.filter(({ id }) => id);
      const resultsWithoutIds = data.input.filter(({ id }) => !id);

      const newRecords = prisma.result.createMany({
        data: resultsWithoutIds.map(input => ({
          ...input,
          userId: context.user.id
        })),
        skipDuplicates: true,
      });

      const updatedRecords = resultsWithIds.map(data => {
        return prisma.result.updateMany({
          where: { id: data.id, userId: data.testId },
          data
        });
      });

      await Promise.allSettled([newRecords, ...updatedRecords]);

      // Assumes all results are specific to a test
      const results = await prisma.result.findMany({
        where: { testId: data?.[0]?.testId }
      });

      return results;
    },
    upsertProvider: async (_, data, context) => {
      if (!data.id) {
        const provider = await prisma.provider.create({
          data: {
            ...data,
            userId: context.user.id
          }
        });
        return provider;
      }

      const provider = await prisma.provider.updateMany({
        where: { id: data.id, userId: context.user.id },
        data
      });
      return data;
    },
    upsertPdf: async (_, data, context) => {
      const buffer = Buffer.from(data.buffer, "binary");

      const pdfReader = new PdfReader();

      const resultsText = new Promise((resolve, reject) => {
        let text = '';
        pdfReader.parseBuffer(buffer, async (err, item) => {
          if (err) reject(err);
          if (!item) resolve(text);
          if (item?.text) text += item.text;
        });
      });
    },
    deleteLab: async (_, data, context) => {
      await prisma.lab.deleteMany({
        where: { id: data.id, userId: context.user.id },
      });
      return data;
    },
    deleteAggregateTestResult: async (_, data, context) => {
      await prisma.aggregateTestResult.deleteMany({
        where: { id: data.id, userId: context.user.id },
      });
      return data;
    },
    deleteResult: async (_, data, context) => {
      await prisma.result.deleteMany({
        where: { id: data.id, userId: context.user.id },
      });
      return data;
    },
    deleteProvider: async (_, data, context) => {
      await prisma.provider.deleteMany({
        where: { id: data.id, userId: context.user.id },
      });
      return data;
    },
    deleteUser: async (_, data, context) => {
      await prisma.user.delete({
        where: { id: data.id },
      });
      return data;
    },
    deleteTest: async (_, data, context) => {
      await prisma.test.deleteMany({
        where: { id: data.id, userId: context.user.id },
      });
      return data;
    }
  }
};