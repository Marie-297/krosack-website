'use client'
import React, { useEffect, useState } from "react";
import { assets } from "../../../public/assets/asset";
import Image from "next/image";
import SideBar from "@/components/primary/Sidebar";

const AddProduct = () => {

  const [files, setFiles] = useState<File[]>([]);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [categories, setCategories] = useState<{ id: string; name: string }[]>([]);
  const [category, setCategory] = useState<string>('');
  const [highlight, setHighlight] = useState<string[]>([]);
  const [features, setFeatures] = useState<string[]>([]);
  const [brand, setBrand] = useState('');
  const [color, setColor] = useState('');
  const [stock, setStock] = useState('');
  const [technical, setTechnical] = useState<{ [key: string]: string }>({});
  const [error, setError] = useState("");
  const [highDemand, setHighDemand] = useState(false);
  const [specs, setSpecs] = useState([{ key: "", value: "" }]);

  const handleChange = (index: number, field: "key" | "value", value: string) => {
    const updated = [...specs];
    updated[index][field] = value;
    setSpecs(updated);
  };

  const addField = () => {
    setSpecs([...specs, { key: "", value: "" }]);
  };

  const removeField = (index: number) => {
    setSpecs(specs.filter((_, i) => i !== index));
  };

  const getSpecsAsObject = () => {
    return specs.reduce((obj, item) => {
      if (item.key.trim()) {
        obj[item.key] = item.value;
      }
      return obj;
    }, {} as Record<string, string>);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const technicalSpecs = getSpecsAsObject();
    const base64Images: string[] = [];
    for (const file of files) {
      if (!file) continue;

      const reader = new FileReader();
      const fileBase64: string = await new Promise((resolve, reject) => {
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = (error) => reject(error);
      });

      base64Images.push(fileBase64);
    }

      const res = await fetch('/api/product', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name,
        description,
        category,
        brand,
        color,
        stock:parseInt(stock, 10),
        highDemand,
        highlight,
        features,
        technical: technicalSpecs,
        imageUrl: base64Images,
      }),
    });

      const data = await res.json();

      if (!res.ok) throw new Error(data.error || 'Something went wrong');

      alert('Product added successfully!');
      setFiles([]);
      setName('');
      setDescription('');
      setCategory('');
      setHighlight([]);
      setFeatures([]);
      setBrand('');
      setColor('');
      setStock('');
      setHighDemand(false);
      setTechnical({});
      setSpecs([{ key: '', value: '' }]);
      setError('');
    }

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch('/api/category');
        const data = await res.json();
        console.log('Fetched categories:', data);
        setCategories(data.categories);
      } catch (error) {
        console.error('Failed to fetch categories:', error);
      }
    };

    fetchCategories();
  }, []);


  return (
    <div className="flex">
      <div>
        <SideBar />
      </div>
      <div className="flex-1 min-h-screen flex flex-col justify-between">
        <form onSubmit={handleSubmit} className="md:p-10 p-4 space-y-5 w-full">
          <div>
            <p className="text-base font-medium">Add Images of Product</p>
            <div className="flex flex-wrap gap-4 mt-4">
              {[...Array(8)].map((_, index) => (
                <label
                  key={index}
                  htmlFor={`image${index}`}
                  className="w-24 h-24 rounded-lg border-2 border-dashed border-gray-300 flex items-center justify-center hover:border-blue-500 transition duration-200 bg-gray-50 shadow-sm cursor-pointer relative overflow-hidden group"
                >
                  <input
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                      const fileList = e.target.files;
                      if (!fileList || !fileList[0]) return;
                      const updatedFiles = [...files];
                      updatedFiles[index] = fileList[0];
                      setFiles(updatedFiles);
                    }}
                    type="file"
                    id={`image${index}`}
                    hidden
                  />
                  {files[index] ? (
                    <Image
                      src={URL.createObjectURL(files[index])}
                      alt={`Selected ${index}`}
                      fill
                      className="object-cover w-full h-full"
                    />
                  ) : (
                    <div className="text-gray-400 flex gap-2 text-sm text-center px-2 group-hover:text-blue-500 transition">
                      <Image src={assets.uploadd} width={20} height={20} alt="upload"/>
                      <p>Upload</p>
                    </div>
                  )}
                </label>
              ))}
            </div>
          </div>
          <div className="flex flex-col gap-1 max-w-md">
            <label className="text-base font-medium" htmlFor="product-name">
              Product Name
            </label>
            <input
              id="product-name"
              type="text"
              placeholder="Type here"
              className="outline-none md:py-2.5 py-2 px-3 rounded border border-gray-500/40"
              onChange={(e) => setName(e.target.value)}
              value={name}
              required
            />
          </div>
          <div className="flex flex-col gap-1 w-full">
            <label
              className="text-base font-medium"
              htmlFor="product-description"
            >
              Product Description
            </label>
            <textarea
              id="product-description"
              rows={4}
              className="outline-none md:py-2.5 py-2 px-3 rounded border border-gray-500/40 resize-none"
              placeholder="e.g. description 1, description 2"
              onChange={(e) => setDescription(e.target.value)}
              value={description}
              required
            ></textarea>
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-base font-medium" htmlFor="product-features">Function</label>
            <textarea
              id="product-features"
              rows={4}
              placeholder="Type here"
              value={features}
              required
              className="py-2.5 px-3 rounded border border-gray-500/40"
              onChange={(e) => setFeatures(e.target.value.split(',').map(f => f.trim()))}
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-base font-medium" htmlFor="product-highlight">Highlights</label>
            <textarea
              id="product-highlight"
              rows={4}
              value={highlight}
              required
              placeholder="e.g. Highlight 1, Highlight 2"
              className="py-2.5 px-3 rounded border border-gray-500/40"
              onChange={(e) => setHighlight(e.target.value.split(',').map(h => h.trim()))}
            />
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-base font-medium">Technical Specifications</label>
            {specs.map((spec, index) => (
              <div key={index} className="flex gap-2 items-center">
                <input
                  type="text"
                  placeholder="Key (e.g., Power)"
                  className="py-2.5 px-3 rounded border border-gray-500/40 w-1/3"
                  value={spec.key}
                  onChange={(e) => handleChange(index, "key", e.target.value)}
                />
                <input
                  type="text"
                  placeholder="Value (e.g., Battery)"
                  className="py-2.5 px-3 rounded border border-gray-500/40 w-2/3"
                  value={spec.value}
                  onChange={(e) => handleChange(index, "value", e.target.value)}
                />
                {index > 0 && (
                  <button
                    type="button"
                    onClick={() => removeField(index)}
                    className="text-red-500 font-bold"
                  >
                    &times;
                  </button>
                )}
              </div>
            ))}

            <button
              type="button"
              onClick={addField}
              className="mt-2 text-sm text-blue-600 underline"
            >
              + Add More
            </button>
          </div>
          <div className="flex items-center gap-5 flex-wrap">
            <div className="flex flex-col gap-1 max-w-md">
              <label className="text-base font-medium" htmlFor="category">
                Category
              </label>
              <select
                id="category"
                className="outline-none md:py-2.5 py-2 px-3 rounded border border-gray-500/40"
                onChange={(e) => setCategory(e.target.value)}
                value={category}
              >
                <option value="" disabled>Select category</option>
                {categories?.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex flex-col gap-1 max-w-md">
            <label className="text-base font-medium" htmlFor="brand-input">Brand</label>
            <input
              id="brand-input"
              type="text"
              className="py-2.5 px-3 rounded border border-gray-500/40"
              value={brand}
              onChange={(e) => setBrand(e.target.value)}
            />
          </div>

          <div className="flex flex-col gap-1 max-w-md">
            <label className="text-base font-medium" htmlFor="color">Color</label>
            <input
              id="color"
              type="text"
              className="py-2.5 px-3 rounded border border-gray-500/40"
              value={color}
              onChange={(e) => setColor(e.target.value)}
            />
          </div>
          <div className="flex flex-col gap-1 max-w-md">
            <label className="text-base font-medium" htmlFor="stock">Stock</label>
            <input
              id="stock"
              type="number"
              className="py-2.5 px-3 rounded border border-gray-500/40"
              value={stock}
              onChange={(e) => setStock(e.target.value)}
            />
          </div>
          <div className="flex flex-col gap-1">
            <p className="text-base font-medium">Is this product in high demand?</p>
            <div className="flex items-center gap-2">
              <input
                id="highDemand"
                type="checkbox"
                checked={highDemand}
                onChange={(e) => setHighDemand(e.target.checked)}
              />
              <label htmlFor="highDemand">High Demand?</label>
            </div>
          </div>
          </div>
          <button type="submit" className="px-8 py-2.5 bg-orange-600 text-white font-medium rounded">
            ADD PRODUCT
          </button>
        </form>
        {/* <Footer /> */}
      </div>
    </div>
  );
};

export default AddProduct;