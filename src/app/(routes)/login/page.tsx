import Image from "next/image";
import { LoginForm } from "@/components/login-form";

const Login = () => {
  return (
    <div>
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="w-full max-w-7xl flex flex-col lg:flex-row items-center justify-center gap-8">
          <div className="w-full flex items-center justify-center gap-5">
            <div className="w-full max-w-3xl">
              <Image
                src="/rubranner.png"
                alt="Computer Science Department Header"
                width={1200}
                height={400}
                className="w-full h-auto rounded-lg shadow-lg"
                priority
              />
            </div>
            <LoginForm />
          </div>
        </div>
      </div>
    </div>
  );
};

export default function login() {
  return (
    <>
      <Login />;
    </>
  );
}
