import React, {PureComponent} from "react";
import leaflet from "leaflet";
import PropTypes from "prop-types";

class Map extends PureComponent {
  constructor() {
    super();
    this.map = null;

    this.icon = leaflet.icon({
      iconUrl: `img/pin.svg`,
      iconSize: [30, 40]
    });

    this.iconActive = leaflet.icon({
      iconUrl: `img/pin-active.svg`,
      iconSize: [30, 40]
    });

  }

  createMap() {
    // eslint-disable-next-line react/prop-types
    const {offers,marker,activeCity}= this.props;

    const city = [activeCity.location.latitude, activeCity.location.longitude];


    const zoom = activeCity.location.zoom;


    this.map = leaflet.map(`map`, {
      center: city,
      zoom,
      zoomControl: false,
      marker: true
    });

    this.map.setView(city, zoom);

    this.leafletMap = this.map;

    leaflet
      .tileLayer(
        `https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png`,
        {
          attribution:
            '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
        }
      )
      .addTo(this.map);

      offers.map((offer)=>{
        console.log([offer.location.latitude, offer.location.longitude]);

        leaflet
        .marker([offer.location.latitude, offer.location.longitude], {icon: this.icon})
        .addTo(this.map);
      })



  }
  componentDidMount() {
    this.createMap();
  }



  render() {


    return (<div id="map" style={{height: `100%`}}></div>);
  }
}


export default Map;
