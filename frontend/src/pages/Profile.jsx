import { PhotoIcon, UserCircleIcon } from '@heroicons/react/24/solid'
import { ChevronDownIcon } from '@heroicons/react/16/solid'
import { useEffect, useState } from 'react'
import axios from 'axios';
import { useNavigate } from "react-router-dom";
export default function Profile() {
  const [image, setImage] = useState(null); 
  const [preview, setPreview] = useState(null); 
  const navigate = useNavigate();
  
    const [profileData, setProfileData] = useState({
        photoUrl: "", 
        postal: "",
        state: "",
        city: "", 
        streetAddress: "",
        shopName: "", 
        sellerName: "",
        email: "",
        mobile: ""
    });
    const handleInputChange = (e)=>{
       const name = e.target.name;
       const value = e.target.value;
       setProfileData(prevData=>({
        ...prevData,
        [name]: value
       }));
    }
 
    const token = localStorage.getItem("token");
  useEffect(()=>{
    const storedToken = localStorage.getItem("token");
    if (!storedToken) {
        console.log("No token found. Redirecting to login...");
        navigate("/Login");
        return;
      }
      const fetchProfile = async()=>{
        try {
            const response = await axios.get('http://localhost:5001/profile', {
                headers:{
                    Authorization: `Bearer ${storedToken}`,
                }
            });
            console.log("response" ,response);
            setProfileData(response?.data);
        } catch (error) {
            console.log(error);
        }
      };
  
        fetchProfile();
      
      
  }, [])
  const handleFormSubmit = async (event) => {
    event.preventDefault();
    console.log("token", token)
    if (!token) {
      alert("Unauthorized: No token found!");
      return;
  }
  const allowedUpdates = ["photoUrl", "postal", "state", "city", "streetAddress", "shopName", "sellerName", "gst"];
  const filteredData = Object.keys(profileData)
    .filter(key => allowedUpdates.includes(key))
    .reduce((obj, key) => {
      obj[key] = profileData[key];
      return obj;
    }, {});

  console.log("Filtered Data:", filteredData); 
  try {
      const response = await axios.patch('http://localhost:5001/profile', filteredData, {
        headers:{
          Authorization: `Bearer ${token}`,
           "Content-Type": "application/json"
        }  
      });
      // alert('Profile updated successfully!');
      setProfileData(response?.data);
    } catch (error) {
      console.error("Error updating profile:", error);
      alert('Failed to update profile.');
    }
  };
  
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result); 
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <form className='px-[20vw]' onSubmit={handleFormSubmit}>
      <div className="space-y-12 ">
        <div className="border-b border-gray-900/10 pb-12">
          <h2 className="text-base/7 font-semibold text-gray-900">Profile</h2>
          <p className="mt-1 text-sm/6 text-gray-600">
            This information will be displayed publicly so be careful what you share.
          </p>

          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div className="sm:col-span-4">
              <label htmlFor="username" className="block text-sm/6 font-medium text-gray-900">
                Seller Name
              </label>
              <div className="mt-2">
                <div className="flex items-center rounded-md bg-white pl-3 outline-1 -outline-offset-1 outline-gray-300 focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-indigo-600">
                  <input
                    id="username"
                    name="sellerName"
                    type="text"
                    placeholder="Ramesh Gupta"
                    className="block min-w-0 grow py-1.5 pr-3 pl-1 text-base text-gray-900 placeholder:text-gray-400 focus:outline-none sm:text-sm/6"
                    value={profileData.sellerName}
                    onChange={handleInputChange}
                 />
                </div>
              </div>
            </div>
            <div className="sm:col-span-4">
              <label htmlFor="username" className="block text-sm/6 font-medium text-gray-900">
                Shop Name
              </label>
              <div className="mt-2">
                <div className="flex items-center rounded-md bg-white pl-3 outline-1 -outline-offset-1 outline-gray-300 focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-indigo-600">
                  <input
                    id="username"
                    name="shopName"
                    type="text"
                    placeholder="Ramesh Gupta"
                    className="block min-w-0 grow py-1.5 pr-3 pl-1 text-base text-gray-900 placeholder:text-gray-400 focus:outline-none sm:text-sm/6"
                    value={profileData.shopName}
                    onChange={handleInputChange}
                />
                </div>
              </div>
            </div>
        <div className="col-span-full">
      <label htmlFor="photo" className="block text-sm/6 font-medium text-gray-900">
        Photo
      </label>
      <div className="mt-2 flex items-center gap-x-3">
        {/* Displaying the image preview or default icon */}
        <div className="h-12 w-12 rounded-full overflow-hidden">
          {preview ? (
            <img src={preview} alt="Profile Preview" className="object-cover h-full w-full" />
          ) : (
            <UserCircleIcon aria-hidden="true" className="h-12 w-12 text-gray-300" />
          )}
        </div>

        <button
          type="button"
          className="rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 ring-1 shadow-xs ring-gray-300 ring-inset hover:bg-gray-50"
          onClick={() => document.getElementById('file-input').click()} 
        >
          Change
        </button>

        {/* Hidden file input */}
        <input
          type="file"
          id="file-input"
          accept="image/*"
          onChange={handleImageChange}
          className="hidden"
        />
      </div>
    </div>

          </div>
        </div>

        <div className="border-b border-gray-900/10 pb-12">
          <h2 className="text-base/7 font-semibold text-gray-900">Personal Information</h2>
          <p className="mt-1 text-sm/6 text-gray-600">Use a permanent address where you can receive mail.</p>

          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
          

            <div className="sm:col-span-3">
              <label htmlFor="email" className="block text-sm/6 font-medium text-gray-900">
                Email address
              </label>
              <div className="mt-2">
              <input
                  id="email"
                  name="email"
                  type="text"
                  autoComplete="email"
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                  value={profileData.email || ""}
                  readOnly
                />
              </div>
            </div>
            <div className="sm:col-span-3">
              <label htmlFor="email" className="block text-sm/6 font-medium text-gray-900">
                Mobile Number
              </label>
              <div className="mt-2">
                <input
                  id="mobile"
                  name="mobile"
                  type="tel"
                  autoComplete="mobile"
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                  value={profileData.mobile || ""}
                  readOnly
                />
              </div>
            </div>

            {/* <div className="sm:col-span-3">
              <label htmlFor="country" className="block text-sm/6 font-medium text-gray-900">
                Country
              </label>
              <div className="mt-2 grid grid-cols-1">
                <select
                  id="country"
                  name="country"
                  autoComplete="country-name"
                  className="col-start-1 row-start-1 w-full appearance-none rounded-md bg-white py-1.5 pr-8 pl-3 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                >
                  <option>United States</option>
                  <option>Canada</option>
                  <option>Mexico</option>
                </select>
                <ChevronDownIcon
                  aria-hidden="true"
                  className="pointer-events-none col-start-1 row-start-1 mr-2 size-5 self-center justify-self-end text-gray-500 sm:size-4"
                />
              </div>
            </div> */}

            <div className="col-span-full">
              <label htmlFor="streetAddress" className="block text-sm/6 font-medium text-gray-900">
                Street address
              </label>
              <div className="mt-2">
                <input
                  id="streetAddress"
                  name="streetAddress"
                  type="text"
                  autoComplete="streetAddress"
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                  value={profileData.streetAddress}
                  onChange={handleInputChange}
               />
              </div>
            </div>

            <div className="sm:col-span-2 sm:col-start-1">
              <label htmlFor="city" className="block text-sm/6 font-medium text-gray-900">
                City
              </label>
              <div className="mt-2">
                <input
                  id="city"
                  name="city"
                  type="text"
                  autoComplete="address-level2"
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                 onChange={handleImageChange}
                 value={profileData.city}
                />
              </div>
            </div>

            <div className="sm:col-span-2">
              <label htmlFor="state" className="block text-sm/6 font-medium text-gray-900">
                State / Province
              </label>
              <div className="mt-2">
                <input
                  id="state"
                  name="state"
                  type="text"
                  autoComplete="address-level1"
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                  value={profileData.state}
                  onChange={handleInputChange}
                />
              </div>
            </div>

            <div className="sm:col-span-2">
              <label htmlFor="postal" className="block text-sm/6 font-medium text-gray-900">
                ZIP / Postal code
              </label>
              <div className="mt-2">
                <input
                  id="postal"
                  name="postal"
                  type="text"
                  autoComplete="postal"
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                  value={profileData.postal}
                  onChange={handleInputChange}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-6 flex items-center justify-end gap-x-6">
        <button type="button" className="text-sm/6 font-semibold text-gray-900">
          Cancel
        </button>
        <button
          type="submit"
          className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Save Settings
        </button>
      </div>
    </form>
  )
}
