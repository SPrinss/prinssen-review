import { LitElement, html, css } from 'lit-element';
import '@vaadin/vaadin-combo-box/vaadin-combo-box.js';
import '@vaadin/vaadin-date-picker/vaadin-date-picker.js';

/**
 * @customElement
 * @polymer
 */
class QueryForm extends LitElement {
  static get styles() {
    return css`
      vaadin-combo-box {
        min-width: 300px;
        margin: 0 4px;
      }
      vaadin-date-picker {
        margin: 0 4px;
      }
      #title-box  {
        min-width: 600px;
      }
      `;
  }
  render() {
    return html`

      <vaadin-combo-box 
        id="title-box"
        label="Titles"
        .items="${this.titles}"
        item-label-path="title"
        .selected-="${this.selectedTitle.title}"
        placeholder="Titles"
        ?clear-button-visible="${true}"
        ?allow-custom-value="${true}"
        @custom-value-set="${this._handleTitleCustomValueChanged}"
        @selected-item-changed="${this._handleSelectedTitleChanged}"
      ></vaadin-combo-box>

      <vaadin-combo-box 
        label="Persons"
        ?disabled="${!!this.selectedTitle.title}"
        .items="${this._filterNames(this.persons)}"
        .value="${this.selectedPerson.name}"
        placeholder="Persons"
        ?clear-button-visible="${true}"
        @selected-item-changed="${this._handleSelectedPersonChanged}"
      ></vaadin-combo-box>

      <vaadin-combo-box 
        label="Theater groups"
        ?disabled="${!!this.selectedTitle.title}"
        .items="${this._filterNames(this.groups)}"
        .value="${this.selectedGroup.name}"
        placeholder="Theater groups"
        ?clear-button-visible="${true}"
        @selected-item-changed="${this._handleSelectedGroupChanged}"
      ></vaadin-combo-box>

      <vaadin-combo-box 
        label="Cities"
        ?disabled="${!!this.selectedTitle.title}"
        .items="${this._filterNames(this.cities)}"
        .value="${this.selectedCity.name}"
        placeholder="Cities"
        ?clear-button-visible="${true}"
        @selected-item-changed="${this._handleSelectedCityChanged}"
      ></vaadin-combo-box>

      <vaadin-combo-box 
        label="Theaters"
        ?disabled="${!!this.selectedTitle.title}"
        .items="${this._filterNames(this.theaters)}"
        .value="${this.selectedTheater.name}"
        placeholder="Theaters"
        ?clear-button-visible="${true}"
        @selected-item-changed="${this._handleSelectedTheaterChanged}"
      ></vaadin-combo-box>

      <vaadin-date-picker
        ?disabled="${!!this.selectedTitle.title}"
        label="Start"
        @value-changed="${this._handleStartDateChanged}"
      ></vaadin-date-picker>

      <vaadin-date-picker
        ?disabled="${!!this.selectedTitle.title}"
        label="End"
        @value-changed="${this._handleEndDateChanged}"
      ></vaadin-date-picker>

`
  }
  
  static get properties() {
    return {
      persons: {
        type: Array
      },
      titles: {
        type: Array
      },
      groups: {
        type: Array
      },
      cities: {
        type: Array
      },
      theaters: {
        type: Array
      },
      selectedPerson: {
        type: Object
      },
      selectedTitle: {
        type: Object
      },
      selectedGroup: {
        type: Object
      },
      selectedCity: {
        type: Object
      },
      selectedTheater: {
        type: Object
      },
    }
  }

  constructor() {
    super();
    this.persons = [];
    this.titles = [];
    this.groups = [];
    this.cities = [];
    this.theaters = [];
    this.selectedPerson = {};
    this.selectedTitle = {};
    this.selectedGroup = {};
    this.selectedCity = {};
    this.selectedTheater = {};
  }

  updated(props) {
    if(props.has('titles')) this.openTitleBox()
  }

  openTitleBox() {
    const titleBoxEl = this.shadowRoot.querySelector('#title-box');
    titleBoxEl.open();
  }

  _filterNames(arr = []) {
    if(!arr) return [];
    arr.sort((a, b) => a.name - b.name);
    const names = arr.map(item => item.name);
    return names;
  }

  _filterTitles(arr = []) {
    if(!arr) return [];
    arr.sort((a, b) => a.title - b.title);
    const titles = arr.map(item => item.title);
    return titles;
  }

  _handleSelectedPersonChanged(evt) {
    const fileteredPersons = this.persons.filter(person => person.name === evt.detail.value);
    this.selectedPerson = fileteredPersons[0] || {};
    this.dispatchEvent(new CustomEvent('selected-person-changed', {detail: {value: this.selectedPerson}}))
  }

  _handleSelectedGroupChanged(evt) {
    const filteredGroup = this.groups.filter(group => group.name === evt.detail.value);
    this.selectedGroup = filteredGroup[0]  || {};
    this.dispatchEvent(new CustomEvent('selected-group-changed', {detail: {value: this.selectedGroup}}))

  }
  _handleSelectedCityChanged(evt) {
    const filteredCity = this.cities.filter(city => city.name === evt.detail.value);
    this.selectedCity = filteredCity[0]  || {};
    this.dispatchEvent(new CustomEvent('selected-city-changed', {detail: {value: this.selectedCity}}))
  }
  _handleSelectedTheaterChanged(evt) {
    const filteredTheater = this.theaters.filter(theater => theater.name === evt.detail.value);
    this.selectedTheater = filteredTheater[0]  || {};
    this.dispatchEvent(new CustomEvent('selected-theater-changed', {detail: {value: this.selectedTheater}}))
  }

  _handleStartDateChanged(evt) {
    const value = evt.detail.value;
    this.dispatchEvent(new CustomEvent('selected-start-date-changed', {detail: {value: evt.detail.value}}))
  }

  _handleEndDateChanged(evt) {
    const value = evt.detail.value;
    this.dispatchEvent(new CustomEvent('selected-end-date-changed', {detail: {value: evt.detail.value}}))
  }


  _handleSelectedTitleChanged(evt) {
    this.dispatchEvent(new CustomEvent('selected-title-changed', {detail: {value: evt.detail.value}}))
  }

  _handleTitleCustomValueChanged(evt) {
    this.dispatchEvent(new CustomEvent('custom-title-changed', {detail: {value: evt.detail}}))
  }

}
window.customElements.define('query-form', QueryForm);
