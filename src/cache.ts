import { GithubRepository } from './github-repository';
import { RepoData } from './repo';

export class Cache {
  private readonly CACHE_LENGTH = 24 * 60 * 60 * 1000;
  private githubRepository: GithubRepository;

  constructor(githubRepository: GithubRepository) {
    this.githubRepository = githubRepository;
  }

  public get data(): RepoData | null {
    return this.cache.data;
  }

  public set data(data: RepoData | null) {
    if (!data) { return }
    const cache = {
      data: data,
      cachedAt: Date.now(),
    };
    localStorage.setItem(this.cacheKey, JSON.stringify(cache))
  }

  public get expired(): boolean {
    return !this.cache.data || this.cache.cachedAt < Date.now() - this.CACHE_LENGTH;
  }

  private get cache(): RepoCache {
    const cache = localStorage.getItem(this.cacheKey);
    if (cache) {
      return JSON.parse(cache) as RepoCache;
    } else {
      return {
        cachedAt: 0,
        data: null,
      };
    }
  }

  private get cacheKey(): string {
    return `github-repository_${this.githubRepository.ownerRepo}_cache`;
  }
}

interface RepoCache {
  cachedAt: number;
  data: RepoData | null;
}
