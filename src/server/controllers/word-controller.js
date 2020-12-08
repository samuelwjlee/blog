// list of word object example
// [ { name: 'someword', definition: 'some def', type: 'verb' } ]

const words = {
  barter: {
    definition: 'exchange goods without involving money',
    function: 'verb'
  },
  wistful: {
    definition: 'vaguely longing, sadly thoughtful',
    function: 'adjective'
  },
  contrived: {
    definition: 'artificial; labored',
    function: 'adjective'
  },
  balk: {
    definition: 'refuse to proceed or to do something',
    function: 'verb'
  },
  vacilitate: {
    definition: 'fluctuating, wavering',
    function: 'intransitive verb'
  }
}

exports.wordsGet = async (req, res) => {
  const userId = req.query.userId
  // get words tied to userId
  res.json(words)
}
