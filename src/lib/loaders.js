import apiRequest from "./apiRequest";


export const singlePageLoader = async ({ params }) => {
  console.log("Full params object:", params);
  console.log("Post ID:", params.id);
  
  if (!params.id) {
    console.error("No ID provided in URL");
    return { 
      post: null, 
      success: false, 
      error: "No post ID provided in URL" 
    };
  }

  try {
    console.log("Fetching post with ID:", params.id);
    const res = await apiRequest.get(`/posts/${params.id}`);
    console.log("Post data received:", res.data);
    
    return { 
      post: res.data,
      success: true 
    };
  } catch (error) {
    console.error("Loader error:", error);
    return { 
      post: null, 
      success: false, 
      error: error.response?.data?.message || "Failed to load post" 
    };
  }
};



export const listPageLoader = async ({ request }) => {
  const query = request.url.split("?")[1];
  console.log("List page query:", query);
  
  try {
    const res = await apiRequest.get(`/posts?${query}`);
    console.log("API Response:", res.data);
    
    const posts = Array.isArray(res.data) ? res.data : [];
    
    return posts;  
    
  } catch (error) {
    console.error("List loader error:", error);
    return []; 
  }
};


export const profilePageLoader = async () => {
  try {
    const chatPromise = apiRequest.get("/chats");
    const postPromise = apiRequest.get("/users/profilePosts");
    
    return {
      chatResponse: chatPromise,
      postResponse: postPromise
    };
    
  } catch (error) {
    console.error("Profile loader error:", error);
    return {
      chatResponse: Promise.resolve({ data: [] }),
      postResponse: Promise.resolve({ data: { userPosts: [], savedPosts: [] } })
    };
  }
};
