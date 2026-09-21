import type { NextConfig } from "next";
import path from "path";
import fs from "fs";

// Patch fs.lstat to silence EINVAL on Windows system files at C:\ root
// This prevents Watchpack from spamming stderr when workspace root is "/"
const systemFileRe = /DumpStack\.log\.tmp|pagefile\.sys|swapfile\.sys|System Volume Information|hiberfil\.sys/;
const origLstat = fs.lstat.bind(fs);
const origLstatSync = fs.lstatSync.bind(fs);
(fs as unknown as Record<string, unknown>).lstat = function (p: unknown, ...args: unknown[]) {
  if (typeof p === "string" && systemFileRe.test(p)) {
    const cb = args[args.length - 1] as ((err: unknown, stats: unknown) => void) | undefined;
    if (typeof cb === "function") {
      // async lstat: fake success with dummy stats
      process.nextTick(() => cb(null, { isDirectory: () => false, isFile: () => true } as unknown as fs.Stats));
      return;
    }
  }
  return (origLstat as (...a: unknown[]) => unknown)(p, ...args);
} as typeof fs.lstat;
try {
  (fs as unknown as Record<string, unknown>).lstatSync = function (p: unknown, ...args: unknown[]) {
    if (typeof p === "string" && systemFileRe.test(p)) {
      return { isDirectory: () => false, isFile: () => true, isSymbolicLink: () => false } as unknown as fs.Stats;
    }
    return (origLstatSync as (...a: unknown[]) => unknown)(p, ...args);
  } as typeof fs.lstatSync;
} catch {}

const nextConfig: NextConfig = {
  // Fix Watchpack scanning C:\ on Windows when workspace root is "/"
  // by explicitly scoping tracing & watch to this project dir
  outputFileTracingRoot: path.resolve(process.cwd()),
  images: {
    remotePatterns: [{ protocol: "https", hostname: "images.unsplash.com" }],
  },
  turbopack: {
    // Tell Turbopack the project root (Next 15.3+)
    root: path.resolve(process.cwd()),
  },
  webpack: (config) => {
    config.watchOptions = {
      ...config.watchOptions,
      // Must ignore Windows system files at C:\ root that cause EINVAL when lstat
      ignored: [
        "**/System Volume Information/**",
        "**/DumpStack.log.tmp",
        "**/pagefile.sys",
        "**/swapfile.sys",
        "**/hiberfil.sys",
        /[\\/]System Volume Information/,
        /DumpStack\.log\.tmp/,
        /pagefile\.sys/,
        /swapfile\.sys/,
        // Also ignore parent drive root itself when workspace is "/"
        "C:\\DumpStack.log.tmp",
        "C:\\pagefile.sys",
        "C:\\swapfile.sys",
        "C:\\System Volume Information",
      ],
    };
    // Ensure watcher doesn't follow symlinks into C:\
    config.snapshot = {
      ...(config.snapshot || {}),
      managedPaths: [/^(.+?[\\/]node_modules[\\/])/],
    };
    return config;
  },
};

export default nextConfig;
