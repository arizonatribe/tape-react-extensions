# tape-react-extensions

[Tape](https://github.com/substack/tape) [extensions](https://github.com/atabel/extend-tape) collection to make React component easier to test.

## Install
```
$ npm install --save-dev extend-tape
$ npm install --save-dev tape-react-extensions
```
## How to use

Testing React components is very easy with `tape` + `tape-react-extensions`:

```javascript
const MyComponent = function ({color}) {
    const className = `box color-${color}`;
    return (
        <div className={className}></div>
    );
};
```

```javascript
import tape from 'tape';
import addAssertions from 'extend-tape';
import jsxExtensions from 'tape-react-extensions';
import {createRenderer} from 'react-test-renderer/shallow';
import MyComponent from '../MyComponent';

// extend tape with jsx extensions:
const test = addAssertions(tape, jsxExtensions);

test('MyComponent is properly rendered', (t) => {
	const renderer = createRenderer();
    renderer.render(<MyComponent color="red" />);
    const result = renderer.getRenderOutput();

	// compare output with the expected result:
    t.jsxEquals(result, <div className="box color-red"></div>);
    t.end();
});
```

## Assert methods

- `t.jsxEquals(jsx, expectedJsx)` - Checks that the component's rendered output matches expected output
- `t.jsxNotEquals(jsx, expectedJsx)` - Checks that the component's rendered output does NOT match expected output
- `t.jsxIncludes(jsx, expectedJsx)` - Checks that the component's rendered output includes expected output
- `t.jsxNotIncludes(jsx, expectedJsx)` - Checks that the component's rendered output does NOT include expected output

## Run tests
```
$ npm install
$ npm test
```
