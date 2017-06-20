import { GraphQLList } from 'graphql';
import { userType } from '../../types';
import UserModel from '../../../http/models/user.model';

export default {
	type: new GraphQLList(userType),
	resolve() {
		const users = UserModel.find().exec();
		if (!users) {
			throw new Error('Error while fetching users...');
		}

		return users;
	}
};