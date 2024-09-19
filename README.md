# React Authentication App with AWS Cognito

## Table of Contents
- [React Authentication App with AWS Cognito](#react-authentication-app-with-aws-cognito)
  - [Table of Contents](#table-of-contents)
  - [Project Overview](#project-overview)
  - [Purpose](#purpose)
  - [Authentication Flow](#authentication-flow)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [AWS Cognito Setup](#aws-cognito-setup)
  - [Configuration](#configuration)
  - [Running the App](#running-the-app)
  - [Code Structure](#code-structure)
    - [Key Components](#key-components)
  - [Code Explanation](#code-explanation)
    - [App.js](#appjs)
    - [Authentication Components](#authentication-components)
    - [Protected Components](#protected-components)
    - [AWS Amplify Integration](#aws-amplify-integration)
  - [Styling](#styling)
  - [Additional Notes](#additional-notes)
  - [Troubleshooting](#troubleshooting)
  - [About me](#about-me)


## Project Overview
This project is a React-based web application that demonstrates user authentication using [Amplify Auth backend js library](https://docs.amplify.aws/react/build-a-backend/auth/set-up-auth/). It includes features such as user sign-up, sign-in, and profile management. The app showcases a modern, responsive design using Tailwind CSS and implements protected routes to secure user-specific content.

## Purpose
The primary purpose of this application is to serve as a boilerplate or learning resource for developers who want to implement AWS Cognito authentication in a React application. It demonstrates best practices for handling user authentication flows, managing protected routes, and structuring a React application with multiple components.

## Authentication Flow
1. **Sign Up**: Users can create a new account by providing a username, email, and password.
2. **Confirmation**: After sign-up, users receive a confirmation code via email.
3. **Sign In**: Registered users can sign in using their username and password.
4. **Protected Routes**: Certain routes (like Home and Profile) are protected and only accessible to authenticated users.
5. **Sign Out**: Users can sign out, which clears their session and redirects them to the landing page.

## Prerequisites
- Node.js (v14 or later)
- npm (v6 or later)
- An AWS account with Cognito set up

## Installation
1. Clone the repository:
   ```
   git clone https://github.com/labeveryday-cloud-projects/amazon-cognito-react-app.git
   ```
2. Navigate to the project directory:
   ```
   cd amazon-cognito-react-app
   ```
3. Install dependencies:
   ```
   npm install
   ```

## AWS Cognito Setup
1. Sign in to the AWS Management Console and navigate to Cognito.
2. Create a new User Pool.
3. Configure the user pool settings (e.g., required attributes, password policies).
4. Create an app client for your React application.
5. Note down the User Pool ID and App Client ID.

## Configuration
1. Create a file named `aws-exports.js` in the `src` directory.
2. Add your Cognito configuration:
   ```javascript
   const awsconfig = {
     region: 'your-region',
     userPoolId: 'your-user-pool-id',
     userPoolWebClientId: 'your-app-client-id'
   };

   export default awsconfig;
   ```

## Running the App
1. Start the development server:
   ```
   npm start
   ```
2. Open your browser and navigate to `http://localhost:3000`.

## Code Structure
- `src/`
  - `components/`: Contains React components for different pages.
  - `App.js`: Main component that sets up routing.
  - `App.css`: Global styles.
  - `index.js`: Entry point of the React app.
  - `aws-exports.js`: AWS Cognito configuration.

### Key Components
- `LandingPage.js`: The initial page users see.
- `SignUp.js`: Handles user registration.
- `Login.js`: Manages user sign-in.
- `Home.js`: A protected route showing user-specific content.
- `Profile.js`: Displays and manages user profile information.

## Code Explanation

### App.js
This is the main component that sets up the routing for the application. It uses React Router to define routes and implements a `ProtectedRoute` component to secure certain pages.

### Authentication Components
- `SignUp.js`: Manages the sign-up process, including sending and verifying confirmation codes.
- `Login.js`: Handles user authentication and redirects to the home page upon successful login.

### Protected Components
- `Home.js` and `Profile.js`: These components are only accessible to authenticated users. They demonstrate how to fetch and display user-specific data.

### AWS Amplify Integration
The app uses AWS Amplify libraries to interact with Cognito. Key functions like `signUp`, `signIn`, and `getCurrentUser` are used to manage the authentication flow.

## Styling
The application uses Tailwind CSS for styling, providing a responsive and modern UI. Tailwind classes are used directly in the JSX for rapid styling.

## Additional Notes
- This application is for demonstration purposes and may need additional security measures for production use.
- Always follow AWS best practices for managing Cognito user pools and app clients.
- Consider implementing additional features like password reset and email verification for a more robust authentication system.

## Troubleshooting
If you encounter issues:
1. Ensure all dependencies are correctly installed.
2. Verify that your AWS Cognito configuration is correct.
3. Check the browser console for any error messages.

## About me

My passions lie in building cool stuff and impacting people's lives. I'm fortunate to weave all these elements together in my role as a Developer Advocate. On GitHub, I share my ongoing learning journey and the projects I'm building. Don't hesitate to reach out for a friendly hello or to ask any questions!

My hangouts:
- [LinkedIn](https://www.linkedin.com/in/duanlightfoot/)
- [YouTube](https://www.youtube.com/@LabEveryday)
  