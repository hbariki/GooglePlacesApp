import React from 'react';
import PropTypes from 'prop-types';
import PlacesAutocomplete, { geocodeByAddress, getLatLng } from 'react-places-autocomplete';

class SideBar extends React.Component {
    constructor(props) {
        super();
        this.state = {
            address: '',
            markedPlaces: props.markedPlaces
        };

        this.onChange = (address) => this.setState({ address });
        this.handleSelect = this.handleSelect.bind(this);
        this.removeMarker = this.removeMarker.bind(this);
    }

    handleSelect(address) {
        this.setState({
            address,
            loading: true
        });

        geocodeByAddress(address)
          .then(results => getLatLng(results[0]))
          .then(latLng => this.props.sendLocationToParent({
              address,
              latLng
          }))
          .catch(error => alert(error));
    }

    removeMarker(event) {
        event.preventDefault();
        this.props.removeMarker(event.target.getAttribute('data-marker-key'));
    }

    render() {
        const AutocompleteItem = ({ formattedSuggestion }) => (
                 <div>
                   <strong>{formattedSuggestion.mainText}</strong>{' '}
                   <small className="text-muted">{formattedSuggestion.secondaryText}</small>
                 </div>
        );

        const inputProps = {
            value: this.state.address,
            onChange: this.onChange,
            placeholder: "Search Places"
        };

        return (
            <aside className="col-sm-3" id="searchSection">
                <div className="row">
                    <form>
                        <PlacesAutocomplete
                            autocompleteItem={AutocompleteItem}
                            inputProps={inputProps}
                            onSelect={this.handleSelect}
                        />
                    </form>
                </div>
                <div className="row markedPlaces">
                    <hr />
                    <h4>List of marked places</h4>
                    <ul className="list-group">
                        {this.props.markedPlaces.map((markedPlace, index) => {
                            return <li key={index} className="list-group-item row">
                            <div className="col-sm-9">{markedPlace.infoContent}</div>
                            <div className="col-sm-3"><button data-marker-key={markedPlace.key} type="button" className="btn btn-danger btn-xs btn-removeMarker" onClick={this.removeMarker}>Remove</button>
                            </div>
                            </li>;
                        })}
                    </ul>
                </div>
            </aside>
        );
    }
}

SideBar.propTypes = {
  sendLocationToParent: PropTypes.func.isRequired,
  markedPlaces: PropTypes.array.isRequired,
  removeMarker: PropTypes.func.isRequired
};

export default SideBar;
