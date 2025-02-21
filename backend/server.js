const app = require('./src/app')
require('dotenv').config()



app.listen(3001, () => {
    console.log('server started on port: 3001')
})