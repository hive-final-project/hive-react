import React from 'react';
import { GoogleApiWrapper, InfoWindow, Map, Marker } from 'google-maps-react';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import constants from '../../constants';

import { withAuthConsumer } from '../../context/AuthStore';


class GoogleMapsContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showingInfoWindow: false,
      activeMarker: {},
      selectedPlace: {}
    }
    // binding this to event-handler functions
    this.onMarkerClick = this.onMarkerClick.bind(this);
    this.onMapClick = this.onMapClick.bind(this);
  }
  onMarkerClick = (props, marker, e) => {
    this.setState({
      selectedPlace: props,
      activeMarker: marker,
      showingInfoWindow: true
    });
  }
  onMapClick = (props) => {
    if (this.state.showingInfoWindow) {
      this.setState({
        showingInfoWindow: false,
        activeMarker: null
      });
    }
  }
  render() {
    const style = {
      width: '90vw',
      height: '50vh',
      margin: '0', 
      padding: '0'
    }
    return (
      <Map
        item
        xs = { 12 }
        style = { style }
        google = { this.props.google }
        onClick = { this.onMapClick }
        zoom = { 8 }
        initialCenter = {{ lat: 40.39, lng: -3.69 }}
      >
        <Marker
          onClick = { this.onMarkerClick }
          title = { 'Carnicerias Guadarrama' }
          position = {{ lat: 40.67, lng: -4.09 }}
          name = { 'Carnicerias Guadarrama' }
        />
        <Marker
          onClick = { this.onMarkerClick }
          title = { "Verduleria S.A." }
          position = {{ lat: 40.64, lng: -3.17}}
          name = { "Verduleria S.A." }
        />
        <Marker
          onClick = { this.onMarkerClick }
          title = { "La lechería S.L." }
          position = {{ lat: 40.11, lng: -3.15}}
          name = { "La lechería S.L." }
        />
        <Marker
          onClick = { this.onMarkerClick }
          title = { "La polleria alegre S.A." }
          position = {{ lat: 40.42, lng:-3.92}}
          name = { "La polleria alegre S.A." }
        />
        <Marker
          onClick = { this.onMarkerClick }
          title = { "La buena miel S.L." }
          position = {{ lat: 40.37, lng:-3.82}}
          name = { "La buena miel S.L." }
        />
        <InfoWindow
          marker = { this.state.activeMarker }
          visible = { this.state.showingInfoWindow }
        >
          <Paper>
            <Typography
              variant = 'headline'
              component = 'h4'
            >
              {this.state.activeMarker.name}
            </Typography>
          </Paper>
        </InfoWindow>
      </Map>
    );
  }
}
export default GoogleApiWrapper({apiKey: (constants.GoogleApiKey)})(withAuthConsumer(GoogleMapsContainer))