'use client';

import {
  createBanner,
  deleteBanner,
  fetchBanner,
  updateBanner,
} from '@/features/banner/bannerSlice';
import { useAppDispatch, useAppSelector } from '@/hook/hooks';
import Image from 'next/image';
import React, { ChangeEvent, FC, MouseEvent, useEffect, useState } from 'react';
import toast from 'react-hot-toast';

const BannerSetting: FC = () => {
  const dispatch = useAppDispatch();
  const {
    banners,
    fetch,
    create,
    update,
    delete: del,
  } = useAppSelector((state) => state.banner);

  interface BannerForm {
    title: string;
    subTitle: string;
    link: '';
    position: number;
    isActive: boolean;
    image: File[];
    previewImage: string[];
  }

  const initialForm: BannerForm = {
    title: '',
    subTitle: '',
    link: '',
    position: 0,
    isActive: false,
    image: [],
    previewImage: [],
  };

  const [formData, setFormData] = useState<BannerForm>(initialForm);
  const [editIndex, setEditIndex] = useState<string>('');
  const [error, setError] = useState<string>('');

  //useEffect for fetch banner
  useEffect(() => {
    dispatch(fetchBanner());
  }, [dispatch]);

  // change handler
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked, files } = e.target;

    if (name === 'image' && files && files.length > 0) {
      const filesArray = Array.from(files);
      setFormData((prev) => ({
        ...prev,
        image: [...prev.image, ...filesArray],
        previewImage: [
          ...prev.previewImage,
          ...filesArray.map((file) => URL.createObjectURL(file)),
        ],
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]:
          type === 'number'
            ? Number(value)
            : type === 'checkbox'
              ? checked
              : value,
      }));
    }
  };

  // submit handler

  const handleSubmit = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    const fd = new FormData();

    if (formData.title) fd.append('title', formData.title);
    if (formData.subTitle) fd.append('subTitle', formData.subTitle);
    if (formData.link) fd.append('link', formData.link);
    if (formData.position) fd.append('position', formData.position.toString());
    if (formData.isActive) fd.append('isActive', formData.isActive.toString());
    if (formData.image && formData.image.length > 0) {
      formData.image.forEach((file) => {
        fd.append('image', file);
      });
    }
    if (editIndex) {
      dispatch(updateBanner({ id: editIndex, data: fd }))
        .unwrap()
        .then(() => {
          setEditIndex('');
          setFormData(initialForm);
          toast.success('Banner update successfully');
        })
        .catch(() => {
          toast.error('Banner update failed');
        });
    } else {
      dispatch(createBanner(fd))
        .unwrap()
        .then(() => {
          setFormData(initialForm);
          toast.success('Banner create successfully');
        })
        .catch(() => {
          toast.error('Banner create failed');
        });
    }
  };

  // error handleChange function

  useEffect(() => {
    const error =
      fetch.error || create.error || update.error || del.error || '';
    if (!error) return;
    Promise.resolve().then(() => {
      setError(error);
    });
    const timer = setTimeout(() => {
      setError('');
    }, 20000);
    return () => clearTimeout(timer);
  }, [fetch.error, create.error, update.error, del.error]);

  // loading
  const loading =
    fetch.status === 'pending' ||
    create.status === 'pending' ||
    update.status === 'pending' ||
    del.status === 'pending';

  const handleEdit = (id: string) => {
    const banner = banners.find((b) => b._id === id);
    if (!banner) {
      toast.error('Banner not found');
      return;
    }
    if (banner) {
      setFormData({
        title: banner.title || '',
        subTitle: banner.subTitle || '',
        link: banner.link || '',
        position: banner.position || 0,
        isActive: banner.isActive || false,
        image: [],
        previewImage: banner.image ? [...banner.image] : [],
      });
    }
    setEditIndex(id);
  };

  // delete handler
  const handleDelete = (id: string) => {
    dispatch(deleteBanner(id))
      .unwrap()
      .then(() => {
        toast.success('Banner deleted successfully');
      })
      .catch(() => {
        toast.error('Banner delete failed');
      });
  };

  return (
    <div className="container pt-7">
      <div className=" flex justify-center">
        <form action="" className="bg-gray-100 w-2xl rounded-lg shadow-md p-6 ">
          <fieldset className="flex gap-2 justify-start items-center mb-4">
            {' '}
            <label htmlFor="">Title :</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="bg-white p-2 rounded-lg outline-0 focus:ring-2 focus:ring-red-500 "
            />
          </fieldset>
          <fieldset className="flex gap-2 justify-start items-center mb-4">
            {' '}
            <label htmlFor="">Subtitle :</label>
            <input
              type="text"
              name="subTitle"
              value={formData.subTitle}
              onChange={handleChange}
              className="bg-white p-2 rounded-lg outline-none focus:ring-2 focus:ring-red-500"
            />
          </fieldset>
          <fieldset className="flex gap-2 justify-start items-center mb-4 ">
            {' '}
            <label htmlFor="">Link :</label>
            <input
              type="url"
              name="link"
              value={formData.link}
              onChange={handleChange}
              className="bg-white p-2 rounded-lg outline-none focus:ring-2 focus:ring-red-500 "
            />
          </fieldset>
          <fieldset className="flex gap-2 justify-start items-center mb-4 ">
            {' '}
            <label htmlFor="">Position :</label>
            <input
              type="number"
              name="position"
              value={formData.position}
              onChange={handleChange}
              className="bg-white p-2 rounded-lg outline-none focus:ring-2 focus:ring-red-500 "
            />
          </fieldset>
          <fieldset className="flex gap-2 justify-start items-center mb-4">
            <label htmlFor="" className="">
              Active
            </label>
            <input
              type="checkbox"
              name="isActive"
              id="isActive"
              checked={formData.isActive}
              onChange={handleChange}
            />
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
                {formData.image.length > 0
                  ? `${formData.image.length} file(s) selected`
                  : 'No File Chosen'}
              </span>
            </label>
            <input
              type="file"
              name="image"
              id="imageUpload"
              multiple
              className="hidden"
              onChange={handleChange}
            />
            {/* preview image */}
            <div className="mt-2">
              {formData.previewImage.map((file, idx) => (
                <div key={idx} className="relative">
                  <Image
                    loader={({ src }) => src}
                    src={file}
                    alt={`preview-${idx}`}
                    width={50}
                    height={50}
                    className="object-cover rounded"
                  />
                  <button
                    type="button"
                    className="absolute top-0 right-0 bg-red-500 text-white px-1 rounded"
                    onClick={() => {
                      // remove specific image
                      setFormData((prev) => {
                        const newImages = prev.image.filter(
                          (_, i) => i !== idx
                        );

                        const newPreviews = prev.previewImage.filter(
                          (_, i) => i !== idx
                        );
                        return {
                          ...prev,
                          images: newImages,
                          previewImage: newPreviews,
                        };
                      });
                    }}
                  >
                    X
                  </button>
                </div>
              ))}
            </div>
          </fieldset>

          <fieldset className="flex gap-2 justify-start items-center mb-4">
            <button
              type="submit"
              disabled={loading}
              onClick={(e) => handleSubmit(e)}
              className="bg-amber-400 py-1 px-2 rounded-lg cursor-pointer hover:bg-amber-500 text-white flex gap-2 items-center"
            >
              {loading && (
                <svg
                  className="animate-spin h-3 w-3 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v4l3-3-3-3v4a8 8 0 00-8 8h4z"
                  />
                </svg>
              )}
              {editIndex ? 'Update' : 'Submit'}
            </button>
            <button
              type="reset"
              onClick={() => setFormData(initialForm)}
              className="bg-red-300 py-1 px-2 rounded-lg cursor-pointer hover:bg-amber-500 text-white"
            >
              Reset
            </button>
          </fieldset>
        </form>
      </div>
      <div>
        {error && (
          <p className="text-red-500 flex justify-center mt-2">{error}</p>
        )}{' '}
      </div>

      {/* banner list */}
      <div className="banner-list  flex justify-center mt-10">
        {banners && banners.length > 0 ? (
          <table className="w-2xl border-collapse border border-gray-300">
            <thead>
              <tr>
                {[
                  'id',
                  'Title',
                  'Subtitle',
                  'Link',
                  'Position',
                  'Active',
                  'Image',
                  'edit',
                  'delete',
                ].map((header, idx) => (
                  <th
                    key={`${header}-${idx}`}
                    className="text-left p-2 border-b"
                  >
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {banners.map((banner, index) => (
                <tr key={banner._id ?? `banner-${index}`} className="border-b">
                  <td className="p-2"> {index + 1} </td>
                  <td className="p-2">{banner.title}</td>
                  <td className="p-2">{banner.subTitle}</td>
                  <td className="p-2">{banner.link}</td>
                  <td className="p-2">{banner.position}</td>
                  <td className="p-2">
                    {banner.isActive === true ? 'Yes' : 'No'}
                  </td>
                  <td className="p-2">
                    {banner.image && banner.image.length > 0 && (
                      <div className="flex gap-2">
                        {banner.image.map((img, idx) => (
                          <Image
                            key={idx}
                            loader={({ src }) => src}
                            src={img}
                            alt=""
                            width={50}
                            height={50}
                            className="object-cover rounded"
                          />
                        ))}
                      </div>
                    )}
                  </td>
                  <td className="p-2">
                    <button
                      onClick={() => handleEdit(banner._id!)}
                      className="bg-red-300 py-1 px-2 rounded-lg cursor-pointer hover:bg-amber-500 text-white"
                    >
                      Edit
                    </button>
                  </td>
                  <td className="p-2">
                    <button
                      onClick={() => handleDelete(banner._id!)}
                      className="bg-red-500 py-1 px-2 rounded-lg cursor-pointer hover:bg-amber-500 text-white"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div>
            <p className="text-gray-500">No banners found.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default BannerSetting;
