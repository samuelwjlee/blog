module.exports = (sequelize, Sequelize) => {
  const Word = sequelize.define('word', {
    name: {
      type: Sequelize.STRING
    },
    definition: {
      type: Sequelize.STRING
    },
    function: {
      type: Sequelize.STRING
    }
  })

  return Word
}

// https://bezkoder.com/react-node-express-postgresql/
