import { useEffect, useState } from "react";
import { ProtectedRoute } from "../custom/guards";
import Transition from "../custom/transition";
import "nprogress/nprogress.css"; //styles of nprogress
import { Provider } from "react-redux";
import IdleLogout from "./_idle";
import configureStore from "../store";
import "./styles.scss";
import ErrorBoundary from "../components/error-boundary";

// This default export is required in a new `pages/_app.js` file.
export default function MyApp({ Component, pageProps }) {
  const [store, setStore] = useState(null);

  useEffect(() => {
    setStore(configureStore());
  }, []);

  return (
    !!store && (
      <ErrorBoundary>
        <Provider store={store}>
          <Transition>
            <ProtectedRoute
              config={{ match: "/(user|btcraffles)/*", url: "/auth/login" }}
            >
              <IdleLogout timeout={30 * 60 * 1000} />
              <Component {...pageProps} />
            </ProtectedRoute>
          </Transition>
        </Provider>
      </ErrorBoundary>
    )
  );
}
