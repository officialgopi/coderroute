# CoderRoute Server

A comprehensive coding platform backend built with Node.js, TypeScript, Express.js, and PostgreSQL. This server provides a complete solution for competitive programming, code execution, collaborative coding, and AI-powered assistance.

## 🚀 Features

### Core Features

- **User Authentication & Authorization**

  - Google OAuth 2.0 integration
  - JWT-based session management
  - Role-based access control (Admin/User)
  - Secure password handling

- **Problem Management**

  - Create, read, update, delete problems
  - Multiple difficulty levels (Easy, Medium, Hard)
  - Tag-based categorization
  - Test case management
  - Editorial and hints support

- **Code Execution & Submission**

  - Real-time code execution using Judge0 API
  - Support for Python and JavaScript
  - Batch test case execution
  - Submission tracking and history
  - Performance metrics (time, memory)

- **AI-Powered Assistance**

  - Gemini AI integration for coding help
  - Problem-specific chat assistance
  - Code explanation and debugging support

- **Collaborative Features**

  - Real-time collaborative code editing using Liveblocks
  - Discussion forums for problems
  - Reply system for discussions

- **Problem Sheets & Organization**

  - Create custom problem sheets
  - Copy and share sheets
  - Track progress through sheets

- **User Analytics**
  - Dashboard statistics
  - Submission tracking
  - Problem-solving progress
  - Activity monitoring

## 🏗️ Architecture

### Tech Stack

- **Runtime**: Node.js
- **Language**: TypeScript
- **Framework**: Express.js
- **Database**: PostgreSQL with Prisma ORM
- **Authentication**: Passport.js with Google OAuth
- **Code Execution**: Judge0 API
- **AI Integration**: Google Gemini API
- **Real-time Collaboration**: Liveblocks
- **Validation**: Zod
- **Logging**: Winston

### Project Structure

```
src/
├── app/
│   ├── features/           # Feature modules
│   │   ├── auth/          # Authentication
│   │   ├── problem/       # Problem management
│   │   ├── submission/    # Code submissions
│   │   ├── code-execution/ # Code execution
│   │   ├── ai/            # AI assistance
│   │   ├── discussion/    # Discussion forums
│   │   ├── sheet/         # Problem sheets
│   │   └── collaborative-code-editor/ # Real-time collaboration
│   ├── libs/              # External service integrations
│   ├── middlewares/       # Express middlewares
│   ├── types/             # TypeScript type definitions
│   └── utils/             # Utility functions
├── db/                    # Database configuration
├── env/                   # Environment validation
└── logger/                # Logging configuration
```

## 🛠️ Installation & Setup

### Prerequisites

- Node.js (v18 or higher)
- PostgreSQL database
- Google Cloud Console project (for OAuth)
- Judge0 API access
- Google Gemini API key
- Liveblocks account

### Environment Variables

Create a `.env` file in the root directory with the following variables:

```env
# Application
NODE_ENV=development
PORT=3000
CLIENT_URL=http://localhost:3000

# Database
DATABASE_URL=postgresql://username:password@localhost:5432/coderroute

# Judge0 API
JUDGE0_BASE_URL=https://judge0-ce.p.rapidapi.com
JUDGE0_API_KEY=your_judge0_api_key

# Google OAuth
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
GOOGLE_REDIRECT_URI=http://localhost:3000/api/auth/google/callback

# JWT
JWT_SECRET=your_jwt_secret
JWT_EXPIRES_IN=15m
JWT_REFRESH_SECRET=your_refresh_secret
JWT_REFRESH_EXPIRES_IN=7d

# AI Integration
GEMINI_API_KEY=your_gemini_api_key

# Liveblocks
LIVEBLOCKS_SECRET_KEY=your_liveblocks_secret_key
```

### Installation Steps

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd server
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Set up the database**

   ```bash
   # Run database migrations
   npm run migrate

   # Generate Prisma client
   npm run generate
   ```

4. **Start the development server**
   ```bash
   npm run dev
   ```

## 📚 API Documentation

### Authentication Endpoints

#### `GET /api/auth/google`

- **Description**: Initiate Google OAuth login
- **Response**: Redirects to Google OAuth consent screen

#### `GET /api/auth/google/callback`

- **Description**: Google OAuth callback handler
- **Response**: Redirects to client with authentication cookies

#### `GET /api/auth/me`

- **Description**: Get current user profile
- **Headers**: `Cookie: access-token=<jwt_token>`
- **Response**: User profile data

#### `DELETE /api/auth/logout`

- **Description**: Logout user and clear session
- **Headers**: `Cookie: access-token=<jwt_token>`
- **Response**: Success message

#### `PUT /api/auth/`

- **Description**: Refresh access token
- **Body**: `{ "refreshToken": "string" }`
- **Response**: New access token

### Problem Management Endpoints

#### `POST /api/problem/`

- **Description**: Create a new problem (Admin only)
- **Headers**: `Cookie: access-token=<jwt_token>`
- **Body**: Problem data with title, description, difficulty, etc.
- **Response**: Created problem data

