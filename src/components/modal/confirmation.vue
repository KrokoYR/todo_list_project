<template>
  <div class="modal-mask">
    <div class="modal-wrapper">
      <div class="modal-container">

        <div class="modal-header">
          <div class="header">
            <slot name="header">
              default header
            </slot>
          </div>
        </div>       

        <div class="modal-body">
          <div class="body">
            <slot name="body">
              default body
            </slot>
          </div>
        </div>

        <div class="modal-footer">
          <div class="footer">
            <button class="btn btn-submit" @click="$emit('submit')">Submit</button>
            <button class="btn btn-cancel" @click="$emit('close')">Cancel</button>
          </div>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
export default {
  
}
</script>

<style scoped>
  .modal-mask {
    position: fixed;
    z-index: 9998;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: table;
    transition: opacity 0.3s ease;
  }

  .modal-wrapper {
    display: table-cell;
    vertical-align: middle;
  }

  .modal-container {
    width: 300px;
    margin: 0px auto;
    padding: 1rem 1.25rem;
    background-color: #fff;
    border-radius: 2px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
    transition: all 0.3s ease;
    font-family: Helvetica, Arial, sans-serif;
  }

  .header {
    font-size: 1.1rem;
    font-weight: bold;
  }

  .modal-body {
    margin: 20px 0;
  }

  .body {
    font-size: 1rem;
  }

  .footer {
    display: flex;
    flex-direction: row-reverse;
  }

  .btn {
    cursor: pointer;
    border: 0;
    background: transparent;
    border-radius: 0.25rem;
    padding: 0.25rem;

    transition: 0.3s;
  }

  .btn-submit {
    color: crimson;
  }

  .btn-submit:hover {
    color: white;
    background: crimson;
  }

  .btn-cancel {
    color: royalblue;
  }

  .btn-cancel:hover {
    color: white;
    background: royalblue;
  }

  /*
  * The following styles are auto-applied to elements with
  * transition="modal" when their visibility is toggled
  * by Vue.js.
  *
  * You can easily play with the modal transition by editing
  * these styles.
  */

  .modal-enter {
    opacity: 0;
  }

  .modal-leave-active {
    opacity: 0;
  }

  .modal-enter .modal-container,
  .modal-leave-active .modal-container {
    -webkit-transform: scale(1.1);
    transform: scale(1.1);
  }
</style>