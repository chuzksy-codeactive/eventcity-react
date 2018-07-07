import React from 'react';
import createHistory from 'history/createBrowserHistory';
/**
 * This component is used for pages not found
 *
 * @function 
 * @return {object} JSX DOM
 */
 const NotFound = () => {

   return (
     <div className="container not-found-wrapper">
       <div className="not-found">
         <span className="not-found-span">4</span>
         <span className="not-found-span">0</span>
         <span className="not-found-span">4</span>
       </div>
       <h1>ERROR!</h1>
       <h3>PAGE NOT FOUND</h3>
       <p>For some reason the page you requested could not be found on our server</p>
       <div>
         <a href="/">GO HOME 🏠</a>
       </div>
     </div>
   )
 }

 export default NotFound;