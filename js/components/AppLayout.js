import React from 'react';
import PropTypes from 'prop-types';
import Header from './Header';
import SideBar from './SideBar';
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
                key: '1',
                defaultAnimation: 2,
                showInfo: false,
                infoContent: (<span>San Francisco, CA, United States</span>)
            },
            {
                position: {
                    lat: 36.1699412,
                    lng: -115.13982959999998
                },
                key: '2',
                defaultAnimation: 2,
                showInfo: false,
                infoContent: (<span>Las Vegas, NV, United States</span>)
            },
            {
                position: {
                    lat: 48.856614,
                    lng: 2.3522219000000177
                },
                key: '3',
                defaultAnimation: 2,
                showInfo: false,
                infoContent: (<span>Paris, France</span>)
            }]
        };

        this.getSelectedLatLong = this.getSelectedLatLong.bind(this);
        this.handleMarkerClick = this.handleMarkerClick.bind(this);
        this.handleRemoveMarker = this.handleRemoveMarker.bind(this);
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
        console.log(locationObj);
        const nextMarkers = [
            ...this.state.markers,
            {
                position: locationObj.latLng,
                defaultAnimation: 2,
                infoContent: (<span>{locationObj.address}</span>),
                key: Date.now().toString()
            }
        ];

        this.setState({
            markers: nextMarkers
        });
    }

    handleRemoveMarker(targetMarkerkey) {
        let targetMarker = {};
        this.state.markers.map((marker) => {
            if(targetMarkerkey === marker.key) {
                targetMarker = marker;
            }
        });

        const nextMarkers = this.state.markers.filter(marker => marker !== targetMarker);
        this.setState({
          markers: nextMarkers,
        });
    }

    render() {
        const mapContainer = <main className="col-sm-9" id="mapWrapper" />;
        return (
            <div id="appLayout">
                <Header />
                <SideBar
                    markedPlaces={this.state.markers}
                    sendLocationToParent={this.getSelectedLatLong}
                    removeMarker={this.handleRemoveMarker}
                />
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
