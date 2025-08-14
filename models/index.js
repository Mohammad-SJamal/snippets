const Snippet = require('./Snippet')
const User = require('./User')

Snippet.belongsToMany(User, { through: 'snippet_logged' });
User.belongsToMany(Snippet, { through: 'snippet_logged' });

module.exports = {
  Snippet,
  User
}
