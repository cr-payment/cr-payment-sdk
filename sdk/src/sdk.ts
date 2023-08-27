import {Session} from "./modules";
import {Config} from "./interfaces";

/**
 * Represents a payment object for the CR API.
 */
export class CrPayment {
    /**
     * The session object used for making API requests.
     */
    session: Session;

    /**
     * Creates a new CrPayment object.
     * @param options The configuration options for the payment object.
     */
    constructor(options: Config) {
        this.session = new Session(options.network, options);
    }
}