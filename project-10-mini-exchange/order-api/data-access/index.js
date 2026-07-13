
const { query } = require('../../shared/db')

function make_balance_repository({query}){
    return {
        get_balance: ({user_id, asset}) => {
            return query({query: "SELECT * FROM balances WHERE user_id = $1 AND asset =$2", params: [user_id, asset]});
        },
        get_balances: ({user_id}) => {
            return query({query: "SELECT * FROM balances WHERE user_id = $1", params: [user_id]});
        }
    }
}

const balance_repository = make_balance_repository({query});

module.exports = {balance_repository};

