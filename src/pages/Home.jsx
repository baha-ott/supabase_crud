import supabase from "../config/supabaseClient";
import { useEffect, useState } from "react";

// components
import SmoothieCard from "../components/SmoothieCard";

const Home = () => {
  const [fetchError, setFetchError] = useState(null);
  const [smoothies, setSmoothies] = useState(null);
  const [orderBy, setOrderBy] = useState("created_at");

  const handleDeleteCard = (id) => {
    const filteredSmoothies = smoothies.filter(
      (smoothie) => smoothie.id !== id
    );

    setSmoothies(filteredSmoothies);
  };

  useEffect(() => {
    const fetchSmoothies = async () => {
      const { data, error } = await supabase
        .from("smoothies")
        .select()
        .order(orderBy, { ascending: false });

      if (error) {
        setFetchError("Could not fetch the smoothies");
        setSmoothies(null);
      }
      if (data) {
        setSmoothies(data);
        setFetchError(null);
      }
    };

    fetchSmoothies();
  }, [orderBy]);

  return (
    <div className="page home">
      {fetchError && <p>{fetchError}</p>}
      {smoothies && smoothies.length ? (
        <div className="smoothies">
          <div className="order-by">
            <button onClick={() => setOrderBy("created_at")}>
              Time created
            </button>
            <button onClick={() => setOrderBy("title")}>Title</button>
            <button onClick={() => setOrderBy("rating")}>Rating</button>
            {orderBy}
          </div>
          <div className="smoothie-grid">
            {smoothies.map((smoothie) => (
              <SmoothieCard
                key={smoothie.id}
                smoothie={smoothie}
                onHandleDelete={handleDeleteCard}
              />
            ))}
          </div>
        </div>
      ) : (
        <p>there is no smoothies</p>
      )}
    </div>
  );
};

export default Home;
