if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initCustomSelect);
} else {
  initCustomSelect();
}

function initCustomSelect() {
  // Инициализация всех кастомных селектов
  const selectBoxes = document.querySelectorAll('.custom-select-box');

  selectBoxes.forEach((selectBox) => {
    const selectValue = selectBox.querySelector('.select-value');
    const dropdownWrapper = selectBox.querySelector('.dropdown-wrapper');
    const listItems = selectBox.querySelectorAll('li');

    // Открытие/закрытие dropdown при клике на select-value
    selectValue.addEventListener('click', (e) => {
      e.stopPropagation();
      dropdownWrapper.classList.toggle('active');
    });

    // Обработка клика на элемент списка
    listItems.forEach((item) => {
      item.addEventListener('click', (e) => {
        e.stopPropagation();

        // Обновляем текст выбранного значения
        selectValue.textContent = item.textContent;

        // Удаляем класс active со всех элементов
        listItems.forEach((li) => li.classList.remove('active'));

        // Добавляем класс active выбранному элементу
        item.classList.add('active');

        // Закрываем dropdown
        dropdownWrapper.classList.remove('active');

        // Вызываем custom event для возможности обработки снаружи
        const event = new CustomEvent('selectChange', {
          detail: {
            value: item.getAttribute('data-code'),
            text: item.textContent,
            selectBox: selectBox
          }
        });
        selectBox.dispatchEvent(event);
      });
    });
  });

  // Закрытие dropdown при клике вне компонента
  document.addEventListener('click', (e) => {
    selectBoxes.forEach((selectBox) => {
      if (!selectBox.contains(e.target)) {
        const dropdownWrapper = selectBox.querySelector('.dropdown-wrapper');
        dropdownWrapper.classList.remove('active');
      }
    });
  });
}
