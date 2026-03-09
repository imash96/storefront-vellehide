import type { Config } from './types';
import { StoreMeasurementResource } from './store/measurement';
import { Client } from './client';
import { Store } from './store';
import { Auth } from './auth';

const MEDUSA_BACKEND_URL = process.env.NEXT_PUBLIC_MEDUSA_BACKEND_URL || "http://localhost:9000";

class Medusa {
    public client: Client

    public store: Store
    public auth: Auth

    constructor(config: Config) {
        this.client = new Client(config)

        this.store = new Store(this.client)
        this.auth = new Auth(this.client, config)
    }

    setLocale(locale: string) {
        this.client.setLocale(locale)
    }

    getLocale() {
        return this.client.locale
    }
}

class ExtendedStoreSDK extends Store {
    public measurement: StoreMeasurementResource;

    constructor(client: Client) {
        super(client);
        this.measurement = new StoreMeasurementResource(client);
    }
}

class ExtendedMedusaSDK extends Medusa {
    public store: ExtendedStoreSDK

    constructor(config: Config) {
        super(config)

        this.store = new ExtendedStoreSDK(this.client)
    }
}

export const sdk = new ExtendedMedusaSDK({
    baseUrl: MEDUSA_BACKEND_URL,
    debug: true,
    publishableKey: process.env.NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY,
})