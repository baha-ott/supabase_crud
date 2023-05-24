import { useNavigate, useParams } from "react-router";
import { useEffect, useState } from "react";
import supabase from "../config/supabaseClient";

const Update = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [method, setMethod] = useState("");
  const [rating, setRating] = useState("");
  const [formError, setFormError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title || !method || !rating) {
      setFormError("Pls fill in all fields!");
    }

    const { data, error } = await supabase
      .from("smoothies")
      .update({ title, method, rating })
      .eq("id", id)
      .select();
    // .select() if we want all the records back

    if (error) {
      setFormError("Something went wrong");
      console.log(error);
    }
    if (data) {
      console.log(data);
      setFormError("null");
      navigate("/");
    }
  };

  useEffect(() => {
    const fetchSmoothie = async () => {
      const { data, error } = await supabase
        .from("smoothies")
        .select()
        .eq("id", id)
        .single();

      if (error) {
        navigate("/", { replace: true });
        // with replace: true , we are going to replace this route in the history with the home page
      }

      if (data) {
        setTitle(data.title);
        setMethod(data.method);
        setRating(data.rating);
        console.log(data);
      }
    };
    fetchSmoothie();
  }, [id, navigate]);

  return (
    <div className="page update">
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

        <button>Update Smoothie Recipe</button>
        {formError && <p className="error">{formError}</p>}
      </form>
    </div>
  );
};

export default Update;
