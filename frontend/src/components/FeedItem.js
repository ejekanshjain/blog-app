import React from 'react'

const FeedItem = ({ feed }) => {
    return (
        <div>
            <hr />
            <div>
                <h6>Author {feed.userInfo[0].name}   ({feed.userInfo[0].email})</h6>
            </div>
            <div>
                <h4>{feed.title}</h4>
                <p>{feed.body}</p>
            </div>
        </div>
    )
}

export default FeedItem