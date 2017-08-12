import {} from '@types/googlemaps';

import { AfterViewInit, ChangeDetectionStrategy, Component, ElementRef, EventEmitter, Input, Output } from '@angular/core';

import { GoogleMapInfoWindowComponent } from './google-map-infowindow';
import { LifecycleComponent } from './lifecycle-component';
import { LocalStorageService } from 'angular-2-local-storage';
import { OnChange } from '../decorators/onchange';
import { nextTick } from '../utils';

/**
 * Model map marker
 */
export class GoogleMapMarker {
  icon: string;
  infoWindow?: GoogleMapInfoWindowComponent;
  infoWindowData: any;
  map?: google.maps.Map;
  position: {lat: number, lng: number};

  constructor(obj: any) {
    Object.assign(this, obj);
  }

}

/**
 * Google map
 *
 * NOTE: client code responsible for loading API in index.html

    <script>
      var e = document.createElement("script");
      e.src = "https://maps.googleapis.com/maps/api/js?key=" + ENV["GOOGLE_MAPS_API_KEY"];
      document.body.appendChild(e);
    </script>

 */

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'lib-google-map',
  styleUrls: ['google-map.less'],
  templateUrl: 'google-map.html'
})

export class GoogleMapComponent extends LifecycleComponent
                                implements AfterViewInit {

  @Input() center: {
    lat: 39.8282,
    lng: -98.5795
  };
  @Input() markers: GoogleMapMarker[];
  @Input() stickyKey: string;
  @Input() zoom = 5;

  @Output() centerChanged = new EventEmitter<any>();
  @Output() mapTypeIdChanged = new EventEmitter<any>();
  @Output() markerClicked = new EventEmitter<any>();
  @Output() zoomChanged = new EventEmitter<any>();

  ginfoWindow: google.maps.InfoWindow;
  gmap: google.maps.Map;
  gmarkers: google.maps.Marker[] = [];

  /** ctor */
  constructor(private element: ElementRef,
              private lstor: LocalStorageService) {
    super();
  }

  /** Center the map */
  setCenter(lat: number,
            lng: number) {
    const center = {lat: lat, lng: lng};
    if (this.stickyKey)
      this.lstor.set(`${this.stickyKey}.center`, center);
    this.gmap.setCenter(center);
  }

  /** Set the map type */
  setMapTypeId(mapTypeId: string) {
    if (this.stickyKey)
      this.lstor.set(`${this.stickyKey}.mapTypeId`, mapTypeId);
    this.gmap.setMapTypeId(mapTypeId);
  }

  /** Zoom the map */
  setZoom(zoom: number) {
    if (this.stickyKey)
      this.lstor.set(`${this.stickyKey}.zoom`, zoom);
    this.gmap.setZoom(zoom);
  }

  // bind OnChange handlers

  @OnChange('markers') newMarkers() {
    // clear out all the old markers
    this.gmarkers.forEach(gmarker => gmarker.setMap(null));
    if (this.markers && this.markers.length) {
      // buid the new markers
      this.gmarkers = this.markers.map(marker => {
        marker.map = this.gmap;
        const gmarker = new google.maps.Marker(marker);
        // if an InfoWindow is requested, add listener to open it
        if (marker.infoWindow) {
          gmarker['_infoWindow'] = marker.infoWindow;
          gmarker['_infoWindowData'] = marker.infoWindowData;
          gmarker.addListener('click', () => {
            this.markerClicked.emit(gmarker['_infoWindowData']);
            this.ginfoWindow.setContent(gmarker['_infoWindow'].element.nativeElement);
            this.ginfoWindow.open(this.gmap, gmarker);
          });
        }
        return gmarker;
      });
      // are all the markers in view?
      const bounds = new google.maps.LatLngBounds();
      const allInView = this.gmarkers.reduce((acc, gmarker) => {
        const inView = this.gmap.getBounds().contains(gmarker.getPosition());
        bounds.extend(gmarker.getPosition());
        return acc && inView;
      }, true);
      // if they're not, make the map fit
      if (!allInView)
        this.gmap.fitBounds(bounds);
    }
  }

  // lifecycle methods

  ngAfterViewInit() {
    try {
      // create singleton Google InfoWindow with initially empty content
      this.ginfoWindow = new google.maps.InfoWindow({content: ''});
      // create Google Map
      const mapOptions: google.maps.MapOptions = {
        center: this.initCenter(),
        mapTypeControlOptions: {
          position: google.maps.ControlPosition.RIGHT_CENTER,
          style: google.maps.MapTypeControlStyle.DROPDOWN_MENU
        },
        mapTypeId: this.initMapTypeId(),
        zoom: this.initZoom()
      };
      this.gmap = new google.maps.Map(this.element.nativeElement, mapOptions);
      // add listeners
      this.gmap.addListener('center_changed', this.onCenterChanged.bind(this));
      this.gmap.addListener('maptypeid_changed', this.onMapTypeIdChanged.bind(this));
      this.gmap.addListener('zoom_changed', this.onZoomChanged.bind(this));
    }
    catch (exception) {
      // TODO: any better ideas?
      // 1. Not much success with Angular or Polymer components that try to bury API load
      // 2. No good way to hook Google script callback in index.html
      if (exception.name === 'ReferenceError')
        nextTick(() => this.ngAfterViewInit());
    }
  }

  // private methods

  private initCenter(): google.maps.LatLngLiteral {
    const center = this.center;
    if (this.stickyKey)
      return <google.maps.LatLngLiteral>this.lstor.get(`${this.stickyKey}.center`) || center;
    else return center;
  }

  private initMapTypeId(): google.maps.MapTypeId {
    const mapTypeId = google.maps.MapTypeId.ROADMAP;
    if (this.stickyKey)
      return <google.maps.MapTypeId>this.lstor.get(`${this.stickyKey}.mapTypeId`) || mapTypeId;
    return mapTypeId;
  }

  private initZoom(): number {
    const zoom = this.zoom;
    if (this.stickyKey)
      return <number>this.lstor.get(`${this.stickyKey}.zoom`) || zoom;
    return zoom;
  }

  private onCenterChanged() {
    const center = this.gmap.getCenter();
    const event = {
      lat: center.lat(),
      lng: center.lng()
    };
    if (this.stickyKey)
      this.lstor.set(`${this.stickyKey}.center`, center);
    this.centerChanged.emit(event);
  }

  private onMapTypeIdChanged() {
    const mapTypeId = this.gmap.getMapTypeId();
    if (this.stickyKey)
      this.lstor.set(`${this.stickyKey}.mapTypeId`, mapTypeId);
    this.mapTypeIdChanged.emit(mapTypeId);
  }

  private onZoomChanged() {
    const zoom = this.gmap.getZoom();
    if (this.stickyKey)
      this.lstor.set(`${this.stickyKey}.zoom`, zoom);
    this.zoomChanged.emit(zoom);
  }

}
