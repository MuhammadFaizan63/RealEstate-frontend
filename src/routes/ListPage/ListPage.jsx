import React from 'react'
import './ListPage.scss'
import Filter from '../../components/Filter/Filter'
import Card from '../../components/card/card'
import Map from '../../components/Map/Map'
import { useLoaderData } from 'react-router-dom'

const ListPage = () => {
    const data = useLoaderData();
    

    let posts = [];
    
    if (Array.isArray(data)) {
        posts = data;
    } else if (data && data.posts && Array.isArray(data.posts)) {
        posts = data.posts;
    } else if (data && data.data && Array.isArray(data.data)) {
        posts = data.data;
    }
    
    console.log("Posts for rendering:", posts);
    
    if (posts.length === 0) {
        return (
            <div className='listPage'>
                <div className="listContainer">
                    <div className="wrapper">
                        <Filter />
                        <p>No posts found</p>
                    </div>
                </div>
                <div className="mapContainer">
                    <Map items={[]} />
                </div>
            </div>
        );
    }
    
    return (
        <div className='listPage'>
            <div className="listContainer">
                <div className="wrapper">
                    <Filter />
                    {posts.map((item) => (
                        <Card key={item.id} item={item} />
                    ))}
                </div>
            </div>
            <div className="mapContainer">
                <Map items={posts} />
            </div>
        </div>
    );
}

export default ListPage;