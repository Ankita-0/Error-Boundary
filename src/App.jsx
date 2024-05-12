import { useEffect, useState } from "react";
// import { ErrorBoundary } from "./Error Boundary/ErrorBoundary.jsx"
import { ErrorBoundary } from 'react-error-boundary'

const data = ["kiwi", "pineapple", "mango"];

function MyFallbackComponent({ error, resetErrorBoundary }) {
  return (
    <div role="alert" id="container">
      <p>Something went wrong:</p>
      <pre>{error.message}</pre>
      <button onClick={resetErrorBoundary}>Try again</button>
    </div>
  )
}

function MyComponent() {
  // Some component logic that may throw JS errors
  const [fruits, setFruits] = useState([]);

  useEffect(() => {
    setTimeout(()=>setFruits([...data]), 2000);
    if (Math.random() > 0.5) {
      throw new Error('An error occurred in MyComponent');
    }

    return () => {
      setFruits([]);
    }
  }, [])

  return <>
    <div id="container">
      <h1>List of fruits: </h1>
      {fruits.length === 0 ? <div style={{ color: "light gray" }}> Loading... </div> : null}
      <div style={{ color: "light gray" }}>{fruits.map((fruit, index) => <li key={index}>{fruit}</li>)}</div>
    </div>
  </>
}

function App() {
  return (
    <ErrorBoundary
      FallbackComponent={MyFallbackComponent}
      onReset={() => {
        // reset the state of your app here
        window.location.reload();
      }}
      resetKeys={['someKey']}
    >
      <MyComponent />
    </ErrorBoundary>
  )
}

export default App;
