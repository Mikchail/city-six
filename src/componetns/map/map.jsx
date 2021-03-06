import React, {PureComponent} from 'react';
import leaflet from 'leaflet';
import {connect} from 'react-redux'
import PropTypes from 'prop-types';
import {withRouter} from 'react-router';

const getIcon = (path) => {
  return (leaflet.icon({
    iconUrl: path,
    iconSize: [30, 40]
  }));
};


class Map extends PureComponent {
  constructor() {
    super();
    this.map = null;
    this._markersGroup = [];
    this.icon = getIcon(`img/pin.svg`);
    this.iconActive = getIcon(`img/pin-active.svg`);
    this._highlightMarker = this._highlightMarker.bind(this);
    this._addPins = this._addPins.bind(this);
  }

  _highlightMarker(offer) {
    leaflet
      .marker([offer.location.latitude, offer.location.longitude], {
        icon: this.iconActive,
      })
      .addTo(this._markersGroup);
  }

  createMap() {
    // eslint-disable-next-line react/prop-types
    // activeOffer ????
    const {offers, marker, activeOffer, activeCity} = this.props;

    const city = [activeCity.location.latitude, activeCity.location.longitude];

    const zoom = activeCity.location.zoom;

    this.map = leaflet.map(`map-leaf`, {
      center: city,
      zoom,
      zoomControl: true,
      attributionControl: true,
      marker: true,

    });
    // ',() => console.log(213)
    this.map.setView(city, zoom);

    this.leafletMap = this.map;

    const layer = leaflet
      .tileLayer(
        `https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png`,
        {
          attribution:
            '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
        }
      ).on('click', () => console.log(1))
      .addTo(this.map);

    this._markersGroup = leaflet.layerGroup().addTo(this.map);
    this.addMarkers();

  }

  _addPins() {
    const {offers, activeOffer} = this.props;
    this._markersGroup.clearLayers();
    offers.map((offer) => {
      leaflet
        .marker([offer.location.latitude, offer.location.longitude], {
          icon: this.icon,
        })
        .addTo(this._markersGroup);
    });
    if (activeOffer) {
      leaflet.circle([activeOffer.location.latitude, activeOffer.location.longitude], 2000, {
        color: 'red',
        fillColor: '#f03',
        fillOpacity: 0.1
      }).addTo(this._markersGroup);
      leaflet
        .marker(
          [activeOffer.location.latitude, activeOffer.location.longitude],
          {icon: this.iconActive}
        )
        .addTo(this._markersGroup);
    }
  }


  setCity() {
    const {activeCity} = this.props;
    const city = [activeCity.location.latitude, activeCity.location.longitude];
    const zoom = activeCity.location.zoom;
    this.map.setView(city, zoom);
  }

  addMarkers() {
    const {activeOffer, offers, history} = this.props;
    this._markersGroup.clearLayers();
    offers.map((offer) =>
      leaflet
        .marker([offer.location.latitude, offer.location.longitude], {
          icon: this.icon,
        }).on('click', (evt) => {
        history.push(`/offer/${offer.id}`)
      })
        .addTo(this._markersGroup)
    );
    if (activeOffer) {
      leaflet
        .marker(
          [activeOffer.location.latitude, activeOffer.location.longitude],
          {icon: this.iconActive}
        )
        .addTo(this._markersGroup)
    }
  }

  componentDidMount() {
    this.createMap();
  }

  componentDidUpdate(prevProps) {
    this._markersGroup.clearLayers();
    this.addMarkers();
    this.setCity();
    if(prevProps.highlightMarker !== this.props.marker && this.props.marker){
      this._highlightMarker(this.props.marker)
    }
    // leaflet.circle([prevProps.activeOffer.location.latitude, prevProps.activeOffer.location.longitude], 2000, {
    //   color: 'red',
    //   fillColor: '#f03',
    //   fillOpacity: 0.1
    // }).addTo(this.map);
  }

  componentWillUnmount() {
    if (this.leafletMap) {
      this.leafletMap.eachLayer((layer) => {
        layer.remove();
      });
      this.leafletMap.remove();
      this.leafletMap = null;
    }
  }

  render() {
    const {className, style} = this.props
    return <section id="map-leaf" className={className} style={style}/>;
  }
}

Map.propTypes = {
  offers: PropTypes.arrayOf(
    PropTypes.shape({
      city: PropTypes.shape({
        location: PropTypes.shape({
          latitude: PropTypes.number.isRequired,
          longitude: PropTypes.number.isRequired,
          zoom: PropTypes.number.isRequired,
        }),
        name: PropTypes.string.isRequired,
      }),
    })
  ).isRequired,
  activeOffer: PropTypes.shape({
    location: PropTypes.shape({
      latitude: PropTypes.number.isRequired,
      longitude: PropTypes.number.isRequired,
    }),
  }),
  activeCity: PropTypes.shape({
    location: PropTypes.shape({
      latitude: PropTypes.number.isRequired,
      longitude: PropTypes.number.isRequired,
      zoom: PropTypes.number.isRequired,
    }),
    name: PropTypes.string.isRequired,
  }).isRequired,
};


const mapStateToProps = (state) => ({
  highlightMarker: state[`SORT`].marker
})
export default connect(mapStateToProps)(withRouter(Map));
