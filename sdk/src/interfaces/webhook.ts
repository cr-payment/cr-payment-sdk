/**
 * Options for verifying a webhook request.
 */
interface WebhookVerifyOptions {
    /**
     * The headers of the webhook request.
     */
    headers: Record<string, string>;
    /**
     * The payload of the webhook request.
     */
    payload: string;
    /**
     * The secret used to sign the webhook request.
     */
    webhook_secret: string;
}

export { WebhookVerifyOptions };
