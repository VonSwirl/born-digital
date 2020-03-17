/* eslint-disable no-undef */
import firebase from 'firebase'
const config = {
   apiKey: process.env.REACT_APP_FIREB_APIKEY,
   authDomain: process.env.REACT_APP_FIREB_AUTH_DOMAIN,
   databaseURL: process.env.REACT_APP_FIREB_DB_URL,
   projectId: process.env.REACT_APP_FIREB_PROJECT_ID,
   storageBucket: process.env.REACT_APP_FIREB_BUCKET,
   messagingSenderId: process.env.REACT_APP_FIREB_MSG_ID,
   appId: process.env.REACT_APP_FIREB_APP_ID,
   measurementId: process.env.REACT_APP_FIREB_MEASUREMENTS_ID
}

firebase.initializeApp(config)
firebase.analytics()

export default firebase
