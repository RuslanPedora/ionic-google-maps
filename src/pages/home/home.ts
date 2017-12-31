import { Component } from '@angular/core';
import { 
  NavController,
  LoadingController } from 'ionic-angular';


declare var google;

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  private googleMapInjected = false;
  private mapInitialized = false;
  private map: any;
  private marker: any = null;
  private loading;
  private markers: any[] = [];

  constructor(
    public navCtrl: NavController,
    public loadingCtrl: LoadingController) {
    window['googleMapCallback'] = () => {
      this.googleMapInjected = true;     
      this.loading.dismiss();      
      this.initMap();      
      console.log('Google map injected');
    }
    this.injectGoogleMapsSDK();
  }

  injectGoogleMapsSDK() {
    let apiKey = 'AIzaSyBm3qF1Z-glwLmcaBo5d01vNopt98VxZUI';
    let script = document.createElement('script');

    script.src = `http://maps.google.com/maps/api/js?key=${apiKey}&callback=googleMapCallback`

    this.loading = this.loadingCtrl.create();
    this.loading.present();
    document.body.appendChild(script);
  }

  initMap() {
    
    this.map = new google.maps.Map(document.getElementById('map'), {
      center: new google.maps.LatLng(52.5167, 13.3833),
      zoom: 15,
      mapTypeId: google.maps.MapTypeId.ROADMAP      
    });

    this.mapInitialized = true;
    this.createMarker();
  }

  createMarker() {
    this.markers.push(new google.maps.Marker({
      position: this.map.getCenter(),
      map: this.map,
      draggable: true
    }));  
  }

  clear() {
    this.markers.forEach(el => el.setMap(null));
    this.markers= [];
  }
}
