import React from 'react'
import CurrentLocation from './CurrentLocation'

const handleResults = (results) => console.log(results)

const onError = (type, status) => console.log(type, status)

export default function App() {
  return (
    <CurrentLocation onFetchAddress={handleResults} onError={onError}>
      {({ getCurrentLocation, loading }) => (
        <button onClick={getCurrentLocation} disabled={loading}>
          Get Current Location
        </button>
      )}
    </CurrentLocation>
  )
}
