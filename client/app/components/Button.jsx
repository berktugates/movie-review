import axios from "axios";
import { useRouter } from "next/navigation";

export default function Button({id}) {
    console.log(id)
    const r = useRouter();

    
  return (
    <>
      <button className="" onClick={deleteQuery(id)}>
        Delete
      </button>
    </>
  );
}
