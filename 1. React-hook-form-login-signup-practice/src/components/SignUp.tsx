import { useForm } from "react-hook-form";
import "./SignUp.css";
import { Link } from "react-router-dom";

type formValues = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
};
const SignUp = () => {
  const form = useForm<formValues>({
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
    },
    mode: "onBlur",
  });

  const { register, handleSubmit, formState, reset } = form;
  const {
    errors,
    disabled,
    isDirty,
    isSubmitting,
    isSubmitSuccessful,
    isValid,
  } = formState;
  console.log({ disabled, isDirty, isSubmitting, isSubmitSuccessful, isValid });

  const onSubmitRegisterForm = async (value: formValues) => {
    console.log("value:", value);
    try {
      const response = await fetch("http://localhost:8080/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(value),
      });

      if (response.ok) {
        console.log(response);
        reset();
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="sign-up-container">
      <h1 className="sign-up-title">Sign Up</h1>
      <form
        className="form-container"
        onSubmit={handleSubmit(onSubmitRegisterForm)}
        noValidate
      >
        <div className="first-name-container">
          <label htmlFor="first-name">First Name</label>
          <input
            type="text"
            id="first-name"
            placeholder="Enter First Name"
            {...register("firstName", {
              required: {
                value: true,
                message: "First name is required",
              },
            })}
          />
          <p className="error">{errors.firstName?.message}</p>
        </div>
        <div className="last-name-container">
          <label htmlFor="last-name">Last Name</label>
          <input
            type="text"
            id="last-name"
            placeholder="Enter Last Name"
            {...register("lastName", {
              required: {
                value: true,
                message: "Last name is required",
              },
            })}
          />
          <p className="error">{errors.lastName?.message}</p>
        </div>
        <div className="email-container">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            placeholder="Enter Email"
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
            placeholder="Enter Password"
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
          <button type="submit" disabled={!isValid || isSubmitting || !isDirty}>
            {isSubmitting ? "Submitting..." : "Submit"}
          </button>
        </div>
        <div className="signup-link-container">
          <p>
            Already member? <Link to="/login">Login here</Link>
          </p>
        </div>
      </form>
    </div>
  );
};
export default SignUp;