#### `GET /api/problem/`

- **Description**: Get all problems with pagination and filters
- **Headers**: `Cookie: access-token=<jwt_token>`
- **Query Parameters**:
  - `page`: Page number
  - `limit`: Items per page
  - `difficulty`: Filter by difficulty
  - `tags`: Filter by tags
- **Response**: Paginated list of problems

#### `GET /api/problem/get-problem/:slug`

- **Description**: Get problem details by slug
- **Headers**: `Cookie: access-token=<jwt_token>`
- **Response**: Complete problem data with test cases

#### `GET /api/problem/get-solved-problems`

- **Description**: Get problems solved by current user
- **Headers**: `Cookie: access-token=<jwt_token>`
- **Response**: List of solved problems

#### `DELETE /api/problem/:problemId`

- **Description**: Delete a problem (Admin only)
- **Headers**: `Cookie: access-token=<jwt_token>`
- **Response**: Success message

#### `PUT /api/problem/:problemId/metadata`

- **Description**: Update problem metadata (Admin only)
- **Headers**: `Cookie: access-token=<jwt_token>`
- **Body**: Updated problem data
- **Response**: Updated problem data

#### `POST /api/problem/:problemId/testcase`

- **Description**: Add test case to problem (Admin only)
- **Headers**: `Cookie: access-token=<jwt_token>`
- **Body**: Test case data (input, output, explanation)
- **Response**: Created test case data

### Code Execution Endpoints

#### `POST /api/code-execution/:problemId/run`

- **Description**: Execute code against test cases (run only)
- **Body**:
  ```json
  {
    "sourceCode": "string",
    "language": "PYTHON" | "JAVASCRIPT",
    "stdin": "string"
  }
  ```
- **Response**: Execution results with output and performance metrics

#### `POST /api/code-execution/:problemId/submit`

- **Description**: Submit code for evaluation
- **Headers**: `Cookie: access-token=<jwt_token>`
- **Body**:
  ```json
  {
    "sourceCode": "string",
    "language": "PYTHON" | "JAVASCRIPT"
  }
  ```
- **Response**: Submission results with test case results

### Submission Management Endpoints

#### `GET /api/submission/get-all-submissions`

- **Description**: Get all submissions by current user
- **Headers**: `Cookie: access-token=<jwt_token>`
- **Query Parameters**:
  - `page`: Page number
  - `limit`: Items per page
- **Response**: Paginated list of submissions

#### `GET /api/submission/get-submissions/:problemId`

- **Description**: Get submissions for a specific problem
- **Headers**: `Cookie: access-token=<jwt_token>`
- **Response**: List of submissions for the problem

#### `GET /api/submission/get-submissions-count/:problemId`

- **Description**: Get submission count for a problem
- **Headers**: `Cookie: access-token=<jwt_token>`
- **Response**: Submission statistics

### AI Assistance Endpoints

#### `POST /api/ai/chat`

- **Description**: Chat with AI assistant for coding help
- **Headers**: `Cookie: access-token=<jwt_token>`
- **Body**:
  ```json
  {
    "message": "string",
    "problemId": "string"
  }
  ```
- **Response**: AI response and chat history

#### `GET /api/ai/chat/:problemId`

- **Description**: Get chat history for a specific problem
- **Headers**: `Cookie: access-token=<jwt_token>`
- **Response**: Chat history with AI

### Discussion Endpoints

#### `POST /api/discussion/`

- **Description**: Create a new discussion
- **Headers**: `Cookie: access-token=<jwt_token>`
- **Body**:
  ```json
  {
    "content": "string",
    "problemId": "string",
    "parentId": "string" // Optional for replies
  }
  ```
- **Response**: Created discussion data

#### `GET /api/discussion/`

- **Description**: Get all discussions
- **Headers**: `Cookie: access-token=<jwt_token>`
- **Query Parameters**:
  - `problemId`: Filter by problem
  - `page`: Page number
  - `limit`: Items per page
- **Response**: Paginated list of discussions

#### `GET /api/discussion/:discussionId`

- **Description**: Get discussion details
- **Headers**: `Cookie: access-token=<jwt_token>`
- **Response**: Discussion data with replies

#### `GET /api/discussion/:discussionId/replies`

- **Description**: Get replies for a discussion
- **Headers**: `Cookie: access-token=<jwt_token>`
- **Response**: List of replies

#### `PUT /api/discussion/:discussionId`

- **Description**: Update discussion
- **Headers**: `Cookie: access-token=<jwt_token>`
- **Body**: Updated discussion content
- **Response**: Updated discussion data

#### `DELETE /api/discussion/:discussionId`

- **Description**: Delete discussion
- **Headers**: `Cookie: access-token=<jwt_token>`
- **Response**: Success message

### Problem Sheets Endpoints

#### `POST /api/sheet/`

- **Description**: Create a new problem sheet
- **Headers**: `Cookie: access-token=<jwt_token>`
- **Body**:
  ```json
  {
    "name": "string",
    "description": "string",
    "isPublic": boolean
  }
  ```
- **Response**: Created sheet data

