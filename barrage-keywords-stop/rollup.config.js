
import { defineConfig } from 'rollup'
import typescript from 'rollup-plugin-typescript2';
import replace from 'rollup-plugin-replace';
import { terser } from 'rollup-plugin-terser'
import json from 'rollup-plugin-json';

import packageJson from './package.json' assert { type: 'json' };


const UserScriptTag = /(@(name|namespace|version|author|description|license|icon|match|source|supportURL))|UserScript/



export default defineConfig({

  input: './src/main.ts',
  output: {
    file: `dist/${packageJson.name}.js`,
    format: 'es'
  },
  plugins: [
    typescript(),

    json(),
    replace({
      delimiters: ['{{', '}}'],
      values: {
        name: packageJson.name,
        version: packageJson.version,
        description: packageJson.description,
        author: packageJson.author,
        repository: packageJson.repository.url,
        license: packageJson.license,
        bug: packageJson.bugs.url,
      },
    }),
    terser({
      mangle: false,
      compress: false,
      output: {
        beautify: true,
        comments: UserScriptTag
      }
    }),

  ],
  watch: {
    exclude: "node_modules/**",
    include: "src/**/*.ts"
  }

})
