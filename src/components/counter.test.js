import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Counter from './counter';

test('muestra el valor actual inicial', () => {
  render(<Counter />);
  expect(screen.getByText(/valor actual/i)).toBeInTheDocument();
});

test('incrementa en 1 al hacer clic en "+1"', () => {
  render(<Counter />);
  const botonIncrementar = screen.getByText('+1');
  fireEvent.click(botonIncrementar);
  expect(screen.getByText(/valor actual: 1/i)).toBeInTheDocument();
});

test('decrementa en 1 al hacer clic en "-1"', () => {
  render(<Counter />);
  const botonDecrementar = screen.getByText('-1');
  fireEvent.click(botonDecrementar);
  expect(screen.getByText(/valor actual: -1/i)).toBeInTheDocument();
});

test('reinicia al valor inicial después de cambiarlo', () => {
  render(<Counter />);
  const inputInicial = screen.getByPlaceholderText(/valor inicial/i);
  fireEvent.change(inputInicial, { target: { value: '10' } });
  const botonResetear = screen.getByText(/resetear/i);
  fireEvent.click(botonResetear);
  expect(screen.getByText(/valor actual: 10/i)).toBeInTheDocument();
});

test('no cambia el contador al ingresar texto no numérico y resetear', () => {
  render(<Counter />);
  const input = screen.getByPlaceholderText(/valor inicial/i);
  fireEvent.change(input, { target: { value: 'abc' } });
  const resetBtn = screen.getByText(/resetear/i);
  fireEvent.click(resetBtn);
  expect(screen.getByText(/valor actual: 0/i)).toBeInTheDocument();
});

test('incrementa por valor personalizado', () => {
  render(<Counter />);
  const input = screen.getByPlaceholderText(/valor personalizado/i);
  fireEvent.change(input, { target: { value: '5' } });
  const btnSumar = screen.getByText('+N');
  fireEvent.click(btnSumar);
  expect(screen.getByText(/valor actual: 5/i)).toBeInTheDocument();
});

test('decrementa por valor personalizado', () => {
  render(<Counter />);
  const input = screen.getByPlaceholderText(/valor personalizado/i);
  fireEvent.change(input, { target: { value: '3' } });
  const btnRestar = screen.getByText('-N');
  fireEvent.click(btnRestar);
  expect(screen.getByText(/valor actual: -3/i)).toBeInTheDocument();
});

test('usa step 1 por defecto si el input personalizado es inválido', () => {
  render(<Counter />);
  const input = screen.getByPlaceholderText(/valor personalizado/i);
  fireEvent.change(input, { target: { value: 'abc' } });
  const btnSumar = screen.getByText('+N');
  fireEvent.click(btnSumar);
  expect(screen.getByText(/valor actual: 1/i)).toBeInTheDocument();
});

test('no cambia el contador si el input está vacío y se resetea', () => {
  render(<Counter />);
  const input = screen.getByPlaceholderText(/valor inicial/i);
  fireEvent.change(input, { target: { value: '' } });
  const btnReset = screen.getByText(/resetear/i);
  fireEvent.click(btnReset);
  expect(screen.getByText(/valor actual: 0/i)).toBeInTheDocument();
});

test('resetea a número negativo ingresado', () => {
  render(<Counter />);
  const input = screen.getByPlaceholderText(/valor inicial/i);
  fireEvent.change(input, { target: { value: '-7' } });
  const btnReset = screen.getByText(/resetear/i);
  fireEvent.click(btnReset);
  expect(screen.getByText(/valor actual: -7/i)).toBeInTheDocument();
});

test('resetea a 0 si no se modifica el input', () => {
  render(<Counter />);
  const btnReset = screen.getByText(/resetear/i);
  fireEvent.click(btnReset);
  expect(screen.getByText(/valor actual: 0/i)).toBeInTheDocument();
});

test('parsea correctamente número con espacios y resetea', () => {
  render(<Counter />);
  const input = screen.getByPlaceholderText(/valor inicial/i);
  fireEvent.change(input, { target: { value: ' 8 ' } });
  const btnReset = screen.getByText(/resetear/i);
  fireEvent.click(btnReset);

  expect(screen.getByText((content, node) =>
    node?.textContent === 'Valor actual: 8'
  )).toBeInTheDocument();
});

test('usa 1 como paso si se ingresa valor no numérico', () => {
  render(<Counter />);
  const input = screen.getByPlaceholderText(/valor personalizado/i);
  fireEvent.change(input, { target: { value: 'abc' } });

  const btn = screen.getByText('+N');
  fireEvent.click(btn);

  expect(screen.getByText(/valor actual: 1/i)).toBeInTheDocument();
});

test('usa 0 como valor inicial si se ingresa texto', () => {
  render(<Counter />);
  const input = screen.getByPlaceholderText(/valor inicial/i);
  fireEvent.change(input, { target: { value: 'xyz' } });

  const btn = screen.getByText(/resetear/i);
  fireEvent.click(btn);

  expect(screen.getByText(/valor actual: 0/i)).toBeInTheDocument();
});
