import Card from '../card/card';
import './List.scss';

export default function List({ posts = [], type = "" }) {
  
  if (!posts || posts.length === 0) {
    return (
      <div className="list">
        <div className="empty-list">
          <p>No {type === "user" ? "posts" : "saved posts"} yet</p>
          {type === "user" && (
            <button onClick={() => window.location.href = '/addPost'}>
              Create your first post
            </button>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="list">
      {posts.map((item) => (
        <Card key={item.id} item={item} />
      ))}
    </div>
  );
}