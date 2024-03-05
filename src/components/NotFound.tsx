import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function NotFound() {
  const navigate = useNavigate();

  useEffect(
    () => navigate("/"), // navigate route to default List view
    []
  );

  return (
    <div className="bg-black">
      <img className="mx-auto" src="/404.jpg" />
    </div>
  );
}

export default NotFound;
