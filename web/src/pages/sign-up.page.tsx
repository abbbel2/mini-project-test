import { SignupForm } from "../containers/auth/signup.form"

export const SignUpPage = () => {
    return (
        <div className="flex flex-col justify-center items-center w-screen h-screen bg-center bg-no-repeat bg-cover relative">
            <SignupForm />
        </div>
    )
}