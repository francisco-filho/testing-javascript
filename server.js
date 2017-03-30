const express = require('express'),
    app = express(),
  port = 3000

app.use(express.static('./public'))

app.listen(port, () => {
  console.log('server started on port ' + port)
})
