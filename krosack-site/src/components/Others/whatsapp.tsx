import React, { useState } from "react";
import { africanCountryCodes } from "@/data/countrycode";
import { AsYouType, getExampleNumber, CountryCode } from "libphonenumber-js";
import examples from 'libphonenumber-js/examples.mobile.json';

interface Props {
  value: string;
  onChange: (fullNumber: string) => void;
  submitted: boolean;
}
const getMaxLength = (country: CountryCode): number => {
  try {
    const example = getExampleNumber(country, examples);
    return example?.nationalNumber.length || 12;
  } catch {
    return 12; // fallback
  }
};

const WhatsAppInput: React.FC<Props> = ({ value, onChange, submitted }) => {
  const [code, setCode] = useState("+233");
  const [number, setNumber] = useState("");
  const [error, setError] = useState("");

  const selectedCountry = africanCountryCodes.find((c) => c.code === code);
  const countryISO = selectedCountry?.initial as CountryCode | undefined;
  const maxLength = countryISO ? getMaxLength(countryISO) : 12;

  const handleNumberChange = (input: string) => {
    const digitsOnly = input.replace(/\D/g, "");
    if (digitsOnly.length > maxLength) return;
    const formatter = new AsYouType(countryISO);
    const formatted = formatter.input(code + digitsOnly);

    const nationalNumber = formatted.replace(code, "").trim();
    setNumber(nationalNumber);
    onChange(code + digitsOnly);

    if (!/^\d{8,12}$/.test(digitsOnly)) {
      setError("Enter a valid number (8–12 digits)");
    } else {
      setError("");
    }
  };

  return (
    <div className="mb-6">
      <label className="block text-gray-700 mb-2">WhatsApp Number</label>
      <div className="flex gap-2 items-center">
        <select
          title="code"
          value={code}
          onChange={(e) => {
            setCode(e.target.value);
            onChange(e.target.value + number.replace(/\D/g, ""));
          }}
          className="w-28 px-3 py-2 border border-gray-300 rounded-lg bg-white text-gray-700 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        >
          {africanCountryCodes.map((country) => (
            <option key={country.code} value={country.code}>
              {country.flag} {country.initial} ({country.code})
            </option>
          ))}
        </select>

        <input
          type="tel"
          placeholder="Enter WhatsApp number"
          value={number}
          onChange={(e) => handleNumberChange(e.target.value)}
          className={`flex-grow px-4 py-2 border rounded-lg text-gray-700 focus:outline-none focus:ring-2 ${
            error
              ? "border-red-500 ring-red-300"
              : "border-gray-300 ring-blue-500"
          }`}
        />
      </div>
      {submitted && error && <p className="text-sm text-red-600 mt-1">{error}</p>}
    </div>
  );
};

export default WhatsAppInput;
