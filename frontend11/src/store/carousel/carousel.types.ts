// carousel.types.ts

export interface ICarouselItem {
  id: number;
  name: string;
  // Другие свойства вашего элемента карусели
}

export interface ICarouselInitialState {
  items: ICarouselItem[];
}
