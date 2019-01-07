import React from 'react'
import { createRenderer } from 'react-test-renderer/shallow'
import tape from 'tape'
import addAssertions from 'extend-tape'
import jsxExtensions from '../src/index'

const test = addAssertions(tape, jsxExtensions)

const SomeComponent = () =>
  <div>
    <h1>Welcome!</h1>
    <p>Glad you decided to visit us</p>
  </div>

const SomeNull = () => null

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

test('jsxEquals', t => {
  t.jsxEquals(
    render(<SomeComponent />),
    // eslint-disable-next-line
    <div><h1>Welcome!</h1><p>Glad you decided to visit us</p></div>,
    'More complex multi-line JSX components are equal'
  )
  t.end()
})

test('jsxNotEquals', t => {
  t.jsxNotEquals(
    render(<SomeComponent />),
    null,
    'Two components are not equal'
  )
  t.end()
})

test('jsxNotEquals', t => {
  t.jsxNotEquals(
    render(<SomeNull />),
    undefined,
    'Components that return nil'
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
