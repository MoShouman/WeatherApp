import React, {Component} from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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
      .then(response => {
        if(response.ok) {
          return response.json()
        }
        else{
          toast.error('Invalid Input')
          throw new Error('not ok, status: ' + response)
        }
      })
      .then(weather => this.setState({weather}))
      .catch(console.error);
    }
  }

  render(){
    return (
      <div className="App" style={{background:' url("imgs/weather.jpg")', backgroundSize:'cover', minHeight:'100vh'}}>
        <ToastContainer position="top-center" autoClose={2000}/>
        <div className='row mx-0 search-box'>
            <input className="form-control col-5 my-3 mx-auto" type="search" placeholder="Enter your city please." aria-label="Search" 
              onChange={(e)=>this.setState({cityName:e.target.value})}
              onKeyPress={(e) => this.searchHandler(e)}/>
        </div>
        {
          (typeof this.state.weather.main != 'undefined')?
          (
            <div className='text-center' style={{color:'white'}}>
              <div className='city-box'>
                <p className='font-weight-bold' style={{fontSize:'25px'}}>{`${this.state.weather.name}, ${this.state.weather.sys.country}`}</p>
                <p className='font-weight-bold text-uppercase' style={{fontSize:'25px'}}>{this.state.weather.weather[0].description}</p>

              </div>
              <div className='row mx-0 px-5'>
                <div className='p-5 mx-auto shadow' style={{backgroundColor:'rgba(1,1,1,0.5)'}}>
                  <p className='font-weight-bolder' style={{fontSize:'40px'}}>Temperature</p>  
                  <p className='font-weight-bolder' style={{fontSize:'40px'}}>{Math.round(this.state.weather.main.temp)}°C</p>  
                  <div className='row'>
                    <div className ='col-4'>
                      <p className='font-weight-bolder' style={{fontSize:'20px'}}>Min Temperature</p>  
                      <p className='font-weight-bolder' style={{fontSize:'20px'}}>{this.state.weather.main.temp_min}°C</p>  
                    </div>  
                    <div className ='col-4'>
                      <p className='font-weight-bolder' style={{fontSize:'20px'}}>Max Temperature</p>  
                      <p className='font-weight-bolder' style={{fontSize:'20px'}}>{this.state.weather.main.temp_max}°C</p>  
                    </div>  
                    <div className ='col-4'>
                      <p className='font-weight-bolder' style={{fontSize:'20px'}}>Feels like</p>  
                      <p className='font-weight-bolder' style={{fontSize:'20px'}}>{this.state.weather.main.feels_like}°C</p>  
                    </div>  
                    <div className ='col-4'>
                      <p className='font-weight-bolder' style={{fontSize:'20px'}}>Humidity</p>  
                      <p className='font-weight-bolder' style={{fontSize:'20px'}}>{Math.round(this.state.weather.main.humidity)}%</p>  
                    </div>  
                    <div className ='col-4'>
                      <p className='font-weight-bolder' style={{fontSize:'20px'}}>wind</p>  
                      <p className='font-weight-bolder' style={{fontSize:'20px'}}>{this.state.weather.wind.speed}km/h</p>  
                    </div>  
                  </div>
                </div>
              </div>
            </div>
          )
        :(<p className='font-weight-bold mt-3 text-center' style={{fontSize:'30px',color:'white'}}>Enter your city and press Enter.</p>
         )
        }
      </div>
    );
  }
}

export default App;
