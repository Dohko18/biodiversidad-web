const HtmlWebPackPlugin = require("html-webpack-plugin");
const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");
const {TsconfigPathsPlugin} = require("tsconfig-paths-webpack-plugin");
require('dotenv').config()
const webpack = require('webpack');

const deps = require("./package.json").dependencies;
module.exports = (_, argv) => {

    const domain = argv.env.domain || '';

    return {
        output: {
            publicPath: `${domain}`,
        },

        resolve: {
            extensions: [".tsx", ".ts", ".jsx", ".js", ".json"],
            plugins: [new TsconfigPathsPlugin({configFile: "./tsconfig.json"})]
        },

        devServer: {
            port: 8080,
            historyApiFallback: true,
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
                    "mcr_audit_flow_admin": `${domain}/auditflow/remoteEntry.js`,
                    "mcr_capabilities_admin": `${domain}/caps/remoteEntry.js`,
                    "mcr_domain_admin": `${domain}/domains/remoteEntry.js`,
                    "mcr_loan_approval_admin": `${domain}/apprvs/remoteEntry.js`,
                    "mcr_disbursement_admin": `${domain}/dbs/remoteEntry.js`,
                    "mcr_user_doc_validation_admin": `${domain}/udba/remoteEntry.js`,
                    "mcr_review_admin": `${domain}/review/remoteEntry.js`,
                    "mcr_user_admin": `${domain}/users/remoteEntry.js`,
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