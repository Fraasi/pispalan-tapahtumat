import React, { useState } from 'react'
import Drawer from '@mui/material/Drawer'
import Button from '@mui/material/Button'
import { useTheme } from '@mui/material/styles'
import Map from '../Map'
import Sponsors from '../Sponsors'
import pkgJson from '../../../package.json'
import './menu.css'


// css vars dont workwith Drawer, workaround with material-ui's sx property

const Menu = ({ isDarkMode }) => {

  // workaround for drawer bg & font colors
  const theme = useTheme()
  // console.log('theme:', theme)
  const currentThemeColors = isDarkMode ? theme.themeDark : theme.themeLight
  const { eventBgColor = 'rgb(44, 44, 44)', eventFontColor = 'rgb(233, 233, 233)', subHeaderColor = 'rgba(255, 255, 255, 0.6)' } = currentThemeColors

  const [isNavOpen, setNav] = useState(false)
  const [isMapOpen, setMap] = useState(false)

  const toggleDrawer = () => {
    setNav(prev => !prev)
    if (process.env.NODE_ENV === "production" && !isNavOpen && window.gtag) {
      window.gtag('event', 'menu_opened', {
        'event_category': 'user',
        'event_label': 'menu',
      })
    }
  }

  return (
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
      <div className="drawer-container">
        <Drawer
          className={isDarkMode ? `theme-dark` : `theme-light`}
          open={isNavOpen}
          onClose={() => toggleDrawer(false)}
          sx={{ // workaround for bg & font colors
            "& .MuiPaper-root": {
              backgroundColor: eventBgColor,
              color: eventFontColor
            },
            "& .version": {
              color: subHeaderColor
            }
          }}
        >
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
              Tämä nettisivu (<a href="https://fraasi.github.io/pispalan-tapahtumat/" target="_blank" rel="noopener noreferrer">https://fraasi.github.io/pispalan-tapahtumat/</a>) on suunniteltu kännykälle ja toimii parhaiten kun avaa nettisivun luurin selaimessa ja valitsee asetuksista 'Add to home screen', jolloin lähtöruudulle napsahtaa kuvake jota klikkaamalla sivu toimii kuten muutkin 'äpit'.
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
  )
}

export default Menu
