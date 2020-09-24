import React, { Component } from 'react'
// import SearchComponent from './SearchComponent';
import { fetchResults, setLoading } from '../Actions';
import { connect } from 'react-redux';
import Spinner from './Layout/Spinner';

export class Results extends Component {
  componentDidMount(){
    this.props.fetchResults(); 
  }
  handleChange = () => {
    this.props.setLoading();
    this.props.fetchResults();
  }
  render() {
      const fetchResults = this.props.results;
      const meta = fetchResults.meta ? fetchResults.meta : [];
      const resultInformation = fetchResults.results ? fetchResults.results : [] ;
      const autocorrect = fetchResults.autocorrect;
      const filters = fetchResults.facets ? fetchResults.facets : [];
      const facetKey2 = filters.facetKey2 ? filters.facetKey2 : [];
      const facetKey1 = filters.facetKey1 ? filters.facetKey1 : [];
      const { loading } = this.props.loading;
      return (
          <React.Fragment>
            {loading ? <Spinner/> : 
            <div>
            <div className="container bootstrap snippet">
              <div className="row">
                <div className="col-lg-12">
                  <div className="ibox float-e-margins">
                    <div className="ibox-content">
                      <div className="filler-5">
                        {/* <h6>{num} of results found for: 
                        <span className="text-navy"> "{query}"</span></h6> */}
                        {/* <small>Request time ({time} seconds)</small> */}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="container-fluid1 bootstrap snippet">
                <div className="hr-line-dashed blue-line"></div>
            </div>
            <div className="container bootstrap snippet">
                <div className="col-lg-3 filterColumn">
                  <div className="trend-area">
                    <h2 className="trend-text">Refine Your Search</h2>
                    <div className="ibox float-e-margins">
                      <div className="ibox-content sub-cat">
                      <h2>facetKey1</h2>
                      {facetKey1.map((obj, id) => <ul>
                        <input type="checkbox" key ={id} onChange={this.handleChange}/>
                        <label className="filterLabel"> {obj.value} [{obj.count}]</label> </ul>)}
                      </div>
                    </div>
                    <div className="filler-10"></div>
                    <div className="ibox float-e-margins">
                      <div className="ibox-content sub-cat">
                      <h2>facetKey2</h2>
                      {facetKey2.map((obj, id) => <ul>
                        <input type="checkbox" key ={id} onChange={this.handleChange}/>
                        <label className="filterLabel">{obj.value} [{obj.count}]</label></ul>)}
                      </div>
                    </div>
                    </div>
                    </div>
                    <div className="tabsColumn">
                      <div className="ibox float-e-margins">
                        <section id="tabs">
                          <div className="container">
                            <div className="row">
                              <div className="tabSpanner">
                                {/* <nav>
                                  <div className="nav nav-tabs nav-fill" id="nav-tab" role="tablist">
                                    <a className="nav-item nav-link active" id="nav-home-tab" data-toggle="tab" href="#nav-home"
                                        role="tab" aria-controls="nav-home" aria-selected="true">Uploaded By</a>
                                    <a className="nav-item nav-link" id="nav-profile-tab" data-toggle="tab" href="#nav-profile"
                                        role="tab" aria-controls="nav-profile" aria-selected="false">Response Time</a>
                                    <a className="nav-item nav-link" id="nav-contact-tab" data-toggle="tab" href="#nav-contact"
                                        role="tab" aria-controls="nav-contact" aria-selected="false">View Count</a>
                                    <a className="nav-item nav-link" id="nav-about-tab" data-toggle="tab" href="#nav-about"
                                        role="tab" aria-controls="nav-about" aria-selected="false">Rating</a>
                                  </div>
                                </nav> */}
                                {autocorrect != null ? <h6 className="text-navy"> Did you mean "{autocorrect}"?</h6> : null}
                                 <h6>{meta.totalResults} of results found for: 
                                {autocorrect != null ? <span className="text-navy"> "{autocorrect}"</span> : <span className="text-navy"> "{fetchResults.searchquery}"</span>}
                                </h6>
                                <div className="hr-line-dashed"></div> {/*extra line added */}
                              </div>
                            </div>
                          </div>
                        </section>
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
                  </div>}
            </React.Fragment>
        )
    }
    }

    const mapStateToProps = state => ({
      results: state.results.results,
      loading: state.results.loading
    });
    
    export default connect(
      mapStateToProps,
      { fetchResults, setLoading }
    )(Results);