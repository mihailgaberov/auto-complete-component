import { ReactElement, ReactNode, StrictMode, Component } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";

type Props = { children: ReactNode; fallback: ReactElement };
type State = { hasError: boolean };

class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    // initialize the error state
    this.state = { hasError: false };
  }

  // if an error happened, set the state to true
  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: any, errorInfo: any) {
    // send error to somewhere here
    console.log(error, errorInfo);
  }

  render() {
    // if error happened, return a fallback component
    if (this.state.hasError) return this.props.fallback;

    return this.props.children;
  }
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ErrorBoundary fallback={<div>Oh no! Something went wrong</div>}>
      <App />
    </ErrorBoundary>
  </StrictMode>
);
