import * as esbuild from "esbuild";
import { type Manifest } from "../../manifest";
import type * as Channel from "../../channel";
import type { Context } from "../context";
type Compiler = {
    compile: () => Promise<{
        metafile: esbuild.Metafile;
        hmr?: Manifest["hmr"];
    }>;
    cancel: () => Promise<void>;
    dispose: () => Promise<void>;
};
export declare const create: (ctx: Context, channels: {
    cssBundleHref: Channel.Type<string | undefined>;
}) => Promise<Compiler>;
export {};
