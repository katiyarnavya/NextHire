import React from 'react';
import {} from 'react-icons'
import { BiSolidLike } from 'react-icons/bi';
import { LuUserPlus } from 'react-icons/lu';
import { VscTasklist } from 'react-icons/vsc';

const HowItWorks = () => {
  return (
    <section className='howItWorks'>
        <h3>How does it work?</h3>
        <div className="container">
            <div className="card">
                <div className="icon">
                        <LuUserPlus/>
                </div>
                <h4>Create an account</h4>
                <p>Create your account today, whether you’re a job seeker looking for the perfect role or an employer searching for top talent. Unlock tailored job matches, post opportunities, and connect with the right people to achieve your career or hiring goals.</p>
            </div>
            <div className="card">
                <div className="icon">
                        <VscTasklist/>
                </div>
                <h4>Post or Find Job</h4>
                <p>Find the right fit effortlessly. Post jobs to reach qualified candidates or browse available positions tailored to your skills and experience. Our platform connects employers and job seekers, making it easier to discover opportunities and build successful teams.</p>
            </div>
            <div className="card">
                <div className="icon">
                        <BiSolidLike/>
                </div>
                <h4>Hire or Get Hired</h4>
                <p>Whether you’re looking to hire top talent or searching for your next career move, our platform is designed to connect the right people. Employers can find skilled candidates, while job seekers can discover opportunities that match their goals.</p>
            </div>
        </div>
      
    </section>
  )
}

export default HowItWorks
