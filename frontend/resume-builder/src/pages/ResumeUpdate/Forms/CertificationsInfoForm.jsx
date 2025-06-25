import React from "react";
import Input from "../../../components/Inputs/Input";
import { LuPlus, LuTrash } from "react-icons/lu";
const CertificationsInfoForm = ({
  certificationsInfo,
  updateArrayItem,
  addArrayItem,
  removeArrayItem,
}) => {
  return (
    <div className="px-5 pt-5">
      <h2 className="text-lg font-semibold text-gray-900">Certifications</h2>
      <div className="mt-4 flex flex-col gap-4 mb-3">
        {certificationsInfo.map((certification, index) => (
          <div key={index} className="border border-gray-200/80 p-4 rounded-md relative">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                label="Title"
                onChange={({ target }) =>
                  updateArrayItem(index,"title", target.value)
                }
                placeholder="React Developer Certification"
                type="text"
                value={certification.title || ""}
              />

              <Input
                label="Issuer"
                onChange={({ target }) =>
                  updateArrayItem(index,"issuer", target.value)
                }
                placeholder="Coursera"
                type="text"
                value={certification.issuer}
              />

              <Input
                label="Year"
                onChange={({ target }) => updateArrayItem(index,"year", target.value)}
                type="month"
                value={certification.year}
              />
            </div>
            {certificationsInfo.length > 1 && (
              <button
                className="absolute top-3 right-3 text-sm cursor-pointer text-red-600"
                type="button"
                onClick={() => removeArrayItem(index)}
              >
                <LuTrash />
              </button>
            )}
          </div>
        ))}

        <button
        type="button"
        onClick={() => addArrayItem({
          title: "",
          issuer: "",
          year: ""
        })}
        className="self-start flex items-center gap-2 px-4 py-2 rounded bg-purple-100 text-purple-800 text-sm font-medium hover:bg-purple-200 cursor-pointer transition-all"
        >
          <LuPlus/> Add Certification
        </button>
      </div>
    </div>
  );
};

export default CertificationsInfoForm;
