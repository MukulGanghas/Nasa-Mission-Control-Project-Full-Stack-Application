const API_URL = 'http://localhost:8000/v1';

async function httpGetPlanets() {
  // TODO: Once API is ready.
  const response = await fetch(`${API_URL}/planets`);
  return await response.json();
  // Load planets and return as JSON.
}

async function httpGetLaunches() {
  // TODO: Once API is ready.
  const response = await fetch(`${API_URL}/launches`);
  const fetchedLaunches =await response.json();
  fetchedLaunches.sort((a,b)=>{
   return a.flightNumber-b.flightNumber;
  });
  return fetchedLaunches;
  // Load launches, sort by flight number, and return as JSON.
}

async function httpSubmitLaunch(launch) {
  try{
    return await fetch(`${API_URL}/launches`,{
      method :"post",
      headers:{
        'Content-Type':"application/json",
      },
      body: JSON.stringify(launch),
    });
  }catch(err){
    return {
      ok:false,
    };
  }
  // TODO: Once API is ready.
  // Submit given launch data to launch system.
}

async function httpAbortLaunch(id) {
  try{
    return await fetch(`${API_URL}/launches/${id}`,{
      method :"delete",
    });
  }catch(err){
    console.log(err);
    return{
      ok:false,
    };
  }
  // TODO: Once API is ready.
  // Delete launch with given ID.
}

export {
  httpGetPlanets,
  httpGetLaunches,
  httpSubmitLaunch,
  httpAbortLaunch,
};