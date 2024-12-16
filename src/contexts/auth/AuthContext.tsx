import { createContext, useEffect, useLayoutEffect, useState } from "react"
import { AccountsService } from "../../api/accounts"
import { api } from "../../api/api"
import { User } from "../../models/User"

export type AuthContextType = {
	accessToken: string | undefined
	user: User | undefined
	isLoading: boolean
	isError: boolean
	login: (email: string, password: string) => Promise<void>
	logout: () => Promise<void>
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
	const [accessToken, setAccessToken] = useState<string | undefined>("")
	const [user, setUser] = useState<User | undefined>(undefined)
	const [isLoading, setIsLoading] = useState<boolean>(false)
	const [isError, setIsError] = useState<boolean>(false)

	useEffect(() => {
		const accessTokenInterceptor = api.interceptors.request.use((config) => {
			config.headers.Authorization = accessToken
				? `Bearer ${accessToken}`
				: config.headers.Authorization

			return config
		})
		return () => {
			api.interceptors.response.eject(accessTokenInterceptor)
		}
	}, [accessToken])

	useLayoutEffect(() => {
		const refreshTokenInterceptor = api.interceptors.response.use(
			(config) => config,
			async (error) => {
				if (error?.response?.status === 401) {
					const originalRequest = error.config
					try {
						const response = await AccountsService.refresh()

						setAccessToken(response.data.result!.accessToken)
						setUser({
							email: response.data.result!.email,
							id: response.data.result!.id,
						} as User)

						originalRequest.headers.Authorization = `Bearer ${
							response.data.result!.accessToken
						}`

						return api(originalRequest)
					} catch {
						setAccessToken(undefined)
					}
				}

				throw error
			}
		)
		return () => {
			api.interceptors.response.eject(refreshTokenInterceptor)
		}
	}, [])

	const login = async (email: string, password: string) => {
		try {
			setIsLoading(true)
			const response = await AccountsService.login(email, password)

			setAccessToken(response.data.result!.accessToken)
			setUser({
				email: response.data.result!.email,
				id: response.data.result!.id,
			} as User)
			setIsLoading(false)
		} catch (error) {
			setIsLoading(false)
			setIsError(true)
			console.log(error)
		}
	}

	const logout = async () => {
		try {
			await AccountsService.logout()

			setAccessToken(undefined)
			setUser(undefined)
		} catch (error) {
			setIsError(true)
			console.log(error)
		}
	}

	return (
		<AuthContext.Provider
			value={{ accessToken, user, isLoading, isError, login, logout }}
		>
			{children}
		</AuthContext.Provider>
	)
}
