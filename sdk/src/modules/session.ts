import {
    Config,
    CreateSessionOptions,
    CreateSessionResponse,
    PaymentStateOptions,
    PaymentStateResponse,
    SessionMetadataOptions,
    SessionMetadataResponse
} from "../interfaces";
import axios from 'axios';
import {returnPaymentURL} from "../utils";

const checkoutAPI = "http://localhost:3001";

/**
 * Represents a session object that interacts with the API to create, retrieve metadata, and retrieve payment state for a session.
 */
export class Session {
    /**
     * The network that the session is connected to.
     */
    private readonly network: string;

    /**
     * The configuration options for the session.
     */
    private readonly options: Config;

    /**
     * Creates a new session with the specified network and options.
     * @param network The type of network (mainet | testnet) to connect to.
     * @param options The configuration options for the session.
     */
    constructor(network: string, options: Config) {
        this.network = network;
        this.options = options;
    }

    /**
     * Creates a new session with the provided options.
     * @param options - The options to use when creating the session.
     * @returns A promise that resolves with the response data from the API.
     * @throws An error if the API call fails.
     */
    async create(options: CreateSessionOptions): Promise<CreateSessionResponse> {
        try {
            //NOTE: call APIs here
            const requestData = {...options, network: this.network, config: this.options.config};
            console.log('checkoutAPI', checkoutAPI);
            const response = await axios.post(`${checkoutAPI}/user/create-session`, requestData, {
                headers: {Authorization: `Bearer ${this.options.api_keys.private_api_key}`}
            });

            // const paymentURL = this.generatePaymentURL({session_id: response.data.session_id});
            console.log("response.data", response.data)
            return {...response.data};
        } catch (error) {
            console.log("error", error)
            throw new Error(JSON.stringify(error.response.data, null, 2));
        }
    }

    /**
     * Retrieves metadata for a session.
     * @param options - The options to use when retrieving the metadata.
     * @returns A promise that resolves with the response data from the API.
     * @throws An error if the API call fails.
     */    
    async metadata(options: SessionMetadataOptions): Promise<SessionMetadataResponse> {
        try {
            //NOTE: call APIs here
            const response = await axios.get(`${checkoutAPI}/session`, {
                params: {session_id: options.session_id},
                headers: {Authorization: `Bearer ${this.options.api_keys.public_api_key}`}
            });

            const paymentURL = this.generatePaymentURL({session_id: response.data.session_id});
            return {...response.data, payment_url: paymentURL};
        } catch (error) {
            console.log("error", error)
            throw new Error(JSON.stringify(error.response.data, null, 2));
        }
    }

    /**
     * Retrieves the payment state for a session.
     * @param options - The options to use when retrieving the payment state.
     * @returns A promise that resolves with the response data from the API.
     * @throws An error if the API call fails.
     */
    async getPaymentState(options: PaymentStateOptions): Promise<PaymentStateResponse> {
        try {
            //NOTE: call APIs here
            const response = await axios.get(`${checkoutAPI}/user/get-session/${options.session_id}`, {
                headers: {Authorization: `Bearer ${this.options.api_keys.public_api_key}`}
            });

            // const paymentURL = this.generatePaymentURL({session_id: response.data.session_id});
            return {...response.data};
        } catch (error) {
            console.log("error", error)
            throw new Error(JSON.stringify(error.response.data, null, 2));
        }
    }

    //TODO: what does this use for ?
    /**
     * Generates a payment URL for a session.
     * @param options - The options to use when generating the payment URL.
     * @returns The payment URL.
     */
    generatePaymentURL(options: { session_id: string }): string {
        return returnPaymentURL(options.session_id, this.options.api_keys.public_api_key);
    }
}