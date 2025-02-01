import { ReactElement, ReactNode, StrictMode, Component } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";

type Props = { children: ReactNode; fallback: ReactElement };
type State = { hasError: boolean };

class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: any, errorInfo: any) {
    console.log(error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback;
    }

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
