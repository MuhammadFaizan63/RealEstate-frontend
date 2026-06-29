import React from 'react'
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet'
import './Map.scss'
import 'leaflet/dist/leaflet.css'
import Pin from '../Pin/Pin'

const Map = ({items}) => {
  return (
    <MapContainer className='map' center={items.length === 1 ? [items[0].latitude,items[0].longitude] : [51.505, -0.09]} zoom={7} scrollWheelZoom={false}>
  <TileLayer
    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
  />
  {items.map((item) => (
    <Pin key={item.id} item={item} />
  ))}
</MapContainer>
  )
}

export default Map