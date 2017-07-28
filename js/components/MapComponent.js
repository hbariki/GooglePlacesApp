import React from 'react';
import {
  withGoogleMap,
  GoogleMap,
  Marker,
  InfoWindow
} from 'react-google-maps';

const MapComponent = withGoogleMap(props => (
  <GoogleMap
    defaultZoom={2}
    defaultCenter={{lat: 0, lng: 0}}
    >
    {props.markers.map((marker, index) => (
      <Marker
          key={index}
          {...marker}
          position= {marker.position}
          onClick={() => props.onMarkerClick(marker)}
        >
          {marker.showInfo && (
            <InfoWindow>
              <div>{marker.infoContent}</div>
            </InfoWindow>
          )}
      </Marker>
    ))}
    </GoogleMap>
));

export default MapComponent;
