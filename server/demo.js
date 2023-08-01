const express = require('express');
const app = express();

// Middleware function example
const myMiddleware = (req, res, next) => {
  // Perform middleware logic and generate dynamic route
  const dynamicRoute = true ? 'route1' : 'route2';

  // Set the dynamic route as a property on the request object
  // req.nextRoute = dynamicRoute;
  // console.log(req.nextRoute);
  // Call the next middleware or route handler
  next();
};

// Register the middleware
app.use(myMiddleware);



// Define the first dynamic route handler
app.get('/route1', (req, res, next) => {
  console.log("route 1");
  res.json({
    "message": "route 1"
  });

  // if (req.nextRoute === '/route1') {
  //   res.send('First Dynamic Route');
  // } else {
  //   next();
  // }
});

// Define the second dynamic route handler
app.get('/route2', (req, res, next) => {
  console.log("route 2");
  res.json({
    "message": "route 1"
  });
  // if (req.nextRoute === '/route2') {
  //   res.send('Second Dynamic Route');
  // } else {
  //   next();
  // }
});

// Define the default route handler

// Start the server
app.listen(4000, () => {
  console.log('Server listening on port 3000');
});
