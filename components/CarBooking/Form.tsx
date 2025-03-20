"use client"
import { BookCreatedFlagContext } from '@/context/BookCreatedFlagContext';
import { createBooking, getStoreLocations } from '@/services';
import React, { useContext, useEffect, useState } from 'react';

const Form = ({car}:any) => {

    const [storeLocation, setStoreLocation ] = useState<any>([]);
    const {showToastMsg, setShowToastMsg} = useContext(BookCreatedFlagContext);
    const [formValue, setFormValue] = useState<any>({
      location: '',
      pickUpDate: '',
      dropOffDate: '',
      pickUpTime: '',
      dropOffTime: '',
      contactNumber: '',
      email: '',
      userName: "Souhail",
      carId: "",
    });
//{connect: {id: ""}}
    const today: any = new Date()
    useEffect(() => {
        getStoreLocation_();
    }, []);

    useEffect(() => {
      if(car)
      {
        setFormValue({
          ...formValue,
          carId: car.id
        });
      }
    }, [car])

    const getStoreLocation_= async() => {
        const resp:any = await getStoreLocations();
        //console.log(resp);
        setStoreLocation(resp?.storesLocations);
    }


    const handleChange = (event: any) => {
      setFormValue({
        ...formValue,
        [event.target.name]: event.target.value
      });
    }

    const handleSubmit=async()=>{
      console.log(formValue);
      const resp = await createBooking(formValue);
      console.log(resp)

      if(resp)
      {
        setShowToastMsg(true);
      }
    }

  return (
    <div>
      <div className='flex flex-col w-full mb-5'>
        <label className='text-gray-400'>Pickup Location</label>
        <select  defaultValue='Pickup Location'  className='select select-bordered' name='location' onChange={handleChange}>
          <option disabled  >
            Pickup Location
          </option>
          {storeLocation&&storeLocation.map((loc:any, index:number)=> (
             <option key={index}>{loc?.address}</option>
          ))}
        </select>
      </div>

      <div className='flex  gap-5 mb-5'>
        <div className='flex flex-col w-full mb-5'>
          <label className='text-gray-400'>Pickup Date</label>
          <input
            type='date'
            onChange={handleChange}
            min={today}
            name='pickUpDate'
            placeholder='type here'
            className='input input-bordered w-full max-w-lg'
          />
        </div>

        <div className='flex flex-col w-full mb-5'>
          <label className='text-gray-400'>Drop Off Date</label>
          <input
            type='date'
            onChange={handleChange}
            name='dropOffDate'
            placeholder='type here'
            className='input input-bordered w-full max-w-lg'
          />
        </div>
      </div>

      <div className='flex  gap-5 mb-5'>
        <div className='flex flex-col w-full mb-5'>
          <label className='text-gray-400'>Pickup Time</label>
          <input
            type='time'
            onChange={handleChange}
            name='pickUpTime'
            placeholder='type here'
            className='input input-bordered w-full max-w-lg'
          />
        </div>

        <div className='flex flex-col w-full mb-5'>
          <label className='text-gray-400'>Drop Off Time</label>
          <input
            type='time'
            onChange={handleChange}
            name='dropOffTime'
            placeholder='type here'
            className='input input-bordered w-full max-w-lg'
          />
        </div>
      </div>

      <div className='flex flex-col w-full mb-5'>
        <label className='text-gray-400'>Contact Number</label>
        <input
          type='text'
          onChange={handleChange}
          name='contactNumber'
          placeholder='type here'
          className='input input-bordered w-full max-w-lg'
        />
      </div>

      <div className='flex flex-col w-full mb-5'>
  <label className='text-gray-400'>Email</label>
  <input
    type='email'
    onChange={handleChange}
    name='email'
    placeholder='Enter your email'
    className='input input-bordered w-full max-w-lg'
  />
</div>

      <div className='modal-action'>
        <form method='dialog'>
          {/* if there is a button, it will close the modal */}
          <button className='btn rounded-[20px] mr-4'>Close</button>
          <button className='btn bg-blue-500 text-white hover:bg-blue-800 duration-1000 rounded-[20px]' onClick={handleSubmit}>
            Save
          </button>
        </form>
      </div>
    </div>
  );
};

export default Form;
