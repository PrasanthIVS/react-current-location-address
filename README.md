# React Current Location Address
A utility to get the user's current location address using Geo Location API & Google's reverse geocoding.

# Installation
You can use npm or yarn.

```
npm install react-current-location-address
```
or
```
yarn add react-current-location-address
```

# Importing
The function is exported as a default export.
```
import CurrentLocation from 'react-current-location-address'
```
# Getting Started
To use the package, you need to load [Google Maps Javascript API](https://developers.google.com/maps/documentation/javascript/overview)

Place the link in the index.html file to load the library
```
<script src="https://maps.googleapis.com/maps/api/js?key=<YOUR_API_KEY>&libraries=places"></script>
```
# Props
|Prop|Type|Required|Default Value|Description|
|:---:|:---:|:---:|:---:|---|
|onFetchAddresses|function|No|() => {}|Function that will be called on successful fetch of address results from the Maps API
|onError|function|No|() => {}|Error handler that will be called when Geo Location or Maps API responds with an error (returns an error string. Please find more information here)
