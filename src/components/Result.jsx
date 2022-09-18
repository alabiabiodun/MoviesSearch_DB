import React, { useEffect, useState } from 'react';
import { Loading } from './Loading';

const Result = () => {
  const [searchTerm, setSearchTerm] = useState('spider man');
  const [data, setData] = useState([]);
  const [isLoading,setIsLoading] = useState(false);
  const [finalSearch, setFinalSearch] = useState('');
  const [errorMessage, setErrorMessage] = useState("");

  const input = (event) => setSearchTerm(event.target.value);

  useEffect(()=>{
    fetchData();
  },[finalSearch]);

  const fetchData = () => {
    // const options = {
    //   method: 'GET',
    //   headers: {
    //     'X-RapidAPI-Key': 'Supply your own key',
    //     'X-RapidAPI-Host': 'movies-app1.p.rapidapi.com'
    //   }
    // };
    
    // fetch(`https://movies-app1.p.rapidapi.com/api/${searchTerm}`, options)
    //   .then(response => response.json())
    //   .then(response => setData(response.results))
    //   .catch(err => console.error(err));
    setIsLoading(true);
      
    const options = {
      method: 'GET',
      headers: {
        'X-RapidAPI-Key': 'Supply your own key',
        'X-RapidAPI-Host': 'imdb8.p.rapidapi.com'
      }
    };

    fetch(`https://imdb8.p.rapidapi.com/auto-complete?q=${searchTerm}`, options)
      .then(response => response.json())
      .then(response => {
        setData(response.d)
        setIsLoading(false);
      })              
      .catch(err => {
        setErrorMessage(`Check your Network Connection (${err})`)
        setIsLoading(false);
      })    
  }

  const submitHandler = (event) => {
    event.preventDefault();
    setFinalSearch(searchTerm);
  }

  //if (isLoading) return <Loading />;
  
  const renderUser = (
    <div className='flex flex-wrap justify-center items-center mt-10 gap-12'>
        {data?.map(({i,id,l,s},index)=>{
            return (              
              <div key={index} className='border p-5 rounded-md hover:scale-[1.1]'>
                  <img src={i?.imageUrl} alt='pics' className='border w-80 h-90'/>
                  <p className='text-sm hover:underline text-blue-700 text-center'>{l}</p>
                  <p className='text-sm hover:underline text-blue-700 text-center'>{s}</p>
              </div>              
            )
        })}
        {errorMessage && (
          <div className='mt-20'>
            <p className='text-2xl text-red-700'>
              {errorMessage}
            </p>            
          </div>
        )}    
      
    </div> 
  );
    
  return (
    <div>
      <div className='flex flex-wrap justify-center items-center w-full mt-3'>
        <form onSubmit={submitHandler} className='flex flex-wrap justify-center items-center w-4/5'>
          <div className='flex justify-left items-center w-3/5 h-1 p-7 border rounded-full hover:shadow-lg'>
            <input value = {searchTerm} type='text' onChange={input} placeholder='Enter Search Term'
            className='w-full h-0.5 outline-none p-6 text-black' 
            />
            {
            searchTerm && (
              <div className='object-right'>
                <button type='button' disabled={isLoading} className='text-2xl text-gray-500' onClick={()=>setSearchTerm('')}>
                    x
                </button>
              </div>                
            )
          }
          </div>          
          <button type='submit' className='m-5 border rounded-lg w-30 h-10 px-5 hover:shadow-md'>Search 🔍</button>
        </form>
      </div> 
      {isLoading ? <Loading /> : renderUser} 
      
    </div>
  );
}

export default Result;
