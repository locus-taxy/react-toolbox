import React from 'react';
import Autocomplete from '../../components/autocomplete';

class AutocompleteTest extends React.Component {
  state = {
    simple: 'Spain',
    simpleShowAll: 'England',
    multiple: ['ES-es', 'TH-th'],
    countriesArray: ['Spain', 'England', 'USA', 'Thailand', 'Tongo', 'Slovenia'],
    countriesObject: {'ES-es': 'Spain', 'TH-th': 'Thailand', 'EN-gb': 'England',
      'EN-en': 'United States of America', 'EN-nz': 'New Zealand'},
    countriesObject2: {'ES-es': {'displayName':'palash', 'alias': 'pk'}, 'ES-ea': {'displayName':'padsafsdflash', 'alias': 'fg'}, 'ES-en': {'displayName':'e564334', 'alias': 'gfdga'}, 'ES-s': {'displayName':'4213421', 'alias': '45'}, }

  };

  handleMultipleChange = (value) => {
    this.setState({
      multiple: value,
      countriesObject: {
        ...this.state.countriesObject,
        ...!this.state.countriesObject[value[0]] ? {[value[0]]: value[0]} : {}
      }
    });
  };

  handleSimpleChange = (value) => {
    this.setState({simple: value});
  };

  handleSimpleShowAllChange = (value) => {
    this.setState({simpleShowAll: value});
  };
  template(key, value){
    return <div> { key + ', ' + value} </div>
  }
  render () {
    return (
      <section>
        <h5>Autocomplete</h5>
        <p>You can have a multiple or simple autocomplete.</p>

        <Autocomplete
          allowCreate
          keepFocusOnChange
          label="Pick multiple elements..."
          onFocus={this.handleFocus}
          onChange={this.handleMultipleArrayChange}
          source={this.state.countriesObject}
          suggestionMatch="anywhere"
          value={this.state.multipleArray}
        />

        <Autocomplete
          allowCreate
          label="Pick multiple elements with object value..."
          onChange={this.handleMultipleObjectChange}
          showSelectedWhenNotInSource
          source={this.state.countriesObject}
          suggestionMatch="anywhere"
<<<<<<< HEAD
          value={this.state.multiple}
          template = {this.template}
=======
          value={this.state.multipleObject}
>>>>>>> master
        />

        <Autocomplete
          hint="Elements up to you..."
          label="Choose a country"
          multiple={false}
          onChange={this.handleSimpleChange}
          source={this.state.countriesArray}
          value={this.state.simple}
        />

        <Autocomplete
          hint="Elements up to you..."
          label="Choose a country (showing all suggestions)"
          multiple={false}
          onChange={this.handleSimpleShowAllChange}
          template = {this.template}
          source={this.state.countriesObject2}
          value={'pk'}
          showSuggestionsWhenValueIsSet={true}
          multiple={false}
          valueDisplayField="displayName"

          />
        />
      </section>
    );
  }
}

export default AutocompleteTest;
