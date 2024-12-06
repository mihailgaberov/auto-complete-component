import { useState } from "react";

export default function useThrowAsyncError() {
  const [_, setState] = useState();

  return (error: unknown) => {
    setState(() => {
      throw error;
    });
  };
}
