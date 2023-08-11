document.addEventListener('DOMContentLoaded', function () {
    $(document).on('change', '.input-file input[type=file]', function () {
        let file = this.files[0];
        $(this).closest('.input-file').find('.input-file-text').html(file.name);
    });
});



  window.addEventListener("beforeunload", () => {
    // Отримуємо збережене значення persist:root з localStorage
    const persistRoot = localStorage.getItem("persist:root");
    
    if (persistRoot) {
      const parsedPersistRoot = JSON.parse(persistRoot);
      parsedPersistRoot.activeSong = null; // Встановлюємо activeSong на null
      localStorage.setItem("persist:root", JSON.stringify(parsedPersistRoot)); // Зберігаємо змінений об'єкт назад
    }
  });