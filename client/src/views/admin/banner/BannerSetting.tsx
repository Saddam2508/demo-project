import React, { FC } from "react";

const BannerSetting: FC = () => {
  return (
    <div className="pt-7 flex justify-center">
      <form action="" className="bg-gray-300 w-2xl rounded-lg shadow-md p-6">
        <fieldset className="border flex gap-3">
          <label htmlFor="" className="">
            Gender
          </label>
          <input type="radio" name="x" id="male" />
          <input type="radio" name="x" id="female" />
        </fieldset>
        <fieldset className="border flex gap-3">
          <input type="submit" value="submit" className="bg-white" />
          <input type="reset" value="reset" className="bg-white" />
        </fieldset>
      </form>
    </div>
  );
};

export default BannerSetting;
