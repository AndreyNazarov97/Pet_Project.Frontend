import { createBrowserRouter } from "react-router-dom"
import RootLayout from "./RootLayout"

export const router = createBrowserRouter([
	{
		path: "/",
		element: <RootLayout />,
		children: [
			{
				path: "profile",
				element: <div className="text-8xl text-center "> Profile</div>,
			},
			{
				path: "volunteers",
				element: <div className="text-8xl text-center "> Volunteers</div>,
			},
			{
				path: "register",
				element: <div className="text-8xl text-center ">Register</div>,
			},
			{
				path: "login",
				element: <div className="text-8xl text-center ">Login</div>,
			},
		],
		errorElement: <div className="text-8xl text-center">404</div>,
	},
])
