const { db } = require('./connection')
const { Snippet, User } = require('../models/index')
const snippetData = require('./seedData.json')

const seed = async () => {
  // drop the db
  await db.sync({ force: true })

  // add the data
  const user = await User.create({ email: "example@example.com", password: "password" });
  const snippets = await Snippet.bulkCreate(snippetData);
  // associate some data
  await Promise.all([
    user.addShow(snippets[0]),
    user.addShow(snippets[1]),
    user.addShow(snippets[2]),
    user.addShow(snippets[3])
  ])

  console.log('Shows and User database info populated!')
}

// export my seed function
// module.exports = seed
seed()
