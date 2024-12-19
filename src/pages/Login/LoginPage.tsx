import { Button, CircularProgress, TextField } from "@mui/material"
import { useForm } from "react-hook-form"
import { useNavigate } from "react-router-dom"
import { useAuth } from "../../contexts/auth/useAuth"

type LoginFields = {
	email: string
	password: string
}

export default function LoginPage() {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<LoginFields>()

	const { accessToken, isLoading, login } = useAuth()

	const navigate = useNavigate()

	const onSubmit = async (data: LoginFields) => {
		await login(data.email, data.password)

		navigate("/profile")
	}

	return (
		<div className="flex items-center justify-center h-full w-full">
			{isLoading ? (
				<div className="flex items-center justify-center">
					<CircularProgress />
				</div>
			) : (
				<div className="flex flex-col h-full w-full py-6 px-10 justify-center items-start gap-4">
					<div>
						<h1 className="text-4xl">{accessToken}</h1>
					</div>
					<div className="flex flex-col flex-1 min-w-80 mx-auto items-center justify-center gap-9">
						<form
							className="flex flex-col w-full items-center gap-7"
							onSubmit={handleSubmit(onSubmit)}
						>
							<TextField
								{...register("email", {
									required: "Email is required",
									validate: (value) => {
										if (!value.includes("@")) {
											return "Email must contain @"
										}
									},
								})}
								label="Email"
								error={!!errors.email}
								helperText={errors.email?.message}
								variant="standard"
								fullWidth
							/>
							<TextField
								{...register("password")}
								variant="standard"
								label="Password"
								fullWidth
							/>
							<Button type="submit" variant="contained" disabled={isLoading}>
								Login
							</Button>
						</form>
					</div>
				</div>
			)}
		</div>
	)
}
