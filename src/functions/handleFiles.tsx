export function handleFiles(
  files: File[]
): (HTMLImageElement | HTMLVideoElement | React.ReactNode)[] {
  const elements: (HTMLImageElement | HTMLVideoElement | React.ReactNode)[] =
    [];

  files.forEach((file) => {
    if (file.type.startsWith("image/")) {
      const img = document.createElement("img");
      img.src = URL.createObjectURL(file);

      const reader = new FileReader();
      reader.onload = (function (aImg) {
        return function (e: ProgressEvent<FileReader>) {
          if (e.target) {
            aImg.src = e.target.result as string;
          }
        };
      })(img);
      reader.readAsDataURL(file);
      elements.push(img);
    } else if (file.type.startsWith("video/")) {
      const video = document.createElement("video");
      video.src = URL.createObjectURL(file);
      video.controls = true;

      const reader = new FileReader();
      reader.onload = (function (aVideo) {
        return function (e: ProgressEvent<FileReader>) {
          if (e.target) {
            aVideo.src = e.target.result as string;
          }
        };
      })(video);
      reader.readAsDataURL(file);
      elements.push(video);
    }
  });

  return elements;
}
