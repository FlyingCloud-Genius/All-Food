package com.allFood.backend.config.redis;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class RedisClientTemplate {

    private static final Logger LOGGGER = LoggerFactory.getLogger(RedisClientTemplate.class);

    @Autowired
    private JedisClusterConfig jedisClusterConfig;

    public boolean setToRedis(String key,Object value){
        try {
            String str=jedisClusterConfig.getJedisCluster().set(key, String.valueOf(value));
            if("OK".equals(str))
                return true;
        }catch (Exception ex){
            LOGGGER.error("setToRedis:{Key:"+key+",value"+value+"}",ex);
        }
        return false;
    }

    public Object getRedis(String key){
        String str=null;
        try {
            str=jedisClusterConfig.getJedisCluster().get(key);
        }catch (Exception ex){
            LOGGGER.error("getRedis:{Key:"+key+"}",ex);
        }
        return str;
    }

    public boolean hasKey(String key) {
        return jedisClusterConfig.getJedisCluster().exists(key);
    }

    /*
     * @param timeOut: unit is second
     * @return return 1 if key exists, 0 if key does not exist
     */
    public Long expire(String key, int timeOut) {
        return jedisClusterConfig.getJedisCluster().expire(key, timeOut);
    }
}
