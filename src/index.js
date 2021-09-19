import React from 'react';
import ReactDOM from 'react-dom';
import Logo from './Components/Logo';
import Header from './Components/Header';
import Footer from './Components/Footer';

const Index= ()=> {
    return (
        <>
            <Header/>
            <Footer/>
        </>
    );
}

ReactDOM.render(<Index/>, document.querySelector('#root'));