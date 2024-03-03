import {redis} from '../utility/redis'
import { isNil } from 'lodash'

export async function get(key: string){
    if(!isNil(key)){
       const data = await redis.get(key)
       return isNil(data) ? null : JSON.parse(data)
    }
     return null
}

export async function set(key: string, value: any){
    if(!isNil(key)&&!isNil(value)){
       await redis.set(key, value)
    }
}

export async function deleteData(key: string){
    if(!isNil(key)){
       await redis.del(key)
    }
}

