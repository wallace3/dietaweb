<template>
    <div class="main">
      <div
        class="dropzone-container"
        @dragover="dragover"
        @dragleave="dragleave"
        @drop="drop"
      >
        <input
          type="file"
          multiple
          name="file"
          id="fileInput"
          class="hidden-input"
          @change="onChange"
          ref="file"
          accept=".pdf,.jpg,.jpeg,.png"
        />
  
        <label for="fileInput" class="file-label">
          <div v-if="isDragging">Suelta el mouse.</div>
          <div v-else>Arrastra las imagenes o <u>clic aquí</u>para seleccionar</div>
        </label>
  
        <div class="preview-container mt-4" v-if="files.length">
          <div v-for="file in files" :key="file.name" class="preview-card">
            <div>
              <img class="preview-img" :src="generateThumbnail(file)" />
              <p :title="file.name">
                {{ makeName(file.name) }}
              </p>
            </div>
            <div>
              <button
                class="ml-2"
                type="button"
                @click="remove(files.indexOf(file))"
                title="Remove file"
              >
                <b>&times;</b>
              </button>
            </div>
          </div>
        </div>
        <div>
          <button class="btn btn-primary save-button" @click="saveImages()">Guardar Imagenes</button>
        </div>
      </div>
    </div>

    <!-- Modal -->
    <b-modal v-model="successAlertModal" hide-header hide-footer size="sm" content-class="modal-filled bg-success">
      <div class="text-center">
        <i class="bx bx-check-double display-6 mt-0 text-white"></i>
        <h4 class="mt-3 text-white">Éxito</h4>
        <p class="mt-3">Imagenes agregadas a producto correctamente</p>
        <b-button type="button" variant="light" class="mt-3" @click="successAlertModal = !successAlertModal"> Continue
        </b-button>
      </div>
    </b-modal>
  </template>
  
  <script>
  export default {
    props: {
    idProd: {
      type: String,
      required: true
    }
  },
    data() {
      return {
        isDragging: false,
        files: [],
        showModal:false,
        successAlertModal: false
      };
    },
    methods: {
      onChange() {
        this.files = [...this.$refs.file.files];
        console.log(this.files);
        
      },

      async saveImages(){
        const formData = new FormData();
        this.files.forEach(file => {
          formData.append('images[]', file)
        })
        try {
          const response = await fetch(`http://localhost:8080/images/upload/${this.idProd}`, {
            method: 'POST',
            body: formData
          })
          const result = await response.json()
          
          this.successAlertModal = true;
          console.log('Respuesta del servidor:', result)
        } catch (error) {
            console.error('Error al subir imágenes:', error)
        }
      },
  
      generateThumbnail(file) {
        let fileSrc = URL.createObjectURL(file);
        setTimeout(() => {
          URL.revokeObjectURL(fileSrc);
        }, 1000);
        return fileSrc;
      },
  
      makeName(name) {
        return (
          name.split(".")[0].substring(0, 3) +
          "..." +
          name.split(".")[name.split(".").length - 1]
        );
      },
  
      remove(i) {
        this.files.splice(i, 1);
        console.log(this.files);
        
      },
  
      dragover(e) {
        e.preventDefault();
        this.isDragging = true;
      },
  
      dragleave() {
        this.isDragging = false;
      },
  
      drop(e) {
        e.preventDefault();
        this.$refs.file.files = e.dataTransfer.files;
        this.onChange();
        this.isDragging = false;
      },
    },
  };
  </script>
  
  <style>

  .dropzone-container {
    padding: 4rem;
    background: #f7fafc;
    border: 1px solid #e2e8f0;
  }
  .hidden-input {
    opacity: 0;
    overflow: hidden;
    position: absolute;
    width: 1px;
    height: 1px;
  }
  .file-label {
    font-size: 20px;
    display: block;
    cursor: pointer;
  }
  .preview-container {
    display: flex;
    margin-top: 2rem;
  }
  .preview-card {
    display: flex;
    border: 1px solid #a2a2a2;
    padding: 5px;
    margin-left: 5px;
  }
  .preview-img {
    width: 50px;
    height: 50px;
    border-radius: 5px;
    border: 1px solid #a2a2a2;
    background-color: #a2a2a2;
  }
  .save-button{
    margin-top:10px;
  }
  .modal-backdrop {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.4);
  display: flex;
  align-items: center;
  justify-content: center;
}

  </style>
  