import { type ParserOptions, parse } from '@babel/parser'
import { version } from '@babel/parser/package.json'
import { type LanguageOption } from '../language'

// @unocss-include
export const javascript: LanguageOption = {
  label: 'JavaScript',
  icon: 'i-vscode-icons:file-type-js-official',
  language(options: ParserOptions | null | undefined) {
    try {
      const plugins = Array.isArray(options?.plugins) ? options!.plugins : []
      const normalizedPlugins = plugins.map((item) =>
        Array.isArray(item) ? item[0] : item
      )
      if (normalizedPlugins.includes('typescript')) return 'typescript'
    } catch {}
    return 'javascript'
  },
  options: {
    configurable: true,
    defaultValue: {},
    language: 'json',
  },
  version: `@babel/parser@${version}`,
  parse(code, options: ParserOptions | null | undefined) {
    return parse(code, {
      sourceType: 'module',
      ...options,
    })
  },
}