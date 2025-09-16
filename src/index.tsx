import React from 'react'
import  ReactDOM  from 'react-dom/client'


const rootElement = document.getElementById('root');

if(rootElement){
    const root = ReactDOM.createRoot(rootElement);
    root.render(
        <h1 className='text-blue-600'>Welcome to the task manages app !!</h1>
    )
}else{
    console.error("Root element with ID 'root' not found in the docs")
}