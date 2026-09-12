export const uploadImageToCloudinary = async (image: File): Promise<string> => {
  try {
    const formData = new FormData();

    formData.append('image', image);

    const response = await fetch(
      `https://api.imgbb.com/1/upload?key=${process.env.NEXT_PUBLIC_IMGBB_API_KEY}`,
      {
        method: 'POST',
        body: formData,
      },
    );

    if (!response.ok) {
      throw new Error('Failed to upload image');
    }

    const data = await response.json();

    if (!data.success || !data.data?.url) {
      throw new Error('ImgBB image upload failed');
    }

    return data.data.url;
  } catch (error) {
    console.error('ImgBB upload error:', error);

    throw error;
  }
};
