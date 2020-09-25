import React, { Component } from 'react';
import { searchForm,fetchSuggestions,fetchResults, setLoading } from '../Actions';
import { connect } from 'react-redux';
import Spinner from './Layout/Spinner';

export class Home extends Component {

  state = {showList: false, showResultsPage: false, error: false, autocorrectDiv: true}

  handleChange = e => {
      this.props.searchForm(e.target.value);
      if(e.target.value.length>=3)
        {this.setState(()=> {
          return {showList: true, error: false}});    
          this.props.fetchSuggestions();}
      else
          {this.setState(() => {return {showList: false}});}
    }

  handleClick = () => {
      if( this.props.query.length<3 )
        {this.setState(() => {return {error: true}});}
      else
      { 
        this.setState(() => {return {error: false}});
        this.props.setLoading();
        this.props.fetchResults();
        {this.setState(() => {return {showList: false, showResultsPage: true}});}}
    }
  
  autocorrectClick = () => {
    this.props.setLoading();
    this.props.fetchResults();
    this.setState(() => {return {autocorrectDiv: false}})
  }

  getSelectedChbox() {
    const filterArray = [];
    var chk = document.querySelectorAll('input[type=checkbox]:checked')
      for(var i=0; i< chk.length; i++)
        filterArray.push(chk[i].parentNode.innerText)   
    console.log(filterArray);
}
  
     render() {
      const fetchResults = this.props.results ? this.props.results : [];
      const meta = fetchResults.meta ? fetchResults.meta : [];
      const suggestions = this.props.suggestions.results ? this.props.suggestions.results : [];
      const resultInformation = fetchResults.results ? fetchResults.results : [] ;
      const autocorrect = fetchResults.autocorrect;
      const filters = fetchResults.facets ? fetchResults.facets : [];
      const filterNames = Object.keys(filters) ? Object.keys(filters) : [];
      return (
        <div>
          <div className="container bootstrap snippet">
            <div className="row">
              <div className="col-lg-12">
                <div className="ibox float-e-margins">
                  <div className="ibox-content">
                    <div className="filler"></div>
                    <div className="form-group">
                      <form className="input-group">
                        <input className="form-control" required="required" minLength="3" placeholder="Search..." 
                          id="input" onChange={this.handleChange}></input>
                        <span className="input-group-btn">
                          <button id="send" className=" btn btn-primary" onClick={this.handleClick} type="button">Search</button>
                        </span>
                      </form>
                      {this.state.error && <p id="error" className="error-message">
                        *Please enter a minimum of 3 characters</p>}
                      <span className="suggestions-list">{this.state.showList && suggestions.map((obj, id) => 
                      <ul class="suggestions-list-content" onClick={this.handleClick} key={id}>
                      {obj.suggestion}</ul>
                      )}</span> 
                    </div>                    
                  </div>
                </div>
              </div>
            </div>
          </div>
          <React.Fragment>
            {this.props.loading ? <Spinner/> : this.state.showResultsPage ?
               (resultInformation.length !== 0 ? 
                  <div>
                    <div className="container-fluid1 bootstrap snippet">
                      <div className="hr-line-dashed blue-line"></div>
                    </div>
                    <div className="container bootstrap snippet">
                      <div className="col-lg-3 filterColumn">
                        <div className="trend-area">
                          <h2 className="trend-text">Refine Your Search</h2>
                          <div className="ibox float-e-margins">
                            <div className="ibox-content sub-cat">
                              {/*testing filter mapping*/}
                              {filterNames.map(filterName => <div><h2>{filterName}</h2>
                                {console.log(filterName.value)}
                                {Object.values(filterNames).map((obj, id) => <ul>
                                <input type="checkbox" name="filter" key={id}/>
                                <label className="filterLabel"> {obj} [{obj}]</label> </ul>)}
                                </div>)}</div>
                          </div>
                          <div className="filler-10"></div>
                          {/*testing filter array*/}
                          <div className="ibox float-e-margins">
                            <div className="ibox-content sub-cat">
                              <h2>{filterNames[1]}</h2>
                              {facetKey2.map((obj, id) => <ul>
                              <label className="filterLabel" for="filter-ch" name="label">
                              <input type="checkbox" name="filter" key ={id} id="filter-ch" onChange={this.getSelectedChbox}/> {obj.value} [{obj.count}] </label></ul>)}
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="tabsColumn">
                        <div className="ibox float-e-margins">
                            {autocorrect != null ? this.state.autocorrectDiv ? <h6 className="text-navy"> Did you mean
                            <span onClick={this.autocorrectClick} className="autocorrect"> "{autocorrect.replace(/<\/?[^>]+>/gi, '')}"</span> ?
                            </h6> : null : null}
                            <h6>{meta.totalResults} of results found for: 
                              <span className="text-navy"> "{fetchResults.searchquery}"</span>
                            </h6>
                            <div className="hr-line-dashed"></div>
                            {resultInformation.map((result, id) =>
                            <div className="search-result"> 
                              <h3><a href="#" key={id}>{result.title}</a></h3>
                              <a href="#" className="search-result-link" key={id}>{result.url}</a>
                              <p key ={id}>{result.content}</p>
                            </div>)}
                          <div className="hr-line-dashed"></div>
                        </div>
                      </div>
                    </div>
                  </div> : <div className="no-results">No results found for "{this.props.query}"</div>)
                : null}
              </React.Fragment>
            </div>
    );
  }
}

const mapStateToProps = state => ({
    query: state.results.query,
    suggestions: state.results.suggestions,
    results: state.results.results,
    loading: state.results.loading,
    filters: state.results.filters
});

export default connect(
  mapStateToProps,
  { searchForm, fetchSuggestions, fetchResults, setLoading })(Home);