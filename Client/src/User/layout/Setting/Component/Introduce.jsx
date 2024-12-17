export default function Introduce() {

    const handleClose = () => {
      window.history.back();
    };
  
    return (
      <div className="bg-purple-700 p-6 rounded-lg shadow-lg max-w-md mx-auto text-center mt-24">
        <h1 className="text-3xl font-bold text-primary mb-4">
          <span className="text-blue-500 text-4xl font-semibold">Z</span>
          <span className="text-green-500 text-4xl font-semibold">I</span>
          <span className="text-orange-500 text-4xl font-semibold">N</span>
          <span className="text-pink-500 text-4xl font-semibold">G</span> mp3
        </h1>
        <p className="text-muted-foreground mb-2">
          Giấy phép mạng xã hội: 157/GP-BTTTT do Bộ Thông tin và Truyền thông cấp
          ngày 24/4/2019
        </p>
        <p className="text-muted-foreground mb-4">
          Chủ quản: Công Ty Cổ Phần VNG Z06 Đường số 13, phường Tân Thuận Đông,
          quận 7, thành phố Hồ Chí Minh, Việt Nam
        </p>
        <button
          onClick={handleClose}
          className="bg-purple-600 w-full text-secondary-foreground hover:bg-purple-900 hover:bg-opacity-50 px-4 py-2 rounded-lg"
        >
          ĐÓNG
        </button>
      </div>
    );
  }
  