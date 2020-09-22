# React Current Location Address
A React utility to get the user's current location address using Geo Location API & Google's reverse geocoding.

> A common use case would be to auto populate the user's location address in the signup forms and bot apps.

The package uses [HTML Geolocation API](https://developer.mozilla.org/en-US/docs/Web/API/Geolocation_API) behind the scenes which is only available in [secure contexts](https://developer.mozilla.org/en-US/docs/Web/Security/Secure_Contexts) (HTTPS). Geolocation is most accurate for devices with GPS, like smartphones.

[Reverse Geocoding](https://developers.google.com/maps/documentation/geocoding/overview#ReverseGeocoding) or Address lookup is a process of converting the location (geographic coordinates) into a human-readable address. More information can be found [here](https://en.wikipedia.org/wiki/Reverse_geocoding).

## Installation
You can use npm or yarn.

```
npm install react-current-location-address
```
or
```
yarn add react-current-location-address
```

## Usage
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
|onFetchAddress|function|false|() => {}|Function that will be called on successful fetch of address results from the Maps API|
|onError|function|false|() => {}|Error handler that will be called when Geo Location or Maps API responds with an error (passes an error string. Please find more information on the error types [here](https://github.com/PrasanthIVS/react-current-location-address/blob/master/README.md#onerror))|
|children|function|true|() => null|Render function to specify for the rendering `example: () => <button />`|

## Example
```
import CurrentLocation from 'react-current-location-address'

<CurrentLocation
  onFetchAddress={(results) => {}}
  onError={(type, status) => {}}
 >
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
Called with an empty array in case of zero results.
Results will be an array of addresses.
For detailed information on the results structure, please refer to the [docs](https://developers.google.com/maps/documentation/geocoding/overview#results).
#### onError
A function that will be called with one of the below error types when there is an error from the Geo Location or Maps API.
The second value is the error status code from the Maps API. Different status codes can be found [here](https://developers.google.com/maps/documentation/geocoding/overview#StatusCodes).
|Error Type (string)|Description|
|---|---|
|geoLocationUnavailable|Geo Location API is not supported by the browser|
|permissionDenied|User denied location share access|
|positionUnavailable|Location sharing access granted but unable to get the current position|
|timeout|The permission request to get the user's location access has timed out|
|coordsUnavailable|The latitude and longitude coordinates are unavailable|
|noResultsFound|No address results found for the location|
|geocodeError|Error while geocoding the address. status will be passed in the `onError` callback. Please refer to the [docs](https://developers.google.com/maps/documentation/geocoding/overview#StatusCodes) for different types of status codes passed|
|mapsUnavailable|Google Maps API is not available. For more information on loading the API, check [here](https://developers.google.com/maps/documentation/javascript/overview#Loading_the_Maps_API)|
|unknown|An unknown error occurred|
#### getCurrentLocation
type: `function`

An action handler to trigger the fetching of address.
#### loading 
type: `boolean`

default value: `false`

A boolean flag indicating the request to get the address is in process.
It can be used to handle `disabled` or to show `loading` on the component.

## Contribution
Issues and pull requests are welcome!

The project is based on the create-react-app. Please branch out from master and create a PR once done.
After cloning the app, navigate to the project folder and use `npm start` or `yarn start` to start the local server.
