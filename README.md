<h1>Chatify App</h1>
Chatify is a real-time chat application that allows users to create, join, and leave chat rooms. It provides a seamless chatting experience with features like public rooms and private messaging. The frontend of the app is built with React, and the backend is powered by Firebase.

<h2>Getting Started</h2>
To set up the Chatify app, follow these steps:

<ol>
<li>Firebase Account Setup: Start by creating an account on <a href="https://firebase.google.com/">Firebase</a> if you don't already have one.</li>

<li>Enable Firestore and Firebase Authentication: In your Firebase project settings, make sure to enable Firestore for the database functionality and Firebase Authentication for user authentication.</li>

<li>Configure Firestore Rules: To ensure secure data access, add the necessary security rules to your Firestore database. You can find the required rules in the firestore.rules.txt file included in the project.</li>

<li>Clone the Project: Clone the Chatify project repository to your local machine using the following command in your terminal:
<code>git clone https://github.com/banjobyster/chatify.git</code>
</li>

<li>Install Dependencies: Navigate to the project directory in the terminal and install the required dependencies using npm: 
<code>npm install</code>
</li>

<li>Configure Environment Variables: Create a .env file in the project root directory and set the required environment variables as shown in env.example.txt file.
Obtain the values for these variables from your Firebase project's settings under the "Web Apps" section.</li>

<li>Start the App: Start the Chatify app by running the following command in the terminal:
<code>npm start</code>
This will launch the app in your default web browser.
</li>
</ol>

<h2>App Usage</h2>
Upon starting the app, you will see the main application screen. If you are not authenticated, the sign-in page will be displayed. Authenticate using your Firebase credentials to access the chat functionality.

Once authenticated, the RoomPage component will be displayed. You can join the public room using the room ID "PUBLIC". To have private conversations or create your own chat room, create a new room and share the generated room ID with other users. This way, you can have direct messages with specific individuals.

Enjoy chatting with others in real-time using the Chatify app!

Please note that this is a basic readme file to get you started with the Chatify app. Feel free to customize and enhance it based on your specific project requirements.