import { Component, ViewChild } from '@angular/core';

import { GoogleMapInfoWindowComponent } from '../../lib/components/google-map-infowindow';

/**
 * Google maps demo page
 */

@Component({
  selector: 'lib-maps-page',
  styleUrls: ['page.less'],
  templateUrl: 'page.html'
})

export class MapsPageComponent {
  @ViewChild('infoWindow') infoWindow: GoogleMapInfoWindowComponent;

  cities = {
    jfk: {lat: 40.757929, lng: -73.985506, blurb: 'The Big Apple'},
    sfo: {lat: 37.775196, lng: -122.419204, blurb: 'I Left My Heart ... in San Fransisco'},
    wash: {lat: 43.1831, lng: -72.0893, blurb: 'No ... THIS Washington'},
  };

  infoWindowData = {};
  locations = {};
  markers = [];

  /** Marker clicked */
  markerClicked(infoWindowData: any) {
    this.infoWindowData = infoWindowData;
  }

  /** Plot a new location */
  plot(state: boolean,
       city: string) {
    if (state)
      this.locations[city] = this.cities[city];
    else delete this.locations[city];
    // rebuild markers
    this.markers = [];
    Object.keys(this.locations).forEach(key => {
      const marker = {
        infoWindow: this.infoWindow,
        infoWindowData: {
          blurb: this.locations[key].blurb
        },
        position: {lat: this.locations[key].lat, lng: this.locations[key].lng}
      };
      this.markers.push(marker);
    });
  }

}
