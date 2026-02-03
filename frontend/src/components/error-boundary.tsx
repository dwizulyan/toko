import { useRouteError } from "react-router";
import { isRouteErrorResponse } from "react-router";

const ErrorBoundary = () => {
  let error = useRouteError();
  if (isRouteErrorResponse(error)) {
    return (
      <div className="flex items-center justify-center flex-col h-screen w-full">
        <h1 className="text-8xl font-black bg-clip-text text-transparent bg-linear-to-b from-purple-900 to-blue-900">
          {error.status}
        </h1>
        <p className="text-xl font-bold">{error.statusText}</p>
      </div>
    );
  } else if (error instanceof Error) {
    return (
      <div>
        <h1>Error</h1>
        <p>{error.message}</p>
        <p>Stack trace is : </p>
        <p>{error.stack}</p>
      </div>
    );
  }
};

export default ErrorBoundary;
