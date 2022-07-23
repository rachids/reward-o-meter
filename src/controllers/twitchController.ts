import Twitch from '../classes/Twitch';
import {PubSubClient} from "@twurple/pubsub";

const twitch = new Twitch();

const twitchController = {
    connect(queryParams: string) {
        twitch.setAccessToken(queryParams);
    },

    isConnected(): boolean {
        return twitch.isConnected();
    },

    getTwitchAuthUrl(): string {
        return twitch.generateUrl();
    },

    getStreamerId(): string {
        return twitch.userId;
    },

    async getPubSubClient(): Promise<PubSubClient> {
        return await twitch.listen();
    }
};

export default twitchController;
