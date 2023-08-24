// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";

// function SignUpForm() {
//   const [username, setUsername] = useState("");
//   const [firstName, setFirstName] = useState("");
//   const [lastName, setLastName] = useState("");
//   const [password, setPassword] = useState("");
//   const [passwordConfirmation, setPasswordConfirmation] = useState("");
//   const [error, setError] = useState("");
//   const navigate = useNavigate();

//   function handleUsernameChange(event) {
//     setUsername(event.target.value);
//   }

//   function handleFirstNameChange(event) {
//     setFirstName(event.target.value);
//   }

//   function handleLastNameChange(event) {
//     setLastName(event.target.value);
//   }

//   function handlePasswordChange(event) {
//     setPassword(event.target.value);
//     setError(event.target.value !== passwordConfirmation ? "Password does not match" : "");
//   }

//   function handlePasswordConfirmationChange(event) {
//     setPasswordConfirmation(event.target.value);
//     setError(event.target.value !== password ? "Password does not match" : "");
//   }

//   async function handleSubmit(event) {
//     event.preventDefault();
//     if (password !== passwordConfirmation) {
//       setError("Password does not match");
//       return;
//     }

//     // Perform signup logic here
//     // You can use an API call or any other method to handle signup

//     // Clear error message after successful signup
//     setError("");

//     // Navigate to another page after successful signup
//     navigate("/home");
//   }

//     return (
//         <div className="row">
//             <div className="offset-3 col-6">
//                 <div className="shadow p-4 mt-4">
//                     <h1>Add a technician</h1>
//                     <form onSubmit={handleSubmit} id="add-a-technician-form">
//                         <div className="form-floating mb-3">
//                             <input value={firstName} onChange={handleFirstNameChange} placeholder="First name" type="text" name="first_name" id="first_name" className="form-control" />
//                             <label htmlFor="firstName">First name</label>
//                         </div>
//                         <div className="form-floating mb-3">
//                             <input value={lastName} onChange={handleLastNameChange} placeholder="Last name" type="text" name="last_name" id="last_name" className="form-control" />
//                             <label htmlFor="lastName">Last name</label>
//                         </div>
//                         <div className="form-floating mb-3">
//                             <input value={employeeId} onChange={handleEmployeeIdChange} placeholder="Employee ID" type="text" name="employee_id" id="employee_id" className="form-control" />
//                             <label htmlFor="employee_Id">Employee ID</label>
//                         </div>
//                         <button className="btn btn-primary">Create</button>
//                     </form>
//                 </div>
//             </div>
//         </div>
//     );
// }


// export default SignUpForm;
