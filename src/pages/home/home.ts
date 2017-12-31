import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

declare var google;

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  private googleMapInjected = false;
  private mapInitialized = false;
  private map: any;

  constructor(public navCtrl: NavController) {
    window['googleMapCallback'] = () => {
      this.googleMapInjected = true;     
      console.log('Google map injected'); 
    }
    this.injectGoogleMapsSDK();
  }

  injectGoogleMapsSDK() {
    let apiKey = 'AIzaSyBm3qF1Z-glwLmcaBo5d01vNopt98VxZUI';
    let script = document.createElement('script');

    script.src = `http://maps.google.com/maps/api/js?key=${apiKey}&callback=googleMapCallback`

    document.body.appendChild(script);
  }

  initMap() {
    this.map = new google.maps.Map(document.getElementById('map'), {
      center: new google.maps.LatLng(52.5167, 13.3833),
      zoom: 15,
      mapTypeId: google.maps.MapTypeId.ROADMAP      
    });

    this.mapInitialized = true;
  }

}
