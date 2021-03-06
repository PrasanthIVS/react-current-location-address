"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = require("react");

var _propTypes = require("prop-types");

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var geocodeLatLng = function geocodeLatLng(lat, lng, onFetchAddress, handleError) {
  var googleMaps = window.google && window.google.maps;

  if (googleMaps) {
    var geocoder = new googleMaps.Geocoder();
    geocoder.geocode({
      location: {
        lat: lat,
        lng: lng
      }
    }, function (results, status) {
      if (status === 'OK') {
        if (results[0]) {
          onFetchAddress(results);
          handleError('');
        } else {
          handleError('noResultsFound', 'ZERO_RESULTS');
          onFetchAddress([]);
        }
      } else {
        var errorType = status === 'ZERO_RESULTS' ? 'noResultsFound' : 'geocodeError';
        handleError(errorType, status);
      }
    });
  } else {
    handleError('mapsUnavailable');
  }
};

var getResults = function getResults(position, onFetchAddress, handleError) {
  var _position$coords = position.coords,
      coords = _position$coords === void 0 ? {} : _position$coords;
  var lat = coords.latitude,
      lng = coords.longitude;

  if (lat && lng) {
    geocodeLatLng(lat, lng, onFetchAddress, handleError);
  } else {
    handleError('coordsUnavailable');
  }
};

var getGeoLocationError = function getGeoLocationError(error, handleError) {
  switch (error.code) {
    case error.PERMISSION_DENIED:
      return handleError('permissionDenied');

    case error.POSITION_UNAVAILABLE:
      return handleError('positionUnavailable');

    case error.TIMEOUT:
      return handleError('timeout');

    default:
      handleError('unknown');
  }
};

var getLocation = function getLocation(onFetchAddress, handleError) {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function (position) {
      return getResults(position, onFetchAddress, handleError);
    }, function (error) {
      return getGeoLocationError(error, handleError);
    });
  } else {
    handleError('geoLocationUnavailable');
  }
};

var CurrentLocation = function CurrentLocation(props) {
  var _props$onFetchAddress = props.onFetchAddress,
      onFetchAddress = _props$onFetchAddress === void 0 ? function () {} : _props$onFetchAddress,
      _props$onError = props.onError,
      onError = _props$onError === void 0 ? function () {} : _props$onError,
      _props$children = props.children,
      children = _props$children === void 0 ? function () {
    return null;
  } : _props$children;

  var _useState = (0, _react.useState)(false),
      _useState2 = _slicedToArray(_useState, 2),
      loading = _useState2[0],
      setLoading = _useState2[1];

  var handleError = function handleError(type) {
    var status = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
    setLoading(false);
    type && onError(type, status);
  };

  return children({
    getCurrentLocation: function getCurrentLocation() {
      setLoading(true);
      getLocation(onFetchAddress, handleError);
    },
    loading: loading
  });
};

CurrentLocation.propTypes = {
  onFetchAddress: _propTypes.func,
  onError: _propTypes.func,
  children: _propTypes.func
};
var _default = CurrentLocation;
exports.default = _default;