import React from 'react'
import {useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react';
import { useState } from 'react';
import {toast} from 'react-toastify';
import { clearAllJobErrors, fetchJobs } from '../store/slices/jobSlice';
import Spinner from '../components/Spinner';
import { FaSearch } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Jobs = () => {
  const [city, setCity] = useState("")
  const [selectedCity, setSelectedCity] = useState("")
  const [niche, setNiche] = useState("")
  const [selectedNiche, setSelectedNiche] = useState("")
  const [searchKeyword, setsearchKeyword] = useState("")

  const {jobs, loading, error} = useSelector(state=> state.jobs);

  const handleCityChange = (city) =>{
    setCity(city);
    setSelectedCity(city);
  }
  const handleNicheChange = (niche) =>{
    setNiche(niche);
    setSelectedNiche(niche);
  }
  
  const dispatch = useDispatch();
  useEffect(() => {
  if(error){
    toast.error(error);
    dispatch(clearAllJobErrors)
  }
  dispatch(fetchJobs(city, niche, searchKeyword))
  }, [dispatch, error, city, niche])

  const handleSearch = () =>{
    dispatch(fetchJobs(city, niche, searchKeyword));
  }

  const cities = [
    "Bangalore", "Mumbai", "Delhi", "Hyderabad", "Chennai", "Pune", "Kolkata", "Gurgaon", "Noida", "Ahmedabad", "Jaipur", "Surat", "Chandigarh", "Coimbatore", "Nagpur", "Lucknow", "Indore", "Bhopal", "Vadodara"," Visakhapatnam"
  ];
  const niches = [
    "Software Development", "Web Development", "Data Science", "Cybersecurity", "Cloud Computing", "Artificial Intelligence", "Machine Learning", "DevOps", "Systems Analysis", "Database Administration", "IT Project Management", "UX/UI Design", "Network Engineering", "IT Support", "Business Intelligence", "Enterprise Architecture", "IT Consulting", "Quality Assurance", "Technical Writing", "IT Research"
  ];

  return (
    <>
      {
        !loading? <Spinner/>: (
          <section>
            <div className="jobs">
              <div className="search-tab-wrapper">
                  <input type="text" value={searchKeyword} onChange={(e) => setsearchKeyword(e.target.value)} />
                  <button onClick={handleSearch}>Find Job</button>
                  <FaSearch/>
              </div>
              <div className="wrapper">
                  <div className="filter-bar">
                    <div className="cities">
                      <h2>Filter Job By Cities</h2>
                      {
                        cities.map((city, index)=>(
                          <div key={index}> 
                            <input type="radio" id={city} name='city' value={city} checked = {selectedCity === city} onChange={() => handleCityChange(city)}/>
                            <label htmlFor={city}>{city}</label>
                          </div>

                        ))
                        
                      }
                    </div>
                    <div className="cities">
                      <h2>Filter Job By Niche</h2>
                      {
                        niches.map((niche, index)=>(
                          <div key={index}> 
                            <input type="radio" id={niche} name='niche' value={niche} checked = {selectedNiche === niche} onChange={() => handleNicheChange(niche)}/>
                            <label htmlFor={niche}>{niche}</label>
                          </div>

                        ))
                      }
                    </div>
                  </div>
                  <div className="container">
                    <div className='mobile-filter'>
                      <select value = {city} onChange={(e)=>setCity(e.target.value)}>
                        <option value="">Filter By City</option>
                        {
                          cities.map((city, index)=>(
                            <option value={city} key={index}>{city}</option>
                          ))
                        }
                      </select>
                      <select value = {niche} onChange={(e)=>setNiche(e.target.value)}>
                        <option value="">Filter By Niche</option>
                        {
                          niches.map((niche, index)=>(
                            <option value={niche} key={index}>{niche}</option>
                          ))
                        }
                      </select>


                    </div>
                    <div className="jobs_container">
                      {
                        jobs && jobs.map((element)=>(
                          <div className="card" key={element.id}>
                                {element.hiringMultipleCandidates === "Yes" ? (
                                  <p className='hiring-multiple'>
                                    Hiring Multiple Candidates
                                  </p>
                                ): (<p className='hiring'>
                                  Hiring
                                </p>)}
                                <p className='title'>{element.title}</p>
                                <p className='company'>{element.companyName}</p>
                                <p className='location'>{element.location}</p>
                                <p className='salary'>{element.salary}</p>
                                <p className='posted'><span>Posted On: </span>{element.jobPostedOn.substring(0,10)}</p>
                                <div className="btn-wrapper">
                                  <Link className='btn' to = {`/post/application/${element._id}`}>Apply Now</Link>
                                </div>
                          </div>
                        ))
                      }
                    </div>
                  </div>

              </div>
            </div>
          </section>
        )
      }
    </>
  )
}

export default Jobs
