new Vue({
  el: "#app",
  data: {
    male_name: '',
    female_name: '',
    date: '',
    location: '',
    date: '',
    time: '',
    lat: '-6.3088',
    lng: '106.8456',
    src: '',
    font: {
      fontFamily: 'Dosis'
    },
    value: '',
    selected: '',
    message: "Hello Vue!",
    imageS: null,
    url: null,
    seen: true,
    imageOne: '',
    imageTwo: ''
  },
  created() {
    this.src = `https://maps.googleapis.com/maps/api/staticmap?center=${this.lat},${this.lng}&zoom=14&size=600x450&key=AIzaSyDuGX_Vysl7PQnkIys6x4pOV4nbzxJQImU`
  },
  watch: {
    selected: function () {
      this.font.fontFamily = this.selected
    }
  },
  methods: {
    submit_map: function () {
      this.lat = document.getElementById('latmap').value
      this.lng = document.getElementById('lngmap').value
      this.location = document.getElementById('location').value
      this.src = `https://maps.googleapis.com/maps/api/staticmap?center=${this.lat},${this.lng}&zoom=16&size=600x450&markers=color:red%7C${this.lat},${this.lng}&key=AIzaSyDuGX_Vysl7PQnkIys6x4pOV4nbzxJQImU`
    },
    previewImage(e) {
      const file = e.target.files[0];
      this.imageS = this.$refs.imageFile.files[0];
      this.url = URL.createObjectURL(file);
    },
    clickImage() {

      // html2canvas(document.getElementById("front_card"), {
      //   allowTaint: true
      // }).then(function(canvas) {

        
      //   let data = new FormData();
      //   canvas.toBlob(function(blobs) {

      //     data.append("image", blobs);
      //     axios
      //       .post(`http://localhost:4000/upload`, data)
      //       .then(({data}) => {
      //           console.log(data)

      //       });
      //   }, 'image/jpeg');
      // });


      html2canvas(document.getElementById("photo_card"), {
        allowTaint: true
      }).then((canvas) => {

        let data = new FormData();
        canvas.toBlob((blob)=>{
          data.append("image", blob);
          axios
            .post(`http://localhost:4000/upload`, data)
            .then(({
              data
            }) => {
              this.seen = false
              this.imageOne = data
            });
        });
      });

    }
  }
})