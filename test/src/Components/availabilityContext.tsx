import React, { createContext, useState, ReactNode } from 'react';

// Define the shape of the context value
interface Skill {
  name: string;
  experience: string | number;
  description: string;
}

interface AvailabilityContextType {
  status: string;
  setStatus: React.Dispatch<React.SetStateAction<string>>;
  availability: string;
  setAvailability: React.Dispatch<React.SetStateAction<string>>;
  skills: Skill[];
  setSkills: React.Dispatch<React.SetStateAction<Skill[]>>;
  newSkill: Skill;
  setNewSkill: React.Dispatch<React.SetStateAction<Skill>>;
  currentIndex: number | null;
  setCurrentIndex: React.Dispatch<React.SetStateAction<number | null>>;
}
const AvailabilityContext = createContext<AvailabilityContextType | undefined>(undefined);
interface AvailabilityProviderProps {
  children: ReactNode;
}

const AvailabilityProvider: React.FC<AvailabilityProviderProps> = ({ children }) => {
  const [status, setStatus] = useState<string>('Actively looking for a job');
  const [availability, setAvailability] = useState<string>('1 month');
  const [skills, setSkills] = useState<Skill[]>([
    {
      name: "Python",
      experience: 2,
      description: "My expertise in Node.js includes developing scalable API servers capable of handling more than 100K+ requests per hour. As per your correspondence",
    },
    {
      name: "Angular",
      experience: 2,
      description: "My expertise in Node.js includes developing scalable API servers capable of handling more than 100K+ requests per hour. As per your correspondence",
    },
    {
      name: "Node",
      experience: 2,
      description: "My expertise in Node.js includes developing scalable API servers",
    }
  ]);
  const [newSkill, setNewSkill] = useState<Skill>({ name: '', experience: '', description: '' });
  const [currentIndex, setCurrentIndex] = useState<number | null>(null);

  const value: AvailabilityContextType = {
    status,
    setStatus,
    availability,
    setAvailability,
    skills,
    setSkills,
    newSkill,
    setNewSkill,
    currentIndex,
    setCurrentIndex,
  };

  return (
    <AvailabilityContext.Provider value={value}>
      {children}
    </AvailabilityContext.Provider>
  );
};

export { AvailabilityProvider, AvailabilityContext };
