import React from 'react'
import CurrentLocation from './CurrentLocation'

const handleResults = (results) => console.log(results)

const onError = (errorType) => console.log(errorType)

export default function App() {
  return (
    <CurrentLocation onFetchAddresses={handleResults} onError={onError}>
      {({ getCurrentLocation, loading }) => (
        <button onClick={getCurrentLocation} disabled={loading}>
          Get Current Location
        </button>
      )}
    </CurrentLocation>
  )
}
