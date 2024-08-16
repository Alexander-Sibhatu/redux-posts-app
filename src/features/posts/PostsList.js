import { useSelector } from 'react-redux'
import PostAuthor from './PostAuthor';
import TimeAgo from './TimeAgo';
import ReactionButtons from './ReactionButtons';

const PostsList = () => {

    const posts = useSelector(state => state.posts)

    const orderedPosts = posts.slice().sort((a, b) => b.date.localeCompare(a.date))

    const renderPosts = orderedPosts.map((post) => {
       return (
       <article key={post.id} className='post'>
         <h3>{post.title}</h3>
         <p>{post.content.substring(0, 100)}</p>
         <p>
            <PostAuthor userId={post.userId} />
            <TimeAgo timestamp={post.date} />
         </p>
         <ReactionButtons post={post} />
       </article>)
    })

    return (
        <section className='posts'>
            <h2>Posts</h2>
            {renderPosts}
        </section>
    )
}

export default PostsList