const redis = require('redis')
const client = redis.createClient({detect_buffers:true})

let getHolidayCache = () => {
    return new Promise((resolve, reject) => {
        client.get('holidays', function(err, reply){
            if(err){
                reject(err)
            }else{
                resolve(reply)
            }
        })
    })
}

module.exports = getHolidayCache
