import React, { Component } from "react";
import TronWeb from "tronweb";
import carlogo from './images/car.png';
import Utils from "../../utils";
import Car from "../Car";
import TronLinkInfo from "../TronLinkInfo";
import "./App.scss";

window.onscroll = function() {scrollFunction()};

function scrollFunction() {
  if (document.body.scrollTop > 100 || document.documentElement.scrollTop > 100) {
    document.getElementById("title-contract").style.display = "none";
	document.getElementById("img-car").style.display = "none";
	document.getElementById("img-car1").style.display = "none";
	document.getElementById("Troninfo").style.display = "none";
	document.getElementById("hedear").style.height= "60px";
  } else{
	document.getElementById("title-contract").style.display = "inline"; 
    document.getElementById("img-car").style.display = "inline";
    document.getElementById("img-car1").style.display = "inline";	
	document.getElementById("Troninfo").style.display = "inline";
	document.getElementById("hedear").style.height= "273px";
  }
}
	
const FOUNDATION_ADDRESS = "TQSJbSVvfVAmAbA2FCBmke8Bf7o21dFEak";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      tronWeb: {
        installed: false,
        loggedIn: false
      }
    };
  }

  async componentDidMount() {
    await new Promise(resolve => {
      const tronWebState = {
        installed: !!window.tronWeb,
        loggedIn: window.tronWeb && window.tronWeb.ready
      };

      if (tronWebState.installed) {
        this.setState({
          tronWeb: tronWebState
        });

        return resolve();
      }

      let tries = 0;

      const timer = setInterval(() => {
        if (tries >= 10) {
          const TRONGRID_API = "https://api.trongrid.io";

          window.tronWeb = new TronWeb(
            TRONGRID_API,
            TRONGRID_API,
            TRONGRID_API
          );

          this.setState({
            tronWeb: {
              installed: false,
              loggedIn: false
            }
          });
          clearInterval(timer);
          return resolve();
        }

        tronWebState.installed = !!window.tronWeb;
        tronWebState.loggedIn = window.tronWeb && window.tronWeb.ready;

        if (!tronWebState.installed) {
          return tries++;
        }

        this.setState({
          tronWeb: tronWebState
        });

        resolve();
      }, 100);
    });

    if (!this.state.tronWeb.loggedIn) {

      window.tronWeb.on("addressChange", () => {
        if (this.state.tronWeb.loggedIn) {
          return;
        }

        this.setState({
          tronWeb: {
            installed: true,
            loggedIn: true
          }
        });
      });
    }

    Utils.setTronWeb(window.tronWeb);
  }

  render() {

    if (!this.state.tronWeb.loggedIn) return <installed />;
    return (
      <div >
        <header className="header" id="hedear"> 
          <img id="img-car" className="car-left" src={ carlogo }  />	
          <img id="img-car1" className="car-right" src={ carlogo }  />			  
          <div className="information" id="title-contract">
            Car sales contract
          </div>
		  <div className="Troninfo1" id="Troninfo">
            < TronLinkInfo />
		  </div>
          <ul>
            <li><a href="#0">Search</a></li>
            <li><a href="#1">User</a></li>
            <li><a href="#1">Car</a></li>
            <li><a href="#2">Contract</a></li>
			<li><a href="#3">Pay</a></li>
            <li><a href="#4">Disengage </a></li>
            <li><a href="#5">Agreement</a></li>
            <li><a href="#6">Notary office</a></li>
          </ul>
		  
        </header>

        <div >
          <Car />
        </div>
		
      </div>
    );
  }
  
}
export default App;

