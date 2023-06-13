import type * as esbuild from "esbuild";
import type { RemixConfig } from "../config";
import { type Manifest } from "../manifest";
export declare function create({ config, metafile, cssBundleHref, hmr, }: {
    config: RemixConfig;
    metafile: esbuild.Metafile;
    cssBundleHref?: string;
    hmr?: Manifest["hmr"];
}): Promise<Manifest>;
export declare const write: (config: RemixConfig, assetsManifest: Manifest) => Promise<void>;
