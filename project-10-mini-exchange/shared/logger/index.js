function make_logger({category}){
    return {
        info: (message) => console.log(`[${new Date().toISOString()}]`,"[INFO]" ,`[${category}]`, message),
        error: (error) => console.error(`[${new Date().toISOString()}]`,"[ERROR]",`[${category}]`, error)
    }
}
module.exports = {make_logger};