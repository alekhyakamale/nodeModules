import React, { Component } from 'react';
import SearchComponent from './SearchComponent';

export default class Home extends Component {
  render() {
    return (
        <div>
          <div className="container bootstrap snippet">
            <div className="row">
              <div className="col-lg-12">
                <div className="ibox float-e-margins">
                  <div className="ibox-content">
                    <div className="filler"></div>
                      <SearchComponent/>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          <div className="filler-120"></div>
        </div>
    );
  }
}
