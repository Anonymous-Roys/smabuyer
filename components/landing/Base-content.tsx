import React from "react";
import { HandCoins, Headset, ShieldCheck, Truck } from "lucide-react";

const BaseIcon = () => {
  return (
    <div className="my-9 grid grid-cols-4  mx-auto max-w-[90%] py-5 px-4 shadow-md bg-white gap-4 max-md:grid-cols-3 max-sm:grid-cols-2">
      <div className="flex items-center gap-2 max-sm:flex-col">
        <Truck aria-label="Fast Delivery" className="w-8 h-8 text-[#028F02]" />
        <div>
          <p className="text-md font-semibold  text-[#028F02]">Fast Delivery</p>
          <p className="text-sm text-gray-500">On all products Purchased</p>
        </div>
      </div>
      <div className="flex items-center gap-2 max-sm:flex-col">
        <ShieldCheck
          aria-label="Secure Payment"
          className="w-8 h-8 text-[#028F02]"
        />
        <div>
          <p className="text-md font-semibold  text-[#028F02]">
            Secure Payment
          </p>
          <p className="text-sm text-gray-500">We ensure secure payment</p>
        </div>
      </div>
      <div className="flex items-center gap-2 max-sm:flex-col">
        <HandCoins aria-label="Money Back" className="w-8 h-8 text-[#028F02]" />
        <div>
          <p className="text-md font-semibold  text-[#028F02]">
            100% Money Back
          </p>
          <p className="text-sm text-gray-500">14 days money back guarantee</p>
        </div>
      </div>
      <div className="flex items-center gap-2 max-sm:flex-col">
        <Headset
          aria-label="Customer Support"
          className="w-8 h-8 text-[#028F02]"
        />
        <div>
          <p className="text-md font-semibold  text-[#028F02]">
            Customer Support
          </p>
          <p className="text-sm text-gray-500">24/7 Technical Support</p>
        </div>
      </div>
    </div>
  );
};

export default BaseIcon;
