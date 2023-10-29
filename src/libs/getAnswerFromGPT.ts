import { GPT_MODEL } from "./constants";
import { openai } from "./openapi-config";

export const getAnswer = async (question: string, model = GPT_MODEL) => {
  const chatCompletion = await openai.chat.completions.create({
    messages: [
      {
        role: "system",
        content:
          "あなたは経験豊富なエンジニアです。質問に対して技術・知識に対してアドバイスを返して下さい。返信はなるべく短くお願いします。",
      },
      { role: "user", content: question },
    ],
    model,
  });

  return chatCompletion.choices[0].message?.content;
};
