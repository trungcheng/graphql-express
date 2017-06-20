import {
    GraphQLSchema,
    GraphQLObjectType,
    GraphQLString,
    GraphQLList
} from 'graphql';

const schema = new GraphQLSchema({
    query: new GraphQLObjectType({
        name: 'Query',
        fields: {
            log: {
                type: new GraphQLList(GraphQLString),
                async resolve({ db }, args) {
                    var items = await db.collection('log').find().toArray();
                    return items.map(x => `${x.time} ${x.ip} ${x.message}`);
                }
            }
        }
    })
});

export default schema;
