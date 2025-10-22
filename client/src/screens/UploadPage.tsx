// import Navbar from "../Components/NavBar";
import UploadStatementContainer from "../Components/UploadStatementContainer";

const UploadPage:React.FC = () => {
  return (
    <div className="bg-background-dark font-display min-h-screen">
      <main className="flex-1 px-4 py-10 md:px-10">
        <div className="flex flex-wrap justify-between gap-3 p-4">
          <div className="flex min-w-72 flex-col gap-3">
            <p className="text-white text-4xl font-black leading-tight tracking-[-0.033em]">
              Welcome to <span className="material-symbols-outlined  font-bold text-blue-500">ParseIQ</span>
            </p>
            <p className="text-[#9dabb9] text-base font-normal leading-normal">
              Skip the scrolling. Let ParseIQ find what matters in seconds.
            </p>
          </div>
        </div>
        <UploadStatementContainer />
      </main>
    </div>
  );
};

export default UploadPage
