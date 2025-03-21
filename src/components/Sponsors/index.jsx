import React from 'react'
import './sponsors.css'
import cireco_logo from './images/Cireco_logo.png'


const sponsors = [
  {
    name: 'Cireco Finland Oy',
    img: cireco_logo,
    url: 'https://cireco.fi',
    until: new Date(2021, 5, 1).getTime()
  }
]

const Sponsors = () => {
  const sponsorsToShow = sponsors.filter(sponsor => sponsor.until > Date.now())

  const handleAddClick = (sponsorName) => {
    if (process.env.NODE_ENV === "production" && window.gtag) {
      window.gtag('event', 'add_clicked', {
        'event_category': 'sponsor',
        'event_label': sponsorName,
      })
    }
  }

  return (
    Boolean(sponsorsToShow.length) && (
      <ul className="sponsors">
        <h5>Äppiä tyylikkäästi sponsoroi:</h5>
        {
          sponsorsToShow.map(sponsor => {
            return (
              <li key={sponsor.name} className="sponsors">
                <a href={sponsor.url} target="_blank" rel="noopener noreferrer" onClick={() => handleAddClick(sponsor.name)}>
                  <h4>{sponsor.name}</h4>
                  <img src={sponsor.img} alt={sponsor.name} />
                </a>
              </li>
            )
          })
        }
      </ul>
    )
  )
}

export default Sponsors
