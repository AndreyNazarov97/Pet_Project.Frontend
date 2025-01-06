import { AppBar, Button } from "@mui/material"
import { NavLink } from "react-router-dom"
import { useAuth } from "../contexts/auth/useAuth"

export default function Header() {
	const { accessToken, logout } = useAuth()

	return (
		<AppBar position="static">
			<div className="flex flex-row items-center justify-between py-2 px-3">
				<div className="flex flex-row gap-4 items-center justify-center">
					<NavLink to="volunteers">Volunteers</NavLink>
					<NavLink to="profile">Profile</NavLink>
					<NavLink to="upload">Upload</NavLink>
				</div>
				<NavLink to="/" className="pr-5">
					<div className="flex flex-row items-center gap-2">
						<span className="sm:text-3xl">Pet Project</span>
					</div>
				</NavLink>
				<div>
					{accessToken ? (
						<NavLink to="profile">Profile</NavLink>
					) : (
						<NavLink to="login">Login</NavLink>
					)}
					<Button
						style={{ marginLeft: "10px" }}
						variant="contained"
						color="secondary"
						onClick={() => logout()}
					>
						Logout
					</Button>
				</div>
			</div>
		</AppBar>
	)
}
