import {CheckoutConfigEntity} from "../types";

/**
 * Represents the configuration object for the SDK.
 */
export interface Config {
    /**
     * The API keys for the SDK.
     */
    api_keys: {
        /**
         * The public API key.
         */
        public_api_key: string;
        /**
         * The private API key.
         */
        private_api_key: string;
    };
    /**
     * The network to use for the SDK.
     */
    network: "mainnet" | "testnet";
    /**
     * The webhook URL to use for the SDK.
     */
    webhook_url?: string;
    /**
     * The checkout configuration entity for the SDK.
     */
    config?: CheckoutConfigEntity
}