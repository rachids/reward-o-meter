import {StaticAuthProvider} from '@twurple/auth';
import {PubSubClient} from "@twurple/pubsub";

export default class Twitch {
    clientId: string = '';
    userId: string = '';
    accessToken: null|string;
    oAuthUrl: string = 'https://id.twitch.tv/oauth2/authorize';

    constructor() {
        this.clientId = import.meta.env.VITE_TWITCH_CLIENT_ID;
    }

    nonce(length: number = 15): string {
        let text = "";
        let possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        for (let i = 0; i < length; i++) {
            text += possible.charAt(Math.floor(Math.random() * possible.length));
        }
        return text;
    }

    generateUrl(): string {
        let params = new URLSearchParams({
            scope: [
                'channel:read:redemptions'
            ],
            redirect_uri: 'http://localhost:5173',
            state: this.nonce(15),
            response_type: 'token',
            client_id: this.clientId
        });

        return `${this.oAuthUrl}?${params.toString()}`;
    }

    setAccessToken(hash: string) {
        let tokens = new URLSearchParams(hash.slice(1));

        location.hash = '';

        this.accessToken = tokens.get('access_token');
    }

    isConnected(): boolean {
        return this.accessToken !== null;
    }

    async listen(): Promise<PubSubClient> {
        const authProvider = new StaticAuthProvider(this.clientId, this.accessToken, ['channel:read:redemptions']);

        const pubSubClient = new PubSubClient();
        this.userId = await pubSubClient.registerUserListener(authProvider);

        return pubSubClient;
    }
}
