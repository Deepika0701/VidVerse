
```markdown
# VidVerse

VidVerse is a backend application for a video-sharing platform that enables users to upload, share, and interact with video content. It incorporates secure user authentication, media storage on Cloudinary, and token-based access control.
## Features
- User authentication and authorization (JWT-based)
- Media file uploads (Images, Videos) using Cloudinary
- Watch history tracking
- Subscription system for channels
- Password management (Change/Update)
- Secure cookie handling (Access and Refresh tokens)
- User profile updates including avatars and cover images

## Technologies Used
- **Backend**: Node.js, Express.js
- **Database**: MongoDB, Mongoose
- **Authentication**: JWT (JSON Web Tokens)
- **File Storage**: Cloudinary, Multer
- **Environment Management**: dotenv
- **Other Libraries**: bcrypt, jsonwebtoken, cookie-parser, validator

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/Deepika0701/VidVerse.git
   ```

2. Navigate to the project directory:
   ```bash
   cd VidVerse
   ```

3. Install dependencies:
   ```bash
   npm install
   ```

4. Create a `.env` file in the root directory and provide the following environment variables:
   ```env
   MONGO_URI=your_mongo_database_uri
   JWT_SECRET=your_jwt_secret
   REFRESH_TOKEN_SECRET=your_refresh_token_secret
   CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
   CLOUDINARY_API_KEY=your_cloudinary_api_key
   CLOUDINARY_API_SECRET=your_cloudinary_api_secret
   ```

5. Start the development server:
   ```bash
   npm run dev
   ```

## Usage

- Register as a new user and log in using your credentials.
- Upload videos, update your profile, and manage your channel.
- Subscribe to other users' channels and keep track of your watch history.

## API Endpoints

### Authentication Endpoints
- **POST /api/auth/register**: Register a new user.
- **POST /api/auth/login**: Log in with email/username and password.
- **POST /api/auth/refresh**: Get a new access token using a refresh token.
- **POST /api/auth/logout**: Log out a user.

### User Management Endpoints
- **GET /api/users/me**: Get the current logged-in user's profile.
- **PATCH /api/users/me**: Update account details.
- **PATCH /api/users/avatar**: Update user avatar.
- **PATCH /api/users/cover-image**: Update cover image.

### Videos and Channels
- **GET /api/channels/:username**: Get user channel profile by username.
- **GET /api/users/watch-history**: Fetch user's video watch history.

### More routes and details can be found in the code.

## Authentication Flow

VidVerse uses JWT-based authentication, with tokens passed via cookies. The system uses access tokens for short-lived sessions and refresh tokens for renewing expired access tokens without requiring re-login.

### Access and Refresh Token Flow:
1. On login, an `accessToken` and `refreshToken` are generated and stored as HTTP-only cookies.
2. The `accessToken` is used for authenticating API requests.
3. If the `accessToken` expires, the `refreshToken` is used to obtain a new one by hitting the `/api/auth/refresh` endpoint.

## Contributing

1. Fork the repository.
2. Create your feature branch:
   ```bash
   git checkout -b feature/my-feature
   ```
3. Commit your changes:
   ```bash
   git commit -m 'Add some feature'
   ```
4. Push to the branch:
   ```bash
   git push origin feature/my-feature
   ```
5. Open a pull request.



