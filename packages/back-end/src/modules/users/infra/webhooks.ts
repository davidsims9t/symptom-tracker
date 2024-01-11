import type { WebhookEvent } from "@clerk/clerk-sdk-node";

export const handleWebhookResponse = (res: WebhookEvent) => {
    switch (res.type) {
        case 'user.created':
            break;
        case 'user.deleted':
            break;
        case 'user.updated':
            break;
    }
};