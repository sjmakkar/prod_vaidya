// state.js
import { atom, selector } from 'recoil';

// Atoms for managing individual state slices
export const slotsState = atom({
  key: 'slotsState',
  default: [],
});

export const loadingState = atom({
  key: 'loadingState',
  default: false,
});

export const formDataState = atom({
  key: 'formDataState',
  default: {
    startTime: '',
    endTime: '',
    slotRange: '',
    date: '',
  },
});

export const selectedDateState = atom({
  key: 'selectedDateState',
  default: '',
});

// Selector for filtering slots by selected date
export const filteredSlotsState = selector({
  key: 'filteredSlotsState',
  get: ({ get }) => {
    const slots = get(slotsState);
    const selectedDate = get(selectedDateState);
    return slots.filter((slot) => slot.date === selectedDate);
  },
});
