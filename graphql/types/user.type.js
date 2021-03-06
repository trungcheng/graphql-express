import {
	GraphQLObjectType,
	GraphQLInputObjectType,
	GraphQLNonNull,
	GraphQLString,
	GraphQLInt,
	GraphQLID,
	GraphQLList
} from 'graphql';

import PostModel from '../../http/models/user.model';
import { postType } from './post.type';

export const userType = new GraphQLObjectType({
	name: 'User',
	description: 'User API',
	fields: () => ({
		_id: {
			type: new GraphQLNonNull(GraphQLID)
		},
		email: {
			type: GraphQLString
		},
		name: {
			type: GraphQLString
		},
		posts: {
			type: new GraphQLList(postType),
			resolve(user) {
				const { _id } = user;
				return PostModel.find({ uid: _id }).exec();
			}
		}
	})
});

export const userInputType = new GraphQLInputObjectType({
	name: 'UserInput',
	description: 'Insert User',
	fields: () => ({
		email: {
			type: GraphQLString
		},
		name: {
			type: GraphQLString
		}
	})
});