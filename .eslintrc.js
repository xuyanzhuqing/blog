module.exports = {
    "env": {
        "browser": true,
        "commonjs": true,
        "es6": true
    },
    extends: [
        "plugin:vue-libs/recommended"
    ],
    "parserOptions": {
        "ecmaFeatures": {
            "jsx": false
        },
        "ecmaVersion": 2016,
        "sourceType": "module"
    },
    "plugins": ['html'],
    "rules": {
        "indent": [
            "error",
            4
        ],
        "linebreak-style": [
            "error",
            "unix"
        ],
        "quotes": [
            "error",
            "single"
        ],
        "semi": [
            "error",
            "always"
        ]
    }
};