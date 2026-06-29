

import { useEffect, useState } from "react";
import { useLoaderData, useNavigate } from "react-router-dom";
import Map from "../../components/Map/Map";
import Slider from "../../components/Slider/Slider";
import "./singlePage.scss";
import { useContext } from "react";
import { AuthContext } from '../../context/AuthContext';
import apiRequest from "../../lib/apiRequest";

export default function SinglePage() {
  const loaderData = useLoaderData();
  const navigate = useNavigate()

  const [loading, setLoading] = useState(true);
  const [postData, setPostData] = useState(null);
  const [error, setError] = useState(null);
  const [saved, setSaved] = useState(false)
  const {currentUser} = useContext(AuthContext)

  useEffect(() => {
    console.log("Loader data:", loaderData);


    if (loaderData?.error) {
      setError(loaderData.error);
      setLoading(false);
      return;
    }


    if (loaderData?.post && loaderData.post.id) {
      console.log("Post found (direct):", loaderData.post);
      setPostData(loaderData.post);
      setLoading(false);
      return;
    }
    

    if (loaderData?.post?.post && loaderData.post.post.id) {
      console.log("Post found (nested):", loaderData.post.post);
      setPostData(loaderData.post.post);
      setLoading(false);
      return;
    }
    

    if (loaderData?.id) {
      console.log("LoaderData is post:", loaderData);
      setPostData(loaderData);
      setLoading(false);
      return;
    }


    console.log("No post found in loaderData");
    setError("Post not found");
    setLoading(false);
    
  }, [loaderData]);


  if (loading) {
    return (
      <div className="loading">
        Loading...
      </div>
    );
  }

  if (error) {
    return (
      <div className="error">
        Error: {error}
      </div>
    );
  }

  if (!postData) {
    return (
      <div className="not-found">
        Post not found
      </div>
    );
  }

  const handleSave = async () => {
    if (!currentUser) {
      navigate("/login");
    }
    setSaved((prev) => !prev);
    try {
       const res =await apiRequest.post("/users/save", { postId: postData.id });
      console.log(res, 'post response');
      
    } catch (err) {
      console.log(err);
      setSaved((prev) => !prev);
    }
  };

  return (
    <div className="singlePage">
      <div className="details">
        <div className="wrapper">
          
          {/* Images Slider */}
          <Slider images={postData.images || []} />

          <div className="info">
            <div className="top">
              <div className="post">
                <h1>{postData.title}</h1>

                <div className="address">
                  <img src="/pin.png" alt="" />
                  <span>
                    {postData.address}, {postData.city}
                  </span>
                </div>

                <div className="price">
                  ${postData.price}
                </div>
              </div>

              <div className="user">
                <img
                  src={postData.user?.avatar || "/noavatar.jpg"}
                  alt=""
                />

                <span>
                  {postData.user?.userName || "Unknown"}
                </span>
              </div>
            </div>

            <div className="bottom">
              {postData.postDetail?.desc ? (
                <div
                  dangerouslySetInnerHTML={{
                    __html: postData.postDetail.desc,
                  }}
                />
              ) : (
                <p>No description available</p>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="features">
        <div className="wrapper">

          {/* General */}
          <p className="title">General</p>

          <div className="listVertical">
            <div className="feature">
              <img src="/utility.png" alt="" />

              <div className="featureText">
                <span>Utilities</span>
                <p>
                  {postData.postDetail?.utilities || "Not specified"}
                </p>
              </div>
            </div>

            <div className="feature">
              <img src="/pet.png" alt="" />

              <div className="featureText">
                <span>Pet Policy</span>
                <p>
                  {postData.postDetail?.pet || "Not specified"}
                </p>
              </div>
            </div>

            <div className="feature">
              <img src="/fee.png" alt="" />

              <div className="featureText">
                <span>Income Policy</span>
                <p>
                  {postData.postDetail?.income || "Not specified"}
                </p>
              </div>
            </div>
          </div>

          {/* Sizes */}
          <p className="title">Sizes</p>

          <div className="sizes">
            <div className="size">
              <img src="/size.png" alt="" />
              <span>
                {postData.postDetail?.size || "N/A"} sqft
              </span>
            </div>

            <div className="size">
              <img src="/bed.png" alt="" />
              <span>{postData.bedroom} beds</span>
            </div>

            <div className="size">
              <img src="/bath.png" alt="" />
              <span>{postData.bathroom} bathroom</span>
            </div>
          </div>

          {/* Nearby Places */}
          <p className="title">Nearby Places</p>

          <div className="listHorizontal">
            <div className="feature">
              <img src="/school.png" alt="" />
              <span>School</span>
              <p>
                {postData.postDetail?.school || "N/A"} m away
              </p>
            </div>

            <div className="feature">
              <img src="/bus.png" alt="" />
              <span>Bus Stop</span>
              <p>
                {postData.postDetail?.bus || "N/A"} m away
              </p>
            </div>

            <div className="feature">
              <img src="/restaurant.png" alt="" />
              <span>Restaurants</span>
              <p>
                {postData.postDetail?.restaurant || "N/A"} m away
              </p>
            </div>
          </div>

          {/* Map */}
          <p className="title">Location</p>

          <div className="mapContainer">
            {postData.latitude && postData.longitude ? (
              <Map items={[postData]} />
            ) : (
              <p>Location not available</p>
            )}
          </div>

          {/* Buttons */}
          <div className="buttons">
            <button>
              <img src="/chat.png" alt="" />
              Send a Message
            </button>

            <button onClick={handleSave}
            style={{backgroundColor : saved ?"#fece51" : "white"}}>
              <img src="/save.png" alt="" />
              {saved ? "Place saved" : "Save Place"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}