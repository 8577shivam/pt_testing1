import React, { useContext, useState, ChangeEvent } from "react";
import { AvailabilityContext } from "./availabilityContext";
import pythonLogo from "../Assets/Python.png";
import angularIcon from "../Assets/Icon/angularIcon.svg";
import nodeIcon from "../Assets/Icon/nodeIcon.svg";
import arrow from "../Assets/Icon/arrow.svg";
import javascript from "../Assets/Icon/javascript.svg";
import StepperControl from "./StepperControl";

interface Skill {
  name: string;
  experience: string | number;
  description: string;
}

interface SkillsSectionProps {
  currentStep: number;
  steps: string[];
  handleNext: () => void;
  handlePrev: () => void;
}

const SkillsSection: React.FC<SkillsSectionProps> = (props) => {
  const { currentStep, steps, handleNext, handlePrev } = props;
  const {
    skills,
    newSkill,
    setSkills,
    setNewSkill,
    currentIndex,
    setCurrentIndex,
  } = useContext(AvailabilityContext)!;

  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isAddSkillExpanded, setIsAddSkillExpanded] = useState<boolean>(false);

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setNewSkill({ ...newSkill, [name]: value });
    setErrors({ ...errors, [name]: "" });
  };

  const addSkill = () => {
    const newErrors: { [key: string]: string } = {};

    if (!newSkill.name) newErrors.name = "Skill name is required.";
    if (!newSkill.experience) newErrors.experience = "Experience is required.";
    if (!newSkill.description) newErrors.description = "Description is required.";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    const skillIndex = skills.findIndex(skill => skill.name === newSkill.name);

    if (skillIndex !== -1) {
      // Skill already exists, update it
      const updatedSkills = [...skills];
      updatedSkills[skillIndex] = newSkill;
      setSkills(updatedSkills);
      if (isEditing) {
        setIsEditing(false);
        setCurrentIndex(null);
      }
    } else {
      // Add new skill
      setSkills([...skills, newSkill]);
    }
    
    setNewSkill({ name: "", experience: "", description: "" });
    setErrors({});
  };

  const cancelEdit = () => {
    setNewSkill({ name: "", experience: "", description: "" });
    setIsEditing(false);
    setCurrentIndex(null);
    setErrors({});
  };

  const editSkill = (index: number) => {
    setNewSkill(skills[index]);
    setIsEditing(true);
    setCurrentIndex(index);
    setErrors({});
  };

  const toggleAddSkillSection = () => {
    setIsAddSkillExpanded(!isAddSkillExpanded);
  };

  const codingLanguages = ["Python", "Angular", "Node", "Javascript"];

  const skillImages: { [key: string]: string } = {
    Python: pythonLogo,
    Angular: angularIcon,
    Node: nodeIcon,
    Javascript: javascript,
  };

  return (
    <div className="App py-6 px-4 bg-[#1f1f1f] rounded-md max-h-[523px] overflow-auto">
      <h2 className="mb-4 text-[18px] font-medium">Top skills:</h2>
      <ul className="grid gap-[12px]">
        {skills.map((skill: Skill, index: number) => (
          <li
            key={index}
            className="flex flex-col border border-gray-400 px-2 rounded-md py-[12px] pr-4"
          >
            <div className="flex justify-between items-center">
              <span className="flex gap-[12px]">
                <img className="object-cover" width={22} height={24} src={skillImages[skill.name]} alt={skill.name} />
                {skill.name}
              </span>
              <button onClick={() => editSkill(index)}>
                <img
                  className={currentIndex === index ? "rotate-180" : "rotate-0"}
                  src={arrow}
                  alt="ArrowIcon"
                />
              </button>
            </div>
            {isEditing && currentIndex === index && (
              <div className="mt-2">
                <div className="bg-[#2D2D2D] px-[16px] py-[12px] rounded-md">
                  <p className="border-b-2 border-gray-600 text-4 font-medium">
                    Edit a skill
                  </p>
                  <div className="flex gap-5">
                    <div className="w-[60%] sm:w-[80%]">
                      <select
                        name="name"
                        value={newSkill.name}
                        onChange={handleInputChange}
                        className="w-full bg-[#2D2D2D] border border-gray-400 px-2 py-2 rounded-md outline-none text-4"
                      >
                        <option value="" disabled selected hidden>
                          Enter your Skill
                        </option>
                        {codingLanguages.map((language, index) => (
                          <option className="bg-[#2D2D2D]" key={index} value={language}>
                            {language}
                          </option>
                        ))}
                      </select>
                      {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
                    </div>
                    <div className="w-[35%] sm:w-[20%]">
                      <input
                        type="text"
                        name="experience"
                        value={newSkill.experience}
                        onChange={handleInputChange}
                        placeholder="Experience in Years"
                        className="w-full bg-transparent border border-gray-400 px-2 py-2 rounded-md outline-none"
                      />
                      {errors.experience && <p className="text-red-500 text-sm">{errors.experience}</p>}
                    </div>
                  </div>
                  <input
                    name="description"
                    value={newSkill.description}
                    onChange={handleInputChange}
                    placeholder="Describe your experience"
                    className="bg-transparent w-[100%] border border-gray-400 rounded-md px-2 py-2 outline-none mt-0"
                  />
                  {errors.description && <p className="text-red-500 text-sm">{errors.description}</p>}
                  <div className="flex gap-4 justify-start sm:justify-end">
                    <button className="px-[24px] py-[6px] bg-[#474747] text-white rounded-md text-[14px] font-[600]" onClick={cancelEdit}>
                      Cancel
                    </button>
                    <button className="px-[24px] py-[6px] text-black bg-[#FFFFFF] rounded-md text-[14px] font-[600]" onClick={addSkill}>
                      Update
                    </button>
                  </div>
                </div>
              </div>
            )}
          </li>
        ))}
      </ul>
      
      <div className="mt-[12px]">
        <div className="bg-[#2D2D2D] px-[16px] py-[12px] rounded-md">
          <div className={`flex justify-between items-center  ${isAddSkillExpanded ? "border-b-2 border-gray-600" : ""}`} onClick={toggleAddSkillSection}>
            <p className={`text-4 font-medium cursor-pointer  ${isAddSkillExpanded ? "pb-[8px]" : ""}`}>
              Add a skill
            </p>
            <img
              className={isAddSkillExpanded ? "rotate-180 cursor-pointer" : "rotate-0 cursor-pointer"}
              src={arrow}
              alt="ArrowIcon"
            />
          </div>
          {isAddSkillExpanded && (
            <div className="mt-2">
              <div className="flex gap-5">
                <div className="w-[60%] sm:w-[80%]">
                  <select
                    name="name"
                    value={newSkill.name}
                    onChange={handleInputChange}
                    className="w-full bg-[#2D2D2D] border border-gray-400 px-2 py-2 rounded-md outline-none text-4"
                  >
                    <option value="" disabled selected hidden>
                      Enter your Skill
                    </option>
                    {codingLanguages.map((language, index) => (
                      <option className="bg-[#2D2D2D]" key={index} value={language}>
                        {language}
                      </option>
                    ))}
                  </select>
                  {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
                </div>
                <div className="w-[35%] sm:w-[20%]">
                  <input
                    type="text"
                    name="experience"
                    value={newSkill.experience}
                    onChange={handleInputChange}
                    placeholder="Experience in Years"
                    className="w-full bg-transparent border border-gray-400 px-2 py-2 rounded-md outline-none"
                  />
                  {errors.experience && <p className="text-red-500 text-sm">{errors.experience}</p>}
                </div>
              </div>
              <input
                name="description"
                value={newSkill.description}
                onChange={handleInputChange}
                placeholder="Describe your experience"
                className="bg-transparent w-[100%] border border-gray-400 rounded-md px-2 py-2 outline-none mt-0"
              />
              {errors.description && <p className="text-red-500 text-sm">{errors.description}</p>}
              <div className="flex gap-4 justify-start sm:justify-end">
                <button className="px-[24px] py-[6px] bg-[#474747] text-white rounded-md text-[14px] font-[600]" onClick={cancelEdit}>
                  Cancel
                </button>
                <button className="px-[24px] py-[6px] text-black bg-[#FFFFFF] rounded-md text-[14px] font-[600]" onClick={addSkill}>
                  Add
                </button>
              </div>
            </div>
          )}
        </div>
        <StepperControl
          currentStep={currentStep}
          steps={steps}
          onNext={handleNext}
          onPrev={handlePrev}
        />
      </div>
    </div>
  );
};

export default SkillsSection;
