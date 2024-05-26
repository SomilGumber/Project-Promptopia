import Prompt from '@models/Prompt';
import connectToDB from '@utils/database';

export const GET = async (req, { params }) => {
  try {
    await connectToDB();
    const prompt = await Prompt.findById(params.id).populate('creator');

    if (!prompt) return new Response('Resources not found', { status: 404 });

    return new Response(JSON.stringify(prompt), { status: 200 });
  } catch (error) {
    return new Response('Failed to fetch data!', { status: 500 });
  }
};

export const PATCH = async (req, { params }) => {
  const { prompt, tag } = await req.json();
  try {
    await connectToDB();
    const existPrompt = await Prompt.findById(params.id);

    if (!existPrompt)
      return new Response('Resources not found', { status: 404 });

    existPrompt.prompt = prompt;
    existPrompt.tag = tag;

    await existPrompt.save();

    return new Response(JSON.stringify(existPrompt), { status: 200 });
  } catch (error) {
    return new Response('Failed to update the resource', { status: 500 });
  }
};

export const DELETE = async (req, { params }) => {
  try {
    await connectToDB();
    const prompt = await Prompt.findById(params.id);

    if (!prompt) return new Response('Resources not found', { status: 404 });

    await prompt.deleteOne();

    return new Response('Resource deleted successfully!', { status: 201 });
  } catch (error) {
    return new Response('Failed to delete the resource', { status: 500 });
  }
};
