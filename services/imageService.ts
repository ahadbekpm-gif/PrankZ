import { supabase } from './supabase';

const base64ToBlob = (base64: string, mimeType: string = 'image/jpeg'): Blob => {
  const byteCharacters = atob(base64.split(',')[1]);
  const byteNumbers = new Array(byteCharacters.length);
  for (let i = 0; i < byteCharacters.length; i++) {
    byteNumbers[i] = byteCharacters.charCodeAt(i);
  }
  const byteArray = new Uint8Array(byteNumbers);
  return new Blob([byteArray], { type: mimeType });
};

const uploadToStorage = async (base64Image: string): Promise<string> => {
  const blob = base64ToBlob(base64Image);
  const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.jpg`;

  // Upload to 'uploads' bucket
  const { data: uploadData, error: uploadError } = await supabase.storage
    .from('uploads')
    .upload(fileName, blob);

  if (uploadError) {
    // If bucket doesn't exist, this will fail. We might need to handle creation or assume it exists.
    throw new Error(`Storage upload failed: ${uploadError.message}`);
  }

  // Get Signed URL (valid for 1 hour, enough for Replicate to process)
  const { data: urlData, error: urlError } = await supabase.storage
    .from('uploads')
    .createSignedUrl(fileName, 3600);

  if (urlError || !urlData?.signedUrl) {
    throw new Error(`Failed to get signed URL: ${urlError?.message}`);
  }

  return urlData.signedUrl;
};

/**
 * Transforms an image based on a text prompt using the Replicate SDXL model via Supabase Edge Functions.
 * Standardizes the flow: Upload -> URL -> Replicate
 */
export const transformImage = async (
  base64Image: string,
  prompt: string
): Promise<string> => {
  try {
    // 1. Upload to Supabase Storage to get a public/signed URL
    const imageUrl = await uploadToStorage(base64Image);

    // 2. Invoke Edge Function with the Image URL
    const { data, error } = await supabase.functions.invoke('generate-image', {
      body: {
        image: imageUrl,
        prompt: prompt,
      },
    });

    if (error) {
      console.error("Edge Function Invoke Error:", error);
      throw new Error(error.message || 'Failed to invoke generation function');
    }

    // New Error Handling: Check for explicit success flag or error field
    if (data?.success === false || data?.error) {
      throw new Error(`Generation Error: ${data.error}`);
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
