import React from 'react';
import PropTypes from 'prop-types';
import PlacesAutocomplete, { geocodeByAddress, getLatLng } from 'react-places-autocomplete';

class SearchBar extends React.Component {
    constructor() {
        super();
        this.state = { address: '' };
        this.onChange = (address) => this.setState({ address });
        this.handleSelect = this.handleSelect.bind(this);
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

    render() {
        const AutocompleteItem = ({ formattedSuggestion }) => (
                 <div>
                   <span className="glyphicon glyphicon-map-marker" />
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
                    <form onSubmit={this.handleFormSubmit}>
                        <PlacesAutocomplete
                            autocompleteItem={AutocompleteItem}
                            inputProps={inputProps}
                            onSelect={this.handleSelect}
                        />
                    </form>
                </div>
            </aside>
        );
    }
}

SearchBar.propTypes = {
  sendLocationToParent: PropTypes.func.isRequired
};

export default SearchBar;
