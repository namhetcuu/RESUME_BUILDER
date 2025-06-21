import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import DashboardLayout from "../../components/Layouts/DashboardLayout";
import TitleInput from "../../components/Inputs/TitleInput";
import { useReactToPrint } from "react-to-print";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";
import {
  LuArrowLeft,
  LuCircleAlert,
  LuDelete,
  LuDownload,
  LuPalette,
  LuSave,
} from "react-icons/lu";
import StepProgress from "../../components/StepProgress";
import ProfileInfoForm from "./Forms/ProfileInfoForm";
import ContactInfoForm from "./Forms/ContactInfoForm";
import WorkExperienceForm from "./Forms/WorkExperienceForm";
import EducationDetailsForm from "./Forms/EducationDetailsForm";
import SkillsInfoForm from "./Forms/SkillsInfoForm";

const EditResume = () => {
  const { resumeId } = useParams();
  const navigate = useNavigate();

  const resumeRef = useRef(null);
  const resumeDownloadRef = useRef(null);

  const [baseWidth, setBaseWidth] = useState(800);

  const [openThemeSelector, setOpenThemeSelector] = useState(false);

  const [openPreviewModal, setOpenPreviewModal] = useState(false);
  const [currentPage, setCurrentPage] = useState("skills-info");

  const [progress, setProgress] = useState(0);
  const [resumeData, setResumeData] = useState({
    title: "",
    thumbnailLink: "",
    profileInfo: {
      profileImg: null,
      profilePreviewUrl: "",
      fullName: "",
      designation: "",
      summary: "",
    },
    template: {
      theme: "",
      colorPalette: "",
    },
    contactInfo: {
      email: "",
      phone: "",
      location: "",
      linkedin: "",
      github: "",
      website: "",
    },
    workExperience: [
      {
        company: "",
        role: "",
        startDate: "",
        endDate: "",
        description: "",
      },
    ],
    education: [
      {
        degree: "",
        institution: "",
        startDate: "",
        endDate: "",
      },
    ],
    skills: [{ name: "", progress: 0 }],
    projects: [
      {
        title: "",
        description: "",
        github: "",
        liveDemo: "",
      },
    ],
    certifications: [
      {
        title: "",
        issuer: "",
        year: "",
      },
    ],
    languages: [
      {
        name: "",
        progress: 0,
      },
    ],
    interests: [""],
  });

  const [errorMsg, setErrorMsg] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  //validate inputs
  const validateAndNext = (e) => {};

  //function to navigate the next page
  const goToNextPage = () => {};

  //function to navigate the previous page
  const goBack = () => {};

  const renderForm = () => {
    switch (currentPage) {
      case "profile-info":
        return (
          <ProfileInfoForm
            profileData={resumeData?.profileInfo}
            updateSection={(key, value) => {
              updateSection("profileInfo", key, value);
            }}
            onNext={validateAndNext}
          />
        );

      case "contact-info":
        return (
          <ContactInfoForm
            contactInfo={resumeData?.contactInfo}
            updateSection={(key, value) => {
              updateSection("contactInfo", key, value);
            }}
          />
        );
      case "work-experience":
        return (
          <WorkExperienceForm
            workExperience={resumeData?.workExperience}
            updateArrayItem={(index, key, value) => {
              updateArrayItem("workExperience", index, key, value);
            }}
            addArrayItem={(newItem) => addArrayItem("workExperience", newItem)}
            removeArrayItem={(index) =>
              removeArrayItem("workExperience", index)
            }
          />
        );
      case "education-info":
        return (
          <EducationDetailsForm
          educationInfo={resumeData?.education}
          updateArrayItem={(index,key,value) => {
            updateArrayItem("education",index,key,value);
          }}
          addArrayItem={(newItem) => addArrayItem("education", newItem)}
          removeArrayItem= {(index) => removeArrayItem("education", index)}
          />
        )
      case "skills-info":
        return (
          <SkillsInfoForm
            skillsInfo = {resumeData?.skills}
            updateArrayItem={(index,key,value) => {
              updateArrayItem("skills",index,key,value);
            }}
            addArrayItem={(newItem) => addArrayItem("skills", newItem)}
            removeArrayItem={(index) => removeArrayItem("skills", index)}
          />
        )
      case "projects-info":
        return (
          <ProjectsInfoForm
            projectsInfo = {resumeData?.projects}
            updateArrayItem={(index,key,value) => {
              updateArrayItem("projects",index,key,value);
            }}
              addArrayItem={(newItem) => addArrayItem("projects", newItem)}
              removeArrayItem={(index) => removeArrayItem("projects",index)}
          />
        )
      case "certifications-info":
        return (
          <CertificationsInfoForm
          certificationsInfo = {resumeData?.certifications}
          updateArrayItem={(index,key,value) => {
            updateArrayItem("certifications", index,key,value);
          }}
          addArrayItem={(newItem) => addArrayItem("certifications", newItem)}
          removeArrayItem={(index) => removeArrayItem("certifications",index)}
          />
        )
      case "languages-info":
        return (
          <LanguagesInfoForm 
            languagesInfo = {resumeData?.languages}
            updateArrayItem = {(index,key,value) => {
              updateArrayItem("languages", index, key, value);
            }}
            addArrayItem={(newItem) => addArrayItem("languages", newItem)}
            removeArrayItem = {(index) => removeArrayItem("languages", index)}
          />
        )
      case "interests-info":
        return (
          <InterestsInfoForm

          />
        )
      default:
        return null;
    }
  };

  //update simple nested object (like profileInfo, contactInfo, etc...)
  const updateSection = (section, key, value) => {
    setResumeData((prev) => ({
      ...prev,
      [section]: {
        ...prev[section],
        [key]: value,
      },
    }));
  };

  //update array item (like workExperience[0], skills[1], etc...)
  const updateArrayItem = (section, index, key, value) => {
    setResumeData((prev) => {
      const updatedArray = [...prev[section]];
      if (key === null) {
        updatedArray[index] = value;
      }else{
        updatedArray[index] = {
          ...updatedArray[index],
          [key]: value
        }
      }

      return {
        ...prev,
        [section]: updatedArray,
      }
    });
  };

  //Add item to array
  const addArrayItem = (section, newItem) => {
    setResumeData((prev) => (
      {
        ...prev,
        [section]: [...prev[section], newItem]
      }
    ))
  };

  //Remove item from array
  const removeArrayItem = (section, index) => {
    setResumeData((prev) => {
      const updatedArray = [...prev[section]];
      updatedArray.splice(index,1);
      return {
        ...prev,
        [section]: updatedArray
      }
    })
  };

  //Fetch resume info by ID
  const fetchResumeDetailsById = async () => {
    try {
      const response = await axiosInstance.get(
        API_PATHS.RESUME.GET_BY_ID(resumeId)
      );

      if (response.data && response.data.profileInfo) {
        const resumeInfo = response.data;

        setResumeData((prevState) => ({
          ...prevState,
          title: resumeInfo?.title || "Untitled",
          template: resumeInfo?.template || prevState?.template,
          profileInfo: resumeInfo?.profileInfo || prevState?.profileInfo,
          contactInfo: resumeInfo?.contactInfo || prevState?.contactInfo,
          workExperience:
            resumeInfo?.workExperience || prevState?.workExperience,
          education: resumeInfo?.education || prevState?.education,
          skills: resumeInfo?.skills || prevState?.skills,
          projects: resumeInfo?.projects || prevState?.projects,
          certifications:
            resumeInfo?.certifications || prevState?.certifications,
          languages: resumeInfo?.languages || prevState?.languages,
          interests: resumeInfo?.interests || prevState?.interests,
        }));
      }
    } catch (error) {
      console.log("Error fetching resumes: ", error);
    }
  };

  //upload Thumbnail and resume profile img
  const uploadResumeImages = async () => {};

  const updateResumeDetails = async (thumbnailLink, profilePreviewUrl) => {};

  const deleteResume = async () => {};

  //dowload resume
  const reactToPrintFn = useReactToPrint({ contentRef: resumeDownloadRef });

  //function to update baseWidth based on the resume container size
  const updateBaseWidth = () => {};

  useEffect(() => {
    updateBaseWidth();

    window.addEventListener("resize", updateBaseWidth);

    if (resumeId) {
      fetchResumeDetailsById();
    }
    return () => {
      window.removeEventListener("resize", updateBaseWidth);
    };
  }, []);
  return (
    <DashboardLayout>
      <div className="container mx-auto">
        <div className="flex items-center justify-between gap-5 bg-white rounded-lg border border-purple-100 py-3 px-4 md-4 ">
          <TitleInput
            title={resumeData.title}
            setTitle={(value) =>
              setResumeData((prevState) => ({
                ...prevState,
                title: value,
              }))
            }
          />
          <div className="flex items-center gap-4">
            <button
              className="btn-small-light"
              onClick={() => setOpenThemeSelector(true)}
            >
              <LuPalette className="text-[16px]" />
              <span className="hidden md:block">Change Theme</span>
            </button>

            <button className="btn-small-light" onClick={deleteResume}>
              <LuDelete className="text-[16px]" />
              <span className="hidden md:block">Delete</span>
            </button>

            <button
              className="btn-small-light"
              onClick={() => setOpenPreviewModal(true)}
            >
              <LuDownload className="text-[16px]" />
              <span className="hidden md:block">Preview and Download</span>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 mt-5 md:grid-cols-2 gap-5">
          <div className="bg-white rounded-lg border border-purple-100 overflow-hidden">
            <StepProgress progress={30} />

            {renderForm()}

            <div className="mx-5">
              {errorMsg && (
                <div className="flex items-center gap-2 text-[11px] font-medium text-amber-600 bg-amber-100 px-2 py-0.5 ">
                  <LuCircleAlert className="text-md" /> {errorMsg}
                </div>
              )}

              <div className="flex items-end justify-end gap-3 mt-3 mb-5">
                <button
                  className="btn-small-light"
                  onClick={goBack}
                  disabled={isLoading}
                >
                  <LuArrowLeft className="text-[16px]" />
                  Back
                </button>

                <button
                  className="btn-small-light"
                  onClick={uploadResumeImages}
                  disabled={isLoading}
                >
                  <LuSave className="text-[16px]" />
                  {isLoading ? "Updating..." : "Save & Exit"}
                </button>

                <button
                  className="btn-small"
                  onClick={validateAndNext}
                  disabled={isLoading}
                >
                  {currentPage === "additionalInfo" && (
                    <LuDownload className="text-[16px]" />
                  )}

                  {currentPage === "additionalInfo"
                    ? "Preview & Download"
                    : "Next"}

                  {currentPage !== "additionalInfo" && (
                    <LuArrowLeft className="text-[16px] rotate-180" />
                  )}
                </button>
              </div>
            </div>
            <div ref={resumeRef} className="h-[100vh]">
              {/* Resume Template */}
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default EditResume;
