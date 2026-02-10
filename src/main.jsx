import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./ui/Layout";
import Products from "./pages/Products";
import Orders from "./pages/Orders";
import Customers from "./pages/Customers";
import Categories from "./pages/Categories";
import NotFound from "./pages/NotFound";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { ToastContainer } from "react-toastify";
import Error from "./pages/Error";
import { Signin } from "./pages/SignIn";
import AuthLayout from "./ui/AuthLayout";
const queryClient = new QueryClient();
createRoot(document.getElementById("root")).render(
	<QueryClientProvider client={queryClient}>
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<Layout />}>
					<Route element={<AuthLayout />}>
						<Route index element={<App />} />
						<Route path="/products" element={<Products />} />
						<Route path="/orders" element={<Orders />} />
						<Route path="/customers" element={<Customers />} />
						<Route path="/categories" element={<Categories />} />
					</Route>
					<Route path="/error" element={<Error />} />
					<Route path="/sign-in" element={<Signin />} />
					<Route path="*" element={<NotFound />} />
				</Route>
			</Routes>
			<ReactQueryDevtools initialIsOpen={false} />
			<ToastContainer
				position="top-right"
				autoClose={3000}
				hideProgressBar={false}
				newestOnTop={false}
				closeOnClick={false}
				rtl={false}
				pauseOnFocusLoss
				draggable
				pauseOnHover
				theme="light"
			/>
		</BrowserRouter>
	</QueryClientProvider>,
);
