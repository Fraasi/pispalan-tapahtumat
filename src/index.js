import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import { createTheme, ThemeProvider } from '@mui/material/styles'
// import { ThemeProvider } from '@material-ui/styles'
import * as serviceWorkerRegistration from './serviceWorkerRegistration';
import reportWebVitals from './reportWebVitals';

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
  }
})

function ThemedApp() {
  return (
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
  )
}

ReactDOM.render(<ThemedApp />, document.getElementById('root'))

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorkerRegistration.register()

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
