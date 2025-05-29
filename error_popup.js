// Функция для показа множества всплывающих окон с ошибкой
function showErrorPopups() {
  // Количество окон, которые нужно показать
  const numPopups = 15;
  
  // Звуковой эффект ошибки (если есть)
  try {
    const errorSound = new Audio('images/error.wav');
    errorSound.play();
  } catch (e) {
    console.log('Error sound not available');
  }
  
  // Создаем всплывающие окна с небольшой задержкой между ними
  for (let i = 0; i < numPopups; i++) {
    setTimeout(() => {
      // Создаем контейнер для всплывающего окна
      const popup = document.createElement('div');
      popup.className = 'error-popup';
      popup.style.position = 'fixed';
      popup.style.zIndex = '9999';
      popup.style.top = Math.floor(Math.random() * 70) + '%';
      popup.style.left = Math.floor(Math.random() * 70) + '%';
      popup.style.width = '300px';
      popup.style.backgroundColor = '#c0c0c0';
      popup.style.border = '3px outset #ffffff';
      popup.style.boxShadow = '3px 3px 10px rgba(0,0,0,0.5)';
      popup.style.padding = '2px';
      
      // Создаем заголовок в стиле Windows 2000
      const header = document.createElement('div');
      header.style.background = 'linear-gradient(to right, #000080, #1084d0)';
      header.style.color = 'white';
      header.style.fontWeight = 'bold';
      header.style.padding = '3px 5px';
      header.style.display = 'flex';
      header.style.justifyContent = 'space-between';
      header.innerHTML = '<span>System Error</span><span style="cursor:pointer;">×</span>';
      
      // Создаем содержимое окна
      const content = document.createElement('div');
      content.style.backgroundColor = '#f0f0f0';
      content.style.padding = '15px';
      content.style.textAlign = 'center';
      content.innerHTML = `
        <img src="images/error.gif" alt="Error" style="width:100px; margin-bottom:10px;">
        <p style="margin-bottom:15px;">Token system failure: unexpected error occurred.</p>
        <button style="padding:5px 20px; background:#c0c0c0; border:2px outset #fff; cursor:pointer;">OK</button>
      `;
      
      // Добавляем элементы в DOM
      popup.appendChild(header);
      popup.appendChild(content);
      document.body.appendChild(popup);
      
      // Добавляем функциональность закрытия для кнопки X
      const closeButton = header.querySelector('span:last-child');
      closeButton.addEventListener('click', () => {
        document.body.removeChild(popup);
      });
      
      // Добавляем функциональность закрытия для кнопки OK
      const okButton = content.querySelector('button');
      okButton.addEventListener('click', () => {
        document.body.removeChild(popup);
      });
      
    }, i * 300); // Задержка между появлениями окон
  }
}
