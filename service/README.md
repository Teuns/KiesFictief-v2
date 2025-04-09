### Documentation

The KiesFictief service is accessible through an API. In this small document the API endpoints will be covered. Suggestions are welcome and can be discussed at any time by creating an issue. It uses [Express](https://www.npmjs.com/package/Express) as the web framework. The structure of the database tables will be added later.

- [Introduction](#introduction)
	 - [The stack](#the-stack-that-is-been-used)
- [Database](#database)
- [Authentication](#authentication)
- ... and more soon.

#### Introduction
*KiesFictief* is a political quiz game that is heavily inspired by StemWijzer. It is founded in 2023.

#### The stack
(TODO: a list of libraries and other software that the program takes advantage of)

#### Database
The RDBMS is MySQL. It is possible to change the RDBMS to another one if needed. This should be argued in an issue.

The [Sequelize](https://www.npmjs.com/package/sequelize) ORM is used to use the database.

#### Authentication
Thanks to Express middlewares, it also has a self-made authentication. This is called getAuth and authenticates the request if the `token` value matches the `secret` value.

**API endpoints**

This is a stub. Please suggest changes.

#### Retrieving published statements
This is a stub. Please suggest changes.

#### Pages to add and manage fictional parties managed by the user which has their own answers on the published statements and with the ability to suggest a new statement to the admins
The idea is that the client should also have a finctional party-system where they can manage their own fictional parties and choose their answers on the published statements. They should also have the ability to suggest a new statement.

***
*Work In Progress*
