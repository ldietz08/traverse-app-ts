# TraVerse Hiking App &#x1F3D4;

TraVerse is a community-based hiking app that allows hiking enthusiasts to stay up to date on their favorite trails.

**LIVE DEMO: https://hiking-app-370707.web.app/**

## Features:

**Browse Hikes:** View a list of popular hiking destinations and favorite individual hikes for future reference.

**Virtual Bulletin Board:** User can stay up to date on their favorite hikes through our virtual bulletin board. Learn about any important developments to avoid surprises and ensure a safe and enjoyable hiking experience. Additionally, users can share their own experiences and tips with fellow hikers.

**Full CRUD Functionality:** The app supports full CRUD functionality, so users can create, read, update, and delete data in real-time.

## How it's Made:

**Tech used:**

- React.js
- Sass
- Firebase
- Vite

## Dependencies:

To build and run the app, you'll need the following dependencies:

- Node.js (at least version 10)
- Firebase (use the Firebase CLI to set up the app and access the Firestore database)

## How to build/deploy:

1. Set up a new Firebase project and enable Firestore. You can do this using the Firebase CLI or the Firebase Console.

2. Clone the project repository and navigate to the project root directory.

3. Install the required dependencies using npm install.

4. Set up environment variables for your Firebase project credentials. You can do this by creating a .env file in the root directory and adding the following variables:

```
   FIREBASE_API_KEY=YOUR_API_KEY
   FIREBASE_AUTH_DOMAIN=YOUR_AUTH_DOMAIN
   FIREBASE_DATABASE_URL=YOUR_DATABASE_URL
   FIREBASE_PROJECT_ID=YOUR_PROJECT_ID
   FIREBASE_STORAGE_BUCKET=YOUR_STORAGE_BUCKET
   FIREBASE_MESSAGING_SENDER_ID=YOUR_MESSAGING_SENDER_ID
   FIREBASE_APP_ID=YOUR_APP_ID
```

5. Run the app locally using npm start.

6. To deploy the app, run npm run build to create a production build, and then use the Firebase CLI to deploy the app to your Firebase hosting.
