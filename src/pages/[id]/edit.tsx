import { useEditor } from "@tiptap/react";
import Highlight from "@tiptap/extension-highlight";
import { RichTextEditor, Link } from "@mantine/tiptap";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import TextAlign from "@tiptap/extension-text-align";
import Superscript from "@tiptap/extension-superscript";
import SubScript from "@tiptap/extension-subscript";
import { MantineProvider } from "@mantine/core";
import BulletList from "@tiptap/extension-bullet-list";
import OrderedList from "@tiptap/extension-ordered-list";
import { useState } from "react";
import { editArticle, getArticle } from "../../api";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { useParams } from "react-router-dom";
import { Spinner } from "../../components/Spinner";
import { Navbar } from "../../components/Navbar";
import {AuthMiddleware} from "../../authMiddleware/authMiddleware";
import { Footer } from "../../components/Footer";
import { useAlert } from "../../components/Alert";

export default function EditArtcilePage({
  data,
  session,
}: {
  data: any;
  session: any;
}) {
  const [content, setContent] = useState(data.body);
  const [title, setTitle] = useState(data.title);
  const trigger = useAlert();

  const editor = useEditor({
    extensions: [
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      //@ts-ignore Typescript is crazy or smth
      StarterKit,
      BulletList.configure({
        HTMLAttributes: {
          class: "list-disc",
        },
      }),
      OrderedList.configure({
        HTMLAttributes: {
          class: "list-decimal",
        },
      }),
      Underline,
      Link,
      Superscript,
      SubScript,
      Highlight,
      TextAlign.configure({ types: ["heading", "paragraph"] }),
    ],
    content: content,

    onUpdate: (d) => {
      setContent(d.editor.getHTML());
    },
  });

  // console.log(data);
  const queryClient = useQueryClient();

  const edArticle = useMutation(
    () =>
      editArticle({
        articleBody: content,
        articleTitle: title,
        articleTopicId: data.topic_id,
      }),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["getArticle"]);
        trigger({
          text: "Artigo editado com sucesso!",
          isShowing: true,
          duration: 4000,
        });
      },
    }
  );

  return (
    <div>
      <Navbar session={session} />
      <form
        onSubmit={(e) => {
          e.preventDefault();
        }}
        className="w-full h-full mb-32 pt-32"
      >
        <div className="w-full h-full flex justify-center">
          <div className="w-[75%] h-full flex flex-col items-start">
            <h2 className="text-2xl font-bold ">Editar Artigo</h2>
            <p className="mb-10">
              Aqui você pode editar essa artigo livremente!
            </p>
            <div className="flex flex-col w-full mt-8 markdown">
              <MantineProvider>
                <RichTextEditor editor={editor}>
                  <RichTextEditor.Toolbar
                    sticky
                    display="flex"
                    className="justify-between rounded bg-gray-50 shadow border p-3 mb-4"
                    stickyOffset={60}
                  >
                    <RichTextEditor.ControlsGroup className="flex gap-3">
                      <RichTextEditor.Bold />
                      <RichTextEditor.Italic />
                      <RichTextEditor.Underline />
                      <RichTextEditor.Strikethrough />
                      <RichTextEditor.ClearFormatting />
                      <RichTextEditor.Highlight />
                      <RichTextEditor.Code />
                    </RichTextEditor.ControlsGroup>

                    <RichTextEditor.ControlsGroup className="flex gap-2">
                      <RichTextEditor.H1 />
                      <RichTextEditor.H2 />
                      <RichTextEditor.H3 />
                      <RichTextEditor.H4 />
                    </RichTextEditor.ControlsGroup>

                    <RichTextEditor.ControlsGroup className="flex gap-2">
                      <RichTextEditor.Blockquote />
                      <RichTextEditor.Hr />
                      <RichTextEditor.BulletList />
                      <RichTextEditor.OrderedList />
                      <RichTextEditor.Subscript />
                      <RichTextEditor.Superscript />
                    </RichTextEditor.ControlsGroup>

                    <RichTextEditor.ControlsGroup className="flex gap-2">
                      <RichTextEditor.Link />
                      <RichTextEditor.Unlink />
                    </RichTextEditor.ControlsGroup>

                    <RichTextEditor.ControlsGroup className="flex gap-2">
                      <RichTextEditor.AlignLeft />
                      <RichTextEditor.AlignCenter />
                      <RichTextEditor.AlignJustify />
                      <RichTextEditor.AlignRight />
                    </RichTextEditor.ControlsGroup>
                  </RichTextEditor.Toolbar>
                  <input
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    type="text"
                    className="bg-gray-50 rounded-t-lg border border-b-none p-4 shadow w-full"
                  />
                  <RichTextEditor.Content className="min-h-screen bg-gray-50 rounded-b-lg border border-t-none shadow p-4" />
                </RichTextEditor>
              </MantineProvider>
            </div>
            <button
              className="rounded-full p-3 px-6 text-lg text-white fixed right-14 bottom-14 bg-blue-500"
              onClick={(e) => {
                edArticle.mutate();
                e.preventDefault();
              }}
            >
              Finalizar
            </button>
          </div>
        </div>
      </form>
      <Footer />
    </div>
  );
}

export function EditPage() {
  const { id } = useParams();
  const { data, isLoading } = useQuery({
    queryKey: ["getArticle"],
    queryFn: () => getArticle({ topic_id: id ?? "" }),
  });

  return (
    <div>
      {isLoading ? (
        <div
          role="status"
          className="w-screen h-screen flex flex-col gap-3 items-center justify-center"
        >
          <Spinner />
          <span className="text-xl font-bold text-blue-700">Carregando...</span>
        </div>
      ) : (
        <AuthMiddleware>
          {(session) => <EditArtcilePage data={data} session={session} />}
        </AuthMiddleware>
      )}
    </div>
  );
}
