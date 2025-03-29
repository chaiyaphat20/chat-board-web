import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";
import prettierConfig from './.prettierrc.json' assert { type: 'json' };

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

// ในรูปแบบ flat config ใหม่
const eslintConfig = [
  // กำหนดค่าพื้นฐาน
  {
    ignores: ['**/node_modules/**', '.next/**', 'out/**'],
  },
  
  // นำเข้า config จาก non-flat format
  ...compat.extends(
    "next/core-web-vitals", 
    "next/typescript",
    "plugin:prettier/recommended" // เพิ่ม prettier config
  ),
  
  // เพิ่ม Prettier rules
  {
    files: ['**/*.js', '**/*.jsx', '**/*.ts', '**/*.tsx'],
    plugins: {
      prettier: require('eslint-plugin-prettier'),
    },
    rules: {
      'prettier/prettier': ['error', prettierConfig],
      'arrow-body-style': ['error', 'as-needed'],
      'prefer-arrow-callback': ['error', { allowNamedFunctions: false }],
    },
  },
];

export default eslintConfig;