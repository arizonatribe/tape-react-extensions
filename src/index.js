import reactElementToJsxString from 'react-element-to-jsx-string'

const REACT_ELEMENT_TYPE = typeof Symbol === 'function' && Symbol.for
  ? Symbol.for('react.element')
  : 0xeac7

function isValidElement(object) {
  return typeof object === 'object' && object != null && object.$$typeof === REACT_ELEMENT_TYPE;
}

function when(conditionFn, conditionalTransform) {
  return val => conditionFn(val) ? conditionalTransform(val) : val
}

function collapse(str) {
  return String(str).replace(/\s+/g, ' ')
}

function validateElement(actual) {
  if (!isValidElement(actual)) {
    throw new Error(`${actual ? actual.displayName || actual.name || actual.type || String(actual) : ''} Not Valid JSX!`)
  }
}

function jsxIncludes(actual, expected, message) {
  validateElement(actual)
  validateElement(expected)
  this.true(
    collapse(reactElementToJsxString(expected)).includes(
      collapse(reactElementToJsxString(actual))
    ),
    message
  )
}

function jsxNotIncludes(actual, expected, message) {
  validateElement(actual)
  validateElement(expected)
  this.false(
    collapse(reactElementToJsxString(expected)).includes(
      collapse(reactElementToJsxString(actual))
    ),
    message
  )
}

function jsxEquals(actual, expected, message) {
  this.equals(
    when(isValidElement, reactElementToJsxString)(actual),
    when(isValidElement, reactElementToJsxString)(expected),
    message
  )
}

function jsxNotEquals(actual, expected, message) {
  this.notEquals(
    when(isValidElement, reactElementToJsxString)(actual),
    when(isValidElement, reactElementToJsxString)(expected),
    message
  )
}

export default {
  jsxEquals,
  jsxNotEquals,
  jsxIncludes,
  jsxNotIncludes
}
