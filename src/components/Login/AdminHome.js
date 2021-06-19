import React, { Component } from 'react'
import Navigation from './Navigation'

class AdminHome extends Component {
    constructor(props) {
        super(props)

        this.state = {
            username: sessionStorage.getItem('username')
        }
    }
    render() {
        return (
            <div>
                <Navigation/>
                {/* <br />
                <br />
                <div className="spinner-grow text-primary" style={{ marginLeft: '200px' }}></div>
                <div className="spinner-grow text-success" style={{ marginLeft: '200px' }}></div>
                <div className="spinner-grow text-info" style={{ marginLeft: '200px' }}></div>
                <div className="spinner-grow text-warning" style={{ marginLeft: '200px' }}></div>
                <div className="spinner-grow text-danger" style={{ marginLeft: '200px' }}></div>

                <div className="spinner-grow text-dark" style={{ marginLeft: '200px' }}></div>
                <br /> */}
                
                <h2 style={{ textAlign: 'left', color: 'white', fontWeight: 'italic', width: '150px' }}>Hello {this.state.username}</h2>
                
               <div className="container">
               <marquee style={{color:"black"}}>Welcome to the Credit Card Payment System</marquee>
               
               <div className="row">
               <div className="logo">
              
                               <img src={"https://picjumbo.com/wp-content/uploads/purchasing-a-product-with-credit-card-on-e-commerce-online-store-1080x720.jpg"} width="600" height="450" />
                               </div>
                               </div>
                              
                      
                   </div>
            </div>



        )
    }
}

export default AdminHome
