import LoginButton from "@/components/Loginbutton";
import Image from "next/image";
import ruImgae from "../../public/rubranner.png"
import logoRu from "../../public/logo.svg"

const Login = () => {
  return (
    <div>
      <div className="min-h-screen bg-gradient-to-t from-blue-800 via-blue-800 to-yellow-400 flex items-center justify-center p-4">
        <div className="w-full max-w-7xl flex flex-col lg:flex-row items-center justify-center gap-8">
          {/* Left Side - Header Image (60%) */}
          <div className="w-full lg:w-[60%] flex items-center justify-center">
            <div className="w-full max-w-3xl">
              <Image
                src={ruImgae}
                alt="Computer Science Department Header"
                width={1200}
                height={400}
                className="w-full h-auto rounded-lg shadow-lg"
                priority
              />
            </div>
          </div>

          {/* Right Side - Login Card (40%) */}
          <div className="w-full lg:w-[40%] flex items-center justify-center">
            <div className="w-full max-w-md bg-white/95 backdrop-blur-sm p-8 rounded-lg shadow-xl">
              <div className="mb-6 text-center">
                <Image
                  src={logoRu}
                  alt="CS RU Logo"
                  width={80}
                  height={80}
                  className="mx-auto mb-4"
                />
                <h1 className="text-2xl font-bold mb-2 text-primary">
                  ระบบจัดการครุภัณฑ์
                </h1>
                <p className="text-gray-600">สาขาวิทยาการคอมพิวเตอร์</p>
                <p className="text-gray-600">
                  คณะวิทยาศาสตร์ มหาวิทยาลัยรามคำแหง
                </p>
              </div>
              <LoginButton />
              <div className="mt-6 text-center text-sm text-gray-500">
                กรุณาเข้าสู่ระบบด้วยอีเมลสถาบัน @rumail.ru.ac.th
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default function Home() {
  return (
    <>
      <Login />
    </>
  );
}
