import React from "react";
import Input from "../../../components/Inputs/Input";
import { LuPlus, LuTrash, LuTrash2 } from "react-icons/lu";
import RatingInput from "../../../components/ResumeSections/RatingInput";
const AdditionalInfoForm = ({
  languages,
  interests,
  addArrayItem,
  updateArrayItem,
  removeArrayItem,
}) => {
  return (
    <div className="px-5 pt-5 ">
      <h3 className="text-lg font-semibold text-gray-900">Additional Form</h3>

      <div className="mt-6">
        <h3 className="text-sm font-semibold text-gray-700 mb-2">Languages</h3>
        <div className="flex flex-col gap-4">
          {languages?.map((language, index) => (
            <div
              key={index}
              className="border border-gray-200 p-4 rounded-lg relative"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-start">
                <Input
                  label="Language"
                  onChange={({ target }) =>
                    updateArrayItem("languages", index, "name", target.value)
                  }
                  placeholder="e.g. English"
                  type="text"
                  value={language.name || ""}
                />

                <div className="flex flex-col">
                  <label
                    htmlFor=""
                    className="font-medium text-slate-600 mb-7 block"
                  >
                    Proficiency ({language.progress / 20 || 0}/5)
                  </label>

                  <RatingInput
                    value={language.progress || 0}
                    
                    onChange={(value) =>
                      updateArrayItem(
                        "languages",
                        index,
                        "progress",
                        value
                      )
                    }
                    total={5}
                  />
                </div>
              </div>
              {languages.length > 1 && (
                <button
                  type="button"
                  className="absolute top-3 right-3 text-sm hover:underline cursor-pointer text-red-600"
                  onClick={() => removeArrayItem("languages", index)}
                >
                  <LuTrash />
                </button>
              )}
            </div>
          ))}

          <button
            type="button"
            className="self-start flex items-center gap-2 px-4 py-2 mb-2 rounded-lg bg-purple-100 text-purple-800 hover:bg-purple-200 cursor-pointer transition-all"
            onClick={() =>
              addArrayItem("languages", {
                name: "",
                progress: 0,
              })
            }
          >
            <LuPlus /> Add Language
          </button>
        </div>
      </div>

      <div className="mt-8 mb-4">
        <h3 className="text-sm font-semibold text-gray-700">Interests</h3>

        <div className="flex flex-col gap-4 mt-3">
          {interests.map((interest, index) => (
            <div
              key={index}
              className=" rounded-lg relative"
            >
              <Input
                onChange={({ target }) =>
                  updateArrayItem("interests", index, null, target.value)
                }
                placeholder="e.g. Reading"
                value={interest || ""}
              />
              {interests.length > 1 && (
                <button
                  type="button"
                  className="absolute top-6.5 right-3 text-sm hover:underline cursor-pointer text-red-600"
                  onClick={() => removeArrayItem("interests", index)}
                >
                  <LuTrash2 />
                </button>
              )}
            </div>
          ))}

          <button
            type="button"
            className="self-start flex items-center gap-2 px-4 py-2 mb-2 rounded-lg bg-purple-100 text-purple-800 hover:bg-purple-200 cursor-pointer transition-all"
            onClick={() => addArrayItem("interests", "")}
          >
            <LuPlus /> Add Interest
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdditionalInfoForm;
