import { BaseElement, html} from './base-element.js';
import './about-page';
import './review-page';
import './four-o-four-page';
import './prinssen-location';
import './prinssen-router';
import './prinssen-homepage';
import './prinssen-interviews.js';
import './prinssen-about';

/**
 * @customElement
 * @polymer
 */
class PrinssenReviewApp extends BaseElement {
 
  static get properties() {
    return {
      url: {
        type: Object
      },

      routes: {
        type: Object
      },

      activeRoute: {
        type: String
      },
      
      matchingRoutes: {
        type: Object
      },

      routeData: {
        type: Object
      }
    }
  }

  constructor() {
    super();
    this.router = {};
    this.url = {};
    this.routes = {
      "Reviews": "/reviews",
      "Interviews": "/interviews",
      "About": "/about"
    };  
    this.activeRoute = '';
    this.matchingRoutes = {};
    this.routeData = {};
    this._startFirebase();

    this.template = () => html`
      <link rel="stylesheet" href="../src/styles/prinssen-review-app.css">

      <prinssen-location
        @url-changed="${this._handleURLChanged.bind(this)}"
      ></prinssen-location>

      <prinssen-router
        .url="${this.url}"
        .routes="${this.routes}"
        @active-route-changed="${this._handleActiveRouteChanged.bind(this)}"
        @matching-routes-changed="${this._handleMatchingRoutesChanged.bind(this)}"
        @params-changed="${this._handleParamsChanged.bind(this)}"
      ></prinssen-router>


      <header>
        <nav>
          <h5><a href="/">Margriet Prinssen</a></h5>
          <ul>
            <li><a href="/reviews">Reviews</a></li>
            <li><a href="/interviews">Interviews</a></li>
            <li><a href="/about">About</a></li>
          </ul>
        </nav>
      </header>

      ${(!this.activeRoute || this.activeRoute === '' || !this.activeRoute || this.activeRoute.toLowerCase() === 'home') ? this._renderHome() : ''}
      ${(!!this.activeRoute && this.activeRoute.toLowerCase() === 'reviews') ? this._renderReviews() : ''}
      ${(!!this.activeRoute && this.activeRoute.toLowerCase() === 'interviews') ? this._renderInterviews() : ''}
      ${(!!this.activeRoute && this.activeRoute.toLowerCase() === 'about') ? this._renderAbout() : ''}

    `;
  }

  _startFirebase() {
    const firebaseConfig = {
      apiKey: "AIzaSyA-bXJEp5ACyo6sD_UfDaSh2vzZ9ltXxLc",
      authDomain: "prinssen-reviews.firebaseapp.com",
      databaseURL: "https://prinssen-reviews.firebaseio.com",
      projectId: "prinssen-reviews",
      storageBucket: "prinssen-reviews.appspot.com",
      messagingSenderId: "494922508593",
      appId: "1:494922508593:web:24b628d486c9dca0fca810"
    };
    
    firebase.initializeApp(firebaseConfig);
    window.FIRESTORE = firebase.firestore();
    window.FUNCTIONS = firebase.functions();
  }

  _renderHome() {
    return html`
      <prinssen-homepage class="page"></prinssen-homepage>
    `
  }

  _renderAbout() {
    return html`
      <prinssen-about class="page"></prinssen-about>
    `
  }

  _renderReviews() {
    return html`
      <review-page class="page"></review-page>
    `
  }

  _renderInterviews() {
    return html`
    <prinssen-interviews class="page"></prinssen-interviews>
    `
  }

  _handleURLChanged(evt) {
    this.url = evt.detail.value;
    window.scrollTo(0, 0);
  }

  _handleActiveRouteChanged(evt) {
    this.activeRoute = evt.detail.value;
  }

  _handleMatchingRoutesChanged(evt) {
    this.matchingRoutes = {...evt.detail.value};
  }

  _handleParamsChanged(evt) {
    this.routeData = {...evt.detail.value};
  }

  _parsePageStatus(page) {
    // if(this.activePage === page) 
  }

}
window.customElements.define('prinssen-review-app', PrinssenReviewApp);
