### Documentation

The KiesFictief service is accessible through an API. In this small document the API endpoints will be covered. Suggestions are welcome and can be discussed at any time by creating an issue. It uses [Express](https://www.npmjs.com/package/Express) as the web framework. The structure of the database tables will be added later.

- [Introduction](#introduction)
	 - [The stack that is been used](#the-stack-that-is-been-used)
- [Database](#database)
- [Authentication](#authentication)
	- [RBAC](#rbac)
- [Retrieving user-made content](#content)
- [Liking posts](#vote)
- ... and more soon.

#### Introduction
*KiesFictief* is a quiz application that is heavily inspired by StemWijzer. It is founded in april 2021, in the coronacrisis.

#### The stack that is been used
(TODO: a list of libraries and other software that the program takes advantage of)

#### Database
The RDBMS is MySQL. It is possible to change the RDBMS to another one if needed. This should be argued in an issue.

#### Authentication
The authentication uses the [passport](https://www.npmjs.com/package/passport) library which provides a safe way to authenticate the requests. It also uses [jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken) to accomplish a token-based authentication system that can be used by a front-end. Passwords are being hashed using the [bcrypt](https://www.npmjs.com/package/bcrypt) library.

The [Sequelize](https://www.npmjs.com/package/sequelize) ORM is used to use the database.

#### RBAC
Thanks to Express middlewares, it also has a self-made RBAC. This is called getAuth and retrieves the permissions of the role that the user has. It then performs soms checks to decide if the user is allowed to perform that action.

**API endpoints**

A POST request can be made to `/api/user/login`  If succeed, the server should return a JSON-encoded success message that contains the status, token and the object (JSON-encoded) of the user. The token is being signed by **jsonwebtoken**.

A POST request can be made to `/api/user/register` to sign up. If succeed, it should return a JSON-encoded message that contains the status and token of the user.

A POST request can  be made to `/api/user/info` to retrieve the authenticated user information. This does probably not have a real purpose as the user object has already been retrieved after logging in.

| route | body | return message |
|--|--|--|
| /api/user/login | name, password | status, token and user object (Serialized) |
| /api/user/register | name, email, password | status, token and user object (Serialized) |
| /api/user/info | token | user object (Serialized) |

#### Retrieving published statements
This is a stub. Please suggest changes.

#### Pages to add and manage fictional parties managed by the user which has their own answers on the published statements and with the ability to suggest a new statement to the admins
The idea is that the client should also have a finctional party-system where they can manage their own fictional parties and choose their answers on the published statements. They should also have the ability to suggest a new statement.

***
*Work In Progress*