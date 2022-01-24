import React from 'react';
import { startEngine, stopEngine, drive } from './api';
import store from './store';

function getPositionAtCenter(element: HTMLElement) {
  const { top, left, width, height } = element.getBoundingClientRect();
  return {
    x: left + width / 2,
    y: top + height / 2,
  };
}

export function getDistanceBetweenElements(a: HTMLElement, b: HTMLElement): number {
  const aPosition = getPositionAtCenter(a);
  const bPosition = getPositionAtCenter(b);
  return Math.sqrt((aPosition.x - bPosition.x) ** 2 + (aPosition.y - bPosition.y) ** 2);
}

export function animation(
  car: HTMLElement,
  distance: number,
  animationTime: number,
): Record<string, number> {
  let start: number | null = null;
  const state: Record<string, number> = {};
  function step(timestamp: number) {
    if (!start) start = timestamp;
    const time = timestamp - start;
    const passed = Math.round(time * (distance / animationTime));
    car.style.transform = `translateX(${Math.min(passed, distance)}px)`;
    if (passed < distance) {
      state.id = window.requestAnimationFrame(step);
    }
  }
  state.id = window.requestAnimationFrame(step);
  return state;
}

const startDriving = async (id: number):
  Promise<{ success: boolean, id: number, time: number }> => {
  const { velocity, distance } = await startEngine(id);
  const time = Math.round(distance / velocity);
  const car = document.getElementById(`car-${id}`) as HTMLElement;
  const flag = document.getElementById(`flag-${id}`) as HTMLElement;
  const htmlDistance = Math.floor(getDistanceBetweenElements((car), (flag))) - 30;
  store.animation[id] = animation((car), htmlDistance, time);
  const { success } = await drive(id);
  if (!success) window.cancelAnimationFrame(store.animation[id].id);
  console.log({ success, id, time });
  return { success, id, time };
};

const stopDriving = async (id: number) => {
  await stopEngine(id);
  const car = document.getElementById(`car-${id}`);
  if (car) car.style.transform = 'translateX(0)';
  if (store.animation[id]) window.cancelAnimationFrame(store.animation[id].id);
};

export const start = (e: Event) => {
  const startButton = e.target as HTMLButtonElement;
  const parent = startButton.parentElement?.parentElement as HTMLElement;
  const id = Number(parent.id) as number;
  startButton.classList.add('disabled');
  startButton.disabled = true;
  startDriving(id).then(() => {
    startButton.classList.remove('disabled');
    startButton.disabled = false;
  });
};
export const stop = (e: Event) => {
  const stopButton = e.target as HTMLButtonElement;
  const parent = stopButton.parentElement?.parentElement as HTMLElement;
  const id = Number(parent.id) as number;
  const startButton = document.getElementById(`start-button-${id}`) as HTMLButtonElement;
  stopButton.classList.add('disabled');
  stopButton.disabled = true;
  console.log(parent);
  stopDriving(id).then(() => {
    stopButton.classList.remove('disabled');
    stopButton.disabled = false;
    startButton.classList.remove('disabled');
    startButton.disabled = false;
  });
};