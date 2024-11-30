1. What is the difference between Component and PureComponent?
   Give an example where it might break my app.

   PureComponent is a React component that is optimized for performance. It does a shallow comparison of props and
   state, and only re-renders if the props or state have changed. This is done in shouldComponentUpdate method,
   whereas the regular component doesn't implement this method by default
   and will re-render every time when its parent re-renders. PureComponent can break the app when we pass props that are not primitive
   data types. For example objects or arrays, like here:

   ```
   import React, { PureComponent } from 'react';

    class MyPureComponent extends PureComponent {
        render() {
            return <div>{this.props.data.value}</div>;
        }
    }

    export default function App() {
        const [data, setData] = React.useState({ value: 0 });

        const increment = () => {
            data.value++; // Mutating the object
            setData(data); // State reference remains the same
        };

        return (
            <div>
                <button onClick={increment}>Increment</button>
                <MyPureComponent data={data} />
            </div>
        );
    }
   }
   ```

   Since PureComponent uses a shallow comparison, it doesn't detect changes to the data object because its reference hasn't changed.
   As a result, the component doesn't re-render, even though data.value has been updated.

2. Context + ShouldComponentUpdate might be dangerous. Why is
   that?

   It is not a good idea to use these two together, because the Context updates don't respect the shouldComponentUpdate and will re-render all subscriberd components any time the context changes. This can potentially cause unexpected behavior. The way to go around this is to use useContext hook inside functional components and avoid using shouldComponentUpdate with context dependent components.

3. Describe 3 ways to pass information from a component to its
   PARENT .

4. Give 2 ways to prevent components from re-rendering.

5. What is a fragment and why do we need it? Give an example where it
   might break my app.

6. Give 3 examples of the HOC pattern.

7. What's the difference in handling exceptions in promises,
   callbacks and async…await?

8. How many arguments does setState take and why is it async.

9. List the steps needed to migrate a Class to Function
   Component.

10. List a few ways styles can be used with components.

11. How to render an HTML string coming from the server.

```

```
