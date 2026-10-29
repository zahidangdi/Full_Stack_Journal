import { createContext, useState } from 'react'

const ThemeContext = createContext({ theme: 'light' })

export function ThemeProvider({ children }) {
	const [theme, setTheme] = useState('light')
	const toggleTheme = () => {
		setTheme((currentTheme) => currentTheme === 'light' ? 'dark' : 'light')
	}

	return (
		<ThemeContext.Provider value={{ theme, toggleTheme }}>
			{children}
		</ThemeContext.Provider>
	)
}

export default ThemeContext