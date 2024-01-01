import React, { Component } from 'react';
import AppNav from './AppNav';
import { flash } from 'react-animations';
import  { StyleSheet, css } from 'aphrodite';

class Home extends Component {
    state = {  } 
    
    render() { 

        return (
            <div>
            
                <AppNav/>
                
                <h1 className={css(styles.test)}>Welcome to Expense Tracker!! Helps be mindful of your daily expenses</h1>
            
                
            </div>
        );
    }
}

const styles = StyleSheet.create({
    test: {
      animationName: flash,
      animationDuration: '3s',
      display: 'flex',
      justifySelf: 'center',
      margin: '200px 50px 100px',
      justifyContent: 'center'
    }
  })
 
export default Home;