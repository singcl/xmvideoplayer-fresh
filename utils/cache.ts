// Packages
import { retryAsync } from "https://deno.land/x/retry@v2.0.0/mod.ts";

// Utilities
import checkPlatform from "./platform.ts";
import getSignature from "./signature.ts";

interface ConfigOptions {
  interval?: number;
  account?: string;
  repository?: string;
  token?: string;
  url?: string;
  pre?: string;
}

interface PlatformInfo {
  name: string;
  api_url: string;
  url: string;
  signature: string;
  content_type: string;
  size: number;
}

export interface LatestInfo {
  version: string;
  notes?: string;
  pub_date?: string;
  platforms?: Record<string, PlatformInfo>;
}

export default class Cache {
  latest: LatestInfo = {
    version: "0.0.0",
  };
  lastUpdate: number | null = null;

  constructor(private config: ConfigOptions) {
    const { account, repository, token, url } = config;

    if (!account || !repository) {
      const error = new Error("Neither ACCOUNT, nor REPOSITORY are defined");
      error.cause = "missing_configuration_properties";
      throw error;
    }

    if (token && !url) {
      const error = new Error(
        "Neither NOW_URL, nor URL are defined, which are mandatory for private repo mode"
      );
      error.cause = "missing_configuration_properties";
      throw error;
    }

    this.cacheReleaseList = this.cacheReleaseList.bind(this);
    this.refreshCache = this.refreshCache.bind(this);
    this.loadCache = this.loadCache.bind(this);
    this.isOutdated = this.isOutdated.bind(this);
  }

  async cacheReleaseList(url: string) {
    const { token } = this.config;
    const headers: HeadersInit = {
      Accept: "application/vnd.github.preview",
    };

    if (token && typeof token === "string" && token.length > 0) {
      headers.Authorization = `token ${token}`;
    }

    let content = await retryAsync(
      async () => {
        const response = await fetch(url, { headers });

        if (response.status !== 200) {
          throw new Error(
            `Tried to cache RELEASES, but failed fetching ${url}, status ${response.status}`
          );
        }

        return response.text();
      },
      { maxTry: 3 }
    );

    // let content = await convertStream(body);
    const matches = content.match(/[^ ]*\.nupkg/gim);

    if (!matches || matches.length === 0) {
      throw new Error(
        `Tried to cache RELEASES, but failed. RELEASES content doesn't contain nupkg`
      );
    }

    for (let i = 0; i < matches.length; i += 1) {
      const nuPKG = url.replace("RELEASES", matches[i]);
      content = content.replace(matches[i], nuPKG);
    }
    return content;
  }

  async refreshCache() {
    const { account, repository, pre, token } = this.config;
    const repo = account + "/" + repository;
    const url = `https://api.github.com/repos/${repo}/releases?per_page=100`;
    const headers: HeadersInit = { Accept: "application/vnd.github.preview" };

    if (token && typeof token === "string" && token.length > 0) {
      headers.Authorization = `token ${token}`;
    }

    const response = await retryAsync(
      async () => {
        const response = await fetch(url, { headers });

        if (response.status !== 200) {
          throw new Error(
            `GitHub API responded with ${response.status} for url ${url}`
          );
        }

        return response;
      },
      { maxTry: 3 }
    );

    const data = await response.json();

    if (!Array.isArray(data) || data.length === 0) {
      return;
    }

    const release = data.find((item) => {
      const isPre = Boolean(pre) === Boolean(item.prerelease);
      return !item.draft && isPre;
    });

    if (!release || !release.assets || !Array.isArray(release.assets)) {
      return;
    }

    const { tag_name } = release;

    if (this.latest.version === tag_name) {
      console.log("Cached version is the same as latest");
      this.lastUpdate = Date.now();
      return;
    }

    console.log(`Caching version ${tag_name}...`);

    this.latest.version = tag_name;
    this.latest.notes = release.body;
    this.latest.pub_date = release.published_at;

    // Clear list of download links
    this.latest.platforms = {};

    for (const asset of release.assets) {
      const { name, browser_download_url, url, content_type, size } = asset;
      const platform = checkPlatform(name);
      if (!platform) {
        continue;
      }

      const signature = await getSignature(name, release.assets);

      this.latest.platforms[platform] = {
        name,
        api_url: url,
        url: browser_download_url,
        signature,
        content_type,
        size: Math.round((size / 1000000) * 10) / 10,
      };
    }

    console.log(`Finished caching version ${tag_name}`);
    this.lastUpdate = Date.now();
  }

  isOutdated() {
    const { lastUpdate, config } = this;
    const { interval = 15 } = config;

    if (lastUpdate && Date.now() - lastUpdate > interval * 60 * 1000) {
      return true;
    }

    return false;
  }

  // This is a method returning the cache
  // because the cache would otherwise be loaded
  // only once when the index file is parsed
  async loadCache() {
    const { latest, refreshCache, isOutdated, lastUpdate } = this;

    if (!lastUpdate || isOutdated()) {
      await refreshCache();
    }

    return Object.assign({}, latest);
  }
}
