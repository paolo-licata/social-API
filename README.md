# Social Media API

A **RESTful API** built with **Node.js, Express, and MongoDB** to support a basic social media platform. Users can **register, log in, create posts, comment, and like posts**.

## Features
- **User Authentication** (JWT-based)
- **Post Creation & Deletion**
- **Commenting on Posts**
- **Liking & Unliking Posts**
- **User Profile Management**
- **Protected Routes with JWT Middleware**

---

## Technologies Used
- **Node.js** + **Express.js** (Backend)
- **MongoDB** + **Mongoose** (Database)
- **JWT (JSON Web Tokens)** (Authentication)
- **Bcrypt** (Password Hashing)
- **CORS** (Cross-Origin Requests)
- **Dotenv** (Environment Variables)

---

## Installation & Setup

1. **Clone the repository**  
   ```bash
   git clone https://github.com/paolo-licata/social-API.git
   cd social-API
   ```

2. **Install dependencies**  
   ```bash
   npm install
   ```

3. **Set up environment variables**  
   ```bash
    PORT=5000
    MONGODB_URI=your-mongodb-uri
    JWT_SECRET=your-secret-key
   ```

4. **Run the server (Development Mode)**  
   ```bash
   npm run dev
   ```

5. **Run the server (Production Mode)**  
   ```bash
   npm start
   ```

## API Endpoints

### 🔑 Authentication
| Method | Endpoint            | Description         | Auth Required |
|--------|----------------------|---------------------|--------------|
| `POST` | `/api/auth/register` | Register a new user | ❌ |
| `POST` | `/api/auth/login`    | Login and get token | ❌ |

### 📝 Posts
| Method  | Endpoint         | Description                 | Auth Required |
|---------|-----------------|-----------------------------|--------------|
| `GET`   | `/api/posts`     | Get all posts               | ❌ |
| `POST`  | `/api/posts`     | Create a new post           | ✅ |
| `DELETE` | `/api/posts/:id` | Delete a post (owner only)  | ✅ |

### 💬 Comments
| Method  | Endpoint                                  | Description                  | Auth Required |
|---------|------------------------------------------|------------------------------|--------------|
| `POST`  | `/api/posts/:id/comments`               | Add a comment to a post      | ✅ |
| `DELETE` | `/api/posts/:id/comments/:commentId`    | Delete a comment (owner only) | ✅ |

### 👍 Likes
| Method  | Endpoint               | Description           | Auth Required |
|---------|------------------------|-----------------------|--------------|
| `POST`  | `/api/posts/:id/likes` | Like/unlike a post   | ✅ |


## Testing with Postman

1. Import API endpoints into Postman.
2. Use Bearer Token in the Authorization tab after login.
3. Send requests to test endpoints.

## Author

Paolo Licata