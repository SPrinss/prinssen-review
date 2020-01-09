import { LitElement, html, css } from 'lit-element';
import './query-form.js';
import './performance-preview';
import './review-display';

/**
 * @customElement
 * @polymer
 */
class PrinssenReviewApp extends LitElement {
  static get styles() {
    return css`
      :host {
        width: 100%;
        height: 100%;
      }
      main {
        overflow-y: auto;
        max-height: 100%;
      }
      section {
        max-width: 800px;
        margin: 0 auto;
      }
      query-form {
        display: block;
        padding: 12px;
        background-color: #ffffff;
        box-shadow: 0 8px 18px hsla(0, 0%, 0%, .2);
        margin: 24px 0;
        border-radius: 24px;
      }

      performance-preview, review-display {
        background-color: white;
        box-shadow: 0 4px 12px hsla(0, 0%, 0%, .2);
        margin: 24px 0;
        border-radius: 24px;
      }

      [hidden] {
        display: none;
      }

      `;
  }
  render() {
    return html`

  <main>
    <section>
      <query-form 
        ?hidden=${this.reviewActive}
        .persons=${this.filteredPersons}
        .titles=${this.titles}
        .groups=${this.filteredGroups}
        .cities=${this.filteredCities}
        .theaters=${this.filteredTheaters}
        .selectedPerson=${this.selectedPerson}
        .selectedGroup=${this.selectedGroup}
        .selectedCity=${this.selectedCity}
        .selectedTheater=${this.selectedTheater}
        @selected-person-changed="${this._handleSelectedPersonChanged}"
        @selected-title-changed="${this._handleSelectedTitleChanged}"
        @selected-city-changed="${this._handleSelectedCityChanged}"
        @selected-theater-changed="${this._handleSelectedTheaterChanged}"
        @selected-group-changed="${this._handleSelectedGroupChanged}"
        @selected-start-date-changed="${this._handleStartDateChanged}"
        @selected-end-date-changed="${this._handleEndDateChanged}"
        @custom-title-changed="${this._handleCustomTitleChanged}"
      ></query-form>
      ${this.reviewActive ? html`
        <review-display
          .reviewId="${this.reviewId}"
          @back-clicked="${this._handleBackClicked}"
        ></review-display>
        
      ` : html`
        ${this.performances.map((val, i) =>  html`
          <performance-preview
            .name="${val.name || ''}"
            .id="${val.id}"
            .reviewId="${val.reviewId}"
            .actors="${val.actors || []}"
            .directors="${val.directors || []}"
            .writers="${val.writers || []}"
            .groups="${val.groups || []}"
            .city="${val.city ? val.city.name : ''}"
            .theater="${val.theater ? val.theater.name : ''}"
            .timePerformed="${val.timePerformed}"
            @review-clicked="${this._handleReviewClicked}"
            @group-clicked="${this._handleGroupNameClicked}"
            @person-clicked="${this._handlePersonNameClicked}"
            @city-clicked="${this._handleCityNameClicked}"
            @theater-clicked="${this._handleTheaterNameClicked}"
          ></performance-preview>
        `)}
      ` }
    </section>
  </main>
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
      filteredPersons: {
        type: Array
      },
      filteredGroups: {
        type: Array
      },
      filteredCities: {
        type: Array
      },
      filteredTheaters: {
        type: Array
      },
      performances: {
        type: Array
      },
      selectedPerson: {
        type: Object
      },
      selectedTitle: {
        type: Object
      },
      selectedCity: {
        type: Object
      },
      selectedTheater: {
        type: Object
      },
      selectedGroup: {
        type: Object
      },
      reviewId: {
        type: String
      },
      reviewActive: {
        type: Boolean
      },
      selectedStartDate: {
        type: Number
      },
      selectedEndDate: {
        type: Number
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
    this.filteredPersons = [];
    this.filteredGroups = [];
    this.filteredCities = [];
    this.filteredTheaters = [];
    this.performances = [];
    this.selectedPerson = {};
    this.selectedCity = {};
    this.selectedTheater = {};
    this.selectedGroup = {};
    this.reviewId = '';
    this.reviewActive = false;
    this.selectedStartDate = null;
    this.selectedEndDate = null;
    this._startFirebase();
    this._getArrFromDb('persons', 'name', 50);
    this._getArrFromDb('groups', 'name', 50);
    this._getArrFromDb('cities', 'name', 50);
    this._getArrFromDb('theaters', 'name', 50);
  }

  _handleSelectedTitleChanged(evt) {
    this.selectedTitle = evt.detail.value;
  }

  _handleSelectedPersonChanged(evt) {
    this.selectedPerson = evt.detail.value;
    this.requestUpdate();
  }

  _handleSelectedCityChanged(evt) {
    this.selectedCity = evt.detail.value;
    this.requestUpdate();

  }
  _handleSelectedTheaterChanged(evt) {
    this.selectedTheater = evt.detail.value;
    this.requestUpdate();

  }
  _handleSelectedGroupChanged(evt) {
    this.selectedGroup = evt.detail.value;
    this.requestUpdate();

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

  updated(props) {
    if(props.has('selectedTitle')) return this.getPerformanceByTitle(this.selectedTitle);
    if(props.has('selectedPerson') || props.has('selectedCity') || props.has('selectedTheater') || props.has('selectedGroup') || props.has('selectedStartDate') || props.has('selectedEndDate')) {
      this._setPerformances(this.selectedPerson, this.selectedCity, this.selectedTheater, this.selectedGroup, this.selectedStartDate, this.selectedEndDate)
    } 
    if(Object.keys(this.selectedPerson || {}).length === 0 && Object.keys(this.selectedCity || {}).length === 0 && Object.keys(this.selectedTheater || {}).length === 0 && Object.keys(this.selectedGroup || {}).length === 0 && Object.keys(this.selectedTitle || {}).length === 0 && this.selectedStartDate === null && this.selectedEndDate === null) {
      this._resetFilters();
    } else {
      if(props.has('performances')) {
        this._setFiltersFromPerformances(this.performances);
      }
    }
  }

  async getPerformanceByTitle(title = {}) {
    if(!title || !title.id) return;
    const ref = await FIRESTORE.collection('performances').doc(title.id).get();
    const performance = ref.data();
    const performances = [];
    performances.push(performance)
    this.performances = performances;
    this.requestUpdate();

  }

  _resetFilters() {
    if(Object.keys(this.selectedPerson || {}).length === 0 && Object.keys(this.selectedCity || {}).length === 0 && Object.keys(this.selectedTheater || {}).length === 0 && Object.keys(this.selectedGroup || {}).length === 0) {
      if(this.performances.length > 0) this.performances = [];
      this.filteredPersons = this.persons;
      this.filteredGroups = this.groups;
      this.filteredCities = this.cities;
      this.filteredTheaters = this.theaters;
      this.selectedStartDate = null;
      this.selectedEndDate = null;
    }
  }

  _setFiltersFromPerformances(performances) {
    if(Object.keys(this.selectedPerson || {}).length === 0 && Object.keys(this.selectedCity || {}).length === 0 && Object.keys(this.selectedTheater || {}).length === 0 && Object.keys(this.selectedGroup || {}).length === 0) return;
    this.filteredPersons = this._getPersonsFromPerformances(performances);
    this.filteredGroups = this._getGroupsFromPerformances(performances);
    this.filteredCities = this._getUniquesFromPerformances(performances, 'city');
    this.filteredTheaters = this._getUniquesFromPerformances(performances, 'theater');
  }

  _getGroupsFromPerformances(performances) {
    const unfilterdArr = [].concat(...performances.map(performance => performance['groups']));
    const filteredArr = [...new Set(unfilterdArr.map(item => item.id))].map(id => { return unfilterdArr.find(obj => obj.id === id) } );
    return filteredArr;
  }

  _getUniquesFromPerformances(performances, key) {
    const unfilterdArr = performances.map(performance => performance[key]);
    const filteredArr = [...new Set(unfilterdArr.map(item => item.id))].map(id => { return unfilterdArr.find(obj => obj.id === id) } );
    return filteredArr;
  }

  _getPersonsFromPerformances(performances) {
    const actors = performances.map(performance => performance.actors);
    const directors = performances.map(performance => performance.directors);
    const writers = performances.map(performance => performance.writers);
    const unfilteredPersons = [].concat(...actors, ...directors, ...writers);
    const filteredArr = [...new Set(unfilteredPersons.map(item => item.id))].map(id => { return unfilteredPersons.find(obj => obj.id === id) })
    return filteredArr;
  }

  async _setPerformances(selectedPerson = {}, selectedCity = {}, selectedTheater = {}, selectedGroup = {}, selectedStartDate, selectedEndDate) {
    if(Object.keys(selectedPerson).length === 0 && Object.keys(selectedCity).length === 0 && Object.keys(selectedTheater).length === 0 && Object.keys(selectedGroup).length === 0) return;
    let actorQuery = FIRESTORE.collection(`performances`);
    if(Object.keys(selectedPerson).length !== 0) actorQuery = actorQuery.where('actors', 'array-contains', selectedPerson)
    if(Object.keys(selectedCity).length !== 0) actorQuery = actorQuery.where('city', '==', selectedCity)
    if(Object.keys(selectedTheater).length !== 0) actorQuery = actorQuery.where('theater', '==', selectedTheater)
    if(Object.keys(selectedPerson).length === 0 && Object.keys(selectedGroup).length !== 0) actorQuery = actorQuery.where('groups', 'array-contains', selectedGroup)
    if(selectedStartDate && !isNaN(selectedStartDate)) actorQuery = actorQuery.where('timePerformed', '>=', selectedStartDate);
    if(selectedEndDate && !isNaN(selectedEndDate)) actorQuery = actorQuery.where('timePerformed', '<', selectedEndDate);
    const actorRes = await actorQuery.get();

    let directorQuery = FIRESTORE.collection(`performances`);
    if(Object.keys(selectedPerson).length !== 0) directorQuery = directorQuery.where('directors', 'array-contains', selectedPerson)
    if(Object.keys(selectedCity).length !== 0) directorQuery = directorQuery.where('city', '==', selectedCity)
    if(Object.keys(selectedTheater).length !== 0) directorQuery = directorQuery.where('theater', '==', selectedTheater)
    if(Object.keys(selectedPerson).length === 0 && Object.keys(selectedGroup).length !== 0) directorQuery = directorQuery.where('groups', 'array-contains', selectedGroup)
    if(selectedStartDate && !isNaN(selectedStartDate)) directorQuery = directorQuery.where('timePerformed', '>=', selectedStartDate);
    
    if(selectedEndDate && !isNaN(selectedEndDate)) directorQuery = directorQuery.where('timePerformed', '<', selectedEndDate);
    const directorRes = await directorQuery.get();


    let writerQuery = FIRESTORE.collection(`performances`);
    if(Object.keys(selectedPerson).length !== 0) writerQuery = writerQuery.where('writers', 'array-contains', selectedPerson)
    if(Object.keys(selectedCity).length !== 0) writerQuery = writerQuery.where('city', '==', selectedCity)
    if(Object.keys(selectedTheater).length !== 0) writerQuery = writerQuery.where('theater', '==', selectedTheater)
    if(Object.keys(selectedPerson).length === 0 && Object.keys(selectedGroup).length !== 0) writerQuery = writerQuery.where('groups', 'array-contains', selectedGroup)
    if(selectedStartDate && !isNaN(selectedStartDate)) writerQuery = writerQuery.where('timePerformed', '>=', selectedStartDate);
    
    if(selectedEndDate && !isNaN(selectedEndDate)) writerQuery = writerQuery.where('timePerformed', '<', selectedEndDate);
    const writerRes = await writerQuery.get();

    const actor = this._parseQueryArr(actorRes);
    const director = this._parseQueryArr(directorRes);
    const writer = this._parseQueryArr(writerRes);
    actor.sort((a,b) => a.timePerformed - b.timePerformed);
    director.sort((a,b) => a.timePerformed - b.timePerformed);
    writer.sort((a,b) => a.timePerformed - b.timePerformed);

    let performances = [].concat(...actor, ...director, ...writer);
    if(Object.keys(selectedPerson).length !== 0 && Object.keys(selectedGroup).length !== 0) {
      performances = performances.filter(performance => {     
        const names = performance.groups.map(group => group.name);
        return names.includes(this.selectedGroup.name);
      });
    }

    // filter duplicate id's
    performances = performances.filter((v,i,a)=>a.findIndex(t=>(t.id === v.id))===i)
    
    this.performances = performances;
  }

  _parseQueryArr(queryRes) {
      let data = {};
      const arr = [];
      queryRes.docs.forEach(doc => {
        data = doc.data()
        data.id = doc.id
        arr.push(data)
        data = {};
      })
      return arr;
  }

  async _getArrFromDb(colPath, orderByStr, limit = 2000) {
    let ref = FIRESTORE.collection(colPath);
    if(orderByStr) ref = ref.orderBy(orderByStr)
    if(limit) ref = ref.limit(limit)
    const query = await ref.get();

    const arr = this._parseQueryArr(query)
    this[colPath] = arr;
    this['filtered' + colPath.charAt(0).toUpperCase() + colPath.slice(1)] = arr;
  }

  _handleReviewClicked(evt) {
    const reviewId = evt.detail.value;
    this.reviewId = reviewId;
    this.reviewActive = true;
  }

  _handleBackClicked() {
    this.reviewId = '';
    this.reviewActive = false;
  }

  _handleGroupNameClicked(evt) {
    const name = evt.detail.value;
    this.selectedGroup = this.groups.filter(group => group.name === name)[0];

  }
  _handlePersonNameClicked(evt) {
    const name = evt.detail.value;
    this.selectedPerson = this.persons.filter(person => person.name === name)[0];

  }
  _handleCityNameClicked(evt) {
    const name = evt.detail.value;
    this.selectedCity = this.cities.filter(city => city.name === name)[0];

  }
  _handleTheaterNameClicked(evt) {
    const name = evt.detail.value;
    this.selectedPerson = this.theaters.filter(theater => theater.name === name)[0];
  }

  _handleStartDateChanged(evt) {
    const value = evt.detail.value;
    if(!value) return this.selectedStartDate = null;
    const date = new Date(value).getTime();
    this.selectedStartDate = date;
  }

  _handleEndDateChanged(evt) {
    const value = evt.detail.value;
    if(!value) return this.selectedEndDate = null;
    const date = new Date(value).getTime();
    this.selectedEndDate = date;
  }

  async _handleCustomTitleChanged(evt) {
    const value = evt.detail.value;
    const findTitlesFunc = FUNCTIONS.httpsCallable('findTitles');
    const res = await findTitlesFunc({string: value});
    this.titles = res.data;   
  }


}
window.customElements.define('prinssen-review-app', PrinssenReviewApp);
