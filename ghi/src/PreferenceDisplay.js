import React, { useState, useEffect } from "react";
import useToken from "@galvanize-inc/jwtdown-for-react";
import jwtDecode from "jwt-decode";

function PreferenceDisplay() {
  const [formData, setFormData] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const { token, loading } = useToken();

  useEffect(() => {
    async function fetchData() {
      try {
        if (loading) {
          return;
        }

        console.log("Retrieved token:", token);

        if (!token) {
          throw new Error("No token received");
        }

        const decodedToken = jwtDecode(token);
        const user_id = decodedToken.account.id;

        const prefUrl = `${process.env.REACT_APP_API_HOST}/api/preferences/${user_id}`;

        const response = await fetch(prefUrl, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          console.error("Response status:", response.status);
          throw new Error(
            "Failed to fetch data with status: " + response.status
          );
        }

        const data = await response.json();
        setFormData(data);
      } catch (err) {
        console.error("Fetch Error:", err);
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    }

    fetchData();
  }, [token, loading]);


  if (isLoading) {
    return <div>Loading User Preferences...</div>;
  }


  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h2>User Preferences</h2>
      <p>Smoker Friendly: {formData.smoker_friendly ? "Yes" : "No"}</p>
      <p>Hobbies: {formData.hobbies}</p>
      <p>Pet Friendly: {formData.pet_friendly ? "Yes" : "No"}</p>
      <p>Budget: ${formData.budget}</p>
      <p>House Preference: {formData.house_pref}</p>
      <p>Kids: {formData.kids}</p>
      <p>Work Schedule: {formData.work_sched}</p>
      <p>Allergies: {formData.allergies}</p>
      <p>Looking for Roomie: {formData.looking_for_roomie ? "Yes" : "No"}</p>
      <p>
        Move In Date: {new Date(formData.move_in_date).toLocaleDateString()}
      </p>
    </div>
  );
}

export default PreferenceDisplay;
