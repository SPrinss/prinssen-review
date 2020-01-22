import { BaseElement, html} from './base-element.js';
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
      "Recensies": "/recensies",
      "Interviews": "/interviews",
      "Over": "/over"
    };  
    this.activeRoute = '';
    this.matchingRoutes = {};
    this.routeData = {};
    this._startFirebase();

    this.template = () => html`
      <link rel="stylesheet" href="../styles/prinssen-review-app.css">

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
          <h5><a class="no-border" href="/">Margriet Prinssen</a></h5>
          <ul>
            <li ?data-active="${!!this.activeRoute && this.activeRoute.toLowerCase() === 'recensies'}"><a href="/recensies">Recensies</a></li>
            <li ?data-active="${!!this.activeRoute && this.activeRoute.toLowerCase() === 'interviews'}" ><a href="/interviews">Interviews</a></li>
            <li ?data-active="${!!this.activeRoute && this.activeRoute.toLowerCase() === 'over'}"><a href="/over">Over</a></li>
          </ul>
        </nav>
      </header>

      ${(!this.activeRoute || this.activeRoute === '' || !this.activeRoute || this.activeRoute.toLowerCase() === 'home') ? this._renderHome() : ''}
      ${(!!this.activeRoute && this.activeRoute.toLowerCase() === 'recensies') ? this._renderReviews() : ''}
      ${(!!this.activeRoute && this.activeRoute.toLowerCase() === 'interviews') ? this._renderInterviews() : ''}
      ${(!!this.activeRoute && this.activeRoute.toLowerCase() === 'over') ? this._renderAbout() : ''}

      <footer>

      </footer>

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
