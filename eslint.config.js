import eslint from '@eslint/js'
import globals from 'globals'
import reactRefresh from 'eslint-plugin-react-refresh'
import tseslint from 'typescript-eslint'
import {globalIgnores} from 'eslint/config'
import jetBrains from '@jetbrains/eslint-config'

const mySettings = {
    rules: {

        "no-unused-vars": "off",
        '@typescript-eslint/no-unused-vars': [
            'error',
            {
                "ignoreRestSiblings": true,
                "caughtErrorsIgnorePattern": "^err"
            }
        ],
        "complexity": "off",
        "no-redeclare": "off",
        "no-magic-numbers": "off",
    }
}

export default tseslint.config([
    globalIgnores(['dist', 'dist-server', 'dist-client']),
    {
        files: ['**/*.{ts,tsx}'],
        extends: [
            eslint.configs.recommended,
            tseslint.configs.recommended,
            reactRefresh.configs.vite,
            jetBrains,
            mySettings,
        ],
        languageOptions: {
            ecmaVersion: 2020,
            globals: globals.browser,
        },
    },
])
