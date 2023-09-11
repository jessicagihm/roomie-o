import React, { useState } from "react";
import "./Pref.css";
import jwtDecode from "jwt-decode";
import useToken from "@galvanize-inc/jwtdown-for-react";

export default function PreferenceCreateForm() {
  const [formData, setFormData] = useState({
    smoker_friendly: false,
    hobbies: "",
    pet_friendly: false,
    budget: 0,
    house_pref: "",
    kids: 0,
    work_sched: "",
    allergies: "",
    looking_for_roomie: false,
    move_in_date: "",
  });
  const { token } = useToken();
  let decodedToken;
  let user_id;

  if (token) {
    try {
      decodedToken = jwtDecode(token);
      user_id = decodedToken.account.id;
    } catch (error) {
      console.error("Failed to decode token:", error);
    }
  }

  const isAuthenticated = !!token;

  console.log("User ID:", user_id);

  if (!isAuthenticated) {
    return <div>Please log in to create your preferences.</div>;
  }

  const handleChange = (event) => {
    const { name, value, type } = event.target;
    if (type === "checkbox") {
      setFormData((prevState) => ({
        ...prevState,
        [name]: event.target.checked,
      }));
    } else {
      setFormData((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    formData.budget = parseInt(formData.budget, 10);
    formData.kids = parseInt(formData.kids, 10);
    formData.user_id = parseInt(user_id);
    formData.looking_for_roomie = Boolean(formData.looking_for_roomie);

    if (formData.move_in_date === "") {
      delete formData.move_in_date;
    }

    const prefsUrl = `${process.env.REACT_APP_API_HOST}/api/preferences`;
    const fetchConfig = {
      method: "POST",
      body: JSON.stringify(formData),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    const response = await fetch(prefsUrl, fetchConfig);
    if (response.ok) {
      window.location.href = `${process.env.PUBLIC_URL}/home`;
    } else {
      const data = await response.json();
      alert(JSON.stringify(data.detail));
    }
  };

  return (
    <div className="row">
      <div className="offset-3 col-6">
        <div className="shadow p-4 mt-4">
          <h1>Create a Preference</h1>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label>
                Smoker Friendly:
                <input
                  type="checkbox"
                  name="smoker_friendly"
                  checked={formData.smoker_friendly}
                  onChange={handleChange}
                />
              </label>
            </div>
            <div className="form-floating mb-3">
              <input
                value={formData.hobbies}
                onChange={handleChange}
                type="text"
                name="hobbies"
                className="form-control"
              />
              <label htmlFor="hobbies">Hobbies</label>
            </div>
            <div className="mb-3">
              <label>
                Pet Friendly:
                <input
                  type="checkbox"
                  name="pet_friendly"
                  checked={formData.pet_friendly}
                  onChange={handleChange}
                />
              </label>
            </div>
            <div className="form-floating mb-3">
              <input
                value={formData.budget}
                onChange={handleChange}
                type="number"
                name="budget"
                className="form-control"
              />
              <label htmlFor="budget">Budget</label>
            </div>
            <div className="form-floating mb-3">
              <input
                value={formData.house_pref}
                onChange={handleChange}
                type="text"
                name="house_pref"
                className="form-control"
              />
              <label htmlFor="house_pref">House Preference</label>
            </div>
            <div className="form-floating mb-3">
              <input
                value={formData.kids}
                onChange={handleChange}
                type="number"
                name="kids"
                className="form-control"
              />
              <label htmlFor="kids">Number of Kids</label>
            </div>
            <div className="form-floating mb-3">
              <input
                value={formData.work_sched}
                onChange={handleChange}
                type="text"
                name="work_sched"
                className="form-control"
              />
              <label htmlFor="work_sched">Work Schedule</label>
            </div>
            <div className="form-floating mb-3">
              <input
                value={formData.allergies}
                onChange={handleChange}
                type="text"
                name="allergies"
                className="form-control"
              />
              <label htmlFor="allergies">Allergies</label>
            </div>
            <div className="mb-3">
              <label>
                Looking for Roommate:
                <input
                  type="checkbox"
                  name="looking_for_roomie"
                  checked={formData.looking_for_roomie}
                  onChange={handleChange}
                />
              </label>
            </div>
            <div className="form-floating mb-3">
              <input
                value={formData.move_in_date}
                onChange={handleChange}
                type="date"
                name="move_in_date"
                className="form-control"
              />
              <label htmlFor="move_in_date">Move-in Date(Optional)</label>
            </div>
            <button className="btn btn-primary">Create Preference</button>
          </form>
        </div>
      </div>
    </div>
  );
}
