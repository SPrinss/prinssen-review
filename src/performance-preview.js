import { BaseElement, html} from './base-element.js';
import '@vaadin/vaadin-combo-box/vaadin-combo-box.js';
import './prinssen-ui-icon.js';
import './prinssen-ui-button.js';

/**
 * @customElement
 */
class PerformancePreview extends BaseElement {
  
  static get properties() {
    return {
      id: {
        type: String
      },
      reviewId: {
        type: String
      },
      name: {
        type: String
      },
      city: {
        type: Array
      },
      theater: {
        type: Array
      },
      actors: {
        type: Array
      },
      directors: {
        type: Array
      },
      writers: {
        type: Array
      },
      groups: {
        type: Array
      },
      timePerformed: {
        type: String
      },
    }
  }

  constructor() {
    super();
    this.id = '';
    this.reviewId = '';
    this.name = '';
    this.actors = [];
    this.directors = [];
    this.writers = [];
    this.groups = [];
    this.city = '';
    this.theater = '';
    this.timePerformed = '';

    this.template = () => html`
      <link rel="stylesheet" href="../styles/performance-preview.css">
      <main>
      <header class="flex-row nowrap space-between">
        <div id="header-main-container">
        <h5 id="title">${this.name}</h5>
        <span class="groups-span">
          ${this.groups.map((val, i) => html`
            <span class="clickable" data-name=${val.name} @click="${this._handleGroupClick.bind(this)}">${val.name}</span>
            ${(this.groups.length !== 0 && i !== this.groups.length - 1) ? ' - ' : ''}
          `)}
        </span>
      </div>
        <div id="header-details-container">
          <div class="icon-span-container">
            <span id="date">${this._toReadableDate(this.timePerformed)}</span>
            <prinssen-ui-icon
              .icon="${'event'}"
            ></prinssen-ui-icon>
          </div>

          <div class="icon-span-container">
            <span class="clickable" data-name=${this.theater} @click="${this._handleTheaterClick.bind(this)}">${this.theater}</span>
            <prinssen-ui-icon
              .icon="${'city'}"
            ></prinssen-ui-icon>
          </div>
          <div class="icon-span-container">
            <span class="clickable" data-name=${this.city} @click="${this._handleCityClick.bind(this)}">${this.city}</span>
            <prinssen-ui-icon
              .icon="${'place'}"
            ></prinssen-ui-icon>
          </div>

        </div>
      </header>
    
      <section id="persons-container"> 
        <div class="persons-type-container">
          <div class="persons-type-header"><p>Actors</p></div>
          <div class="persons-type-body"> 
            <ul ?hidden=${this.actors.length === 0}>
            ${this.actors.map((val, i) => html`
              <li><span class="clickable" data-name=${val.name} @click="${this._handlePersonClick.bind(this)}">${val.name}</span></li>
            `)}
            </ul>
          </div>
        </div>
        <div class="persons-type-container">
          <div class="persons-type-header"><p>Directors</p></div>
          <div class="persons-type-body"> 
            <ul ?hidden=${this.directors.length === 0}>
            ${this.directors.map((val, i) => html`
              <li><span class="clickable" data-name=${val.name} @click="${this._handlePersonClick.bind(this)}">${val.name}</span></li>
            `)}
            </ul>
          </div>
        </div>
        <div class="persons-type-container">
          <div class="persons-type-header"><p>Writers</p></div>
          <div class="persons-type-body"> 
            <ul ?hidden=${this.writers.length === 0}>
            ${this.writers.map((val, i) => html`
              <li><span class="clickable" data-name=${val.name} @click="${this._handlePersonClick.bind(this)}">${val.name}</span></li>
            `)}
            </ul>
          </div>
        </div>
      </section>
      <footer>
        <prinssen-ui-button
          label="Review"
          icon="arrow-right"
          @click="${this._handleReviewClick.bind(this)}"
        ></prinssen-ui-button>
      </footer>
    </main>
    `;
  }

  _toReadableDate(str) {
    const date = new Date(str);
    return `${this._prefixZeroes(date.getMonth() + 1)}-${this._prefixZeroes(date.getDate())}-${date.getFullYear()}`
  }

  _prefixZeroes(str) {
    return `0${str}`.slice(-2);
  }

  _handleReviewClick() {
    this.dispatchEvent(new CustomEvent('review-clicked', {detail: {value: this.reviewId}}))
  }

  _handleGroupClick(evt) {
    this.dispatchEvent(new CustomEvent('group-clicked', {detail: {value: evt.target.dataset['name']}}))

  }

  _handlePersonClick(evt) {
    this.dispatchEvent(new CustomEvent('person-clicked', {detail: {value: evt.target.dataset['name']}}))

  }

  _handleCityClick(evt) {
    this.dispatchEvent(new CustomEvent('city-clicked', {detail: {value: evt.target.dataset['name']}}))

  }

  _handleTheaterClick(evt) {
    this.dispatchEvent(new CustomEvent('theater-clicked', {detail: {value: evt.target.dataset['name']}}))

  }

}
window.customElements.define('performance-preview', PerformancePreview);
