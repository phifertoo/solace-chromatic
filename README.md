1. Technology Stack

The project utilizes the following technologies:

Typescript: The choice to use TypeScript over JavaScript in the project was driven by the need for enhanced code quality, improved developer productivity, and better scalability.

Next.js: Chosen for its ease of setup, server-side rendering capabilities, and efficient development workflow. Next.js provides a solid foundation for building modern full stack applications with React on the front-end.

Firebase Authentication: Firebase is used for authentication, specifically Google authentication. This decision was made for its simplicity, scalability, and robust authentication features.

Chakra UI: Chakra UI is employed for building the user interface components. It offers a rich set of accessible and customizable UI components, enabling rapid development of aesthetically pleasing interfaces.

2. Folder Structure

The project follows a structured folder organization to maintain clarity and modularity:

components: Contains reusable React components used throughout the application.

pages: Houses backend endpoints with authentication.

providers: Includes context providers for managing application state and providing data to components via React Context API.

utils: Stores utility functions and helper modules used across the application. Also contains the Firebase authentication configuration.

models: Defines TypeScript interfaces and types used for data modeling and type safety.

3. Authentication Flow

Firebase Authentication with Google provider is integrated into the application for user authentication. Users are authenticated using their Google accounts, ensuring a seamless and familiar login experience.

4. State Management

State management is primarily handled using React Context API provided by Next.js. Context providers are utilized to manage global application state and provide data to components where needed. This approach simplifies state management and ensures data consistency throughout the application.

5. UI Design

Chakra UI is chosen for its robust and customizable UI components, allowing for the creation of visually appealing and responsive user interfaces. The design focuses on simplicity, accessibility, and intuitive user experience.

6. Testing Strategy

The project incorporates unit tests for critical components and functionality using Jest and React Testing Library. Tests are written to ensure the correctness and reliability of application features, enhancing overall code quality and maintainability.

### Prerequisites

Before running the app, you need to have the following installed:

- Node.js (v14.x or later)
- npm (v6.x or later) or yarn (v1.x or later)

### Installation

1. Clone the repository to your local machine:

2. Install dependencies

npm install

or

yarn

3. Create a new project in firebase

4. Register app to firebase

5. Enable Google Authentication for the project

6. Generate a new private key in the Project Settings => Service Accounts

7. Create a Firestore database

8. Create a .env in the root. Copy the following values into the .env file from firebase.

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
