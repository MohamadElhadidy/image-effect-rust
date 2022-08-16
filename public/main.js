async function init() {
  let rustApp = null;

  try {
    rustApp = await import("../pkg");
  } catch (e) {
    console.error(e);
    return;
  }

  console.log(rustApp);

  const input = document.getElementById("upload");
  const fileReader = new FileReader();

  let img_data_url = "";
  fileReader.onload = () => {
    let base64 = fileReader.result.replace(
      /^data:image\/(png|jpeg|jpg);base64,/,
      ""
    );
    let filter = document.querySelector('input[name="filter"]:checked').value;
    console.log(filter);
    if (filter === "grayscale") {
      img_data_url = rustApp.grayscale(base64);
    } else if (filter === "blur") {
      img_data_url = rustApp.blur(base64);
    } else if (filter === "brighten") {
      img_data_url = rustApp.brighten(base64);
    } else if (filter === "flipv") {
      img_data_url = rustApp.flipv(base64);
    } else if (filter === "fliph") {
      img_data_url = rustApp.fliph(base64);
    }
    document.getElementById("new-img").setAttribute("src", img_data_url);
    document.getElementById("download-img").setAttribute("href", img_data_url);
    document.getElementById("download-button").style.display = "block";
  };

  input.addEventListener("change", () => {
    fileReader.readAsDataURL(input.files[0]);
    document.getElementById("new-img").setAttribute("src", '');
    document.getElementById("new-img").load(window.location.href + " #new-img");
  });
}

init();
