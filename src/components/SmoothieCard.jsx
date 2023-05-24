import React from "react";
import { Link } from "react-router-dom";

// icons
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import supabase from "../config/supabaseClient";

const SmoothieCard = ({ smoothie, onHandleDelete }) => {
  const handleDelete = async () => {
    const { data, error } = await supabase
      .from("smoothies")
      .delete()
      .eq("id", smoothie.id)
      .select();

    if (error) console.log(error);

    if (data) {
      const [{ id }] = data;

      onHandleDelete(id);
    }
  };

  return (
    
    <div className="smoothie-card">
      <h3>{smoothie.title}</h3>
      <p>{smoothie.method}</p>
      <div className="rating">{smoothie.rating}</div>
      <div className="buttons">
        <Link to={`/${smoothie.id}`}>
          <EditIcon />
        </Link>
        <DeleteIcon onClick={handleDelete} />
      </div>
    </div>
  );
};

export default SmoothieCard;
