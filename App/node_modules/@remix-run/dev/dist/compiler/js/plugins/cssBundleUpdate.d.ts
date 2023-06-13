import type { Plugin } from "esbuild";
import type * as Channel from "../../../channel";
/**
 * This plugin updates the source code for the "css-bundle" package on rebuilds
 * to contain the latest CSS bundle href so CSS changes get picked up for HMR.
 * Without this plugin, the "css-bundle" package source code never changes on
 * disk so it never triggers an update.
 */
export declare function cssBundleUpdatePlugin(channels: {
    cssBundleHref: Channel.Type<string | undefined>;
}): Plugin;
