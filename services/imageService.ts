import { supabase } from './supabase';

/**
 * Transforms an image based on a text prompt using the Replicate SDXL model via Supabase Edge Functions.
 */
export const transformImage = async (
  base64Image: string,
  prompt: string
): Promise<string> => {
  try {
    const { data, error } = await supabase.functions.invoke('generate-image', {
      body: {
        image: base64Image,
        prompt: prompt,
      },
    });

    if (error) {
      throw new Error(error.message || 'Failed to invoke generation function');
    }

    if (!data.image) {
      throw new Error('No image returned from generation service');
    }

    return data.image;
  } catch (error: any) {
    console.error("Generation Service Error:", error);
    throw error;
  }
};
