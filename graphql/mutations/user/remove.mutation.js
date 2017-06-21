import { 
	GraphQLNonNull,
	GraphQLID 
} from 'graphql';

import { userType } from '../../types/user.type';
import UserModel from '../../../http/models/user.model';

export default {
	type: userType,
	args: {
		id: {
			name: 'id',
			type: new GraphQLNonNull(GraphQLID)
		}
	},
	resolve(root, params) {
		const removedUser = UserModel.findByIdAndRemove(params.id).exec();
		if (!removedUser) {
			throw new Error('Error while removing user');
		}

		return removedUser;
	}
};