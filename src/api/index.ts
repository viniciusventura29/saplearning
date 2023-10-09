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
  await supabase
    .from("topics")
    .insert({ title: topicTitle, description: topicDesc })
    .then(async (e) => {
      await supabase
        .from("Article")
        .insert({ body: "", title: "", topic_id: topicTitle});
    });
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

export const deleteTopic = async ({ topicTitle }: { topicTitle: string }) => {
  return await supabase.from("topics").delete().eq("title", topicTitle);
};

export const getArticle = async ({ topic_id }: { topic_id: string }) => {
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

  return data[0];
};

export const searchTopicById = async ({
  setTopics,
  topic_id,
}: {
  setTopics: React.Dispatch<React.SetStateAction<any[] | null | undefined>>;
  topic_id: string;
}) => {
  const { data, error } = await supabase
    .from("topics")
    .select("*")
    .textSearch("title", topic_id);

  if (error) {
    console.log(error);
    return;
  }

  if (!data) {
    console.log("Data is null!");
    return;
  }

  return setTopics(data);
};
