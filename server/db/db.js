const config = require('../config/config');
module.exports =  mongoose => {
        mongoose.connect(config.DATABASE, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
        useCreateIndex: true
    }).then(() => console.log('db connected successfully'))
      .catch(err=> console.log('db coonection error ', err))  
}