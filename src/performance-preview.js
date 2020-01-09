import { LitElement, html, css } from 'lit-element';
import '@vaadin/vaadin-combo-box/vaadin-combo-box.js';
import './prinssen-ui-icon.js';
import './prinssen-ui-button.js';

/**
 * @customElement
 */
class PerformancePreview extends LitElement {
  static get styles() {
    return css`
      :host {
        display: block;
      }

      main {
        display: flex;
        flex-direction: column;
        max-width: 100%;
      }
      section {
        display: block;
        width: 100%;
        padding: 12px 24px;
        box-sizing: border-box;
      }
      section:not(:last-of-type) {
        border-bottom: 2px solid hsl(210, 23%, 95%);
      }

      header {
        display: flex;
      }

      #title {
        font-weight: 700;
        color: hsl(202, 57%, 15%);
        margin: 24px 0 6px 0;
      }

      .groups-span {
        color: hsl(213, 9%, 44%);
      }

      .clickable:hover {
        cursor: pointer;
      }

      prinssen-ui-icon {
        --prinssen-ui-icon-size: 24px;
        --prinssen-ui-icon-color: hsl(212, 20%, 68%);
        position: relative;
        top: 5px;
        left: 5px;
      }

      #persons-container {
        display: grid;
        grid-template-columns: 1fr 1fr 1fr;
        padding: 0;
      }

      .persons-type-container {
        display: flex;
        flex-direction: column;
        flex-wrap: nowrap;
        justify-content: space-between;
        color: hsl(213, 42%, 9%);
      }

      .persons-type-header {
        color: hsl(213, 9%, 44%);
        padding: 0 0 0 24px;
      }

      .persons-type-header * {
        padding: 12px 0 0 0;
        margin: 0;
        font-weight: 700;
      }

      .persons-type-body {
        padding: 0 0 0 24px;
        height: 100%;
      }

      footer {
        display: flex;
        flex-direction: row;
        justify-content: flex-end;
      }

      prinssen-ui-button {
        margin: 12px 24px;
        --prinssen-ui-button-fill: rgb(52, 126, 177);
        --prinssen-ui-button-text-color: white;
      }

      ul {
        list-style-type: none;
        padding: 0;
      }

      li {
        padding: 4px 0;
      }

      #header-main-container {
        flex: 1;
      }

      #header-details-container {
        flex: 0;
        display: flex; 
        flex-direction: column;
        justify-content: space-between;
        min-width: 225px;
      }

      .icon-span-container:not(:last-of-type) {
        color: hsl(212, 20%, 13%);
        padding: 0 24px 0 0;  
      }

      .icon-span-container span {
        vertical-align:middle;
      }

      prinssen-ui-icon {
        margin-right: 8px;
      }
    `;
  }
  render() {
    return html`

    <main>
      <section>
        <header>
          <div id="header-main-container">
          <h3 id="title">${this.name}</h3>
          <span class="groups-span">
            ${this.groups.map((val, i) => html`
              <span class="clickable" data-name=${val.name} @click="${this._handleGroupClick}">${val.name}</span>
              ${(this.groups.length !== 0 && i !== this.groups.length - 1) ? ' - ' : ''}
            `)}
          </span>
        </div>
          <div id="header-details-container">
            <div class="icon-span-container">
              <prinssen-ui-icon
                .icon="${'event'}"
              ></prinssen-ui-icon>
              <span id="date">${this._toReadableDate(this.timePerformed)}</span>
            </div>

            <div class="icon-span-container">
              <prinssen-ui-icon
                .icon="${'city'}"
              ></prinssen-ui-icon>
              <span class="clickable" data-name=${this.theater} @click="${this._handleTheaterClick}">${this.theater}</span>
            </div>
            <div class="icon-span-container">
              <prinssen-ui-icon
                .icon="${'place'}"
              ></prinssen-ui-icon>
              <span class="clickable" data-name=${this.city} @click="${this._handleCityClick}">${this.city}</span>
            </div>

          </div>
        </header>


      </section>

    
      <section id="persons-container"> 
        <div class="persons-type-container">
          <div class="persons-type-header"><p>Actors</p></div>
          <div class="persons-type-body"> 
            <ul ?hidden=${this.actors.length === 0}>
            ${this.actors.map((val, i) => html`
              <li class="clickable" data-name=${val.name} @click="${this._handlePersonClick}">${val.name}</li>
            `)}
            </ul>
          </div>
        </div>
        <div class="persons-type-container">
          <div class="persons-type-header"><p>Directors</p></div>
          <div class="persons-type-body"> 
            <ul ?hidden=${this.directors.length === 0}>
            ${this.directors.map((val, i) => html`
            <li class="clickable" data-name=${val.name} @click="${this._handlePersonClick}">${val.name}</li>
            `)}
            </ul>
          </div>
        </div>
        <div class="persons-type-container">
          <div class="persons-type-header"><p>Writers</p></div>
          <div class="persons-type-body"> 
            <ul ?hidden=${this.writers.length === 0}>
            ${this.writers.map((val, i) => html`
              <li class="clickable" data-name=${val.name} @click="${this._handlePersonClick}">${val.name}</li>
            `)}
            </ul>
          </div>
        </div>
      </section>
      <footer>
        <prinssen-ui-button
          label="Review"
          icon="arrow-right"
          @click="${this._handleReviewClick}"
        ></prinssen-ui-button>
      </footer>
    </main>
`
  }
  
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
