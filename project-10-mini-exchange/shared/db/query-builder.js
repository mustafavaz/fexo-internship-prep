

const { defer, from, of} = require('rxjs');
const { map, catchError } = require('rxjs');


function make_query_builder({pool, logger}){
    return ({query, params}) =>
        defer(() =>
            from(pool.query(query, params))
                .pipe(map(value => ({success: true, data: value})),
                    catchError(error => {
                        logger.error(error?.message, query);
                        return of({success: false, error})
                    }))
        );


}
module.exports = {make_query_builder};