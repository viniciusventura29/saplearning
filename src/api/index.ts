import { User } from "@supabase/supabase-js";
import { supabase } from "../../authmiddleware/authMiddleware";
import { AllUsersType, UserRoles } from "../types";

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
        .insert({ body: "", title: "", topic_id: topicTitle });
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

export const createArticle = async ({
  articleBody,
  articleTitle,
  articleTopicId,
}: {
  articleBody: string;
  articleTitle: string;
  articleTopicId: string;
}) => {
  await supabase.from("Article").insert({
    body: articleBody,
    title: articleTitle,
    topic_id: articleTopicId,
  });
};

export const editArticle = async ({
  articleBody,
  articleTitle,
  articleTopicId,
}: {
  articleBody: string;
  articleTitle: string;
  articleTopicId: string;
}) => {
  return await supabase
    .from("Article")
    .update({ body: articleBody, title: articleTitle })
    .eq("topic_id", articleTopicId);
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

export const getAllUsers = async () => {
  const allUsers: AllUsersType = [
    {
      profile: { name: "", user_id: "", role: "", id: 0 },
      users: {
        id: "",
        app_metadata: Object,
        user_metadata: Object,
        aud: "",
        created_at: "",
      },
    },
  ];
  const profile = await supabase.from("profile").select("*");
  const {
    data: { users },
    error,
  } = await supabase.auth.admin.listUsers();
  users.map((us) =>
    profile.data?.map((prof) =>
      us.id === prof.user_id
        ? allUsers.push({ profile: prof, users: us })
        : null
    )
  );
  return allUsers;
};

export const deleteUser = async ({ userId }: { userId: string }) => {
  await supabase.auth.admin.deleteUser(userId);
};

export const createUser = async ({
  name,
  email,
  role,
}: {
  name: string;
  email: string;
  role: UserRoles;
}) => {
    await supabase.auth.admin.createUser({email,password:name+"GSTET3"}).then(async(e)=>{
      await supabase.from('profile').insert({name:name, role:role, user_id:e.data.user?.id})
    })

    return console.log("User created")
};
