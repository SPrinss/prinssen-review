import { BaseElement, html} from './base-element.js';

/**
 * @customElement
 */
class PrinssenRouter extends BaseElement {

  static get properties() {
    return {

      url: {
        type: Object
      },

      routes: {
        type: Object,
      },

      _routeChunks: {
        type: Array
      }

    };
  }

  constructor() {
    super();
    this.template = html``;
    this.url = {};
    this.routes = {};
    this._routeChunks = [];
  }

  updated(props) {
    
    const matchingRoutes = {};
    let activeRoute;
    let params = {};

    for(var routeName in this.routes) {
      const routeChunks = this._parsePathIntoChunks(this.routes[routeName]);
      if(JSON.stringify(routeChunks) === JSON.stringify(this._urlPathChunks)) activeRoute = routeName;

      const numChunks = (Object.keys(routeChunks).length);
      let matchingChunks = 0;

      for(var i in routeChunks) {
        if( (routeChunks[i] === this._urlPathChunks[i]) || (!!this._urlPathChunks[i] && routeChunks[i].substr(0, 1) === ':') ) matchingChunks++;
        if( routeChunks[i].substr(0, 1) === ':' && this._urlPathChunks[i]) params[routeChunks[i].substr(1)] = this._urlPathChunks[i];
      }
      if(matchingChunks === numChunks) matchingRoutes[routeName] = true;

    }

    this.dispatchEvent(new CustomEvent('active-route-changed', {detail: {value: activeRoute}}));
    this.dispatchEvent(new CustomEvent('matching-routes-changed', {detail: {value: matchingRoutes}}));
    this.dispatchEvent(new CustomEvent('params-changed', {detail: {value: params}}));
  }

  _parsePathIntoChunks(path) {
    const chunks = path.split(/\//g).splice(1);
    return chunks;
  }

  get _urlPathChunks() {
    return this._parsePathIntoChunks(this.url.pathname);
  }

}

window.customElements.define('prinssen-router', PrinssenRouter);
