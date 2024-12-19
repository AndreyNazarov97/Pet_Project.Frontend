import { createRoot } from "react-dom/client"
import { RouterProvider } from "react-router-dom"
import { router } from "./app/router"
import { AuthProvider } from "./contexts/auth/AuthContext"
import "./index.css"

createRoot(document.getElementById("root")!).render(
	<>
		<AuthProvider>
			<RouterProvider router={router} />
		</AuthProvider>
	</>
)
