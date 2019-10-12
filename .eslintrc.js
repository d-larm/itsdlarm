module.exports = {
    "env": {
        "browser": true,
        "es6": true
    },
    "globals": {
        "Atomics": "readonly",
        "SharedArrayBuffer": "readonly"
    },
    "parserOptions": {
        "ecmaFeatures": {
            "jsx": true
        },
        "ecmaVersion": 2018,
        "sourceType": "module"
    },
    "plugins": [
        "react"
    ],
    "rules": {
        "object-curly-spacing": ["error", "always"],
        "array-bracket-spacing": ["error", "always"],
        "space-in-parens": ["error", "always"],
        "comma-spacing": [ "error" ]
      }
};