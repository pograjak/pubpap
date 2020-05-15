// Source: https://lobotuerto.com/blog/cropping-images-with-vuejs-and-cropperjs/

<template>
  <div>
    <v-file-input
      class
      v-model="selectedFile"
      accept="image/png, image/jpeg"
      label="File"
      placeholder="Select a file"
      @change="setupCropper"
    ></v-file-input>
    <v-container class="py-0">
      <v-row v-if="objectUrl">
        <v-col class="text-center" cols="12" md="6">
          <div class="caption">Original</div>
          <div class="image-container elevation-4">
            <img class="image-preview" ref="source" :src="objectUrl" />
          </div>
          <div class="d-flex justify-center">
            <v-tooltip bottom>
              <template v-slot:activator="{ on }">
                <v-btn v-on="on" icon="icon" small="small" @click="fullSize">
                  <v-icon small="small">mdi-aspect-ratio</v-icon>
                </v-btn>
              </template>
              <span>Full image</span>
            </v-tooltip>

            <v-tooltip bottom>
              <template v-slot:activator="{ on }">
                <v-btn v-on="on" icon="icon" small="small" @click="resetCropper">
                  <v-icon small="small">mdi-restart</v-icon>
                </v-btn>
              </template>
              <span>Reset</span>
            </v-tooltip>

            <div class="mx-2"></div>
            <v-tooltip bottom>
              <template v-slot:activator="{ on }">
                <v-btn v-on="on" icon="icon" small="small" @click="rotateLeft">
                  <v-icon small="small">mdi-rotate-left</v-icon>
                </v-btn>
              </template>
              <span>Rotate left</span>
            </v-tooltip>

            <v-tooltip bottom>
              <template v-slot:activator="{ on }">
                <v-btn v-on="on" icon="icon" small="small" @click="rotateRight">
                  <v-icon small="small">mdi-rotate-right</v-icon>
                </v-btn>
              </template>
              <span>Rotate right</span>
            </v-tooltip>
          </div>
        </v-col>
        <v-col class="text-center" cols="12" md="6">
          <div class="caption">Preview</div>
          <div class="image-container elevation-4">
            <img class="image-preview" :src="previewCropped" />
          </div>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>


<script>
import Cropper from "cropperjs";
import debounce from "lodash/debounce";

export default {
  data() {
    return {
      cropper: null,
      objectUrl: null,
      previewCropped: null,
      selectedFile: null,
      inputImgType: null,
      debouncedUpdatePreview: debounce(this.updatePreview, 257)
    };
  },

  methods: {
    resetCropper() {
      this.cropper.reset();
    },
    fullSize() {
      this.cropper.reset();
      const imdata = this.cropper.getImageData();
      this.cropper.setCropBoxData({
        left: 0,
        top: 0,
        width: imdata.naturalWidth,
        height: imdata.naturalHeight
      });
    },
    rotateLeft() {
      this.cropper.rotate(-90);
    },
    rotateRight() {
      this.cropper.rotate(90);
    },
    setupCropper(selectedFile) {
      this.selectedFile = selectedFile;
      if (this.cropper) {
        this.cropper.destroy();
      }

      if (this.objectUrl) {
        window.URL.revokeObjectURL(this.objectUrl);
      }

      if (!selectedFile) {
        this.cropper = null;
        this.objectUrl = null;
        this.previewCropped = null;
        this.$emit("canceled");
        return;
      }

      this.$emit("selected");
      this.inputImgType = selectedFile.type;
      this.objectUrl = window.URL.createObjectURL(selectedFile);
      this.$nextTick(this.setupCropperInstance);
    },
    setupCropperInstance() {
      this.cropper = new Cropper(this.$refs.source, {
        // scalable: false,
        // zoomable: false,
        viewMode: 1,
        dragMode: 'move',
        crop: this.debouncedUpdatePreview
      });
    },
    updatePreview(event) {
      const canvas = this.cropper.getCroppedCanvas({ maxWidth: 700, maxHeight: 700 });
      this.previewCropped = canvas.toDataURL(this.inputImgType);
    },
    getImage() {
      if (this.cropper) {
        var fmt = "";
        if (this.inputImgType == "image/png") {
          fmt = "png";
        } else if (this.inputImgType == "image/jpeg") {
          fmt = "jpg";
        } else {
          return null;
        }

        return {
          fmt: fmt,
          img: this.cropper
            .getCroppedCanvas({ maxWidth: 700, maxHeight: 700, imageSmoothingQuality: 'high' })
            .toDataURL(this.inputImgType)
        };
      }
      return null;
    }
  }
};
</script>


<style lang="sass" scoped>
.image-container
    display: inline-block

.image-preview
    display: block
    max-width: 350px
    max-height: 350px
</style>

<style lang="sass">
@import 'cropperjs/dist/cropper.css'
</style>
