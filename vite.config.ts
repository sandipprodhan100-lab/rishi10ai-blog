import path from "node:path";
import { loadEnv, type PluginOption, type UserConfig } from "vite";

// Explicit plugin lineup for TanStack Start on Cloudflare Workers:
//   - tanstackStart drives SSR + file-based routing
//   - nitro (build only) emits .output/{server,public} for `wrangler deploy`
//     using the cloudflare-module preset
//   - tailwindcss + vite-tsconfig-paths wire up styles.css and the "@" alias
const windowsPathCompatibilityPlugin = {
  name: "windows-path-compatibility",
  configResolved(config: { root: string }) {
    if (process.platform === "win32") config.root = path.win32.normalize(config.root);
  },
};

export default async ({
  command,
  mode,
}: {
  command: string;
  mode: string;
}): Promise<UserConfig> => {
  const plugins: PluginOption[] = [
    windowsPathCompatibilityPlugin,
    (await import("@tailwindcss/vite")).default(),
    (await import("vite-tsconfig-paths")).default({ projects: ["./tsconfig.json"] }),
    (await import("@tanstack/react-start/plugin/vite")).tanstackStart({
      // Redirect TanStack Start's bundled server entry to src/server.ts (our SSR
      // error wrapper); nitro builds the Worker from its output.
      server: { entry: "server" },
      importProtection: {
        behavior: "error",
        client: {
          files: ["**/server/**"],
          specifiers: ["server-only"],
        },
      },
    }),
  ];

  // Nitro must run after tanstackStart has generated the server bundle inputs,
  // and only at build time — `wrangler dev`/`deploy` consume its output.
  if (command === "build") {
    const { nitro } = await import("nitro/vite");
    plugins.push(nitro({ defaultPreset: "cloudflare-module" }));
  }

  plugins.push((await import("@vitejs/plugin-react")).default());

  // Inline any VITE_* variables from .env files into import.meta.env at build time.
  const define: Record<string, string> = {};
  for (const [key, value] of Object.entries(loadEnv(mode, process.cwd(), "VITE_"))) {
    define[`import.meta.env.${key}`] = JSON.stringify(value);
  }

  return {
    define,
    css: { transformer: "lightningcss" },
    resolve: {
      alias: { "@": `${process.cwd()}/src` },
      dedupe: [
        "react",
        "react-dom",
        "react/jsx-runtime",
        "react/jsx-dev-runtime",
        "@tanstack/react-query",
        "@tanstack/query-core",
      ],
    },
    optimizeDeps: {
      include: [
        "react",
        "react-dom",
        "react-dom/client",
        "react/jsx-runtime",
        "react/jsx-dev-runtime",
      ],
      ignoreOutdatedRequests: true,
    },
    server: {
      host: "::",
      port: 8080,
      // Reliable HMR on Windows file systems.
      watch: { awaitWriteFinish: { stabilityThreshold: 1000, pollInterval: 100 } },
    },
    plugins,
  };
};
