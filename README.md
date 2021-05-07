## Introduction
This project is the backend of Vidly, an imaginary video rental app which is taught in Mosh Hamedani's full Nodejs course.

This is the implementation of Vidly in Node.js.

## Setup
Make sure to follow all these steps exactly as explained below. Do not miss any steps or you won't be able to run this application.

## Install MongoDB
To run this project, you need to install the latest version of MongoDB Community Edition first.

https://docs.mongodb.com/manual/installation/

Once you install MongoDB, make sure it's running.

## Install the Dependencies
Next, from the project folder, install the dependencies:

```bash
npm i
```
Populate the Database
```bash
node seed.js
```
Run the Tests
You're almost done! Run the tests to make sure everything is working:

```bash
npm test
```
All tests should pass.

## Environment Variables
If you look at config/default.json, you'll see a property called jwtPrivateKey. This key is used to encrypt JSON web tokens. So, for security reasons, it should not be checked into the source control. You should store this key as an environment variable.

On Mac:

```bash
export vidly_jwtPrivateKey=yourSecureKey
```

On Windows:

```bash
set vidly_jwtPrivateKey=yourSecureKey
```

## Start the Server
```bash
node index.js
```
This will launch the Node server on port 3000. If that port is busy, you can set a different point in config/default.json.

Open up your browser and head over to:

http://localhost:3000/api/genres

You should see the list of genres. That confirms that you have set up everything successfully.
