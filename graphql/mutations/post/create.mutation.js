import { GraphQLNonNull } from 'graphql';

import { postType, postInputType } from '../../types/post.type';
import PostModel from '../../../http/models/post.model';

export default {
	type: postType,
	args: {
		data: {
			name: 'data',
			type: new GraphQLNonNull(postInputType)
		}
	},
	resolve(root, params) {
		const pModel = new PostModel(params.data);
		const newPost = pModel.save();
		if (!newPost) {
			throw new Error('Error while creating post');
		}

		return newPost;
	}
}