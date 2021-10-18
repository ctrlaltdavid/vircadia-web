/*
//  quasar.conf.js
//
//  Created by Kalila L. on May 9th, 2021.
//  Copyright 2021 Vircadia contributors.
//
//  Distributed under the Apache License, Version 2.0.
//  See the accompanying file LICENSE or http://www.apache.org/licenses/LICENSE-2.0.html
*/

/*
* This file runs in a Node context (it's NOT transpiled by Babel), so use only
* the ES6 features that are supported by your Node version. https://node.green/
*/
const path = require("path");

// Fetch package.json info for use in the manifest
const { productName } = require("./package.json").productName;
const { productShortName } = require("./package.json").name;
const { productDescription } = require("./package.json").description;

// Configuration for your app
// https://v2.quasar.dev/quasar-cli/quasar-conf-js

/* eslint-env node */
/* eslint-disable @typescript-eslint/no-var-requires */
const ESLintPlugin = require("eslint-webpack-plugin");

const { configure } = require("quasar/wrappers");

module.exports = configure(function (ctx) {
    return {
        // https://v2.quasar.dev/quasar-cli/supporting-ts
        supportTS: {
            tsCheckerConfig: {
                eslint: {
                    enabled: true,
                    files: "./src/**/*.{ts,tsx,js,jsx,vue}",
                },
            }
        },

        // https://v2.quasar.dev/quasar-cli/prefetch-feature
        // preFetch: true,

        // app boot file (/src/boot)
        // --> boot files are part of "main.js"
        // https://v2.quasar.dev/quasar-cli/boot-files
        boot: [
            "axios",
            "global-components"
        ],

        // https://v2.quasar.dev/quasar-cli/quasar-conf-js#Property%3A-css
        css: [
            "app.scss"
        ],

        // https://github.com/quasarframework/quasar/tree/dev/extras
        extras: [
            // "ionicons-v4",
            // "mdi-v5",
            // "fontawesome-v5",
            // "eva-icons",
            // "themify",
            // "line-awesome",
            // "roboto-font-latin-ext", // this or either "roboto-font", NEVER both!

            "fontawesome-v5",
            "roboto-font", // optional, you are not bound to it
            "material-icons" // optional, you are not bound to it
        ],

        // Full list of options: https://v2.quasar.dev/quasar-cli/quasar-conf-js#Property%3A-build
        build: {
            vueRouterMode: "hash", // available values: "hash", "history"

            // transpile: false,

            // Add dependencies for transpiling with Babel (Array of string/regex)
            // (from node_modules, which are by default not transpiled).
            // Applies only if "transpile" is set to true.
            // transpileDependencies: [],

            // rtl: true, // https://v2.quasar.dev/options/rtl-support
            // preloadChunks: true,
            // showProgress: false,
            // gzip: true,
            // analyze: true,

            // Options below are automatically set depending on the env, set them if you want to override
            // extractCSS: false,

            // https://v2.quasar.dev/quasar-cli/handling-webpack
            // "chain" is a webpack-chain object https://github.com/neutrinojs/webpack-chain
            chainWebpack (chain) {
                chain.plugin("eslint-webpack-plugin")
                    .use(ESLintPlugin, [{ extensions: ["js", "vue"] }]);
                // Path aliases to reduce number of dot-dot relative paths.
                // Need to add here and in tsconfig.json
                chain.resolve.alias
                    .set("@Base", path.resolve(__dirname, "./src"))
                    .set("@Components", path.resolve(__dirname, "./src/components"))
                    .set("@Modules", path.resolve(__dirname, "./src/modules"))
                    .set("@Store", path.resolve(__dirname, "./src/store"));
                    /*
                chain.entries( [ "vircadia-sdk", "./src/libs/Vircadia.js" ]);
                chain.module.rule('vircadia-sdk')
                    .test(/.*\/libs\/.*\.js$/)
                    .use("file-loader")
                        .loader("file-loader");
                        */
            }
        },

        // Full list of options: https://v2.quasar.dev/quasar-cli/quasar-conf-js#Property%3A-devServer
        devServer: {
            https: false,
            port: 8080,
            open: true // opens browser window automatically
        },

        // https://v2.quasar.dev/quasar-cli/quasar-conf-js#Property%3A-framework
        framework: {
            config: {
                dark: "auto"
            },

            // iconSet: "material-icons", // Quasar icon set
            // lang: "en-US", // Quasar language pack

            // For special cases outside of where the auto-import strategy can have an impact
            // (like functional components as one of the examples),
            // you can manually specify Quasar components/directives to be available everywhere:
            //
            // components: [],
            // directives: [],

            // Quasar plugins
            plugins: [
                "Notify"
            ]
        },

        // animations: "all", // --- includes all animations
        // https://v2.quasar.dev/options/animations
        animations: [],

        // https://v2.quasar.dev/quasar-cli/developing-ssr/configuring-ssr
        ssr: {
            pwa: false,

            // manualStoreHydration: true,
            // manualPostHydrationTrigger: true,

            prodPort: 3000, // The default port that the production server should use
            // (gets superseded if process.env.PORT is specified at runtime)

            maxAge: 1000 * 60 * 60 * 24 * 30,
            // Tell browser when a file from the server should expire from cache (in ms)

            chainWebpackWebserver (chain) {
                chain.plugin("eslint-webpack-plugin")
                    .use(ESLintPlugin, [{ extensions: ["js"] }]);
            },

            middlewares: [
                ctx.prod ? "compression" : "",
                "render" // keep this as last one
            ]
        },

        // https://v2.quasar.dev/quasar-cli/developing-pwa/configuring-pwa
        pwa: {
            workboxPluginMode: "GenerateSW", // "GenerateSW" or "InjectManifest"
            workboxOptions: {}, // only for GenerateSW

            // for the custom service worker ONLY (/src-pwa/custom-service-worker.[js|ts])
            // if using workbox in InjectManifest mode
            chainWebpackCustomSW (chain) {
                chain.plugin("eslint-webpack-plugin")
                    .use(ESLintPlugin, [{ extensions: ["js"] }]);
            },

            manifest: {
                name: productName,
                short_name: productShortName,
                description: productDescription,
                display: "standalone",
                orientation: "portrait",
                background_color: "#ffffff",
                theme_color: "#027be3",
                icons: [
                    {
                        src: "icons/icon-128x128.png",
                        sizes: "128x128",
                        type: "image/png"
                    },
                    {
                        src: "icons/icon-192x192.png",
                        sizes: "192x192",
                        type: "image/png"
                    },
                    {
                        src: "icons/icon-256x256.png",
                        sizes: "256x256",
                        type: "image/png"
                    },
                    {
                        src: "icons/icon-384x384.png",
                        sizes: "384x384",
                        type: "image/png"
                    },
                    {
                        src: "icons/icon-512x512.png",
                        sizes: "512x512",
                        type: "image/png"
                    }
                ]
            }
        },

        // Full list of options: https://v2.quasar.dev/quasar-cli/developing-cordova-apps/configuring-cordova
        cordova: {
            // noIosLegacyBuildFlag: true, // uncomment only if you know what you are doing
        },

        // Full list of options: https://v2.quasar.dev/quasar-cli/developing-capacitor-apps/configuring-capacitor
        capacitor: {
            hideSplashscreen: true
        },

        // Full list of options: https://v2.quasar.dev/quasar-cli/developing-electron-apps/configuring-electron
        electron: {
            bundler: "packager", // "packager" or "builder"

            packager: {
                // https://github.com/electron-userland/electron-packager/blob/master/docs/api.md#options

                // OS X / Mac App Store
                // appBundleId: "",
                // appCategoryType: "",
                // osxSign: "",
                // protocol: "myapp://path",

                // Windows only
                // win32metadata: { ... }
            },

            builder: {
                // https://www.electron.build/configuration/configuration

                appId: "vircadia-web"
            },

            // "chain" is a webpack-chain object https://github.com/neutrinojs/webpack-chain
            chainWebpack (chain) {
                chain.plugin("eslint-webpack-plugin")
                    .use(ESLintPlugin, [{ extensions: ["js"] }]);
                // do something with the Electron main process Webpack cfg
                // extendWebpackMain also available besides this chainWebpackMain
            },

            // "chain" is a webpack-chain object https://github.com/neutrinojs/webpack-chain
            chainWebpackPreload (chain) {
                chain.plugin("eslint-webpack-plugin")
                    .use(ESLintPlugin, [{ extensions: ["js"] }]);
                // do something with the Electron main process Webpack cfg
                // extendWebpackPreload also available besides this chainWebpackPreload
            },
        }
    }
});
