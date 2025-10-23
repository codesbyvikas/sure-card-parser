import React from "react";
import UploadContainer from "../Components/UploadStatementContainer";

const UploadPage: React.FC = () => {
  return (
    <div className="bg-background-dark font-display min-h-screen">
      <main className="flex-1 px-4 py-10 md:px-10">
        <div className="flex flex-wrap justify-between gap-3 p-4">
          <div className="flex min-w-72 flex-col gap-3">
            <p className="text-white text-4xl font-black leading-tight tracking-[-0.033em]">
              Welcome to{" "}
              <span className="material-symbols-outlined font-bold text-blue-500">
                ParseIQ
              </span>
            </p>
            <p className="text-[#9dabb9] text-base font-normal leading-normal">
              Skip the scrolling. Let ParseIQ find what matters in seconds.
            </p>
            <p className="text-[#9dabb9] text-sm font-light mt-2 text-center">
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
        <UploadContainer />
      </main>
    </div>
  );
};

export default UploadPage;
