import React from "react";
import Input from '../../../components/Inputs/Input'
import { LuPlus, LuTrash } from 'react-icons/lu'
import RatingInput from '../../../components/ResumeSections/RatingInput'

const LanguagesInfoForm = ({
  languagesInfo,
  updateArrayItem,
  addArrayItem,
  removeArrayItem,
}) => {
  return (
    <div className="px-5 pt-5">
      <h2 className="text-lg font-semibold text-gray-900">Languages</h2>

      <div className="mt-4 flex flex-col gap-4 mb-3">
        {languagesInfo.map((language, index) => (
          <div key={index} className="border border-gray-200/80 p-4 rounded-lg relative">
            <div className="grid gird-cols-1 md:grid-cols-2 gap-4">
                <Input
                    label="Language Name"
                    onChange={({target}) => updateArrayItem(index,"name",target.value)}
                    value={language.name||""}
                    type="text"
                    placeholder="Russia"
                 />

                 
            </div>

            {languagesInfo.length > 1 && (
                <button
                type="submit"
                className="absolute top-3 right-3 text-sm text-red-600 hover:underline cursor-pointer"
                onClick={() => removeArrayItem(index)}
                >
                    <LuTrash/>
                </button>
            )}
          </div>
        ))}

        <button
        type="button"
        className="self-start flex items-center gap-2 px-4 py-2 mb-2 rounded-lg bg-purple-100 text-purple-800 hover:bg-purple-200 cursor-pointer transition-all"
        onClick={() => addArrayItem({
            name:"",
            progress: 0,
        })}
        >
            <LuPlus/> Add Language
        </button>
      </div>
    </div>
  );
};

export default LanguagesInfoForm;
