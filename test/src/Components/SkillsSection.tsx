import React, { useContext, useState, ChangeEvent } from "react";
import { AvailabilityContext } from "./availabilityContext";
import pythonLogo from "../Assets/Python.png";
import angularIcon from "../Assets/Icon/angularIcon.svg";
import nodeIcon from "../Assets/Icon/nodeIcon.svg";
import arrow from "../Assets/Icon/arrow.svg";
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

    if (isEditing) {
      const updatedSkills = [...skills];
      if (currentIndex !== null) {
        updatedSkills[currentIndex] = newSkill;
        setSkills(updatedSkills);
        setIsEditing(false);
        setCurrentIndex(null);
      }
    } else {
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

  const codingLanguages = ["Python", "Angular", "Node"];

  const skillImages: { [key: string]: string } = {
    Python: pythonLogo,
    Angular: angularIcon,
    Node: nodeIcon,
  };

  return (
    <div className="App py-6 px-4 bg-[#1f1f1f] rounded-md">
      <h2 className="mb-4">Top skills:</h2>
      <ul className="grid gap-[12px]">
        {skills.map((skill: Skill, index: number) => (
          <li
            key={index}
            className="flex justify-between items-center border border-gray-400 px-2 rounded-md py-[12px]"
          >
            <span className="flex gap-1">
              <img src={skillImages[skill.name]} alt={skill.name} />
              {skill.name}
            </span>
            <button onClick={() => editSkill(index)}>
              <img
                className={currentIndex === index ? "rotate-180" : "rotate-0"}
                src={arrow}
                alt="ArrowIcon"
              />
            </button>
          </li>
        ))}
      </ul>
      
      <div className="mt-[12px]">
        <div className="bg-[#2D2D2D] px-[16px] py-[12px] rounded-md">
          <h2 className="mt-[12px] border-b-2 border-gray-600">
            {isEditing ? "Edit" : "Add"} a skill
          </h2>
          <div className="flex gap-5">
            <div className="w-[60%] sm:w-[80%]">
              <select
                name="name"
                value={newSkill.name}
                onChange={handleInputChange}
                className="w-full bg-[#2D2D2D] border border-gray-400 px-2 py-2 rounded-md outline-none"
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
          <textarea
            name="description"
            value={newSkill.description}
            onChange={handleInputChange}
            placeholder="Describe your experience"
            className="bg-transparent w-[100%] border border-gray-400 rounded-md px-2 py-2 outline-none"
          />
          {errors.description && <p className="text-red-500 text-sm">{errors.description}</p>}
          <div className="flex gap-4 justify-start sm:justify-end">
            <button className="px-[24px] py-[6px] bg-[#474747] text-white rounded-md" onClick={cancelEdit}>
              Cancel
            </button>
            <button className="px-[24px] py-[6px] text-black bg-[#FFFFFF] rounded-md" onClick={addSkill}>
              {isEditing ? "Update" : "Add"}
            </button>
          </div>
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
