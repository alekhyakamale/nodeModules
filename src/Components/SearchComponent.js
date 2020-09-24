import React, { Component } from 'react';
import {searchForm,fetchSuggestions,fetchResults, postSearchQuery, setLoading} from '../Actions';
import { connect } from 'react-redux';
import history from './Layout/history';

class SearchComponent extends Component {
    state = {showList: false}
    handleChange = e => {
        this.props.searchForm(e.target.value);
        if(e.target.value.length>=3)
          {this.setState(()=> {
            return {showList: true}});    
            this.props.fetchSuggestions();}
        else
            {this.setState(() => {return {showList: false}});}
          }

    onSubmit = e => {
        e.preventDefault();
        this.props.setLoading();
        this.props.postSearchQuery(this.props.query);
    };

    handleClick = () => {
        history.push('/results')
        this.props.fetchResults();
        }
   
    render() {
        const suggestions = this.props.suggestions.results ? this.props.suggestions.results : [];
        return (
            <div className="form-group">
                <form className="input-group">
                  <input className="form-control" required="required" minLength="3" placeholder="Search..." 
                        onChange={this.handleChange}></input>
                    <span className="input-group-btn">
                    <button className=" btn btn-primary" type="submit">Search</button>
                    </span>
                    </form>
                    <span className="suggestions-list">{this.state.showList && suggestions.map((obj, id) => 
                    <ul class="suggestions-list-content" onClick={this.handleClick} key={id}>
                    {obj.suggestion}</ul>
                    )}</span>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    query: state.results.query,
    suggestions: state.results.suggestions,
    loading: state.results.loading
  });
  
  export default connect(
    mapStateToProps,
    { searchForm, fetchSuggestions, fetchResults, postSearchQuery, setLoading }
  )(SearchComponent);
