import React, { useContext } from 'react'
import { AvailabilityContext } from './availabilityContext';
import profile from "../Assets/profile.jpg"
import angularIcon from "../Assets/Icon/angularIcon.svg";
import nodeIcon from "../Assets/Icon/nodeIcon.svg"
import pythonIcon from "../Assets/Icon/pythonIcon.svg"
interface ProfileStableSectionProps {
  index: number;
}
interface Skill {
  name: string;
  experience: string | number;
  description: string;
}
const ProfileStableSection: React.FC<ProfileStableSectionProps> = ({ index }) => {
  const { status, availability, skills, currentIndex } = useContext(AvailabilityContext)!;
  console.log(status, availability, currentIndex)

  console.log(currentIndex, "currentIndex") 
  return (
    <div className='py-6 px-4 bg-[#1f1f1f] rounded-md  min-h-[523px] max-h-[523px] overflow-auto'>
      <h2 className='mb-4 font-semibold text-base'>Building Your Profile</h2>
      <div className={`${index == 2 ? "" : "bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500"}  p-[2px] rounded-md h-[max-content]`}>
        {index == 2 &&
          <div className='bg-[#2D2D2D] grid gap-4 px-4 py-4 rounded-md mb-4'>
            <div className='grid gap-2'>
              <div className='flex gap-3'>
                <div className='w-[76px] h-[76px] '>
                  <img className='w-[100%] h-[100%] object-cover rounded-md' src={profile} alt="profile" />
                </div>
                <div className='grid'>
                  <p className='uppercase font-semibold text-[#AF87FF] text-[10.87px]'>Frontend Developer</p>
                  <p className='text-lg font-medium text-white mt-0.5'>Weston Stearns</p>
                  <div className='bg-white py-0.5 px-2 flex items-center gap-2 rounded-md mt-0.5'>
                    <div>
                      <svg xmlns="http://www.w3.org/2000/svg" width="14" height="11" viewBox="0 0 14 11" fill="none">
                        <path d="M13.4693 3.50509C13.4693 7.46857 7.42614 10.6767 7.16878 10.8092C7.10095 10.8447 7.02513 10.8633 6.94811 10.8633C6.87109 10.8633 6.79527 10.8447 6.72744 10.8092C6.47008 10.6767 0.42688 7.46857 0.42688 3.50509C0.427959 2.57436 0.80864 1.68206 1.48541 1.02393C2.16217 0.365811 3.07976 -0.00438309 4.03685 -0.00543213C5.2392 -0.00543213 6.29191 0.497365 6.94811 1.34725C7.60431 0.497365 8.65702 -0.00543213 9.85938 -0.00543213C10.8165 -0.00438309 11.734 0.365811 12.4108 1.02393C13.0876 1.68206 13.4683 2.57436 13.4693 3.50509Z" fill="#0F172A" />
                      </svg>
                    </div>
                    <div className='text-[#060606]'>Pesto's Choice</div>
                  </div>
                </div>
              </div>
              <p className='w-[90%] text-[13px] font-normal text-white'>Working as a full stack developer, as well as an automation test engineer I created test automation framework.</p>
              <div className='flex'>
                <div className='w-full grid sm:flex border border-[rgba(226,232,240,0.15)] rounded-s-lg'>
                  <div className='w-full px-4 my-4 border-e border-[rgba(226,232,240,0.15)]'>
                    <div className='text-[rgba(226,232,240,0.5)] text-xs'>Cost</div>
                    <div className='text-[13px] font-medium text-white'>₹56,06,285</div>
                  </div>
                  <div className='w-full px-4 my-4 border-e border-[rgba(226,232,240,0.15)]'>
                    <div className='text-[rgba(226,232,240,0.5)] text-xs'>Experience</div>
                    <div className='text-[13px] font-medium text-white'>7 Years</div>
                  </div>
                  <div className='w-full px-4 my-4'>
                    <div className='text-[rgba(226,232,240,0.5)] text-xs'>Full/part time</div>
                    <div className='w-[100%] h-4 animate-pulse bg-gray-500 rounded-md'></div>
                  </div>
                </div>
                <div className='min-w-fit bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 p-[1px] rounded-e-lg'>
                  <div className='bg-[#2D2D2D] px-3 py-4 rounded-e-lg h-full grid content-center'>
                    <div className='text-[rgba(226,232,240,0.5)] text-xs'>Notice period</div>
                    <div className='text-[13px] font-medium text-white'>{availability}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        }

        <div className='bg-[#2D2D2D] grid gap-4 px-2 py-2 rounded-md'>
          <div className='px-3 py-3 rounded-md bg-[#2D2D2D] text-white '>
            <p className='pb-2 text-base'>TechStack</p>
            <div className='grid grid-cols-1 gap-4'>
              {skills?.map((item: Skill, index: number) => {
                return (
                  <div className='border border-[rgba(226,232,240,0.1)] rounded-lg p-3' key={index}>
                    <div className='flex items-center justify-between'>
                      <div className='flex items-center gap-3'>
                        {item.name === "Python" && (
                          <img src={pythonIcon} alt='pythonIcon' />
                        )}
                        {item.name === "Angular" && (
                          <img src={angularIcon} alt='angularIcon' />
                        )}
                        {item.name === "Node" && (
                          <img src={nodeIcon} alt='nodeIcon' />
                        )}
                        <div className='font-medium text-white text-base'>{item.name}</div>
                      </div>
                      <div className='bg-[#474747] py-1 px-3 rounded font-medium text-white text-[13px]'>{item.experience} Years</div>
                    </div>
                    <div className='mt-1.5 text-[13px] text-white font-normal'>
                      {item.description}
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProfileStableSection
