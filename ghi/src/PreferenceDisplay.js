import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getToken } from "@galvanize-inc/jwtdown-for-react";

function PreferenceDisplay() {
  const { pref_id } = useParams();
  const [formData, setFormData] = useState(null);
  const [token, setToken] = useState(null);

  useEffect(() => {
    getToken().then((receivedToken) => {
      setToken(receivedToken);
    });
  }, []);

  useEffect(() => {
    if (token) {
      const prefUrl = `/api/preferences/${pref_id}`;
      fetch(prefUrl, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Failed network response");
          }
          return response.json();
        })
        .then((data) => {
          setFormData(data);
        })
        .catch((error) => {
          console.error("Could not fetch data", error);
        });
    }
  }, [pref_id, token]);

  if (!formData) {
    return <div>User Preferences</div>;
  }

  return (
    <div>
      <h2>User Preferences</h2>
      <p>Smoker Friendly: {formData.smoker_friendly}</p>
      <p>Hobbies: {formData.hobbies}</p>
      <p>Pet Friendly: {formData.pet_friendly}</p>
      <p>Budget: {formData.budget}</p>
      <p>House Preference: {formData.house_pref}</p>
      <p>Kids: {formData.kids}</p>
      <p>Work Schedule: {formData.work_sched}</p>
      <p>Allergies: {formData.allergies}</p>
      <p>Looking for Roomie: {formData.looking_for_roomie}</p>
      <p>Move In Date: {formData.move_in_date}</p>
    </div>
  );
}

export default PreferenceDisplay;
