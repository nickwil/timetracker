# Your Time Tracker
## The Problem
You want an open source time tracking solution to ensure you can keep your data safe and sound as well as change it as you please. You want an easy solution that's inituitive and works on screens of all sizes.

## Features
* Keep track of time for different tasks
* Tag tasks and (optionally) give them a description
* See how much work you have done and need to do at a glance
* Get a view of how much you need to work through a built-in calendar
* Easily edit your tags, each tag has a name and a color used to identify it
* No data leaves your device unless you want it to. Data is stored locally, but with easy import/export options
* Use the stats page to see how much time you've spent on different tags depending on the year, month, or week
* Even if you exit the page the timer will update once you get back

## How
Written with love in ReactJS with Mobx State Tree for state mangement.
Reach Router is used to provide an accessible routing experience
MomentJS is used to work with time, because it can get annoying sometimes.

## Using the web app

### Running
1. Run `npm start` in your terminal. This will start a local server running on your localhost:3000 port.
2. Use the files in the build folder to deploy to your own site.
Click here to see a demo.

### Developing
1. Run `npm install` to install all the dependanices
2. Use `npm start` or `npm run build` depending on whether you want to work with the development or production builds of the app.

### Testing
Use the `npm test` command to run the the app tests.

### Developing the web app
1. Run `npm install` to install all the dependanices
2. Use `npm start` or `npm run build` depending on whether you want to work with the development or production builds of the app.

### Testing the web app
Use the `npm test` command to see the the app tests.
Jest is used as the testing framework and react-testing-library for integration tests
Each page is tested in a different file and the state stores are united tested.

## License