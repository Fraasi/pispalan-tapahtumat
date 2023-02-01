import React from 'react'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import Modal from '@mui/material/Modal'
import Button from '@mui/material/Button'
import './map.css'

// https://material-ui.com/guides/migration-v3/#modal
// https://material-ui.com/guides/composition/#caveat-with-refs
const LMap = React.forwardRef((props, ref) => (
  <MapContainer center={[61.50238, 23.71477]} zoom={13} class="map-container">
    <Button
      ref={ref}
      className="map-close-button"
      onClick={() => props.setMap(false)}
      variant="outlined"
      color="inherit"
    >X</Button>
    <TileLayer
      attribution='&copy; <a href="https://osm.org/copyright">OpenStreetMap</a> contributors'
      url='https://{s}.tile.osm.org/{z}/{x}/{y}.png'
    />
    {
      window.map_data &&
      window.map_data.map(({ title, latLong }) => (
        <Marker position={latLong} key={title}>
          <Popup>
            {title}
          </Popup>
        </Marker>
      ))
    }
  </MapContainer>
))

const Map = ({ isMapOpen, setMap }) => {
  const ref = React.createRef()
  const onModalOpen = () => {
    if (process.env.NODE_ENV === "production") {
      window.gtag('event', 'map_opened', {
        'event_category': 'user',
        'event_label': 'map',
      })
    }
  }

  return (
    <Modal
      id="modal-root"
      className="modal-root"
      aria-labelledby="simple-modal-title"
      aria-describedby="simple-modal-description"
      open={isMapOpen}
      onRendered={onModalOpen}
      onClose={() => setMap(false)}
      onBackdropClick={() => setMap(false)}
    >
      <LMap ref={ref} setMap={setMap} />
    </Modal>
  )
}


export default Map
