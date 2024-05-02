import React from 'react'
import Markdown from 'markdown-to-jsx'

const PostContent = ({ postData }) => {

    const categories = postData["categories"].map((categorie) => <p className='categorie' key={categorie["id"]}>{categorie["name"]}</p>);

    const comments = postData["comments"].map(
        (comment) =>
            <div className='comment' key={comment["id"]}>
                <p>{comment["name"]}</p>
                <p>{comment["comment"]}</p>
            </div>
    )

    return (
        <article>
            <header>
                <h1>{postData["title"]}</h1>
                <img src={`${postData["featuredImage"]}`} loading="lazy" width="120" height="120" />
            </header>
            <main>
                <Markdown >
                    {postData["content"]}
                </Markdown>
            </main>
            <footer>
                <div>
                    <p>Comentarios</p>
                    {comments}
                </div>
                <p>{postData["users"]["name"]}</p>
                {categories}
                <p>{postData["date"]}</p>
            </footer>
        </article>
    )
}

export default PostContent