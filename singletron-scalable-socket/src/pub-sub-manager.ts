import { createClient, RedisClientType } from "redis";

export class PubSubManager {
  private static instance: PubSubManager;
  private redisClient: RedisClientType;
  private subscriptions: Map<string, string[]>;
  private constructor() {
    this.redisClient = createClient();
    this.redisClient.connect();
    this.subscriptions = new Map();
  }
  /**
   * getInstance
   */
  public static getInstance(): PubSubManager {
    if (PubSubManager.instance) {
      return PubSubManager.instance;
    } else {
      PubSubManager.instance = new PubSubManager();
    }
  }
  addUserToStock(userId: string, stockTicker: string) {}
  removeUserFromStock(userId: string, stockTicker: string) {}
  forwardMessageToUser(userId: string, stockTicker: string, message: string) {}
}

export const pubSubManager = PubSubManager.getInstance();

console.log();
