import React, { useState, useEffect } from 'react';
import Loader from './Loader'; // Импортируем компонент Loader

const MyComponent = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Логика загрузки данных
    setLoading(false); // Установка loading в false после загрузки данных
  }, []);

  return (
    <div>
      {loading ? (
        <Loader /> // Отображаем Loader во время загрузки
      ) : (
        // Отображаем контент после загрузки данных
        <div>
          {/* Ваш контент */}
        </div>
      )}
    </div>
  );
};

export default MyComponent;
