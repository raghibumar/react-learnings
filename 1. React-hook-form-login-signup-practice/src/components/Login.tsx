import { Link, useNavigate } from "react-router-dom";
import "./Login.css";
import { useForm } from "react-hook-form";

type loginFormValues = {
  email: string;
  password: string;
};

const Login = () => {
  const navigate = useNavigate();
  const form = useForm<loginFormValues>({
    defaultValues: {
      email: "",
      password: "",
    },
    mode: "onBlur",
  });

  const { register, formState, handleSubmit, reset } = form;
  const {
    errors,
    disabled,
    isDirty,
    isSubmitSuccessful,
    isSubmitting,
    isValid,
  } = formState;

  const onSubmitLoginForm = async (value: loginFormValues) => {
    console.log("value:", value);

    const response = await fetch(
      `http://localhost:8080/users?email=${value.email}&password=${value.password}`
    );
    const userDetails = await response.json();
    console.log("userDetails:", userDetails);

    if (userDetails.length > 0) {
      alert("Login successful");
      navigate("/");
    } else {
      alert("Login failed, Please check your credentials");
    }
  };

  return (
    <div className="login-container">
      <h1 className="login-title">Login</h1>
      <form
        className="form-container"
        onSubmit={handleSubmit(onSubmitLoginForm)}
      >
        <div className="email-container">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            placeholder="Enter your email"
            {...register("email", {
              required: {
                value: true,
                message: "Email is required",
              },
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: "Invalid email address",
              },
            })}
          />
          <p className="error">{errors.email?.message}</p>
        </div>
        <div className="password-container">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            placeholder="Enter your password"
            {...register("password", {
              required: {
                value: true,
                message: "Password is required",
              },
              minLength: {
                value: 6,
                message: "Password must be at least 6 characters long",
              },
              validate: (value) => {
                const hasUpperCase = /[A-Z]/.test(value);
                const hasLowerCase = /[a-z]/.test(value);
                const hasNumber = /\d/.test(value);
                if (!hasUpperCase || !hasLowerCase || !hasNumber) {
                  return "Password must contain at least one uppercase letter, one lowercase letter, and one number";
                }
                return true;
              },
            })}
          />
          <p className="error">{errors.password?.message}</p>
        </div>
        <div className="submit-button-container">
          <button type="submit" disabled={!isValid || !isDirty || isSubmitting}>
            {isSubmitting ? "Logging in..." : "Login"}
          </button>
        </div>
        <div className="signup-link-container">
          <p>
            New member? <Link to="/signup">Sign up here</Link>
          </p>
        </div>
      </form>
    </div>
  );
};
export default Login;
