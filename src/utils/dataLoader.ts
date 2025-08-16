import type { PortfolioData } from '../types';

// Simple in-memory cache for portfolio data
const cache = new Map<string, any>();

// Cache duration in milliseconds (5 minutes)
const CACHE_DURATION = 5 * 60 * 1000;

interface CacheEntry<T> {
  data: T;
  timestamp: number;
}

export class DataLoader {
  private static instance: DataLoader;

  private constructor() {}

  static getInstance(): DataLoader {
    if (!DataLoader.instance) {
      DataLoader.instance = new DataLoader();
    }
    return DataLoader.instance;
  }

  // Generic cache getter
  private getFromCache<T>(key: string): T | null {
    const entry = cache.get(key) as CacheEntry<T> | undefined;
    
    if (!entry) return null;
    
    // Check if cache entry is still valid
    if (Date.now() - entry.timestamp > CACHE_DURATION) {
      cache.delete(key);
      return null;
    }
    
    return entry.data;
  }

  // Generic cache setter
  private setCache<T>(key: string, data: T): void {
    cache.set(key, {
      data,
      timestamp: Date.now()
    } as CacheEntry<T>);
  }

  // Load portfolio data with caching
  async loadPortfolioData(): Promise<PortfolioData> {
    const cacheKey = 'portfolio-data';
    
    // Try to get from cache first
    const cachedData = this.getFromCache<PortfolioData>(cacheKey);
    if (cachedData) {
      return cachedData;
    }

    try {
      // In a real application, this would be an API call
      // For now, we'll simulate loading the JSON data
      const response = await import('../data/portfolio.json');
      const data = response.default as PortfolioData;
      
      // Cache the data
      this.setCache(cacheKey, data);
      
      return data;
    } catch (error) {
      console.error('Failed to load portfolio data:', error);
      throw new Error('Failed to load portfolio data');
    }
  }

  // Preload critical data
  async preloadCriticalData(): Promise<void> {
    try {
      await this.loadPortfolioData();
    } catch (error) {
      console.warn('Failed to preload critical data:', error);
    }
  }

  // Clear cache (useful for development or forced refresh)
  clearCache(): void {
    cache.clear();
  }

  // Get cache size for debugging
  getCacheSize(): number {
    return cache.size;
  }
}

// Export singleton instance
export const dataLoader = DataLoader.getInstance();

// Utility function for components
export const useDataLoader = () => {
  return {
    loadPortfolioData: () => dataLoader.loadPortfolioData(),
    preloadCriticalData: () => dataLoader.preloadCriticalData(),
    clearCache: () => dataLoader.clearCache(),
    getCacheSize: () => dataLoader.getCacheSize()
  };
};