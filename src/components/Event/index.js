import React, { useState, useEffect } from 'react'
import Accordion from '@mui/material/Accordion'
import AccordionDetails from '@mui/material/AccordionDetails'
import AccordionSummary from '@mui/material/AccordionSummary'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import './event.css'


const DAY_IN_MS = 86400000 // 24 hours

const Event = (props) => {
  const [isOpen, setOpen] = useState(false)
  useEffect(() => {
    setOpen(() => props.isSwitchOn)
  }, [props.isSwitchOn]
  )

  const onTitleClick = () => setOpen(prev => !prev)

  const { name, url, events, error_msg, error_title } = props.data

  if (props.showOnlyPispalaVenues) {
    const nonPispala = ['Dogs home', 'Maanalainen', 'Visit Tampere', 'Huurupiilo']
    if (nonPispala.includes(name)) return null
  }

  const cleanedName = `${name.charAt(0).toUpperCase()}${name.slice(1)}`.replace(/_/g, ' ')

  if (error_msg) {
    return (
      <Accordion expanded={isOpen}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon sx={{color: 'grey'}} />}
          aria-controls="panel1c-content"
          id="panel1c-header"
          onClick={onTitleClick}
        >
          <div className="collapsible-header">
            {cleanedName}&nbsp;
            <span className="secondary-header">
              ({error_title} 🐛)
            </span>
          </div>
        </AccordionSummary>
        <AccordionDetails className="collapsible-body">
          <span className="sub-header">Käyhän nettisivuilla&nbsp;<a href={url} target="_blank" rel="noopener noreferrer">{url}</a></span><br /><br />
          <ul>
            {
              <li key={'error'}>
                {error_msg}
              </li>
            }
          </ul>
        </AccordionDetails>
      </Accordion>
    )
  }

  const today = new Date()
  const todayDay = today.getDate()
  const todayMonth = today.getMonth()
  let isThereEventToday = false

  let pastEventsFiltered = events
    .sort((ev1, ev2) => ev1.startTimeStamp < ev2.startTimeStamp ? -1 : 1)
    .filter(event => {
      const { startTimeStamp, endTimeStamp } = event
      if (endTimeStamp && (endTimeStamp + DAY_IN_MS) < today) return false
      if (!endTimeStamp && (startTimeStamp + DAY_IN_MS) < today) return false
      return true
    })
  if (name === 'vastavirta') pastEventsFiltered = pastEventsFiltered.slice(0, 10)

  const eventRows = pastEventsFiltered.map((event, i) => {
    const { startTimeStamp, endTimeStamp, event: happening, link } = event
    const startDate = new Date(startTimeStamp)
    let endDateParsed = ''
    if (endTimeStamp) {
      const endDate = new Date(endTimeStamp)
      endDateParsed = `–${endDate.getDate()}.${endDate.getMonth() + 1}`
    }
    const dateParsed = `${startDate.getDate()}.${startDate.getMonth() + 1}${endDateParsed}`
    const eventToday = ((startDate.getDate() === todayDay) && (startDate.getMonth() === todayMonth))
    if (eventToday) isThereEventToday = true
    const todayBGColor = eventToday ? 'rgba(39,169,157,0.7)' : ''
    const text = link
      ? (<a href={link} target="_blank" rel="noopener noreferrer">{happening}</a>)
      : happening
    return (
      <tr key={i} style={{ backgroundColor: todayBGColor }}>
        <td>{dateParsed}</td><td>—</td><td>{text}</td>
      </tr>
    )
  })

  return (
    <Accordion expanded={isOpen}>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon sx={{color: 'grey'}} />}
        aria-controls="panel1c-content"
        id="panel1c-header"
        onClick={onTitleClick}
      >
        <div className="collapsible-header">
          {cleanedName}
          <span className="secondary-header">
            &nbsp;{` (${pastEventsFiltered.length}) ${isThereEventToday ? '!' : ''}`}
          </span>
        </div>
      </AccordionSummary>
      <AccordionDetails className="collapsible-body">
        <span className="sub-header">Aukioloajat & tarkemmat tiedot <a href={url} target="_blank" rel="noopener noreferrer">{url}</a></span>
        {
          name === 'hirvitalo' &&
          <>
            <br />
            <span className="sub-header">Kansankeittiö lauantaisin <a href="https://www.facebook.com/groups/294496307351291/" target="_blank" rel="noopener noreferrer">https://www.facebook.com/groups/294496307351291/</a></span>
          </>
        }
        {
          name.includes('vuosittaiset') &&
          <>
            <br />
            <span className="sub-header"><strong>Huom:</strong> päivämäärät ei välttämäti ole vielä oikeat tälle vuodelle</span>
          </>
        }

        <br /><br />
        <table>
          <tbody>
            {
              eventRows
            }
          </tbody>
        </table>
      </AccordionDetails>
    </Accordion>
  )
}

export default Event
