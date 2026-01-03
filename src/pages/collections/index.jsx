import { useParams } from "react-router-dom";

export const Collections = () => {
  const params = useParams();
  return (
    <div>
      <h1> Collection № {params.id}</h1>
    </div>
  );
};
