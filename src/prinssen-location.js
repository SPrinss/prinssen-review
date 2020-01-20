import { BaseElement, html} from './base-element.js';

/**
 * @customElement
 * @polymer
 */
class PrinssenLocation extends BaseElement {

  static get properties() {
    return {

      url: {
        type: Object
      },

      _baseURI: {
        type: String
      }
    };
  }

  constructor() {
    super();
    this.template = html``;
    this._baseURI = window.location.href;
    this.url = new URL(this._baseURI);
    document.addEventListener('click', this._handleClick.bind(this), true);
    window.onpopstate = () => this.url = window.location
  }

  updated(props) {
    if(props.has('url')) this.dispatchEvent(new CustomEvent('url-changed', {detail: {value: this.url}}));
  }

  _handleClick(evt) {
    
    const path = evt.path || (evt.composedPath && evt.composedPath());
    const target = path[0];
    if(!target.href) return;

    const newURL = new URL(target.href);
    const currentURL = new URL(window.location.href);
    const isInternalLink = newURL.origin === currentURL.origin;
    const isInternalTarget = target.target !== '_blank';
    
    if(target && target.nodeName === 'A' && isInternalLink && isInternalTarget) {
      evt.preventDefault();
      history.pushState({}, "Bla", newURL);
      this.url = newURL;
    }

  }

}

window.customElements.define('prinssen-location', PrinssenLocation);
