import { useState } from "react";

const RegistrationCard = ({ onSignUp }) => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: ""
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    onSignUp(formData);
  };

  return (
    <>
      <div className="p-4 bg-white border border-zinc-200 shadow-md w-1/2">
        <div className="flex items-center justify-center my-4">
          <div>
            <h4 className="text-primary-500 font-semibold text-lg">
              Image Gallery
            </h4>
          </div>
        </div>
        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <div className="flex items-center gap-4">
            <div>
              <label htmlFor="firstName">First Name</label>
              <input
                type="firstName"
                placeholder="First Name"
                name="firstName"
                id="firstName"
                value={formData.firstName}
                onChange={handleChange}
              ></input>
            </div>
            <div>
              <label htmlFor="lastName">Last Name</label>
              <input
                type="lastName"
                placeholder="Last Name"
                name="lastName"
                id="lastName"
                value={formData.lastName}
                onChange={handleChange}
              ></input>
            </div>
          </div>

          <div>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              placeholder="Email"
              name="email"
              id="email"
              value={formData.email}
              onChange={handleChange}
            ></input>
          </div>

          <div>
            <label htmlFor="password">Password</label>
            <input
              type="password"
              placeholder="Password"
              name="password"
              id="password"
              value={formData.password}
              onChange={handleChange}
            ></input>
          </div>
          <div>
            <label htmlFor="confirmPassword">Password</label>
            <input
              type="password"
              placeholder="Confirm Password"
              name="confirmPassword"
              id="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
            ></input>
          </div>

          <button>Sign Up</button>
        </form>
      </div>
    </>
  );
};

export default RegistrationCard;
