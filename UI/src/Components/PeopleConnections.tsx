return (
    <div >
     
 {loading ? (
  <div className="">
  <div className="flex flex-row flex-wrap gap-x-8 gap-y-0 ">

 
 </div>
    
  </div>
) : (
  <div className="flex flex-row flex-wrap gap-x-8 gap-y-0 ">
    {connections?.map((user: any) => (
   
      <PeopleCard user={user} updateConnection={setConnections} />
     
    
   
    ))}
  </div>
)}
    </div>
   )