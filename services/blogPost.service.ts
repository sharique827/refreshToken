import { Post } from '../models/post.model'
import { isEmpty, set, isUndefined, isNil } from 'lodash'
import { ObjectId } from 'mongodb'
import { AggregationWithCount, BlogPost, FilterCategory } from '../utility/typings/enverx'
import { fetchallPostsAggregation } from '../utility/aggregation'

export const fetchAllPosts = async (filter: FilterCategory) => {
    try {
        const query = {}
        if (!isEmpty(filter) && !isUndefined(filter)) set(query, 'category', filter.category)
        console.log('11')
        const pipeline = fetchallPostsAggregation(filter)
        console.log('13')
        const [allPostsdata] = await Post.collection.aggregate<AggregationWithCount<BlogPost[]>>(pipeline).toArray()
        console.log('15')
        return allPostsdata
    } catch (error) {
        throw new Error
    }

}
export const getPostbyId = async (blogPostId: string) => {
    try {
        const post = await Post.collection.findOne({ _id: new ObjectId(blogPostId) })
        if (isNil(post)) return

        return post
    } catch (error) {
        throw new Error
    }
}

export const createPost = async (blogPost: BlogPost) => {
    try {
        const post = await Post.create({
            ...blogPost,
            userId: new ObjectId(blogPost.userId)
        })
        return post
    } catch (error) {
        throw new Error
    }

}
export const updatePostbyId = async ({ postId, blog, category }: { postId: string, blog: string, category: string }) => {
    try {
        const data = await Post.updateOne({ _id: new ObjectId(postId), isDeleted: false }, { $set: { blog, category } })
        return data
    } catch (error) {
        throw new Error
    }
}
export const deletePostbyId = async (postId: string) => {
    try {
        const $set = {
            isDeleted: true
        }
        const deletedPost = await Post.updateOne({ _id: new ObjectId(postId) }, { $set })
        if (deletedPost.modifiedCount === 0) return false
        return true
    } catch (error) {
        throw new Error
    }
}