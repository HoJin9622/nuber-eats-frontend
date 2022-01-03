import React, { useEffect, useState } from 'react'
import GoogleMapReact from 'google-map-react'

interface ICoords {
  lat: number
  lng: number
}

export const Dashboard = () => {
  const [driverCoords, setDriverCoords] = useState<ICoords>({
    lng: 129.0814828,
    lat: 35.1651525,
  })
  const [map, setMap] = useState<any>()
  const [maps, setMaps] = useState<any>()
  const onSuccess = ({
    coords: { latitude, longitude },
  }: GeolocationPosition) => {
    setDriverCoords({ lat: latitude, lng: longitude })
  }
  const onError = (error: GeolocationPositionError) => {
    console.log(error)
  }
  useEffect(() => {
    navigator.geolocation.watchPosition(onSuccess, onError, {
      enableHighAccuracy: true,
    })
  }, [])
  useEffect(() => {
    if (map && maps) {
      map.panTo(new maps.LatLng(driverCoords.lat, driverCoords.lng))
    }
  }, [driverCoords.lat, driverCoords.lng])
  const onApiLoaded = ({ map, maps }: { map: any; maps: any }) => {
    map.panTo(new maps.LatLng(driverCoords.lat, driverCoords.lng))
    setMap(map)
    setMaps(maps)
  }
  return (
    <div>
      <div
        className='overflow-hidden'
        style={{ width: window.innerWidth, height: '50vh' }}
      >
        <GoogleMapReact
          bootstrapURLKeys={{ key: 'AIzaSyBpv3mxWUebIfBoH2nt0qzIni0dWl8FkVw' }}
          defaultZoom={16}
          defaultCenter={{ lat: 36, lng: 125 }}
          yesIWantToUseGoogleMapApiInternals
          onGoogleApiLoaded={onApiLoaded}
        >
          <div
            // @ts-ignore
            lat={driverCoords.lat}
            lng={driverCoords.lng}
            className='text-lg'
          >
            🚖
          </div>
        </GoogleMapReact>
      </div>
    </div>
  )
}
