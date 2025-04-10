package com.classroom.security;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.TimeUnit;

@Component
public class RateLimiter {
    private final Map<String, RequestCounter> requestCounters = new ConcurrentHashMap<>();
    
    @Value("${security.rate-limit.requests}")
    private int maxRequests;
    
    @Value("${security.rate-limit.period}")
    private int periodInSeconds;

    public boolean isAllowed(String clientId) {
        RequestCounter counter = requestCounters.computeIfAbsent(
            clientId,
            k -> new RequestCounter(maxRequests, periodInSeconds)
        );
        
        return counter.incrementAndCheck();
    }

    private static class RequestCounter {
        private final int maxRequests;
        private final long periodInMillis;
        private int count;
        private long lastResetTime;

        public RequestCounter(int maxRequests, int periodInSeconds) {
            this.maxRequests = maxRequests;
            this.periodInMillis = TimeUnit.SECONDS.toMillis(periodInSeconds);
            this.count = 0;
            this.lastResetTime = System.currentTimeMillis();
        }

        public synchronized boolean incrementAndCheck() {
            long currentTime = System.currentTimeMillis();
            
            if (currentTime - lastResetTime > periodInMillis) {
                count = 0;
                lastResetTime = currentTime;
            }
            
            if (count >= maxRequests) {
                return false;
            }
            
            count++;
            return true;
        }
    }
} 