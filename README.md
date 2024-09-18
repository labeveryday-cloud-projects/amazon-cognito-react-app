# amazon-cognito-react-app

This project is a React application that demonstrates user authentication using AWS Cognito. It provides a simple yet secure way to handle user sign-up, sign-in, and profile management.

## Table of Contents
- [amazon-cognito-react-app](#amazon-cognito-react-app)
  - [Table of Contents](#table-of-contents)
  - [Project Structure](#project-structure)
  - [Authentication Flow](#authentication-flow)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [AWS Cognito Setup](#aws-cognito-setup)
  - [Configuration](#configuration)
  - [Running the Application](#running-the-application)
  - [Additional Notes](#additional-notes)

## Project Structure

- `src/App.js`: Main component that sets up routing and Amplify configuration.
- `src/components/`: Directory containing React components for different pages.
- `src/aws-exports.js`: Configuration file for AWS Amplify.
- `src/index.js`: Entry point of the React application.
- `tailwind.config.js`: Configuration file for Tailwind CSS.
- `postcss.config.js`: Configuration file for PostCSS (used by Tailwind).
- `package.json`: Defines project dependencies and scripts.

## Authentication Flow

This application uses a custom authentication flow with AWS Cognito. Here's how it works:

1. User clicks "Sign In" on the landing page.
2. They are routed to a custom login page (component) within the React application where they enter their credentials.
3. The app sends these credentials directly to Cognito for verification using the Amplify library.
4. If successful, Cognito returns tokens (ID, Access, and Refresh tokens).
5. The app stores these tokens and uses them for subsequent authenticated requests.
6. Protected routes (Home and Profile) check for the presence of valid tokens.
7. When signing out, the tokens are cleared, and the user is redirected to the landing page.

This flow provides a secure way to handle user authentication while keeping the implementation entirely within your React application. It allows for greater control over the user interface and experience compared to using Cognito's hosted UI.

## Prerequisites

Before you begin, ensure you have the following installed:
- Node.js (v14 or later)
- npm (usually comes with Node.js)
- An AWS account

## Installation

1. Clone the repository:
   ```
   git clone https://github.com/your-username/cognito-auth-app.git
   ```

2. Navigate to the project directory:
   ```
   cd cognito-auth-app
   ```

3. Install the dependencies:
   ```
   npm install
   ```

## AWS Cognito Setup

1. Sign in to the AWS Management Console and navigate to the Cognito service.

2. Click "Manage User Pools" and then "Create a user pool".

3. Give your user pool a name (e.g., "cognito-auth-app-pool").

4. Configure the sign-in experience:
   - Choose "Email" as the username attribute.
   - Allow users to sign in with their email.

5. Configure security requirements as needed (password policies, MFA, etc.).

6. Set up the app client:
   - Create an app client with the name "cognito-auth-app-client".
   - Uncheck "Generate client secret" as we're using a JavaScript SDK.

7. Review and create the user pool.

8. Note down the "User Pool ID" and "App client ID" from the user pool details page.

## Configuration

1. Rename `src/aws-exports_update_me.js` to `src/aws-exports.js`.

2. Update `src/aws-exports.js` with your Cognito details:

   ```javascript
   const awsmobile = {
     "aws_project_region": "YOUR_REGION",
     "aws_cognito_region": "YOUR_REGION",
     "aws_user_pools_id": "YOUR_USER_POOL_ID",
     "aws_user_pools_web_client_id": "YOUR_APP_CLIENT_ID",
     "oauth": {
       "domain": "your-domain.auth.YOUR_REGION.amazoncognito.com",
       "scope": ["email", "openid", "profile"],
       "redirectSignIn": "http://localhost:3000/home",
       "redirectSignOut": "http://localhost:3000/",
       "responseType": "code"
     },
     "federationTarget": "COGNITO_USER_POOLS"
   };

   export default awsmobile;
   ```

   Replace the placeholders with your actual Cognito details.

## Running the Application

1. Start the development server:
   ```
   npm start
   ```

2. Open your browser and navigate to `http://localhost:3000`.

## Additional Notes

- Ensure you're using HTTPS in production to secure the transmission of credentials.
- Regularly update your dependencies to maintain security.
- For a production application, consider implementing additional security measures like MFA.

If you encounter any issues or have questions, please open an issue in this repository.