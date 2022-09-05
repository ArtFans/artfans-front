const toBase64 = (file: File) => new Promise((res, rej) => {
  const reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onload = () => res(reader.result);
  reader.onerror = error => rej(error);
});

export default toBase64;
