new Vue({
    el: "#app",
    data: {
      message: "Hello Vue!",
      imageS: null,
      url: null
    },
    methods: {
      upload() {
        let dataFormat = new FormData();
        dataFormat.append("image", this.imageS);
        axios
          .post("http://localhost:4000/upload", dataFormat)
          .then(({ data }) => {
            console.log(data);
          })
          .catch(err => {
            console.log(err.response);
          });
      },
      previewImage(e) {
        const file = e.target.files[0];
        this.imageS = this.$refs.imageFile.files[0];
        console.log(this.$refs.imageFile.files[0], "ini file");
        this.url = URL.createObjectURL(file);
      }
    }
  });
  