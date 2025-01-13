import { useRef } from "react";

const LoginCard = ({ onSignIn }) => {
  const emailRef = useRef(null);
  const passRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    const email = emailRef.current.value;
    const password = passRef.current.value;

    if (!email || !password) {
      alert("Fill the fields");
      return;
    }

    onSignIn({ email, password });
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
          <div>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              placeholder="Email"
              name="email"
              id="email"
              ref={emailRef}
            ></input>
          </div>

          <div>
            <label htmlFor="password">Password</label>
            <input
              type="password"
              placeholder="Password"
              name="password"
              id="password"
              ref={passRef}
            ></input>
          </div>

          <button>Signin</button>
        </form>
      </div>
    </>
  );
};

export default LoginCard;
