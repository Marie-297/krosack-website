import { addressDummyData } from "../../../public/assets/asset";
import { userContext } from "../../../context/AppContext";
import React, { useEffect, useState } from "react";
import { Address } from "@/types/types";
import { africanCountryCodes } from "@/data/countrycode";
import WhatsAppInput from "./whatsapp";

const Order = () => {

  const { currency, router, getCartCount, getCartAmount } = userContext()
  const [selectedAddress, setSelectedAddress] = useState<Address | null>(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const [userAddresses, setUserAddresses] = useState<Address[]>([]);

  const [usageType, setUsageType] = useState<"personal" | "company" | null>(null);
  const [quoteMethod, setQuoteMethod] = useState<"email" | "whatsapp" | null>(null);

  // Form state
  const [personalName, setPersonalName] = useState("");
  const [personalLocation, setPersonalLocation] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [companyAddress, setCompanyAddress] = useState("");
  const [email, setEmail] = useState("");
  const [whatsappNumber, setWhatsappNumber] = useState("");
  const [submitted, setSubmitted] = useState(false);



  const fetchUserAddresses = async () => {
    setUserAddresses(addressDummyData);
  }

  const handleAddressSelect = (address: Address) => {
    setSelectedAddress(address);
    setIsDropdownOpen(false);
  };

  const createOrder = async () => {

  }

   const handleSubmit = () => {
    setSubmitted(true);
    const allErrors = 
      (!usageType) ||
      (usageType === "personal" && (!personalName || !personalLocation)) ||
      (usageType === "company" && (!companyName || !companyAddress)) ||

      (!quoteMethod) ||
      (quoteMethod === "email" && !email) ||
      (quoteMethod === "whatsapp" && (!whatsappNumber || whatsappNumber.length < 10))
      if (allErrors) {
      setSubmitted(true);
      return;
    }

    const summary = {
      usageType,
      personalInfo: usageType === "personal" ? { personalName, personalLocation } : undefined,
      companyInfo: usageType === "company" ? { companyName, companyAddress } : undefined,
      quotePreference: quoteMethod,
      email: quoteMethod === "email" ? email : undefined,
      whatsapp: quoteMethod === "whatsapp" ? whatsappNumber : undefined,
    };

    console.log("Order Summary:", summary);
    alert("Order submitted! Check console for summary.");

    setUsageType(null);
    setQuoteMethod(null);
    setPersonalName("");
    setPersonalLocation("");
    setCompanyName("");
    setCompanyAddress("");
    setEmail("");
    setWhatsappNumber("");
    setSubmitted(false);
  };

  useEffect(() => {
    fetchUserAddresses();
  }, [])

  return (
    <div className="w-full md:w-96 bg-gray-500/5 p-5">
      <h2 className="text-xl md:text-2xl font-medium text-gray-700">
        Request Order Form
      </h2>
      <hr className="border-gray-500/30 my-5" />
      <div className="space-y-6">
        <p className="font-medium text-gray-700">Is this for personal or company use?</p>
        <div className="flex gap-4">
          <button
            onClick={() => setUsageType("personal")}
            className={`px-4 py-2 rounded-lg border ${usageType === "personal" ? "bg-yellow-500 text-white" : "bg-white text-gray-700"}`}
          >
            Personal
          </button>
          <button
            onClick={() => setUsageType("company")}
            className={`px-4 py-2 rounded-lg border ${usageType === "company" ? "bg-yellow-500 text-white" : "bg-white text-gray-700"}`}
          >
            Company
          </button>
        </div>
        <hr className="border-gray-500/30 my-5" />

        {usageType === "personal" && (
        <div className="mb-6 space-y-4">
          <input
            type="text"
            placeholder="Your Name"
            value={personalName}
            onChange={(e) => setPersonalName(e.target.value)}
            className="w-full p-2 border rounded text-gray-700"
          />
          {submitted && usageType === "personal" && !personalName && (
            <p className="text-sm text-red-600">Name is required</p>
          )}
          <input
            type="text"
            placeholder="Your Location"
            value={personalLocation}
            onChange={(e) => setPersonalLocation(e.target.value)}
            className="w-full p-2 border rounded text-gray-700"
          />
          {submitted && usageType === "personal" && !personalLocation && (
            <p className="text-sm text-red-600">Name is required</p>
          )}
        </div>
        )}

        {usageType === "company" && (
          <div className="mb-6 space-y-4">
            <input
              type="text"
              placeholder="Company Name"
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
              className="w-full p-2 border rounded text-gray-700"
            />
            {submitted && usageType === "company" && !companyName && (
              <p className="text-sm text-red-600">Name is required</p>
            )}
            <input
              type="text"
              placeholder="Company Address"
              value={companyAddress}
              onChange={(e) => setCompanyAddress(e.target.value)}
              className="w-full p-2 border rounded text-gray-700"
            />
            {submitted && usageType === "company" && !companyAddress && (
              <p className="text-sm text-red-600">Name is required</p>
            )}
          </div>
        )}

        {/* 3. Quote Preference */}
        <div className="space-y-2 mb-6">
          <p className="font-medium text-gray-700">How do you want your price quote to be sent to you?</p>
          <div className="flex gap-4">
            <button
              onClick={() => setQuoteMethod("email")}
              className={`px-4 py-2 rounded border ${quoteMethod === "email" ? "bg-green-500 text-white" : "bg-white text-gray-700"}`}
            >
              Email
            </button>
            <button
              onClick={() => setQuoteMethod("whatsapp")}
              className={`px-4 py-2 rounded border ${quoteMethod === "whatsapp" ? "bg-green-500 text-white" : "bg-white text-gray-700"}`}
            >
              WhatsApp
            </button>
          </div>
        </div>

        {/* 4. Conditional Input */}
        {quoteMethod === "email" && (
          <div className="mb-6">
            <input
              type="email"
              placeholder="Enter email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-2 border rounded text-gray-700"
            />
            {submitted && !email && (
              <p className="text-sm text-red-600">A verified email is required</p>
            )}
          </div>
        )}

        {quoteMethod === "whatsapp" && (
          <>
            <WhatsAppInput
              value={whatsappNumber}
              onChange={(fullNumber) => setWhatsappNumber(fullNumber)}
              submitted = {submitted}
            />
            {submitted && quoteMethod === "whatsapp" && !whatsappNumber && (
              <p className="text-sm text-red-600">WhatsApp number is required</p>
            )}
          </>
        )}
      </div>

      <button onClick={handleSubmit} className="w-full bg-blue-500 text-white py-3 mt-5 hover:bg-gray-300 hover:text-blue-950 rounded-lg cursor-pointer">
        Request
      </button>
    </div>
  );
};

export default Order;