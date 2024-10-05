import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Определяем тип для элементов в карусели
interface CarouselItem {
  id: number;
  imageUrl: string;
  title: string;
}

// Определяем начальное состояние карусели
interface CarouselState {
  items: CarouselItem[];
  // Другие возможные поля состояния карусели можно добавить здесь
}

// Начальное состояние карусели
const initialState: CarouselState = {
  items: [],
};

// Создаем слайс для карусели
const carouselSlice = createSlice({
  name: 'carousel',
  initialState,
  reducers: {
    // Добавление элемента в карусель
    addItemToCarousel(state, action: PayloadAction<CarouselItem>) {
      state.items.push(action.payload);
    },
    // Удаление элемента из карусели
    removeItemFromCarousel(state, action: PayloadAction<number>) {
      state.items = state.items.filter(item => item.id !== action.payload);
    },
    // Очистка карусели
    clearCarousel(state) {
      state.items = [];
    },
    // Другие возможные действия с каруселью можно добавить здесь
  },
});

// Экспортируем экшены и редюсер из слайса
export const { addItemToCarousel, removeItemFromCarousel, clearCarousel } = carouselSlice.actions;
export default carouselSlice.reducer;