#### `GET /api/sheet/`

- **Description**: Get all sheets for current user
- **Headers**: `Cookie: access-token=<jwt_token>`
- **Response**: List of sheets

#### `GET /api/sheet/:sheetId`

- **Description**: Get sheet details with problems
- **Headers**: `Cookie: access-token=<jwt_token>`
- **Response**: Sheet data with included problems

#### `PUT /api/sheet/:sheetId`

- **Description**: Update sheet
- **Headers**: `Cookie: access-token=<jwt_token>`
- **Body**: Updated sheet data
- **Response**: Updated sheet data

#### `POST /api/sheet/copy`

- **Description**: Copy an existing sheet
- **Headers**: `Cookie: access-token=<jwt_token>`
- **Body**:
  ```json
  {
    "sheetId": "string",
    "name": "string"
  }
  ```
- **Response**: Copied sheet data

#### `POST /api/sheet/:sheetId/add-problem`

- **Description**: Add problem to sheet
- **Headers**: `Cookie: access-token=<jwt_token>`
- **Body**:
  ```json
  {
    "problemId": "string"
  }
  ```
- **Response**: Success message

#### `DELETE /api/sheet/:sheetId/delete-problem`

- **Description**: Remove problem from sheet
- **Headers**: `Cookie: access-token=<jwt_token>`
- **Body**:
  ```json
  {
    "problemId": "string"
  }
  ```
- **Response**: Success message

#### `DELETE /api/sheet/:sheetId`

- **Description**: Delete sheet
- **Headers**: `Cookie: access-token=<jwt_token>`
- **Response**: Success message

### Collaborative Coding Endpoints

#### `POST /api/liveblocks/create-session`

- **Description**: Create a collaborative coding session
- **Headers**: `Cookie: access-token=<jwt_token>`
- **Response**: Liveblocks session token and room information

## 🗄️ Database Schema

### Core Models

#### User

- `id`: Unique identifier
- `name`: User's full name
- `username`: Unique username
- `email`: Unique email address
- `avatar`: Profile picture URL
- `role`: USER or ADMIN
- `authProvider`: GOOGLE, GITHUB, or LOCAL
- `password`: Hashed password (for local auth)
- `isEmailVerified`: Email verification status
- `createdAt`, `updatedAt`: Timestamps

#### Problem

- `id`: Unique identifier
- `slug`: URL-friendly identifier
- `title`: Problem title
- `description`: Problem description
- `difficulty`: EASY, MEDIUM, or HARD
- `tags`: Array of problem tags
- `constraints`: Problem constraints
- `hints`: Array of hints
- `editorial`: Editorial content
- `createdByUserId`: Creator's user ID
- `createdAt`, `updatedAt`: Timestamps

#### TestCases

- `id`: Auto-incrementing ID
- `problemId`: Associated problem ID
- `input`: Test input
- `output`: Expected output
- `explanation`: Test case explanation

#### Submission

- `id`: Unique identifier
- `userId`: Submitter's user ID
- `problemId`: Problem ID
- `sourceCode`: Submitted code
- `language`: PYTHON or JAVASCRIPT
- `status`: Submission status
- `memory`, `time`: Performance metrics
- `createdAt`, `updatedAt`: Timestamps

#### Sheet

- `id`: Unique identifier
- `name`: Sheet name
- `description`: Sheet description
- `userId`: Creator's user ID
- `isPublic`: Public visibility
- `copyFromSheetId`: Original sheet ID (if copied)

#### Discussion

- `id`: Unique identifier
- `content`: Discussion content
- `userId`: Author's user ID
- `problemId`: Associated problem ID
- `parentId`: Parent discussion ID (for replies)

## 🔧 Development

### Scripts

- `npm run dev`: Start development server with hot reload
- `npm run build`: Build for production
- `npm start`: Start production server
- `npm run migrate`: Run database migrations
- `npm run studio`: Open Prisma Studio
- `npm run generate`: Generate Prisma client

### Code Style

- TypeScript with strict mode enabled
- ESLint for code linting
- Prettier for code formatting
- Zod for runtime validation
- Winston for logging

### Error Handling

- Global error handler middleware
- Standardized API error responses
- Async error handling wrapper
- Comprehensive logging

## 🚀 Deployment

### Docker Support

The project includes Docker configuration for containerized deployment.

### Production Considerations

- Set `NODE_ENV=production`
- Use production database
- Configure proper CORS settings
- Set up SSL/TLS certificates
- Configure rate limiting
- Set up monitoring and logging

## 🔒 Security Features

- JWT-based authentication
- Password hashing (bcrypt)
- Rate limiting on sensitive endpoints
- CORS configuration
- Input validation with Zod
- SQL injection prevention with Prisma
- XSS protection
- Secure cookie handling

## 📊 Monitoring & Logging

- Winston logger with multiple transports
- Request/response logging
- Error tracking
- Performance monitoring
- Database query logging

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the ISC License.

## 🆘 Support

For support and questions, please open an issue in the repository or contact the development team.

---

**Built with ❤️ for the coding community**
