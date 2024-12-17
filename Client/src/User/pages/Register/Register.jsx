import { useNavigate } from "react-router-dom";

export default function Register() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col md:flex-row h-screen mb-5">
      <div className="flex-1 bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center">
        <div className="text-white text-4xl font-bold">
          WELCOME TO ZING
          <p className="text-sm mt-2">
            Đăng ký với thông tin cá nhân của bạn để sử dụng tất cả các tính
            năng của trang web.
          </p>
        </div>
      </div>
      <div className="flex-1 bg-white p-8">
        <span className="justify-center flex items-end cursor-text text-black text-xl mb-4">
          <span className="text-blue-500 text-7xl font-semibold">Z</span>
          <span className="text-green-500 text-7xl font-semibold">I</span>
          <span className="text-orange-500 text-7xl font-semibold">N</span>
          <span className="text-pink-500 text-7xl font-semibold">G</span> mp3
        </span>
        <p className="text-zinc-600 mb-6 text-center">Sign Into Your Account</p>

        <div className="flex justify-center space-x-4 mb-4">
          <button className="bg-blue-600 text-white p-2 rounded-lg">
            Facebook
          </button>
          <button className="bg-blue-400 text-white p-2 rounded-lg">
            Twitter
          </button>
          <button className="bg-red-600 text-white p-2 rounded-lg">
            Google
          </button>
        </div>

        <div className="text-center mb-4">Or</div>

        <form>
          <div className="mb-4">
            <label className="block text-zinc-700" htmlFor="userName">
              Tên đăng nhập
            </label>
            <input
              className="border border-zinc-300 p-2 w-full rounded"
              type="userName"
              id="userName"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-zinc-700" htmlFor="email">
              Email Address
            </label>
            <input
              className="border border-zinc-300 p-2 w-full rounded"
              type="email"
              id="email"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-zinc-700" htmlFor="password">
              Password
            </label>
            <input
              className="border border-zinc-300 p-2 w-full rounded"
              type="password"
              id="password"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-zinc-700" htmlFor="password">
              Confirm Password
            </label>
            <input
              className="border border-zinc-300 p-2 w-full rounded"
              type="password"
              id="password"
              required
            />
          </div>
          <div className="flex items-center mb-4">
            <input type="checkbox" id="remember" className="mr-2" />
            <label htmlFor="remember" className="text-zinc-700">
              Tôi đồng ý với các điều khoản dịch vụ
            </label>
          </div>

          <button className="bg-blue-600 text-white p-2 rounded-lg w-full">
            ĐĂNG KÝ
          </button>
        </form>

        <div className="mt-4 text-center">
          <p className="text-zinc-600">
            Đã có tài khoản? {""}
            <a
              onClick={navigate("/login")}
              href="/login"
              className="text-blue-500 hover:underline"
            >
              Đăng nhập ở đây
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
