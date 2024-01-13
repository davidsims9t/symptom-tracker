-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "username" TEXT,
    "dob" TIMESTAMP(3) NOT NULL,
    "firstName" TEXT,
    "lastName" TEXT,
    "createdAt" TIMESTAMP(3),
    "updatedAt" TIMESTAMP(3),
    "lastLogin" TIMESTAMP(3),
    "isAdminUser" BOOLEAN,
    "isEmailVerified" BOOLEAN,
    "isDeleted" BOOLEAN,
    "gender" TEXT,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "LabResult" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "resultOn" TIMESTAMP(3) NOT NULL,
    "collectedOn" TIMESTAMP(3) NOT NULL,
    "reportedOn" TIMESTAMP(3) NOT NULL,
    "resultStatus" TEXT,
    "aggregateLabResultResultId" TEXT,

    CONSTRAINT "LabResult_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Result" (
    "id" TEXT NOT NULL,
    "component" TEXT NOT NULL,
    "value" TEXT NOT NULL,
    "unit" TEXT NOT NULL,
    "standardRange" TEXT NOT NULL,
    "flag" TEXT,
    "labId" TEXT,
    "userId" TEXT,

    CONSTRAINT "Result_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AggregateLabResultResult" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "userId" TEXT,

    CONSTRAINT "AggregateLabResultResult_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");

-- CreateIndex
CREATE UNIQUE INDEX "AggregateLabResultResult_name_key" ON "AggregateLabResultResult"("name");

-- AddForeignKey
ALTER TABLE "LabResult" ADD CONSTRAINT "LabResult_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LabResult" ADD CONSTRAINT "LabResult_aggregateLabResultResultId_fkey" FOREIGN KEY ("aggregateLabResultResultId") REFERENCES "AggregateLabResultResult"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Result" ADD CONSTRAINT "Result_labId_fkey" FOREIGN KEY ("labId") REFERENCES "LabResult"("id") ON DELETE SET NULL ON UPDATE CASCADE;
