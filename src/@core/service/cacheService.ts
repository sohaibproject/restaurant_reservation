class CacheService {
  private cache: Map<string, { data: any; timestamp: number }> = new Map();
  private cacheDuration: number;

  constructor(cacheDuration: number) {
    this.cacheDuration = cacheDuration;
  }

  get<T>(key: string): T | null {
    const cached = this.cache.get(key);
    if (cached) {
      const now = Date.now();
      if (now - cached.timestamp < this.cacheDuration) {
        return cached.data as T;
      }
      this.cache.delete(key);
    }
    return null;
  }

  set(key: string, data: any): void {
    this.cache.set(key, { data, timestamp: Date.now() });
  }
}

export default CacheService;
