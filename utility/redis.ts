import { createClient } from 'redis';

export const redis = createClient({
    password: 'CaucEp1OTiiUHZWjOhScL6z5mIg5jVTo',
    socket: {
        host: 'redis-13340.c321.us-east-1-2.ec2.cloud.redislabs.com',
        port: 13340
    }
});
// Create a new Redis instance
// export const redis = new Redis({
//     port: 6379,          // Redis default port
//     host: '127.0.0.1',   // Redis default host
//    password:'redis'
//   });
  
