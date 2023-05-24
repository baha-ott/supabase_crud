import { useState } from "react";
import supabase from "../config/supabaseClient";
import { useNavigate } from "react-router";



const Create = () => {
  const [formError, setFormError] = useState(null);
  const [title, setTitle] = useState("");
  const [method, setMethod] = useState("");
  const [rating, setRating] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title || !method || !rating) {
      setFormError("Please fill in all of the fields");
      return;
    }

    const { data, error } = await supabase
      .from("smoothies")
      .insert([{ title, method, rating }])
      .select();
    if (error) setFormError("Please check the values you entered");

    if (data) {
      console.log(data);
      setFormError(null);
      setTitle("");
      setMethod("");
      setRating("");

      navigate("/");
    }
  };

  return (
    <div className="page create">
      <form onSubmit={handleSubmit}>
        <label htmlFor="title">Title:</label>
        <input
          name="title"
          type="text"
          id="title"
          onChange={(e) => setTitle(e.target.value)}
          value={title}
        />

        <label htmlFor="method">Method:</label>
        <textarea
          name="method"
          id="method"
          onChange={(e) => setMethod(e.target.value)}
          value={method}
        />

        <label htmlFor="rating">Rating:</label>
        <input
          name="rating"
          type="number"
          id="rating"
          onChange={(e) => setRating(e.target.value)}
          value={rating}
        />

        <button>Create Smoothie Recipe</button>

        {formError && <p className="error">{formError}</p>}
      </form>
    </div>
  );
};

export default Create;
