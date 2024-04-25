//sample express server
const express = require('express');
const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient();
const app = express();
const PORT = process.env.PORT || 3001;

/*
This is a sample function for the sample table in schema.prisma
This sends an HTTP GET request to the root URL, this is simply '/'

The following code: async (req,res) can be broken down as follows
req: HTTP request object
res: HTTP response object
async basically means its event driven, allows you to use await for 
asynchronous operations, basically its just waiting to receive a database 
query as we do not know when these requests will be made.

const = users = await prisma.user.findMany();
This line calls the findMany() method on the user model, and
await pauses the execution of the async function until findMany()
resolves the database query.
The findMany() method just return all the contents of the table.
SELECT *
FROM Users

res.json(users); Just sends the users data as a JSON response
to the requesting client.

app.get('/', async (req,res) => {
    const users = await prisma.user.findMany();
    res.json(users);
});

An example where it takes the user id as a parameter 
app.get('/user/:id', async (req, res) => {
  const userId = parseInt(req.params.id, 10); // Parse the id parameter from the URL
  try {
    const user = await prisma.user.findUnique({
      where: { id: userId }, // Query the user by id
    });

    if (!user) {
      return res.status(404).json({ error: 'User not found' }); // User not found
    }

    res.json(user); // Send the user data as JSON response
  } catch (error) {
    console.error(error); // Log any errors
    res.status(500).json({ error: 'Internal Server Error' }); // Send a 500 Internal Server Error response
  }
});

Some research I did as a concern I had was what happens if an additional 
requestis made while resolving another database query. The database should 
have connection pooling to service multiple queries simultaneously,
however if the pooling limit is reached it will then begin to queue
requests until a connection is available unless of course the response
time exceeds the timeout limit, then it will be dropped
This probably needs some setup and config tho
*/
app.listen(PORT, () => {
    console.log('Server is running on port ' + PORT);
});