import React from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App'
import { createTheme, ThemeProvider } from '@mui/material/styles'


const theme = createTheme({
  custom: {
    primary: '#1d7d74',
    onhover: '#1b7068'
  },
  themeDark: {
    eventFontColor: 'rgb(233, 233, 233)',
    eventBgColor: 'rgb(44, 44, 44)',
    subHeaderColor: 'rgba(255, 255, 255, 0.6)',
    linkColor: '#29aea0',
  },
  themeLight: {
    eventFontColor: 'rgb(40, 40, 40)',
    eventBgColor: 'rgb(233, 233, 233)',
    subHeaderColor: 'rgba(0, 0, 0, 0.6)',
    linkColor: 'rgb(0, 0, 238)',
  },
  palette: {
    darkbg: 'pink',
    background: {
      // paper: "#222222", // works
      default: "#222222"
    }
    },
  //   components: {
  //     MuiPaper: {
  //       styleOverrides: {
  //         root: {
  //           backgroundColor: "grey" //works
  //         }
  //       }
  //     }
  //   }
})

function ThemedApp() {
  return (
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
  )
}

const container = document.getElementById('root')
const root = createRoot(container)
root.render(<ThemedApp />)

