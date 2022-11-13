# Interview Scheduler

## Setup

Install dependencies with `npm install`.

dependencies:
- "axios": "^1.1.3",
- "classnames": "^2.2.6",
- "normalize.css": "^8.0.1",
- "react": "^16.9.0",
- "react-dom": "^16.9.0",
- "react-scripts": "3.4.4"

devDependencies:
- "@babel/core": "^7.4.3",
- "@storybook/addon-actions": "^5.0.10",
- "@storybook/addon-backgrounds": "^5.0.10",
- "@storybook/addon-links": "^5.0.10",
- "@storybook/addons": "^5.0.10",
- "@storybook/react": "^5.0.10",
- "@testing-library/jest-dom": "^4.0.0",
- "@testing-library/react": "^8.0.7",
- "@testing-library/react-hooks": "^8.0.1",
- "babel-loader": "^8.0.5",
- "prop-types": "^15.8.1",
- "react-test-renderer": "^16.14.0",
- "sass": "^1.53.0"

## Set up scheduler-api

```
visit https://github.com/lighthouse-labs/scheduler-api and follow instructions to be able to run database server for main app.
```

## Running Webpack Development Server

```sh
npm start
```

## Running Jest Test Framework

```sh
npm test
```

## Running Storybook Visual Testbed

```sh
npm run storybook
```

## App Screenshots

**Main page**

!["App main page"](https://github.com/RayuY/Scheduler/blob/master/doc/img/app_main_page.PNG)

**Cancel appointment warning**

!["Warning before cancelling appointment"](https://github.com/RayuY/Scheduler/blob/master/doc/img/delete_warning.PNG)

**Booking interface**

!["Booking appointment"](https://github.com/RayuY/Scheduler/blob/master/doc/img/book_appointment.PNG)

**Booking interface(with inputs)**

!["Book with inputs"](https://github.com/RayuY/Scheduler/blob/master/doc/img/booking_with_inputs.PNG)

**A successfully booked appointment**

!["Upon successful booking"](https://github.com/RayuY/Scheduler/blob/master/doc/img/appointment_booked.PNG)