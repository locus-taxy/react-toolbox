import React from 'react';
import Autocomplete from '../../components/autocomplete';

class AutocompleteTest extends React.Component {
  state = {
    simple: 'Spain',
    simpleShowAll: 'England',
    multiple: ['ES-es', 'TH-th'],
    countriesArray: ['Spain', 'England', 'USA', 'Thailand', 'Tongo', 'Slovenia'],
    countriesObject: {'ES-es': 'Spain', 'TH-th': 'Thailand', 'EN-gb': 'England',
      'EN-en': 'United States of America', 'EN-nz': 'New Zealand'}
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
          label="Pick multiple elements..."
          onChange={this.handleMultipleChange}
          source={this.state.countriesObject}
          suggestionMatch="anywhere"
          value={this.state.multiple}
          template = {this.template}
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
          showSuggestionsWhenValueIsSet
          source={this.state.countriesObject}
          value={this.state.simpleShowAll}
          template = {this.template}
          allowCreate = {true}
        />
      </section>
    );
  }
}

export default AutocompleteTest;
