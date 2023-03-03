import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "../src/styles.css";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";

export const queryClient = new QueryClient({
	defaultOptions: { queries: { refetchOnWindowFocus: false } },
});

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
	<React.StrictMode>
		<QueryClientProvider client={queryClient}>
			<App />
			<ReactQueryDevtools
				initialIsOpen={false}
				position={"bottom-right"}
			/>
		</QueryClientProvider>
	</React.StrictMode>
);
