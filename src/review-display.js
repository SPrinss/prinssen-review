import { LitElement, html, css } from 'lit-element';
import '@vaadin/vaadin-combo-box/vaadin-combo-box.js';
import './prinssen-ui-icon.js';
import './prinssen-ui-button.js';

/**
 * @customElement
 */
class ReviewDisplay extends LitElement {
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

      prinssen-ui-button {
        margin: 12px 24px;
        --prinssen-ui-button-fill: rgb(52, 126, 177);
        --prinssen-ui-button-text-color: white;
      }

      textarea {
        outline: none;
        resize: none;
        width: 100%;
        height: 400px;
        border: none;
        box-sizing: border-box;
        padding: 6px 12px;
        transition: 0.3s rgba(255, 255, 255, 0.5);
        border-radius: 5px;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-rendering: optimizeLegibility;
        font-weight: 400;
        font-size: 18px;
        line-height: 1.4;
      }

      ul {
        list-style-type: none;
        padding: 0;
      }

      li {
        padding: 4px 0;
      }

      footer {
        display: flex;
        flex-direction: row;
        justify-content: flex-end;
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
        --prinssen-ui-icon-color: rgb(52, 126, 177);
      }

      prinssen-ui-icon:hover {
        cursor: pointer;
      }
    `;
  }
  render() {
    return html`

    <main>
      <section>

        <prinssen-ui-icon
          .icon="${'arrow-left'}"
          @click=${this._handleBackClick}
        ></prinssen-ui-icon>

        <header>
          <div id="header-main-container">
          <h3 id="title">${this.name}</h3>
          <span class="groups-span">
            ${this.groups.map((val, i) => html`
              ${val.name}
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
                .icon="${'local-play'}"
              ></prinssen-ui-icon>
              <span>${this.theater}</span>
            </div>
            <div class="icon-span-container">
              <prinssen-ui-icon
                .icon="${'city'}"
              ></prinssen-ui-icon>
              <span>${this.city}</span>
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
              <li>${val.name}</li>
            `)}
            </ul>
          </div>
        </div>
        <div class="persons-type-container">
          <div class="persons-type-header"><p>Directors</p></div>
          <div class="persons-type-body"> 
            <ul ?hidden=${this.directors.length === 0}>
            ${this.directors.map((val, i) => html`
              <li>${val.name}</li>
            `)}
            </ul>
          </div>
        </div>
        <div class="persons-type-container">
          <div class="persons-type-header"><p>Writers</p></div>
          <div class="persons-type-body"> 
            <ul ?hidden=${this.writers.length === 0}>
            ${this.writers.map((val, i) => html`
              <li>${val.name}</li>
            `)}
            </ul>
          </div>
        </div>
      </section>
      <section>
        <textarea ?disabled="${false}" ?readonly="${false}" @blur="${this._handleReviewInput}">${this.review}</textarea>

      </section>
      <footer>
        <prinssen-ui-button
          label="Save"
          icon="save"
          @click="${this._handleSaveClick}"
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
      review: {
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
      reviewUpdated: {
        type: Boolean
      }
    }
  }

  constructor() {
    super();
    this.id = '';
    this.reviewId = '';
    this.reviewUpdated = false;
    this.name = '';
    this.actors = [];
    this.directors = [];
    this.writers = [];
    this.groups = [];
    this.city = '';
    this.theater = '';
    this.timePerformed = '';
  }

  updated(props) {
    if(props.has('reviewId')) this._getReviewFromDb(this.reviewId);
  }

  async _getReviewFromDb(reviewId) {
    const doc = await FIRESTORE.collection(`reviews`).doc(reviewId).get();
    const data = doc.data();
    this.name = data.playName;
    this.actors = data.actors;
    this.directors = data.directors;
    this.writers = data.writers;
    this.groups = data.groups;
    this.city = data.city.name;
    this.theater = data.theater.name;
    this.timePerformed = data.timePerformed;
    this.review = data.review;
  }

  _toReadableDate(str) {
    const date = new Date(str);
    return `${this._prefixZeroes(date.getMonth() + 1)}-${this._prefixZeroes(date.getDate())}-${date.getFullYear()}`
  }

  _prefixZeroes(str) {
    return `0${str}`.slice(-2);
  }

  _handleBackClick() {
    this.dispatchEvent(new CustomEvent('back-clicked'))
  }

  _handleSaveClick() {
    const textAreaEl = this.shadowRoot.querySelector('textarea');
    FIRESTORE.collection('reviews').doc(this.reviewId).update({review: textAreaEl.value});
  }


}
window.customElements.define('review-display', ReviewDisplay);
