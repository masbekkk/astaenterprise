import React, { act } from 'react';
import { createRoot } from 'react-dom/client';
import ContactForm from './ContactForm';

jest.mock('@/context/AppContext', () => ({
  useApp: () => ({ t: require('../data/brand-content.json').en, lang: 'en' }),
}));
jest.mock('@/components/ui/select', () => ({
  Select: ({ onValueChange, children }) => <div><button type="button" onClick={() => onValueChange('retail')}>Choose retail</button>{children}</div>,
  SelectTrigger: ({ children }) => <div>{children}</div>,
  SelectValue: () => null,
  SelectContent: () => null,
  SelectItem: () => null,
}));

let container;
let root;
beforeEach(() => {
  global.IS_REACT_ACT_ENVIRONMENT = true;
  container = document.createElement('div');
  document.body.appendChild(container);
  root = createRoot(container);
  process.env.REACT_APP_SPREADSHEET_URL = 'https://example.invalid/inquiry';
});
afterEach(async () => {
  await act(async () => root.unmount());
  container.remove();
  delete global.fetch;
  delete process.env.REACT_APP_SPREADSHEET_URL;
});

test('an opaque response does not claim an inquiry was accepted', async () => {
  global.fetch = jest.fn().mockResolvedValue({ ok: false, type: 'opaque' });
  await act(async () => root.render(<ContactForm />));
  await act(async () => container.querySelector('button').click());
  await act(async () => container.querySelector('form').dispatchEvent(new Event('submit', { bubbles: true, cancelable: true })));
  expect(container.querySelector('[data-testid="contact-success"]')).toBeNull();
  expect(container.querySelector('[data-testid="contact-error"]').textContent).toContain('could not be confirmed');
  expect(container.querySelector('[data-testid="contact-error"] a').href).toMatch(/^https:\/\/wa\.me\//);
  expect(container.querySelector('form')).not.toBeNull();
});

test('an acknowledged response shows confirmation', async () => {
  global.fetch = jest.fn().mockResolvedValue({ ok: true, type: 'basic' });
  await act(async () => root.render(<ContactForm />));
  await act(async () => container.querySelector('button').click());
  await act(async () => container.querySelector('form').dispatchEvent(new Event('submit', { bubbles: true, cancelable: true })));
  expect(container.querySelector('[data-testid="contact-success"]').textContent).toContain('was received');
});

test('a network failure keeps the form available for another attempt', async () => {
  global.fetch = jest.fn().mockRejectedValue(new Error('network unavailable'));
  await act(async () => root.render(<ContactForm />));
  await act(async () => container.querySelector('button').click());
  await act(async () => container.querySelector('form').dispatchEvent(new Event('submit', { bubbles: true, cancelable: true })));
  expect(container.querySelector('[data-testid="contact-error"]').textContent).toContain('not sent');
  expect(container.querySelector('form')).not.toBeNull();
});
