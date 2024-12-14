import { AppBar } from "@mui/material"
import { NavLink } from "react-router-dom"

export default function Header() {
	return (
		<AppBar position="static">
			<div className="flex flex-row items-center justify-between py-2 px-3">
				<div className="flex flex-row gap-4 items-center justify-center">
					<NavLink to="volunteers">Volunteers</NavLink>
					<NavLink to="profile">Profile</NavLink>
				</div>
				<NavLink to="/" className="pr-5">
					<div className="flex flex-row items-center gap-2">
						<span className="sm:text-3xl">Pet Project</span>
					</div>
				</NavLink>
				<NavLink to="login">Login</NavLink>
			</div>
		</AppBar>
	)
}
