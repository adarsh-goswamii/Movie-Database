import React from 'react';
import ReactDOM from 'react-dom';
import Logo from './Components/Logo';
import Header from './Components/Header';

const Index= ()=> {
    return (
        <>
            <Header/>
        </>
    );
}

ReactDOM.render(<Index/>, document.querySelector('#root'));