export type LabDto = {
    id?: string | null;
    name: string;
    result?: ResultDto[];
    resultOn: Date | null;
    reportedOn: Date | null;
    collectedOn: Date | null;
    aggregateLabResultResultId: string;
    resultStatus?: string | null;
    isDeleted?: boolean | null;
    createdAt?: Date | null;
    updatedAt?: Date | null;
};

export type ResultDto = {
    id?: string | null;
    component: string;
    value: string;
    unit: string;
    standardRange: string;
    flag?: string;
    labId: string;
};

export type AggregateResultDto = {
    id?: string | null;
    name: string;
    userId: string;
    labs: LabDto[];
};