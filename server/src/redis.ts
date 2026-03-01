import Redis from 'ioredis'; 

const redis = new Redis(process.env.REDIS_URL!);

redis.on('error', (error) => {
    console.error(`Error with redis database: ${error}`);
})

redis.on('connect', () => {
    console.log('Succesfully connected to Redis!');
})

export default redis;