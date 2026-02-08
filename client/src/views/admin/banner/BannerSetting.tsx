'use client';

import { useAppDispatch } from '@/hook/hooks';
import React, { ChangeEvent, FC, useState } from 'react';

const BannerSetting: FC = () => {
  const dispatch = useAppDispatch();

  interface BannerForm {
    _id: string;
    title: string;
    subTitle: string;
    link: '';
    position: number;
    isActive: boolean;
    image: File | null;
    previewImage: string;
  }

  const initialForm: BannerForm = {
    _id: '',
    title: '',
    subTitle: '',
    link: '',
    position: 0,
    isActive: false,
    image: null,
    previewImage: '',
  };

  const [forData, setFormData] = useState<BannerForm>(initialForm);
  const [editIndex, setEditIndex] = useState<string>('');

  // handle Change function

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked, files } = e.target;
    if (name === 'image' && files?.[0]) {
    } else {
    }
  };

  return (
    <div className="pt-7 flex justify-center">
      <form action="" className="bg-gray-100 w-2xl rounded-lg shadow-md p-6 ">
        <fieldset className="flex gap-2 justify-start items-center mb-4">
          {' '}
          <label htmlFor="">Title :</label>
          <input
            type="text"
            name="title"
            className="bg-white p-2 rounded-lg outline-0 focus:ring-2 focus:ring-red-500 "
          />
        </fieldset>
        <fieldset className="flex gap-2 justify-start items-center mb-4">
          {' '}
          <label htmlFor="">Subtitle :</label>
          <input
            type="text"
            name="subTitle"
            className="bg-white p-2 rounded-lg outline-none focus:ring-2 focus:ring-red-500"
          />
        </fieldset>
        <fieldset className="flex gap-2 justify-start items-center mb-4 ">
          {' '}
          <label htmlFor="">Link :</label>
          <input
            type="url"
            name="link"
            className="bg-white p-2 rounded-lg outline-none focus:ring-2 focus:ring-red-500 "
          />
        </fieldset>
        <fieldset className="flex gap-2 justify-start items-center mb-4 ">
          {' '}
          <label htmlFor="">Position :</label>
          <input
            type="number"
            name="position"
            className="bg-white p-2 rounded-lg outline-none focus:ring-2 focus:ring-red-500 "
          />
        </fieldset>
        <fieldset className="flex gap-2 justify-start items-center mb-4">
          <label htmlFor="" className="">
            Active
          </label>
          <input type="checkbox" name="isActive" id="" />
        </fieldset>
        <fieldset className="flex gap-2 justify-start items-center mb-4">
          <label htmlFor="" className="">
            Image
          </label>
          <label htmlFor="imageUpload" className="flex gap-3 items-center">
            <span className="bg-blue-600 text-white px-2 py-2 rounded-lg">
              Choose File
            </span>
            <span className="bg-gray-400 text-white px-2 py-2 rounded-lg">
              No File Chosen
            </span>
          </label>
          <input
            type="file"
            name="isActive"
            id="imageUpload"
            className="hidden"
          />
        </fieldset>

        <fieldset className="flex gap-2 justify-start items-center mb-4">
          <button
            type="submit"
            className="bg-amber-400 py-1 px-2 rounded-lg cursor-pointer hover:bg-amber-500 text-white"
          >
            {editIndex ? 'Update' : 'Submit'}
          </button>
          <button
            type="reset"
            className="bg-red-300 py-1 px-2 rounded-lg cursor-pointer hover:bg-amber-500 text-white"
          >
            Reset
          </button>
        </fieldset>
      </form>
    </div>
  );
};

export default BannerSetting;
