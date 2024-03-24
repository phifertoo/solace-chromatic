## Deployment

This project is deployed on Render using their basic service which means there are cold starts. If the page does not respond immediately, please wait for a few seconds. See: https://solace-9c8t.onrender.com/

## Github

The code is stored in a public repo: https://github.com/phifertoo/solace

## Technology Stack

Typescript: The choice to use TypeScript over JavaScript in the project was driven by the need for enhanced code quality, improved developer productivity, and better scalability.

Next.js: Chosen for its ease of setup, server-side rendering capabilities, and efficient development workflow. Next.js provides a solid foundation for building modern full stack applications with React on the front-end.

Firebase Authentication: Firebase is used for authentication, specifically Google authentication. This decision was made for its simplicity, scalability, and robust authentication features.

Chakra UI: Chakra UI is employed for building the user interface components. It offers a rich set of accessible and customizable UI components, enabling rapid development of aesthetically pleasing interfaces.

## Folder Structure

The project follows a structured folder organization to maintain clarity and modularity:

components: Contains reusable React components used throughout the application.

pages: Houses backend endpoints with authentication.

providers: Includes context providers for managing notes and auth state and providing data to components via React Context API.

utils: Stores utility functions and helper modules used across the application. Also contains the Firebase authentication configuration.

models: Defines TypeScript interfaces and types used for data modeling and type safety.

## Authentication Flow

Firebase Authentication with Google provider is integrated into the application for user authentication. Users are authenticated using their Google accounts and passing a jwt from the front end that is verified by firebase on the backend. When the user logs in we store the jwt in local storage and when the user logs out, the jwt is removed from local storage.

## State Management

State management is primarily handled using React Context API provided by Next.js. Context providers are utilized to manage notes and auth state and provide data to components where needed.

## UI Design

Chakra UI is chosen for its robust and customizable UI components, allowing for the creation of visually appealing and responsive user interfaces. The design focuses on simplicity, accessibility, and intuitive user experience.

## Testing Strategy

The project incorporates unit tests for critical components and functionality using Jest and React Testing Library. Tests are written to ensure the correctness and reliability of application features, enhancing overall code quality and maintainability.

## CRUD Management

When a user creates a new note, all notes are requested to ensure all data is in sync with the backend. Conversely, when a user requests to delete or update a note and the api request is successful, we update the data directly on the front end instead of calling for all the refreshed data. This makes the update appear faster to the user but may cause the data to be out of sync.

## Authentication

When a user signs in through the Google SSO, we check if there is a user with the given email address. If not, we create a new user. If so, we fetch all the notes for the given user.

## Form Validation

When creating a new note or editing a new note, we validate that the string length is between 20 and 300 characters.

## Protected Routes

For now, I have not implemented protected routes since there is only 1 page. If we were to scale this project, I would implement protected routes with redirects if the user is not authenticated.

## Running the application locally

Before running the app, you need to have the following installed:

- Node.js (v14.x or later)
- npm (v6.x or later) or yarn (v1.x or later)

1. Clone the repository to your local machine:

2. Install dependencies

npm install

or

yarn

3. Create a new project in firebase

4. Register app to firebase

5. Enable Google Authentication for the project. To run on production, you will need to authorize the domain for your deployment in firebase (Authentication => Settings => Authorized Domains)

6. Generate a new private key in the Project Settings => Service Accounts

7. Create a Firestore database

8. Create a .env in the root folder. Copy the following values into the .env file from firebase.

REACT_APP_FIREBASE_PRIVATE_KEY
REACT_APP_FIREBASE_CLIENT_EMAIL
REACT_APP_FIREBASE_PROJECT_ID
REACT_APP_FIREBASE_API_KEY
REACT_APP_FIREBASE_AUTH_DOMAIN
REACT_APP_FIREBASE_STORAGE_BUCKET
REACT_APP_FIREBASE_MESSAGING_SENDER_ID
REACT_APP_FIREBASE_APP_ID
REACT_APP_FIREBASE_MEASUREMENT_ID

9. Run server locally

yarn dev

10. To run test files, enable the babel.config.js file by removing the "disabled" from the file name. Then run yarn test <filename>
