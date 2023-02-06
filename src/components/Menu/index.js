import React, { useState } from 'react'
import Drawer from '@mui/material/Drawer'
import Button from '@mui/material/Button'
import { styled, useTheme } from '@mui/material/styles'
import GlobalStyles from '@mui/material/GlobalStyles'
// import { makeStyles } from '@mui/styles'
import { css } from '@emotion/react'
import { createTheme, ThemeProvider } from '@mui/material/styles'

import Map from '../Map'
import Sponsors from '../Sponsors'
import pkgJson from '../../../package.json'
import './menu.css'



// drawer is in a separate .app, css vars dont work, darkmode with material-ui

// const useStyles = makeStyles(theme => ({
//   darkOrLightMode: ({ isDarkMode }) => {
//     const css = isDarkMode ? theme.themeDark : theme.themeLight
//     return {
//       '& .MuiPaper-root': {
//         backgroundColor: css.eventBgColor,
//         color: css.eventFontColor,
//         '& a': {
//           color: css.linkColor
//         },
//         '& span.version': {
//           color: css.subHeaderColor
//         },
//       }
//     }
//   },
//   button: {
//     width: '50%',
//     margin: '5px 25%',
//     background: theme.custom.primary,
//     '&:hover': {
//       background: theme.custom.onhover,
//     },
//     '& span.MuiButton-label': {
//       color: 'white'
//     }
//   },
// }))

const ctheme = createTheme({
  palette: {
    background: {
      paper: "green", // works
      default: "#222222"
    }
  },
  components: {
    MuiPaper: {
      styleOverrides: {
        root: ({ownerState, theme}) => {
          console.log('ownerState:', ownerState)
          console.log('theme:', theme)
          return {
            backgroundColor: theme.themeDark.eventBgColor, //works
            color: theme.themeDark.eventFontColor,
            "& .version": {
              color: 'grey'
            }
          }
        }
      }
    }
  }
})

const Menu = ({ isDarkMode }) => {

  const theme = useTheme()
  console.log('theme:', theme) // themes here
  const [isNavOpen, setNav] = useState(false)
  const [isMapOpen, setMap] = useState(false)

  const toggleDrawer = () => {
    setNav(prev => !prev)
    if (process.env.NODE_ENV === "production" && !isNavOpen) {
      window.gtag('event', 'menu_opened', {
        'event_category': 'user',
        'event_label': 'menu',
      })
    }
  }

  const cssTheme = isDarkMode ? theme.themeDark : theme.themeLight
  const e_styles = css`
  div.MuiPaper-root {
    backgroundColor: ${cssTheme.eventBgColor};
    color: ${cssTheme.eventFontColor};
  }

.MuiPaper-root a {
    color: ${cssTheme.linkColor};
}
.MuiPaper-root span.version {
   color: ${cssTheme.subHeaderColor};
}
`
  const styles = {
    backgroundColor: cssTheme.eventBgColor,
    color: cssTheme.eventFontColor
  }
  console.log('styles:', styles, e_styles)

  return (
    <ThemeProvider theme={ctheme}>
      <>
        <div
          id="burger-container"
          className={`${isNavOpen ? 'open' : ''}`}
          onClick={toggleDrawer}
          title="Menu">
          <div id="burger">
            <span>&nbsp;</span>
            <span>&nbsp;</span>
            <span>&nbsp;</span>
          </div>
        </div>
        <div className={isDarkMode ? `drawer-container theme-dark` : `drawer-container theme-light`}>
          <Drawer
            className={isDarkMode ? `theme-dark` : `theme-light`}
            open={isNavOpen}
            onClose={() => toggleDrawer(false)}
          sx={{"& .MuiPaper-root": {backgroundColor: 'pink'}}}
          // sx={e_styles}
          // className='diudiu'
          // style={{backgroundColor: 'black'}}
          >
            {/* <div className={isDarkMode ? `menu-content theme-dark` : `menu-content theme-light`}
          > */}
            <div className='menu-content'
            >
              <h3>
                Pispalan tapahtumat&nbsp;
                <span className="version">
                  v{pkgJson.version} &copy;Fraasi
                </span>
              </h3>
              <p>
                Pispalan harjun tapahtumat yhdellä sivustolla.
              </p>
              <p>
                <strong>Vinkki: </strong>
                Tämä nettisivu (<a href="hhttps://fraasi.github.io/pispalan-tapahtumat/" target="_blank" rel="noopener noreferrer">https://fraasi.github.io/pispalan-tapahtumat/</a>) on suunniteltu kännykälle ja toimii parhaiten kun avaa nettisivun luurin selaimessa ja valitsee asetuksista 'Add to home screen', jolloin lähtöruudulle napsahtaa kuvake jota klikkaamalla sivu toimii kuten muutkin 'äpit'.
              </p>
              <p>
                Jos sivulta löytyy virheitä tai haluat ehdottaa jotain paikkaa listalle, palautetta voi lähettää osoitteeseen <a href="mailto:fraasi.gh@gmail.com">fraasi.gh@gmail.com</a>
              </p>
              <Button
                variant="outlined"
                color="inherit"
                className="button kartalla"
                onClick={() => {
                  toggleDrawer(false)
                  setMap(true)
                }
                }>
                Kartalla
              </Button>
              <Sponsors />
            </div>

          </Drawer>
          <Map isMapOpen={isMapOpen} setMap={setMap} />
        </div>

      </>
    </ThemeProvider>
  )
}

export default Menu
