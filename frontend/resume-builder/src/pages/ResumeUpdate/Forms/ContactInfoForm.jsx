import React from 'react'
import ProfilePhotoSelector from '../../../components/Inputs/ProfilePhotoSelector'
import Input from '../../../components/Inputs/Input'

const ContactInfoForm = ({contactInfo, updateSection}) => {
  return (
    <div className='px-5 pt-5'>
        <h2 className='text-lg font-semibold text-gray-900'>Contact Information</h2>

        <div className='mt-4 grid grid-cols-1 md:grid-cols-2 gap-4'>
            <div className='col-span-2'>
                <Input
                label="Address"
                onChange={({target}) => updateSection("location",target.value)}
                placeholder="Short Address"
                type="text"
                value={contactInfo.location || ""}
                />
            </div>

            <Input
            label="Email"
            onChange={({target}) => updateSection("email", target.value)}
            type="email"
            placeholder="yaki@gmail.com"
            value={contactInfo.email ||""}
            />

            <Input
            label="Phone"
            onChange={({target}) => updateSection("phone",target.value)}
            type="number"
            placeholder="+098765343"
            value={contactInfo.phone}
            />

            <Input
            label="LinkedIn"
            onChange={({target}) => updateSection("linkedin",target.value)}
            value={contactInfo.linkedin}
            type="text"
            placeholder="https://www.linkedin.com/in/nam-nam-ba95002ba"
            />

            <Input
            label="Github"
            onChange={({target}) => updateSection("github", target.value)}
            value={contactInfo.github}
            type="text"
            placeholder="https://github.com/namhetcuu"
            />

            <div className='md:col-span-2'>
                <Input
                label="Portfolio / Website"
                placeholder="https://jaki.dev"
                value={contactInfo.website}
                type="text"
                onChange={({target}) => updateSection("website",target.value)}
                />
            </div>
        </div>
    </div>
  )
}

export default ContactInfoForm