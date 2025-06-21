import React from 'react'
import Input from "../../../components/Inputs/Input";
import { LuPlus, LuTrash } from 'react-icons/lu';
const EducationDetailsForm = ({educationInfo,updateArrayItem,addArrayItem,removeArrayItem}) => {
  return (
    <div className='px-5 pt-5'>
        <h2 className='text-lg font-semibold text-gray-900'>Education Details</h2>

        <div className='mt-4 flex flex-col gap-4 mb-3'>
            {educationInfo.map((education, index) => (
                <div 
                className='border border-gray-200/80 p-4 rounded-lg relative'
                key={index}
                >
                    <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                        <Input
                        value={education.progress || ""}
                        onChange={({target}) => updateArrayItem(index, "progress", target.value)}
                        label="Progress"
                        placeholder="B.Tech in Computer Science"
                        type="text"
                        />

                        <Input
                        value={education.institution || ""}
                        onChange={({target}) => updateArrayItem(index, "institution", target.value)}
                        label="Institution"
                        placeholder="VKU University"
                        type="text"
                        />

                        <Input
                        value={education.startDate || ""}
                        onChange={({target}) => updateArrayItem(index, "startDate", target.value)}
                        label="Start Date"
                        type="month"
                        />

                        <Input
                        value={education.endDate || ""}
                        onChange={({target}) => updateArrayItem(index, "endDate", target.value)}
                        label="End Date"
                        type="month"
                        />
                    </div>

                    {EducationDetailsForm.length > 1 && (
                        <button
                        type='button'
                        className='absolute top-3 right-3 text-sm hover:underline cursor-pointer text-red-500 '
                        onClick={() => removeArrayItem(index)}
                        >
                            <LuTrash/>
                        </button>
                    )}
                </div>
            ))}
            <button 
            type='button'
            className='self-start flex items-center gap-2 px-4 py-2 mb-2 rounded bg-purple-100 text-purple-800 font-medium cursor-pointer transition-all text-sm hover:bg-purple-200'
            onClick={() => addArrayItem({
                degree: "",
                institution: "",
                startDate: "",
                endDate: "",
            })}
            >
                <LuPlus/> Add Education
            </button>
        </div>
    </div>
  )
}

export default EducationDetailsForm