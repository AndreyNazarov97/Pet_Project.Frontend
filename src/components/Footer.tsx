import TelegramIcon from "@mui/icons-material/Telegram"
import { AppBar } from "@mui/material"

export default function Footer() {
	return (
		<AppBar position="static">
			<div className="flex flex-row items-center justify-between py-2 px-3">
				<div className="flex flex-row space-x-4">
					<div>
						<TelegramIcon />
					</div>
					<div>vk</div>
				</div>

				<div>© 2024 Pet Project</div>
			</div>
		</AppBar>
	)
}
