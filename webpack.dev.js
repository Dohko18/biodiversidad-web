const HtmlWebPackPlugin = require("html-webpack-plugin");
const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");
const { TsconfigPathsPlugin } = require("tsconfig-paths-webpack-plugin");
require('dotenv').config()
const webpack = require('webpack');

const deps = require("./package.json").dependencies;
module.exports = (_, argv) => {

    const domain = argv.env.domain || 'localhost';

    console.log("domain", domain)

    return {
        devtool: "eval-cheap-module-source-map",
        resolve: {
            extensions: [".tsx", ".ts", ".jsx", ".js", ".json"],
            plugins: [new TsconfigPathsPlugin({ configFile: "./tsconfig.json" })]
        },

        devServer: {
            port: 7007,
            host: "0.0.0.0",
            historyApiFallback: true,
            proxy: {
                "/api": `http://${domain}:8050`,
            },
        },

        module: {
            rules: [
                {
                    test: /\.m?js/,
                    type: "javascript/auto",
                    resolve: {
                        fullySpecified: false,
                    },
                },
                {
                    test: /\.(css|s[ac]ss)$/i,
                    use: ["style-loader", "css-loader", "postcss-loader"],
                },
                {
                    test: /\.(png|jp(e*)g|svg|gif)$/,
                    type: "asset/resource",
                },
                {
                    test: /\.(woff(2)?|ttf|eot|svg|otf)(\?v=\d+\.\d+\.\d+)?$/,
                    type: "asset/resource",
                },
                {
                    test: /\.(ts|tsx|js|jsx)$/,
                    exclude: /node_modules/,
                    use: {
                        loader: "babel-loader",
                    },
                },
            ],
        },

        plugins: [
            new webpack.DefinePlugin({
                APP_NAME: JSON.stringify("mcr_shell_admin"),
                remotes: JSON.stringify({
                    "mcr_audit_flow_admin": `http://${domain}:6001/remoteEntry.js`,
                    "mcr_disbursement_admin": `http://${domain}:7031/remoteEntry.js`,
                    "mcr_capabilities_admin": `http://${domain}:7014/remoteEntry.js`,
                    "mcr_loan_approval_admin": `http://${domain}:7030/remoteEntry.js`,
                    "mcr_user_doc_validation_admin": `http://${domain}:7041/remoteEntry.js`,
                    "mcr_domain_admin": `http://${domain}:7020/remoteEntry.js`,
                    "mcr_review_admin": `http://${domain}:7044/remoteEntry.js`,
                    "mcr_user_admin": `http://${domain}:7042/remoteEntry.js`,
                })
            }),
            new ModuleFederationPlugin({
                name: "mcr_shell_admin",
                filename: "remoteEntry.js",
                remotes: {},
                exposes: {},
                shared: {
                    ...deps,
                    react: {
                        singleton: true,
                        requiredVersion: deps.react,
                    },
                    "react-dom": {
                        singleton: true,
                        requiredVersion: deps["react-dom"],
                    },
                },
            }),
            new HtmlWebPackPlugin({
                template: "./src/index.html",
            }),
        ],
    }
};