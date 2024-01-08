type HttpErrors = {
    errors: {
        code: string;
        message: string;
        meta: {
            paramName: string;
        };
    }[];
};