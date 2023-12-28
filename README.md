
## To set up and run the university services project locally, follow these steps:
  ### 1. Clone the GitHub repository:
  Use the `git clone` command to clone the project repository from GitHub to your local machine

### 2. Open the project in Visual Studio Code:
Use the `code` command to open the project in Visual Studio Code.

### 3. Run `npm init` in the VS Code terminal:
This initializes a new Node.js project. It will prompt you to provide information about your project.
### 4.Install npm packages: 
Use `npm install` or `npm i` to install the project dependencies listed in the package.json file.
### 5.Create an .env file:
Create a new file named `.env` in the root folder of your project.
### 6. Set environment variables in .env file:
Open the `.env` file in a text editor and set the following variables

```http
NODE_ENV=development
PORT=5000
DATABASE_URL=mongodb+srv://<name>:<password>@cluster0.ph1akes.mongodb.net/mastery?retryWrites=true&w=majority
BCRYPT_SALT_ROUND=12

```
`DATABASE_URL=example(mongodb+srv://name:password@cluster0.ph1akes.mongodb.net/courses?retryWrites=true&w=majority)`
## Development Workflow

Run the project in development mode:

```bash
  npm run start:dev
```
Run in Production Mode:
```bash
  npm run start:prod
```
Build Project:
```bash
  npm run build
```



## API Reference

#### Domain: https://courseuniversity.vercel.app/

#### User Registration

```http
  POST /api/auth/register
```
```http
{
    "username": "john_doe",
    "email": "john@example.com",
    "password": "123456",
    "role": "user"
}
```



####  User Login

```http
  POST /api/auth/login
```
```http
{
    "username": "john_doe",
    "password": "123456"
}
```

#### Change Password

```http
  POST /api/auth/change-password

```
```http
 Authorization: <JWT_TOKEN>
```
```http
  {
    "currentPassword": "123456",
    "newPassword": "new123456"
}
```


#### Create a Course (Only Admin can do this)

```http
  POST /api/courses

```
```http
 Authorization: <ADMIN_JWT_TOKEN>
```
```http
 {
    "title": "Introduction to Web Development",
    "instructor": "John Smith",
    "categoryId": "12345abcde67890fghij",
    "price": 49.99,
    "tags": [
        {"name": "Programming", "isDeleted": false},
        {"name": "Web Development", "isDeleted": false}
    ],
    "startDate": "2023-02-01",
    "endDate": "2023-04-01",
    "language": "English",
    "provider": "Tech Academy",
    "durationInWeeks": 8,
    "details": {
        "level": "Beginner",
        "description": "A comprehensive introduction to web development."
    }
}

#### Get Paginated and Filtered Courses

```http
 GET /api/courses
```


#### Create a Category (Only Admin can do this)**

```http
POST /api/categories
```
```http
 Authorization: <ADMIN_JWT_TOKEN>
```
```http
{
    "name": "Web Development"
}
```

#### Get All Categories

```http
 GET /api/categories
```
```http
  _id:657f3dd66ad2876c200f34b6
```
####  Create a Review (Only the user can do this)

```http
POST /api/reviews
```
```http
 Authorization: <USER_JWT_TOKEN>
```
```http
{
    "courseId": "67890fghij54321abcde",
    "rating": 4,
    "review": "Great course, very informative and well-structured."
}
```
####  Update a Course (Only Admin can do this)

```http
PUT /api/courses/:courseId
```
```http
Authorization: <ADMIN_JWT_TOKEN>
```
```http
{
    "price": 59.99,
    "tags": [
        {"name": "Programming", "isDeleted": false},
        {"name": "Web Development", "isDeleted": false},
        {"name": "JavaScript", "isDeleted": false}
    ],
    "details": {
        "level": "Intermediate",
        "description": "A comprehensive course on web development with a focus on JavaScript."
    }
}
```
####  Get Course by ID with Reviews**

```http
GET /api/courses/:courseId/reviews
```

####  Get the Best Course Based on Average Review (Rating)*

```http
GET /api/course/best
```






## if need any information
contact me

- abulalajobayar@gmail.com
- jobayar.dev@gmail.com
