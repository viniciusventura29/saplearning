import { supabase } from "../../authmiddleware/authMiddleware";

export const getTopics = async ({
  setTopics,
}: {
  setTopics: React.Dispatch<React.SetStateAction<any[] | null | undefined>>;
}) => {
  const { data, error } = await supabase.from("topics").select("*");

  if (error) {
    console.log(error);
    return;
  }

  if (!data) {
    console.log("Data is null!");
    return;
  }

  setTopics(data);
};

export const createTopic = async ({
  topicTitle,
  topicDesc,
}: {
  topicTitle: string;
  topicDesc: string;
}) => {
  return await supabase
    .from("topics")
    .insert({ title: topicTitle, description: topicDesc });
};
export const editTopic = async ({
  topicId,
  topicTitle,
  topicDesc,
}: {
  topicId: string;
  topicTitle: string;
  topicDesc: string;
}) => {
  return await supabase
    .from("topics")
    .update({ title: topicTitle, description: topicDesc })
    .eq("title", topicId);
};

export const getArticle = async ({
  topic_id,
  setText,
}: {
  topic_id: string;
  setText: React.Dispatch<React.SetStateAction<string>>;
}) => {
  const { data, error } = await supabase
    .from("Article")
    .select("*")
    .eq("topic_id", topic_id);

  if (error) {
    console.log(error);
    return;
  }

  if (!data) {
    console.log("Data is null!");
    return;
  }

  console.log(data)

  return setText(data[0])
};
