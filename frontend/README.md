# <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Kanit&display=swap">

# Material UI icons: https://mui.com/material-ui/material-icons/?query=cart

# background-color: rgb(35, 32, 204);

# What is React Router?

    -> A library for managing and navigating between different components and passinng data b/w the components in    react but without re-loading the entire page or refreshing the entire page. 

# What does it do?
 
    -> As we know the react is SPA(Single Page Application), how to make SPA to Multipage web application then we need to use react-router-dom(Which is react router library).
    
    -> Provides a way for handling routing and rendering different components for the different urls and it also maintain a clean and organized structure of the react application.  


# How to Setup React Router:

    -> need to install react router dom
        npm i react-router-dom
    
    -> Just importing these React Router Components

       import {
          BrowserRouter as Router,
          Routes,
          Route,
          Link,
          NavLink,
          Navigate, // For Redirects
          Outlet, // For nested routes
       } from 'react-router-dom'

    1. BrowserRouter as Router: 
         - This is a comp that provides the routing functionality for react application.
         - It listens the browser URL and render the componnet accordingly(based on the route you defined).

    2. Routes:
        - It's a container that holds multiple <Route> elements.
    3. Route:
        - To define What component should be rendered based the different URL.
    4. Link:
        - A special component that acts a placeholder for nested components.
    5. NavLink:
        - Pretty similar to Link Comp, but it provides you some active classes so that you put your CSS around it.
    6. Navigate: For redirection on any component directly, so can use NAvigate component.
    7. Outlet: used for nesting of the routes
    
# API docs:
   https://fakestoreapi.com/docs
1. https://fakestoreapi.com/products/categories