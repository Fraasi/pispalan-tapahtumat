import React from 'react'
import Switch from '@mui/material/Switch'
import IconButton from '@mui/material/IconButton'
// moonicon
import Brightness4OutlinedIcon from '@mui/icons-material/Brightness4Outlined'
// sunicon
import Brightness7OutlinedIcon from '@mui/icons-material/Brightness7Outlined'
// aliasin breaks build system
// import { Brightness7OutlinedIcon as SunIcon } from '@mui/icons-material/Brightness7OutlinedIcon'
import Menu from '../Menu'
import './header.css'


function Header({ onSwitchChange, isSwitchOn, setShowOnlyPispalaVenues, children, toggleTheme, isDarkMode }) {

  let downTimer = null

  const handleMouseDown = () => {
    clearTimeout(downTimer);
    downTimer = setTimeout(function () {
      setShowOnlyPispalaVenues(prevState => !prevState)
    }, 5000)
  }

  const handleMouseUp = () => {
    clearTimeout(downTimer)
  }

  return (
    <div className="App">
      <header className="App-header">
        <h1
          className="title"
          onMouseDown={handleMouseDown}
          onMouseUp={handleMouseUp}
          onTouchStart={handleMouseDown}
          onTouchEnd={handleMouseUp}
          onContextMenu={event => event.preventDefault()}
        >
          {children}
        </h1>
        <IconButton
          className="theme-button"
          size="medium"
          arial-label="päivä/yö-värit"
          title="päivä/yö-värit"
          onClick={toggleTheme}
        >
          {
            isDarkMode ? <Brightness7OutlinedIcon /> : <Brightness4OutlinedIcon />
          }
        </IconButton>

        <Switch
          className="switch"
          checked={isSwitchOn}
          onClick={onSwitchChange}
          title="Avaa/sulje kaikki"
          color="default"
          inputProps={{ 'aria-label': 'primary checkbox' }}
        />
        <Menu isDarkMode={isDarkMode}/>
      </header>
    </div>
  )
}

export default Header
