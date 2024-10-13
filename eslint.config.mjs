import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";
import prettier from 'eslint-plugin-prettier';

export default {
  extends: [
    pluginJs.configs.recommended,  
    ...tseslint.configs.recommended 
  ],
  files: ["**/*.{js,mjs,cjs,ts}"],
  languageOptions: {
    ecmaVersion: 2020,  
    globals: globals.browser,  
  },
  plugins: {
    prettier, 
  },
  rules: {
    'prettier/prettier': 'error',  
  }
};