export const handleChangeImage = (e) => {
  if (e.target.files.length) {
    const maxAllowedSize = 3 * 1024 * 1024;
    if (e.target.files[0].size >= maxAllowedSize) {
      return {
        value: false,
        message: "File too large. Max limit 3 mb",
      };
    } else {
      return {
        value: true,
        preview: URL.createObjectURL(e.target.files[0]),
        raw: e.target.files[0],
      };
    }
  }
};

export const blobToBase64 = (blob) => {
  return new Promise((resolve, _) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result);
    reader.readAsDataURL(blob);
  });
};
