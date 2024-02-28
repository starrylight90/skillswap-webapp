# SkillSwap Network

SkillSwap Network is a community-driven platform that eliminates barriers to learning by providing an affordable and convenient way for individuals to exchange valuable skills locally. The platform fosters a collaborative environment for skill development by connecting people with complementary talents.

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
- [Usage](#usage)
- [How It Works](#how-it-works)
  - [Profile Swipe](#profile-swipe)
  - [Matching](#matching)
  - [Chat](#chat)
- [Contributing](#contributing)
- [License](#license)

## Overview

SkillSwap Network provides a Famous App-like interface for users to discover and connect with others sharing complementary skills. Users can swipe left and right on profiles, and if both users swipe right, they create a match and can initiate a chat to further discuss skill exchange or collaboration.

## Features

- **Profile Swipe:** Users can swipe through profiles, indicating their interest by swiping right.
- **Matching:** If two users both swipe right on each other's profiles, they create a match.
- **Chat:** Matched users can engage in a chat to discuss skills, availability, and collaboration.

## Getting Started

### Prerequisites

- Node.js installed on your machine
- MongoDB database

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/skillswap-webapp.git
   ```

2. Change into the project directory:

   ```bash
   cd frontend
   ```

3. Install dependencies:

   ```bash
   npm install
   ```
4. Start the application:

   ```bash
   npm start
   ```
5. Change into backend directory:

    ```bash
   cd backend
   ```

6. Install dependencies:

   ```bash
   npm install
   ```
7. Start the application:

   ```bash
   nodemon server.js
   ```
8. Configure environment variables for backend:

   Create a `.env` file in the root directory and set the following variables:

   ```env
   MONGODB_URI=mongodb://localhost:27017/skillswap
   ```


   The application will be running at `http://localhost:3000` by default.

## Usage

1. Create a user account on SkillSwap Network.
2. Set up your profile, including your skills and preferences.
3. Start swiping left or right on profiles to indicate your interest.
4. If you and another user both swipe right, you create a match.
5. Initiate a chat with your matches to discuss skill exchange or collaboration.

## How It Works

### Profile Swipe

- Users can view profiles of others in their locality or worldwide.
- Swipe left to skip a profile, or swipe right to express interest.

### Matching

- If two users both swipe right on each other's profiles, they create a match.
- Matched users can proceed to the chat feature.

### Chat

- Engage in a chat with matched users to discuss skills, availability, and collaboration.
- Decide on meeting in person or continuing the collaboration online.

## Contributing

We welcome contributions! If you have ideas for new features, improvements, or bug fixes, feel free to open an issue or submit a pull request.

## License

This project is licensed under the [MIT License](LICENSE).