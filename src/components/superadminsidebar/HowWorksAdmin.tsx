// /components/HowWorksAdmin.tsx
"use client"; 
import React, { useState, useEffect } from "react"; 
import axios from "axios"; 
import useSWR, { mutate } from "swr"; 
import Image from "next/image"; 
import HowWorksSections from "../home/HowWorksSections";

const fetcher = (url: string) => axios.get(url).then(res => res.data); 

const fileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = error => reject(error);
    });
};

export default function HowWorksAdmin() { 
  const { data, error } = useSWR("/api/howworksapi", fetcher); 

  const [mainHeading, setMainHeading] = useState(""); 
  const [servicesHeading, setServicesHeading] = useState(""); 
  const [steps, setSteps] = useState<any[]>([]); 
  const [services, setServices] = useState<any[]>([]); 

  useEffect(() => { 
    if (data) { 
      setMainHeading(data.mainHeading || ""); 
      setServicesHeading(data.servicesHeading || ""); 
      setSteps(data.steps || []);
      setServices(data.services || []);
    } 
  }, [data]); 
  
  const handleSave = async (payload: any, successMessage: string) => {
    try { 
      await axios.post("/api/howworksapi", payload); 
      // Re-fetch data to update all components using SWR
      mutate("/api/howworksapi"); 

      alert(successMessage); 
    } catch (err) { 
      console.error("Failed to save", err); 
      alert("Error saving data"); 
    } 
  };
  
  // --- Step (How We Work) Handlers ---
  const handleStepChange = (index: number, field: string, value: string) => {
      const newSteps = [...steps];
      newSteps[index][field] = value;
      setSteps(newSteps);
  };
  
  const handleStepImageChange = async (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
        // Convert to Base64
        const base64Image = await fileToBase64(file);
        handleStepChange(index, 'image', base64Image);
    }
  };
  
  const handleStepUpdate = async (index: number) => {
    // Send the complete steps array for update
    await handleSave({ steps: steps }, `Step ${index + 1} updated successfully!`);
  };

  // --- Service (Pay Less Cover More) Handlers ---
  const handleServiceChange = (index: number, field: string, value: string) => {
      const newServices = [...services];
      newServices[index][field] = value;
      setServices(newServices);
  };

  const handleServiceImageChange = async (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
        // Convert to Base64
        const base64Image = await fileToBase64(file);
        handleServiceChange(index, 'image', base64Image);
    }
  };
  
  const handleServiceUpdate = async (index: number) => {
    // Send the complete services array for update
    await handleSave({ services: services }, `Service ${index + 1} updated successfully!`);
  };

  if (error) return <p>Failed to load data</p>; 
  if (!data || steps.length === 0 || services.length === 0) return <p>Loading...</p>; 

  return ( 
    <div style={{ padding: "20px" }}> 
      <h1 className="text-3xl font-bold mb-6">CMS Admin Panel</h1> 
      
      <h2 className="text-2xl font-semibold mt-8 mb-4">Section Headings</h2>
      <div className="flex gap-4 mb-4" style={{ maxWidth: "1000px" }}>
          <div className="w-1/2"> 
              <label className="font-semibold block mb-1">How We Work? Heading:</label> 
              <input 
                  type="text" 
                  value={mainHeading} 
                  onChange={(e) => setMainHeading(e.target.value)} 
                  className="border p-2 rounded w-full mt-1" 
              /> 
          </div> 
          <div className="w-1/2"> 
              <label className="font-semibold block mb-1">Pay Less Cover More Heading:</label> 
              <input 
                  type="text" 
                  value={servicesHeading} 
                  onChange={(e) => setServicesHeading(e.target.value)} 
                  className="border p-2 rounded w-full mt-1" 
              /> 
          </div> 
      </div>
      <button 
          onClick={() => handleSave({ mainHeading, servicesHeading }, "Headings updated successfully!")}
          className="bg-green-500 text-white px-4 py-2 rounded mb-8 hover:bg-green-600 transition" 
      > 
          Update Headings 
      </button> 

      <hr style={{ margin: '40px 0' }} />

      {/* How We Work Items (Steps) - 3 Forms */}
      <h2 className="text-2xl font-semibold mb-4">How We Work? (3 Steps)</h2>
      <div className="flex flex-wrap gap-8">
        {steps.map((item, index) => (
          <div key={index} className="border p-4 rounded-lg shadow-md bg-white w-full sm:w-1/3 min-w-[300px]">
            <h3 className="text-xl font-bold mb-3 text-orange-600">Step {index + 1}</h3>
            
            {/* Name Input */}
            <label className="font-medium block mt-3 mb-1">Name:</label>
            <input 
                type="text" 
                value={item.name} 
                onChange={(e) => handleStepChange(index, 'name', e.target.value)} 
                className="border p-2 rounded w-full" 
            />
            
            {/* Description Input */}
            <label className="font-medium block mt-3 mb-1">Description:</label>
            <textarea 
                value={item.desc} 
                onChange={(e) => handleStepChange(index, 'desc', e.target.value)} 
                className="border p-2 rounded w-full h-20" 
            />
            
            {/* Image Input */}
            <label className="font-medium block mt-3 mb-1">Image (Base64 Upload):</label>
            <input 
                type="file" 
                accept="image/*"
                onChange={(e) => handleStepImageChange(index, e)} 
                className="border p-2 rounded w-full" 
            />
            
            {/* Image Preview */}
            {item.image && (
                <div className="mt-3">
                    <p className="text-sm text-gray-600">Current Image Preview:</p>
                    {/* Width/Height should be consistent with the live component's CSS */}
                    <Image src={item.image} alt="Preview" width={50} height={50} style={{ objectFit: 'contain' }} className="mt-1 border p-1" />
                </div>
            )}
            
            <button 
                onClick={() => handleStepUpdate(index)} 
                className="bg-orange-500 text-white px-4 py-2 rounded w-full mt-4 hover:bg-orange-600 transition" 
            > 
                Update Step {index + 1} 
            </button> 
          </div>
        ))}
      </div>
      
      <hr style={{ margin: '40px 0' }} />

      {/* Pay Less Cover More Items (Services) - 8 Forms */}
      <h2 className="text-2xl font-semibold mb-4">Pay Less Cover More (8 Services)</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {services.map((item, index) => (
          <div key={index} className="border p-4 rounded-lg shadow-md bg-white">
            <h3 className="text-xl font-bold mb-3 text-orange-600">Service {index + 1}</h3>
            
            {/* Name/Description Input (Top Text) */}
            <label className="font-medium block mt-3 mb-1">Top Text (Name):</label>
            <input 
                type="text" 
                value={item.name} 
                onChange={(e) => handleServiceChange(index, 'name', e.target.value)} 
                className="border p-2 rounded w-full" 
            />
            
            {/* Description/Button Text Input (Bottom Button Text) */}
            <label className="font-medium block mt-3 mb-1">Button Text (Desc):</label>
            <input 
                type="text" 
                value={item.desc} 
                onChange={(e) => handleServiceChange(index, 'desc', e.target.value)} 
                className="border p-2 rounded w-full" 
            />
            
            {/* Image Input */}
            <label className="font-medium block mt-3 mb-1">Image (Base64 Upload):</label>
            <input 
                type="file" 
                accept="image/*"
                onChange={(e) => handleServiceImageChange(index, e)} 
                className="border p-2 rounded w-full" 
            />

            {/* Image Preview */}
            {item.image && (
                <div className="mt-3">
                    <p className="text-sm text-gray-600">Current Image Preview:</p>
                    <Image src={item.image} alt="Preview" width={50} height={50} style={{ objectFit: 'contain' }} className="mt-1 border p-1" />
                </div>
            )}
            
            <button 
                onClick={() => handleServiceUpdate(index)} 
                className="bg-orange-500 text-white px-4 py-2 rounded w-full mt-4 hover:bg-orange-600 transition" 
            > 
                Update Service {index + 1} 
            </button> 
          </div>
        ))}
      </div>

      <hr style={{ margin: '40px 0' }} />

      {/* Live Preview */} 
      <div 
        style={{ 
          border: "2px dashed #ddd", 
          borderRadius: "12px", 
          padding: "20px", 
          background: "#fafafa", 
          marginTop: "40px", 
          width: "100%", 
        }} 
      > 
        <h2 style={{ marginBottom: "15px", color: "#666" }} className="text-2xl font-bold">Live Preview</h2> 
        <HowWorksSections/>
      </div> 
    </div> 
  ); 
}