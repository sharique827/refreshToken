import { fetchAllPosts, getPostbyId, createPost, updatePostbyId, deletePostbyId } from '../services/blogPost.service'
import { Request, Response } from 'express'
import { FilterCategory } from '../utility/typings/enverx'
import { isUndefined, get as getLodash } from 'lodash'

export const getAllPosts = async (request: Request, response: Response) => {
    try {
        const { category } = request.query
        const filter = { category: category ?? 'null' } as FilterCategory
        console.log('filter', filter)
        const allPostsdata = await fetchAllPosts(filter)
        console.log({allPostsdata})
        if (!isUndefined(allPostsdata)) {
            console.log('Loop')
            const { result = [], count } = allPostsdata
            response.setHeader('x-total-count', getLodash(count, '0.count', 0))
            console.log('hiii')
            return (request.body.refreshToken) ? response.status(200).json({refreshToken:request.body.refreshToken, result }) : response.status(200).json({ result })
        }  
        return response.status(204).json()
    } catch (error) {
        return response.status(500).json({ error })
    }
}

export const getPost = async (request: Request, response: Response) => {
    try {
        const blogPostId = request.params.id
        const post = await getPostbyId(blogPostId)
        if (post) {
            return response.status(200).json({ post })
        }
        return response.status(404).json({ message: 'no posts found or invalid id' })
    } catch (error) {
        return response.status(500).json({ error })
    }
}

export const savePost = async (request: Request, response: Response) => {
    try {
        const { blog, category } = request.body
        const userId = request.user.id
        if (!blog || !category || !userId) {
            return response.status(400).json({ error: 'Bad Request' });
        }
        const createdPost = await createPost({ blog, category, userId })
        return response.status(201).json({ data: createdPost })

    } catch (error) {
        return response.status(500).json({ error })
    }
}

export const updatePost = async (request: Request, response: Response) => {
    try {
        const { blog, category } = request.body
        const postId = request.params.id
        const newBlogPost = await updatePostbyId({ postId, blog, category })
        if (newBlogPost.modifiedCount > 0) return response.status(201).json()
        return response.status(201).json()
    } catch (error) {
        return response.status(500).json({ error })
    }
}

export const deletePost = async (request: Request, response: Response) => {
    try {
        const postId = request.params.id
        if (!postId) {
            return response.status(400).json({ error: 'Bad Request' });
        }
        const isDeleted = await deletePostbyId(postId)
        if (!isDeleted) return response.status(404).json({ error: 'Not Found' })

        return response.status(204).json()
    } catch (error) {
        return response.status(500).json({ error })
    }
}