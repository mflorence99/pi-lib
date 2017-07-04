import { Component, ElementRef } from '@angular/core';

/**
 * Google map InfoWindow component
 */

@Component({
  selector: 'lib-google-map-infowindow',
  styleUrls: ['google-map-infowindow.less'],
  templateUrl: 'google-map-infowindow.html'
})

export class GoogleMapInfoWindowComponent {

  constructor(public element: ElementRef) { }

}
