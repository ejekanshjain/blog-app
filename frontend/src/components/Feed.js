import React from 'react'

import FeedItem from './FeedItem'

const Feed = ({ feed }) => {
    let feedItemComponents
    if (feed) feedItemComponents = feed.map(f => <FeedItem key={f._id} feed={f} />)
    else feedItemComponents = <h5>Loading...</h5>
    return (
        <div>
            {feedItemComponents}
        </div>
    )
}

export default Feed