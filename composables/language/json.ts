import parse from 'json-to-ast'
import { version } from 'json-to-ast/package.json'
import { type LanguageOption, type Parser } from '../language'

// @unocss-include

const jsonToAst: Parser<undefined, parse.Options> = {
  id: 'json-to-ast',
  label: 'json-to-ast',
  icon: 'i-vscode-icons:file-type-json',
  editorLanguage: 'json',
  options: {
    configurable: true,
    defaultValue: {
      loc: false,
    },
    editorLanguage: 'json',
  },
  version,
  parse(code, options) {
    return parse(code, options)
  },
  getAstLocation(node: JsonNode) {
    if (node.type !== 'Object') return
    if (!getJsonValue(node, ['type'])) return

    const start = getJsonValue(node, ['loc', 'start', 'offset'])
    const end = getJsonValue(node, ['loc', 'end', 'offset'])
    if (typeof start !== 'number' || typeof end !== 'number') return

    return { start, end }
  },
}

export const json: LanguageOption = {
  label: 'JSON',
  icon: 'i-vscode-icons:file-type-json',
  parsers: [jsonToAst],
}
