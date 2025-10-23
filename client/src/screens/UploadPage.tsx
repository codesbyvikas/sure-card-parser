import React from "react";
import UploadContainer from "../Components/UploadStatementContainer";

const UploadPage: React.FC = () => {
  return (
    <div className="bg-background-dark font-display min-h-screen">
      <main className="flex flex-col items-center px-4 py-10 sm:px-6 md:px-10">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 w-full max-w-4xl">
          <div className="flex flex-col gap-3 w-full sm:w-3/4">
            <p className="text-white text-3xl sm:text-4xl font-black leading-tight tracking-[-0.033em]">
              Welcome to{" "}
              <span className="material-symbols-outlined font-bold text-blue-500">
                ParseIQ
              </span>
            </p>
            <p className="text-[#9dabb9] text-base sm:text-lg font-normal leading-normal">
              Skip the scrolling. Let ParseIQ find what matters in seconds.
            </p>
            <p className="text-[#9dabb9] text-sm sm:text-base font-light mt-2 text-center sm:text-left">
              We currently support{" "}
              <span className="text-yellow-400 drop-shadow-[0_0_6px_yellow] font-semibold">
                Kotak Mahindra Bank
              </span>
              ,{" "}
              <span className="text-yellow-400 drop-shadow-[0_0_6px_yellow] font-semibold">
                Flipkart
              </span>
              ,{" "}
              <span className="text-yellow-400 drop-shadow-[0_0_6px_yellow] font-semibold">
                Axis Bank
              </span>
              , and{" "}
              <span className="text-yellow-400 drop-shadow-[0_0_6px_yellow] font-semibold">
                HDFC Bank
              </span>
              .
            </p>
          </div>
        </div>

        <div className="w-full max-w-3xl mt-8 px-2 sm:px-0">
          <UploadContainer />
        </div>
      </main>
    </div>
  );
};

export default UploadPage;
