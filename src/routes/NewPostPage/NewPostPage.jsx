import { useState } from "react";
import "./NewPostPage.scss";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Image from "@tiptap/extension-image";
import apiRequest from "../../lib/apiRequest";
import UploadWidget from "../../components/uploadWidget/UploadWidget";
import { useNavigate } from "react-router-dom";


const MenuBar = ({ editor }) => {
  if (!editor) return null;

  return (
    <div className="menu-bar">
      <button onClick={() => editor.chain().focus().toggleBold().run()} type="button">Bold</button>
      <button onClick={() => editor.chain().focus().toggleItalic().run()} type="button">Italic</button>
      <button onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()} type="button">H1</button>
      <button onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()} type="button">H2</button>
      <button onClick={() => editor.chain().focus().toggleBulletList().run()} type="button">Bullet List</button>
      <button onClick={() => editor.chain().focus().toggleOrderedList().run()} type="button">Numbered List</button>
      <button onClick={() => editor.chain().focus().undo().run()} type="button">Undo</button>
      <button onClick={() => editor.chain().focus().redo().run()} type="button">Redo</button>
    </div>
  );
};

function NewPostPage() {
  const [value, setValue] = useState("");
  const [images, setImages] = useState([]);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const editor = useEditor({
    extensions: [StarterKit, Image],
    content: "",
    onUpdate: ({ editor }) => {
      setValue(editor.getHTML());
    },
  });


  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const inputs = Object.fromEntries(formData);


    console.log("========== FORM SUBMITTED ==========");
    console.log("1. All form inputs:", inputs);
    

    console.log("2. Latitude raw value:", inputs.latitude, "Type:", typeof inputs.latitude);
    console.log("3. Longitude raw value:", inputs.longitude, "Type:", typeof inputs.longitude);
    
 
    let latitude = null;
    let longitude = null;
    
    if (inputs.latitude && inputs.latitude.trim() !== "") {
      latitude = parseFloat(inputs.latitude);
      console.log("4. Latitude parsed:", latitude);
    } else {
      console.log("4. Latitude is empty, using null");
    }
    
    if (inputs.longitude && inputs.longitude.trim() !== "") {
      longitude = parseFloat(inputs.longitude);
      console.log("5. Longitude parsed:", longitude);
    } else {
      console.log("5. Longitude is empty, using null");
    }
    

    const postData = {
      title: inputs.title,
      price: parseInt(inputs.price),
      address: inputs.address,
      city: inputs.city,
      bedroom: parseInt(inputs.bedroom),
      bathroom: parseInt(inputs.bathroom),
      type: inputs.type,
      property: inputs.property,
      latitude: latitude,
      longitude: longitude,
      images: images,
    };
    
    console.log("6. PostData being sent:", postData);
    
    const postDetailData = {
      desc: value,
      utilities: inputs.utilities,
      pet: inputs.pet,
      income: inputs.income,
      size: parseInt(inputs.size),
      school: parseInt(inputs.school),
      bus: parseInt(inputs.bus),
      restaurant: parseInt(inputs.restaurant),
    };
    
    console.log("7. PostDetail being sent:", postDetailData);

    try {
  
      console.log("8. Sending API request to /posts...");
      
      const res = await apiRequest.post("/posts", {
        postData: postData,
        postDetail: postDetailData,
      });
      

      console.log("9. API Response:", res);
      console.log("10. Response data:", res.data);
      console.log("11. Created post ID:", res.data.id);
      console.log("12. Saved coordinates in DB:", {
        latitude: res.data.latitude,
        longitude: res.data.longitude
      });
      

      console.log("13. Navigating to: /" + res.data.id);
      navigate("/" + res.data.id);
      
    } catch (err) {

      console.log("========== ERROR ==========");
      console.log("14. Error object:", err);
      console.log("15. Error response:", err.response);
      console.log("16. Error message:", err.response?.data?.message || err.message);
      
      setError(err.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="newPostPage">
      <div className="formContainer">
        <h1>Add New Post</h1>
        <div className="wrapper">
          <form onSubmit={handleSubmit}>
            <div className="item">
              <label htmlFor="title">Title</label>
              <input id="title" name="title" type="text" />
            </div>
            <div className="item">
              <label htmlFor="price">Price</label>
              <input id="price" name="price" type="number" />
            </div>
            <div className="item">
              <label htmlFor="address">Address</label>
              <input id="address" name="address" type="text" />
            </div>
            <div className="item description">
              <label htmlFor="desc">Description</label>
              <div className="editor-container">
                <MenuBar editor={editor} />
                <EditorContent editor={editor} className="editor-content" />
              </div>
            </div>
            <div className="item">
              <label htmlFor="city">City</label>
              <input id="city" name="city" type="text" />
            </div>
            <div className="item">
              <label htmlFor="bedroom">Bedroom Number</label>
              <input min={1} id="bedroom" name="bedroom" type="number" />
            </div>
            <div className="item">
              <label htmlFor="bathroom">Bathroom Number</label>
              <input min={1} id="bathroom" name="bathroom" type="number" />
            </div>
            

            <div className="item">
              <label htmlFor="latitude">Latitude</label>
              <input 
                id="latitude" 
                name="latitude" 
                type="text" 
                defaultValue="24.8607"  
                placeholder="e.g., 24.8607"
              />
            </div>
            <div className="item">
              <label htmlFor="longitude">Longitude</label>
              <input 
                id="longitude" 
                name="longitude" 
                type="text" 
                defaultValue="67.0011"  
                placeholder="e.g., 67.0011"
              />
            </div>
            
            <div className="item">
              <label htmlFor="type">Type</label>
              <select name="type">
                <option value="rent">Rent</option>
                <option value="buy">Buy</option>
              </select>
            </div>
            <div className="item">
              <label htmlFor="property">Property</label>
              <select name="property">
                <option value="appartment">Appartment</option>
                <option value="house">House</option>
                <option value="condo">Condo</option>
                <option value="land">Land</option>
              </select>
            </div>

            <div className="item">
              <label htmlFor="utilities">Utilities Policy</label>
              <select name="utilities">
                <option value="owner">Owner is responsible</option>
                <option value="tenant">Tenant is responsible</option>
                <option value="shared">Shared</option>
              </select>
            </div>
            <div className="item">
              <label htmlFor="pet">Pet Policy</label>
              <select name="pet">
                <option value="allowed">Allowed</option>
                <option value="not-allowed">Not Allowed</option>
              </select>
            </div>
            <div className="item">
              <label htmlFor="income">Income Policy</label>
              <input id="income" name="income" type="text" placeholder="Income Policy" />
            </div>
            <div className="item">
              <label htmlFor="size">Total Size (sqft)</label>
              <input min={0} id="size" name="size" type="number" />
            </div>
            <div className="item">
              <label htmlFor="school">School</label>
              <input min={0} id="school" name="school" type="number" />
            </div>
            <div className="item">
              <label htmlFor="bus">bus</label>
              <input min={0} id="bus" name="bus" type="number" />
            </div>
            <div className="item">
              <label htmlFor="restaurant">Restaurant</label>
              <input min={0} id="restaurant" name="restaurant" type="number" />
            </div>
            <button className="sendButton" type="submit">Add</button>
            {error && <span style={{color: "red"}}>{error}</span>}
          </form>
        </div>
      </div>
      <div className="sideContainer">
        {images.map((image, index) => (
          <img src={image} key={index} alt="" />
        ))}
        <UploadWidget
          uwConfig={{
            multiple: true,
            cloudName: "dplhoc2lf",
            uploadPreset: "estate",
            folder: "posts",
          }}
          setState={setImages}
        />
      </div>
    </div>
  );
}

export default NewPostPage;