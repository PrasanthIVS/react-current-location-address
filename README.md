# React Current Location Address
A utility to get the user's current location address using Geo Location API & Google's reverse geocoding.

## Installation
You can use npm or yarn.

```
npm install react-current-location-address
```
or
```
yarn add react-current-location-address
```

## Importing
The function is exported as a default export.
```
import CurrentLocation from 'react-current-location-address'
```
## Getting Started
To use the package, you need to load [Google Maps Javascript API](https://developers.google.com/maps/documentation/javascript/overview)

Place the link in the index.html file to load the library
```
<script src="https://maps.googleapis.com/maps/api/js?key=<YOUR_API_KEY>&libraries=places"></script>
```
## Props
|Name|Type|Required|Default Value|Description|
|:---:|:---:|:---:|:---:|---|
|onFetchAddresses|function|No|() => {}|Function that will be called on successful fetch of address results from the Maps API|
|onError|function|No|() => {}|Error handler that will be called when Geo Location or Maps API responds with an error (returns an error string. Please find more information here)|
|children|function|Yes|() => null|Render function to specify for the rendering `example: () => <button />`|

## Example
```
import CurrentLocation from 'react-current-location-address'

<CurrentLocation onFetchAddress={(results) => {}} onError={(errorType) => {}}>
  {({ getCurrentLocation, loading }) => (
    <button onClick={getCurrentLocation}>
      Get Current Location
    </button>
  )}
</CurrentLocation>
```
## Explanation
#### onFetchAddress
A function that will be called with the results once they are fetched from the Google Maps API.
Called with an empty array when there are zero results.
#### onError
A function that will be called with one of the below error types when there is an error from the Geo Location or Maps API.
|Error Type (string)|Description|
|---|---|
|geoLocationUnavailable|Geo Location API is not supported by the browser|
|permissionDenied|User denied location share access|
|positionUnavailable|Location sharing access granted but unable to get the current position|
|timeout|The permission request to get the user's location access has timed out|
|coordsUnavailable|The latitude and longitude coordinates are unavailable|
|noResultsFound|No address results found for the location|
|googleAddressError|Error when reverse geocoding the address from the Maps API or an invalid API key|
|unknown|An unknown error occurred|
#### getCurrentLocation
type: `function`

An action handler to trigger the fetching of address.
#### loading 
type: `boolean`

default value: `false`

A boolean flag indicating the request to get the address is in process.
It can be used to handle `disabled` or to show `loading` on the component.
