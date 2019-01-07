import reactElementToJsxString from 'react-element-to-jsx-string'

function collapse(str) {
  return String(str).replace(/\s+/g, ' ')
}

function jsxIncludes(actual, expected, message) {
  this.true(collapse(reactElementToJsxString(expected)).includes(collapse(reactElementToJsxString(actual))), message)
}

function jsxNotIncludes(actual, expected, message) {
  this.false(collapse(reactElementToJsxString(expected)).includes(collapse(reactElementToJsxString(actual))), message)
}

function jsxEquals(actual, expected, message) {
  this.equals(reactElementToJsxString(actual), reactElementToJsxString(expected), message)
}

function jsxNotEquals(actual, expected, message) {
  this.notEquals(reactElementToJsxString(actual), reactElementToJsxString(expected), message)
}

export default {
  jsxEquals,
  jsxNotEquals,
  jsxIncludes,
  jsxNotIncludes
}
