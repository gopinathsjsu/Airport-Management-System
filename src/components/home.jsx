import React from "react";
import './../style.css'
export default function Home(){
    // window.location.reload(false);
    return (
          
                <div className="wrapper">
                  <div className="page-header section-dark" style={{backgroundImage: 'url("https://www.collinsdictionary.com/images/full/airport_324754607.jpg")'}}>
                    <div className="filter" />
                    <div className="content-center">
                      <div className="container">
                        <div className="title-brand">
                          <h1 className="presentation-title">SJU Airport</h1>
                          <div className="fog-low">
                            <img src="http://demos.creative-tim.com/paper-kit-2/assets/img/fog-low.png" alt="" />
                          </div>
                          <div className="fog-low right">
                            <img src="http://demos.creative-tim.com/paper-kit-2/assets/img/fog-low.png" alt="" />
                          </div>
                        </div>
                        <h2 className="presentation-subtitle text-center">A One Step destination for all the destinations</h2>
                      </div>
                    </div>
                    <div className="moving-clouds" style={{backgroundImage: 'url("http://demos.creative-tim.com/paper-kit-2/assets/img/clouds.png")'}}>
                    </div>
                  </div>
                </div>
              );
            }