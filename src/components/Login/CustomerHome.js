import React, { Component } from 'react'
import Navigation from './Navigation'


 class CustomerHome extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
             username:sessionStorage.getItem('username'),
             cardNumber:sessionStorage.getItem('cardNumber')
        }
    }
    
   componentDidMount 
    render() {
        return (
            <div>
                <Navigation/>
               
                <h2 style={{textAlign:'left',color:'white',fontWeight:'bolder',width:'200px'}}>Hello {this.state.username}</h2>
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

export default CustomerHome
