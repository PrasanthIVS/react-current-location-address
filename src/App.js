import React from 'react'
import ReverseGeocode from './ReverseGeocode'

const handleResults = (results) => console.log(results)

const onError = (errorType) => console.log(errorType)

export default function App() {
  return (
    <ReverseGeocode onFetchAddresses={handleResults} onError={onError}>
      {({ getCurrentLocation, loading }) => (
        <button onClick={getCurrentLocation} disabled={loading}>
          Get Current Location
        </button>
      )}
    </ReverseGeocode>
  )
}
