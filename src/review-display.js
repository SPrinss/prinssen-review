import { BaseElement, html} from './base-element.js';
import '@vaadin/vaadin-combo-box/vaadin-combo-box.js';
import './prinssen-ui-icon.js';
import './prinssen-ui-button.js';

/**
 * @customElement
 */
class ReviewDisplay extends BaseElement {
  
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
    this.template = () => html`
      <link rel="stylesheet" href="../styles/review-display.css">

     <main>
      <section>

        <prinssen-ui-icon
          class="clickable"
          id="nav-icon"
          .icon="${'arrow-left'}"
          @click=${this._handleBackClick.bind(this)}
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
              <span id="date">${this._toReadableDate(this.timePerformed)}</span>
              <prinssen-ui-icon
                .icon="${'event'}"
              ></prinssen-ui-icon>
            </div>

            <div class="icon-span-container">
              <span>${this.theater}</span>
              <prinssen-ui-icon
                .icon="${'local-play'}"
              ></prinssen-ui-icon>
            </div>
            <div class="icon-span-container">
              <span>${this.city}</span>
              <prinssen-ui-icon
                .icon="${'city'}"
              ></prinssen-ui-icon>
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
        <textarea ?disabled="${false}" ?readonly="${false}">${this.review}</textarea>

      </section>
      <footer>
        <prinssen-ui-button
          label="Save"
          icon="save"
          @click="${this._handleSaveClick.bind(this)}"
        ></prinssen-ui-button>
      </footer>
    </main>
    `;

  }

  updated(props) {
    super.updated();
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
