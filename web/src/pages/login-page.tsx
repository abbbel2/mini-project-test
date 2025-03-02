import { LoginForm } from "../containers/auth/login.form";

export const LoginPage = () => {
  return (
    <div className="flex flex-col justify-center items-center w-screen h-screen bg-center bg-no-repeat bg-cover relative">
      <LoginForm />
    </div>
  );
};
