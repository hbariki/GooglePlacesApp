import React from 'react';
import PropTypes from 'prop-types';
import Header from './Header';
import SearchBar from './SearchBar';
import MapComponent from './MapComponent';

class AppLayout extends React.Component {

    constructor() {
        super();
        this.state = {
            markers: [{
                position: {
                    lat: 37.773972,
                    lng: -122.431297
                },
                key: `San Francisco, CA`,
                defaultAnimation: 2,
                showInfo: false,
                infoContent: (<span>San Francisco, CA</span>)
            }]
        };

        this.getSelectedLatLong = this.getSelectedLatLong.bind(this);
        this.handleMarkerClick = this.handleMarkerClick.bind(this);
    }

    handleMarkerClick(targetMarker) {
        this.setState({
          markers: this.state.markers.map(marker => {
              if(marker === targetMarker) {
                  const clonedMarker = {
                      position: targetMarker.position,
                      key: targetMarker.key,
                      defaultAnimation: 2,
                      showInfo: true,
                      infoContent: targetMarker.infoContent
                  };

                  return clonedMarker;
              }

            return marker;
          }),
        });
    }

    getSelectedLatLong(locationObj) {
        const nextMarkers = [
            ...this.state.markers,
            {
                position: locationObj.latLng,
                defaultAnimation: 2,
                infoContent: (<span>{locationObj.address}</span>),
                key: Date.now()
            }
        ];

        this.setState({
            markers: nextMarkers
        });
    }

    render() {
        const mapContainer = <main className="col-sm-9" id="mapWrapper" />;
        return (
            <div id="appLayout">
                <Header />
                <SearchBar
                    markedPlaces={this.state.markers}
                    sendLocationToParent={this.getSelectedLatLong} />
                <MapComponent
                    containerElement={mapContainer}
                    mapElement={<div style={{ height: `100%` }} />}
                    markers={this.state.markers}
                    onMarkerClick={this.handleMarkerClick}
                     />
            </div>
        );
    }
}

export default AppLayout;
