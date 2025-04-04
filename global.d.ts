// src/global.d.ts
import '@testing-library/jest-dom';

// Esto extiende los tipos de Jest para incluir los matchers personalizados
declare global {
  namespace jest {
    interface Matchers<R> {
      toBeInTheDocument(): R;
      toHaveTextContent(text: string | RegExp): R;
      toBeVisible(): R;
      // Agregá más matchers si los usás
    }
  }
}
