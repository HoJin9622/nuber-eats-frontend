import React, { useEffect, useState } from 'react'
import GoogleMapReact from 'google-map-react'

interface ICoords {
  lat: number
  lng: number
}

interface IDriverProps {
  lat: number
  lng: number
  $hover?: any
}

const Driver: React.FC<IDriverProps> = () => <div className='text-lg'>🚖</div>

export const Dashboard = () => {
  const [driverCoords, setDriverCoords] = useState<ICoords>({
    lng: 129.0814828,
    lat: 35.1651525,
  })
  const [map, setMap] = useState<google.maps.Map>()
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
    if (map) {
      map.panTo(new google.maps.LatLng(driverCoords.lat, driverCoords.lng))
      // const geocoder = new google.maps.Geocoder()
      // geocoder.geocode(
      //   {
      //     location: new google.maps.LatLng(driverCoords.lat, driverCoords.lng),
      //   },
      //   (results, status) => {
      //     console.log(status, results)
      //   }
      // )
    }
  }, [driverCoords.lat, driverCoords.lng])
  const onApiLoaded = ({ map }: { map: any; maps: any }) => {
    map.panTo(new google.maps.LatLng(driverCoords.lat, driverCoords.lng))
    setMap(map)
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
          <Driver lat={driverCoords.lat} lng={driverCoords.lng} />
        </GoogleMapReact>
      </div>
    </div>
  )
}
