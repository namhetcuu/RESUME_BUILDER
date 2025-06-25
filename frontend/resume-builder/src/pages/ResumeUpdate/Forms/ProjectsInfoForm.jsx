import React from "react";
import Input from "../../../components/Inputs/Input";
import { LuPlus, LuTrash } from "react-icons/lu";
const ProjectsInfoForm = ({
  projectsInfo,
  updateArrayItem,
  addArrayItem,
  removeArrayItem,
}) => {
  return (
    <div className="px-5 pt-5">
      <h2 className="text-lg font-semibold text-gray-900">Project</h2>

      <div className="mt-4 flex flex-col gap-4 mb-3">
        {projectsInfo.map((project, index) => (
          <div className="border border-gray-200/80 p-4 rounded-lg relative">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                value={project.title}
                label="Title"
                onChange={({ target }) =>
                  updateArrayItem(index, "title", target.value)
                }
                placeholder="Portfolio by Yaki"
                type="text"
              />

              <Input
                value={project.github}
                onChange={({ target }) =>
                  updateArrayItem(index, "github", target.value)
                }
                label="Github"
                type="text"
                placeholder="http://namhetcuu.io"
              />

              <Input
                value={project.liveDemo}
                onChange={({ target }) =>
                  updateArrayItem(index, "liveDemo", target.value)
                }
                label="Live Demo"
                type="text"
                placeholder="https://johndoe.netlify.app"
              />
            </div>

            <div className="mt-4">
              <label htmlFor="" className="text-sm font-medium text-slate-600">
                Description
              </label>

              <textarea
                placeholder="What do you do in this project"
                className="form-input w-full mt-1"
                rows={3}
                value={project.description}
                onChange={({ target }) =>
                  updateArrayItem(index, "description", target.value)
                }
              ></textarea>
            </div>

            {projectsInfo.length > 1 && (
              <button
                type="button"
                className="absolute top-3 right-3 text-sm hover: underline cursor-pointer text-red-600"
                onClick={() => removeArrayItem(index)}
              >
                <LuTrash />
              </button>
            )}
          </div>
        ))}

        <button
          type="button"
          className="self-start flex items-center gap-2 px-4 py-2 mb-2 rounded bg-purple-100 text-purple-800 text-sm font-medium hover:bg-purple-200 cursor-pointer transition-all"
          onClick={() =>
            addArrayItem({
              title: "",
              description: "",
              github: "",
              liveDemo: "",
            })
          }
        >
          <LuPlus /> Add Project
        </button>
      </div>
    </div>
  );
};

export default ProjectsInfoForm;
