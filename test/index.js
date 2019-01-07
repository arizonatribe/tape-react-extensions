import React from 'react'
import { createRenderer } from 'react-test-renderer/shallow'
import tape from 'tape'
import addAssertions from 'extend-tape'
import jsxExtensions from '../src/index'

const test = addAssertions(tape, jsxExtensions)

const renderer = createRenderer()
const render = jsx => {
  renderer.render(jsx)
  return renderer.getRenderOutput()
}

// eslint-disable-next-line react/prop-types
function MyComponent({ color }) {
  const className = `box color-${color}`
  return <div className={className} />
}

test('jsxEquals', t => {
  t.jsxEquals(
    render(<MyComponent color="red" />),
    <div className="box color-red" />,
    'Two components are equal'
  )
  t.end()
})

test('jsxNotEquals', t => {
  t.jsxNotEquals(
    render(<MyComponent color="blue" />),
    <div className="box color-red" />,
    'Two components are not equal'
  )
  t.end()
})

test('jsxIncludes', t => {
  t.jsxIncludes(
    render(<MyComponent color="red" />),
    <div><div className="box color-red" /></div>,
    'One component includes another'
  )
  t.end()
})

test('jsxNotIncludes', t => {
  t.jsxNotIncludes(
    render(<MyComponent color="blue" />),
    <div><div className="box color-red" /></div>,
    'One component does not include another'
  )
  t.end()
})
