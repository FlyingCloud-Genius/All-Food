package com.allFood.backend.config.redis;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.AutoConfigureAfter;
import org.springframework.cache.annotation.CachingConfigurerSupport;
import org.springframework.cache.annotation.EnableCaching;
import org.springframework.context.annotation.Configuration;
import redis.clients.jedis.HostAndPort;
import redis.clients.jedis.JedisCluster;

import java.util.HashSet;
import java.util.Set;

@Configuration
@EnableCaching
@AutoConfigureAfter(RedisClusterProperties.class)
public class JedisClusterConfig extends CachingConfigurerSupport {

    private static Logger LOGGER = LoggerFactory.getLogger(JedisClusterConfig.class);

    @Autowired
    private RedisClusterProperties redisClusterProperties;

    public JedisCluster getJedisCluster(){
        String [] serverArray=redisClusterProperties.getNodes().split(",");
        Set<HostAndPort> nodes=new HashSet<>();

        for (String ipPort:serverArray){
            String [] ipPortPair=ipPort.split(":");
            nodes.add(new HostAndPort(ipPortPair[0].trim(),Integer.valueOf(ipPortPair[1].trim())));
        }
        return  new JedisCluster(nodes,redisClusterProperties.getTimeout());
    }

}
