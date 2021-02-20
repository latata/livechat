Homework assignment for LiveChat recruitment process

## How to run it locally?
Use `yarn` or `npm install` to install all dependencies.

`yarn start` or `npm start` to run the app\
`yarn test` to run unit/integration tests\

### IE 10
To run the app in IE10, set env variable `FAST_REFRESH=false` to disable `@pmmmwh/react-refresh-webpack-plugin` 
hot reloading package which is not prepared to working with older browser
`FAST_REFRESH=false yarn start`

## Project structure
* `public` - public files
* `src` - source
    * `Login` - React components, services, constants (most of the code lives here)
* `App.js` - main application component
* `index.js` - render's the app
* `serverMock.js` - mocks `fetch` and simulates the server


## Technologies
This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

I chose React framework to write this application because it's the technology which I recently worked
the most with and I think it's great for small projects like this one as well as for large applications.

As server implementation was not required I created `serverMock.js` file where browser's `fetch` 
function is mocked and the simulation of the server is handled there. This is the place where the credential 
are being checked.
