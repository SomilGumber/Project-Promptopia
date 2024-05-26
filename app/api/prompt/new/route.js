import Prompt from '@models/Prompt';
import connectToDB from '@utils/database';

export const POST = async (req) => {
  const { userId, prompt, tag } = await req.json();

  try {
    await connectToDB();
    const newPrompt = await Prompt.create({
      prompt,
      tag,
      creator: userId,
    });
    return new Response(JSON.stringify(newPrompt), { status: 201 });
  } catch (error) {
    return new Response('Failed to create a new prompt!', { status: 500 });
  }
};

export const GET = async (req) => {
  try {
    const prompts = await Prompt.find();
    return new Response(JSON.stringify(prompts), { status: 201 });
  } catch (error) {
    return new Response('Failed to fetch data!', { status: 500 });
  }
};
