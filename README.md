WhatsApp Clone - Full Stack Application

This project is a WhatsApp clone built using modern web technologies, including Clerk for authentication, Radix UI for components, and Convex for serverless backend logic. The application features dark and light themes, real-time messaging, video calling, and group video chat. Webhooks are utilized to ensure real-time updates and notifications.
Table of Contents

    -Features
    -Technologies Used
    -Installation
    -Usage
    -Contributing
    -License

Features

    -User Registration and Login: Secure and seamless user authentication provided by Clerk.
    -Real-Time Messaging: Instant messaging between users with real-time updates.
    -Video Calling: One-on-one video calls with ZEGOCLOUD's prebuilt UI Kit.
    -Group Video Chat: Engage in group video calls with multiple participants.
    -Dark and Light Themes: Users can switch between dark and light modes for a personalized experience.
    -Profile Management: Users can manage their profile, including updating their avatar and status.
    -Webhooks Integration: Real-time updates for messages, calls, and user presence using webhooks.
    -Responsive Design: Optimized for both web and mobile devices to ensure a seamless experience across platforms.

Technologies Used

    -Next.js: Used for server-side rendering and building the frontend.
    -React.js: Utilized for building the user interface.
    -Clerk: Provides authentication and user management.
    -Convex: Serverless backend logic and data management.
    -ZEGOCLOUD: Used for video calling and group video chat.
    -Radix UI: Provides accessible and customizable UI components.
    -Tailwind CSS: Utility-first CSS framework for rapid UI development.
    -DaisyUI: Component library built on top of Tailwind CSS.
    -Webhooks: Used for real-time notifications and updates.

Installation
Prerequisites

    Node.js installed on your machine.
    MongoDB or another database if required for specific features.

Convex Installation

    npx run convex

Frontend Installation

    npm install
    npm run dev // npm start

Environment Variables

Create a .env.local file in the root directory and add the following variables:

CONVEX_DEPLOYMENT=dev:friendly-lion-123 # team: your-team, project: your-project
NEXT_PUBLIC_CONVEX_URL=https://friendly-lion-123.convex.cloud
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_your_publishable_key
CLERK_SECRET_KEY=sk_test_your_secret_key
ZEGO_APP_ID=123456789
ZEGO_SERVER_SECRET=your_zego_server_secret


Running the Application
Start the Development Server

    npm run dev

Accessing the Application

After starting the server, open your web browser and go to:

    http://localhost:3000

Usage

    -Sign Up or Log In: Create a new account or log in with an existing one using Clerk.
    -Start Messaging: Send messages to your contacts with real-time updates.
    -Send Photos and Videos: Share photos and videos directly in your chats.
    -Group Chat: Create and participate in group chats with multiple users.
    -Make Video Calls: Initiate one-on-one or group video calls.
    -Toggle Themes: Switch between dark and light themes via the user settings.
    -Ban Users in Groups: Manage group chats by banning users who violate group rules.

Some Screenshots From UI =>

Main Page (LIGHT) =>

![wplight](https://github.com/user-attachments/assets/c806a5dc-f9ff-40d2-9f57-15d6b175d7a2)

Main Page (DARK) =>

![wpdark](https://github.com/user-attachments/assets/f45664d9-477e-4817-a116-abe6dd6dff19)

Group Videocall =>

![videocall](https://github.com/user-attachments/assets/6b1fb577-5dd8-4a32-85cc-8ffe8604e35a)

Profile Page With Clerk =>

![profilewithclerk](https://github.com/user-attachments/assets/f1d196f2-c596-4e14-8664-6dc670186bb6)

See Group Members =>

![groupmembers](https://github.com/user-attachments/assets/3f4c04e2-790e-4c25-bdc2-e716b0680a9d)

Emoji Bar => 

![emojiuse](https://github.com/user-attachments/assets/2a2412e1-cdf2-4e59-b975-bbae839887a3)

Placeholder Link =>

![banner](https://github.com/user-attachments/assets/0f88cefb-8c6a-4088-9e29-78ffb9090a86)

Contributing:

If you'd like to contribute, please open an issue or submit a pull request.

License:

This project is licensed under the MIT License. For more information, see the LICENSE file.
