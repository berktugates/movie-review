import axios from "axios";
export default function Review({ id, name, comment }) {
    const handleDeleteComment = async()=>{
        try{
            await axios.delete(`http://localhost:8080/api/reviews/${id}`)
        }
        catch(err){
            console.log(err);
        }
    }
  return (
    <>
      <div key={id} className="p-1 border-opacity-35 border-b my-1 hover:border hover:scale-110 hover:transition-all">
        <div className="flex justify-between items-center">
          <h1 className="font-semibold opacity-70 mb-2 py-1">
            {name}
          </h1>
          <button className="text-red-500 hover:underline" onClick={handleDeleteComment}>Delete</button>
        </div>
        <p className="text-sm text-gray-400">{comment}</p>
      </div>
    </>
  );
}
