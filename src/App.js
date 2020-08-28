import React, {Component} from 'react';

class App extends Component{
  state = {
    weather:{},
    cityName:'Cairo',
    KEY:'723d4ca43fffc01ab337547010bdbcf0',
    BASE:'https://api.openweathermap.org/data/2.5/weather'
  }

  //after pressing enter,fetch data from API.
  searchHandler = event =>{
    if(event.key === 'Enter'){
      fetch(`${this.state.BASE}?q=${this.state.cityName}&units=metric&appid=${this.state.KEY}`)
      .then((res)=>res.json())
      .then((result)=>this.setState({weather:result}))
    }
  }

  render(){
    return (
      <div className="App" style={{background:' url("imgs/weather.jpg")', backgroundSize:'cover', minHeight:'100vh'}}>
        <div className='row mx-0 search-box'>
            <input className="form-control col-5 my-3 mx-auto" type="search" placeholder="Search" aria-label="Search" 
              onChange={(e)=>this.setState({cityName:e.target.value})}
              onKeyPress={(e) => this.searchHandler(e)}/>
        </div>
        {
          (typeof this.state.weather.main != 'undefined')?
          (
            <div className='text-center' style={{color:'white'}}>
              <div className='city-box'>
                <p className='font-weight-bold' style={{fontSize:'25px'}}>{`${this.state.weather.name}, ${this.state.weather.sys.country}`}</p>

              </div>
              <div className='row mx-0 px-5'>
                <div className='p-5 mx-auto shadow' style={{backgroundColor:'rgba(1,1,1,0.5)'}}>
                  <p className='font-weight-bolder' style={{fontSize:'40px'}}>{Math.round(this.state.weather.main.temp)}°C</p>  
                </div>
              </div>
              <p className='font-weight-bold mt-3' style={{fontSize:'30px'}}>{this.state.weather.weather[0].main}</p>
            </div>
          )
        :(<p className='font-weight-bold mt-3 text-center' style={{fontSize:'30px',color:'white'}}>Enter City Please.</p>
         )
        }
      </div>
    );
  }
}

export default App;
