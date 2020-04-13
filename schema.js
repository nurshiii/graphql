const graphql = require('graphql')
const { GraphQLSchema, GraphQLObjectType, GraphQLString, GraphQLInt,GraphQLString } = graphql

const schema = new GraphQLSchema({
  query: new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
      hello: {
        type: GraphQLString,
        resolve() {
          return 'world'
        }
      }
    }
  })
})



const students = [
  {id:'1', name:'John Doe', email:'jdoe@gmail.com', age:25},
  {id:'2', name:'Steve Smith', email:'steve@gmail.com', age:26},
  {id:'3', name:'Sara Williams', email:'sara@gmail.com', age:27},
];



const StudentType = new GraphQLObjectType({
  name:'Students',
  fields:() => ({
      id: {type:GraphQLString},
      name: {type: GraphQLString},
      email: {type: GraphQLString},
      age: {type: GraphQLInt},
  })
});


const RootQuery= new GraphQLObjectType({
  name:'RootQueryType',
  fields:{
      student:{
          type:StudentType,
          args:{
              id:{type:GraphQLString}
          },
          resolve(parentValue, args){
              
              for(let i = 0;i < students.length;i++){
                  if(students[i].id == args.id){
                      return students[i];
                  }
              }
              
          }
      },
     
  }
});
              module.exports = new GraphQLSchema({
                query: RootQuery,
                schema
              });
