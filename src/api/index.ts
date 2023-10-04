import { supabase } from "../../authmiddleware/authMiddleware"

export const getTopics = async ({setTopics}:{setTopics:React.Dispatch<React.SetStateAction<any[] | null | undefined>>}) => {
    const {data, error} = await supabase.from("topics").select("*");

    if (error) {
        console.log(error);
        return;
      }
    
      if (!data) {
        console.log("Data is null!");
        return;
      }

    setTopics(data)
  };

export const createTopic = async ({topicTitle, topicDesc}:{topicTitle:string, topicDesc:string})=>{
    return await supabase.from("topics").insert({ title: topicTitle, description: topicDesc })
}
export const editTopic = async ({topicId, topicTitle, topicDesc}:{topicId:number,topicTitle:string, topicDesc:string})=>{
    return await supabase.from("topics").update({ title: topicTitle, description: topicDesc }).eq('id',topicId)
}