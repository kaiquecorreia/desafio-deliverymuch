import redis from 'redis';
import { promisify } from 'util';
import { redisConfigs } from '../config/redis';
class RedisServices {
  constructor() {
    const isTest = process.env.NODE_ENV === 'test';
    if (!isTest) {
      this.client = redis.createClient(redisConfigs);

      this.client.on('error', function (error) {
        console.error(error);
      });

      this.getAsync = promisify(this.client.get).bind(this.client);
    }
  }

  setRedisData = async (key, value) => {
    const stringValue = JSON.stringify(value);
    await this.client.set(key, stringValue);
    await this.client.expire(key, 60);
  };

  getRedisData = async (key) => {
    return await this.getAsync(key);
  };
}
export default RedisServices;
