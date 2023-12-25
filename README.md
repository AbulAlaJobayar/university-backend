
## To set up and run the course services project locally, follow these steps:
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
DATABASE_URL=your_mongodb_connection_string

```
`DATABASE_URL=example(mongodb+srv://name:password@cluster0.ph1akes.mongodb.net/courses?retryWrites=true&w=majority)`
### 6. create a dist folder  in root file:

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

#### Domain: https://coursereview-pi.vercel.app/

#### Create a Course

```http
  POST /api/course
```
```http
  {
    "title": "Sample Course",
    "instructor": "Jane Doe",
    "categoryId": "123456789012345678901234",
    "price": 49.99,
    "tags": [
        {
            "name": "Programming",
            "isDeleted": false
        },
        {
            "name": "Web Development",
            "isDeleted": false
        }
    ],
    "startDate": "2023-01-15",
    "endDate":"2023-03-14",
    "language": "English",
    "provider": "Tech Academy",
    "details": {
        "level": "Intermediate",
        "description": "Detailed description of the course"
    }
}
```



#### Get a Course

```http
  GET /api/courses
```
#### Create a Category

```http
  POST /api/categories
```
```http
  {
    "name": "Programming"
}
```


#### Get All Categories

```http
  GET /api/categories
```
#### Create a Review

```http
  POST /api/reviews
```
```http
{
    "courseId": "123456789012345678901234",
    "rating": 4,
    "review": "Great course!"
}
```

#### Update a Course (Partial Update with Dynamic Update)

```http
 PUT/api/courses/:courseId
```
```http
 {
    "title": "Updated Title",
    "instructor": "New Instructor",
    "categoryId": "123456789012345678901234",
    "price": 59.99,
    "tags": [
        {
            "name": "Programming",
            "isDeleted": true
        },
        {
            "name": "Web Development",
            "isDeleted": false
        }
    ],
    "startDate": "2023-02-01",
    "endDate":"2023-03-14",
    "language": "Spanish",
    "provider": "Code Masters",
    "durationInWeeks": 6,
    "details": {
        "level": "Intermediate",
        "description": "Detailed description of the course"
    }
}
```

#### Get Course by ID with Reviews

```http
 GET/api/courses/:courseId/reviews
```
#### Get the Best Course Based on Average Review (Rating)

```http
 GET/api/course/best
```



