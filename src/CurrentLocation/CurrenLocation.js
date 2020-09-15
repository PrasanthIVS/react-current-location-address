import { useState } from 'react'
import { func } from 'prop-types'

const geocodeLatLng = (lat, lng, onFetchAddresses, handleError) => {
  const googleMaps = window.google && window.google.maps
  if (googleMaps) {
    const geocoder = new googleMaps.Geocoder()
    geocoder.geocode(
      {
        location: {
          lat,
          lng,
        },
      },
      (results, status) => {
        if (status === 'OK') {
          if (results[0]) {
            onFetchAddresses(results)
            handleError('')
          } else {
            handleError('noResultsFound')
            onFetchAddresses([])
          }
        } else {
          handleError('googleAddressError')
        }
      }
    )
  } else {
    handleError('googleAddressError')
  }
}

const getResults = (position, onFetchAddresses, handleError) => {
  const { coords = {} } = position
  const { latitude: lat, longitude: lng } = coords
  if (lat && lng) {
    geocodeLatLng(lat, lng, onFetchAddresses, handleError)
  } else {
    handleError('coordsUnavailable')
  }
}

const getGeoLocationError = (error, handleError) => {
  switch (error.code) {
    case error.PERMISSION_DENIED:
      return handleError('permissionDenied')
    case error.POSITION_UNAVAILABLE:
      return handleError('positionUnavailable')
    case error.TIMEOUT:
      return handleError('timeout')
    default:
      handleError('unknown')
  }
}

const getLocation = (onFetchAddresses, handleError) => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (position) => getResults(position, onFetchAddresses, handleError),
      (error) => getGeoLocationError(error, handleError)
    )
  } else {
    handleError('geoLocationUnavailable')
  }
}

const CurrentLocation = (props) => {
  const { onFetchAddresses, onError, children } = props
  const [loading, setLoading] = useState(false)

  const handleError = (type) => {
    setLoading(false)
    type && onError(type)
  }

  return children({
    getCurrentLocation: () => {
      setLoading(true)
      getLocation(onFetchAddresses, handleError)
    },
    loading,
  })
}

CurrentLocation.propTypes = {
  onFetchAddresses: func,
  onError: func,
  children: func,
}

export default CurrentLocation
