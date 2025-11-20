import React, { useState, useEffect } from 'react'
import CircularProgress from '@mui/material/CircularProgress'
import Alert from '@mui/material/Alert'
import Collapse from '@mui/material/Collapse'
import Header from './components/Header'
import Event from './components/Event'
import fetchData from './mongodb'
import './App.css'


function App() {

  const [events, setEvents] = useState(null)
  const [updateDate, setUpdateDate] = useState(null)
  const [errorMsg, setErrorMsg] = useState(null)
  const [isSwitchOn, setSwitch] = useState(false)
  const [isDarkMode, setDarkMode] = useState(false)
  const [showOnlyPispalaVenues, setShowOnlyPispalaVenues] = useState(true)

  useEffect(() => {
    function sortDataToState(data) {
      const { events_data, map_data, data_updated } = data
      // sort + move hietis last
      const hietisIndex = events_data.findIndex(el => el.name === 'Hiedanranta')
      const hietis = events_data.splice(hietisIndex, 1)[0]
      const sortedEvents = events_data.sort((first, second) => first.name < second.name ? -1 : 1)
      sortedEvents.push(hietis)
      if (process.env.NODE_ENV !== "production") console.log('data:', new Date(data_updated), data)
      setEvents(() => sortedEvents)
      setUpdateDate(new Date(data_updated).toLocaleString('FI-fi'))
      window.map_data = map_data // only way to pass data to LMap, 'cos of the way leaflet works, no props no context :(
    }

    function getDbData() {
      fetchData()
        .then(data => data.json())
        .then(data => {
          sortDataToState(data)
          localStorage.setItem('local_data', JSON.stringify(data))
        }).catch(err => {
          console.error('Data fetch error:', err)
          if (err.toString().includes('TRANSPORT_ERROR')) {
            setErrorMsg(() => 'Hupsista. Ei saatu yhteyttä tietokantaan. Tarkista nettiyhteytesi ja kokeile ladata sivu uudestaan.')
          } else {
            setErrorMsg(() => err.toString())
          }
        })
    }

    const localDarkMode = localStorage.getItem('dark_mode')
    const preferDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches
    if (localDarkMode === 'false' || (localDarkMode === null && preferDarkMode === false)) {
      setDarkMode(false)
      localStorage.setItem('dark_mode', 'false')
    } else if (localDarkMode === 'true' || preferDarkMode) {
      setDarkMode(true)
      localStorage.setItem('dark_mode', 'true')
    }

    // check for localStorage & data_updated + 1 day less than now,
    // not best solution if need to update db from cli when testing
    // better?: use localstorage for better UX, fetch new data in the background
    const local_data = JSON.parse(localStorage.getItem('local_data')) // JSON.parse(null) returns also null
    if ( !local_data ) {
      getDbData() // no localstorage, get new data
    } else {
      // const local_data_updated = new Date(local_data.data_updated)
      // if (local_data_updated.setDate(local_data_updated.getDate() + 1) < new Date()) {
      // } else {
      sortDataToState(local_data) // use data from localstorage to prevent waitingfetch
      getDbData() // local storage out of date, fetch new data
        // fetch new data in background?
      // }
    }
  }, [])

  const onSwitchChange = () => {
    setSwitch(prev => !prev)
  }

  const toggleTheme = () => {
    setDarkMode(prev => {
      localStorage.setItem('dark_mode', !prev)
      return !prev
    })
  }

  return (
    <div className={`App ${isDarkMode ? 'theme-dark' : 'theme-light'}`}>
    <Header
    isSwitchOn={isSwitchOn}
    onSwitchChange={onSwitchChange}
    setShowOnlyPispalaVenues={setShowOnlyPispalaVenues}
    toggleTheme={toggleTheme}
    isDarkMode={isDarkMode}
    >
    Pispalan Tapahtumat
    </ Header>
    {
      !showOnlyPispalaVenues &&
      <Collapse in={!showOnlyPispalaVenues}>
      <Alert
      severity="info"
      variant="filled"
      onClose={() => { setShowOnlyPispalaVenues(true) }}
      >
      updateDate:{updateDate}
      </Alert>
      </Collapse>
    }
    {
      errorMsg !== null
        ? (<div className="error-loader">{errorMsg}</div>)
        : events === null
        ? (<div className="error-loader">
          Haetaan tapahtumia...<br /><br />
          <CircularProgress />
          </div>)
        : (<div>
          {
            events.map((el) => {
              return (
                <Event
                data={el}
                key={el.name}
                showOnlyPispalaVenues={showOnlyPispalaVenues}
                isSwitchOn={isSwitchOn}>
                </Event>
              )
            })
          }
          </div>)
    }
    </div>
  )
}

export default App
