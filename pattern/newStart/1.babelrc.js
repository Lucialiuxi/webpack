
module.exports = {
    presets: [
        [
            "@babel/preset-env",
            {
                "targets": { "esmodules": true },
            }
        ],
       [
           "@babel/preset-react",
            {
                development: process.env.BABEL_ENV === "development",
            }
        ],
        ["stage-2"],
        ["@babel/plugin-transform-runtime"],
    ]
};
