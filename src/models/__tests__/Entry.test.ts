import { describe, it, expect, vi } from 'vitest';
import { Entry } from '../Entry';

// Mock quasar uid
vi.mock('quasar', () => ({
  uid: () => 'mock-uid-123',
}));

describe('Entry', () => {
  describe('constructor', () => {
    it('should create entry with default values', () => {
      const entry = new Entry('Salary', 5000);

      expect(entry.name).toBe('Salary');
      expect(entry.amount).toBe(5000);
      expect(entry.paid).toBe(false);
      expect(entry.id).toBe('mock-uid-123');
    });

    it('should create entry with custom id and paid status', () => {
      const entry = new Entry('Rent', -1000, true, 'custom-id');

      expect(entry.id).toBe('custom-id');
      expect(entry.name).toBe('Rent');
      expect(entry.paid).toBe(true);
      expect(entry.amount).toBe(-1000);
    });
  });

  describe('isIncome', () => {
    it('should return true for positive amounts', () => {
      const entry = new Entry('Salary', 5000);
      expect(entry.isIncome()).toBe(true);
    });

    it('should return false for negative amounts', () => {
      const entry = new Entry('Rent', -1000);
      expect(entry.isIncome()).toBe(false);
    });
  });

  describe('isExpense', () => {
    it('should return true for negative amounts', () => {
      const entry = new Entry('Rent', -1000);
      expect(entry.isExpense()).toBe(true);
    });

    it('should return false for positive amounts', () => {
      const entry = new Entry('Salary', 5000);
      expect(entry.isExpense()).toBe(false);
    });
  });

  describe('isZero', () => {
    it('should return true for zero amount', () => {
      const entry = new Entry('Unknown', 0);
      expect(entry.isZero()).toBe(true);
    });

    it('should return false for non-zero amount', () => {
      const entry = new Entry('Salary', 5000);
      expect(entry.isZero()).toBe(false);
    });
  });

  describe('togglePaid', () => {
    it('should toggle paid from false to true', () => {
      const entry = new Entry('Phone', -50);
      expect(entry.paid).toBe(false);

      entry.togglePaid();
      expect(entry.paid).toBe(true);
    });

    it('should toggle paid from true to false', () => {
      const entry = new Entry('Phone', -50, true);
      entry.togglePaid();
      expect(entry.paid).toBe(false);
    });
  });

  describe('update', () => {
    it('should update name only', () => {
      const entry = new Entry('Old Name', 100, false, 'id-1');
      entry.update({ name: 'New Name' });

      expect(entry.name).toBe('New Name');
      expect(entry.amount).toBe(100);
      expect(entry.paid).toBe(false);
    });

    it('should update multiple properties', () => {
      const entry = new Entry('Rent', -1000, false, 'id-1');
      entry.update({ amount: -1200, paid: true });

      expect(entry.name).toBe('Rent');
      expect(entry.amount).toBe(-1200);
      expect(entry.paid).toBe(true);
    });
  });

  describe('clone', () => {
    it('should create an independent copy', () => {
      const entry = new Entry('Salary', 5000, true, 'id-1');
      const cloned = entry.clone();

      expect(cloned.id).toBe(entry.id);
      expect(cloned.name).toBe(entry.name);
      expect(cloned).not.toBe(entry);

      cloned.name = 'Changed';
      expect(entry.name).toBe('Salary');
    });
  });

  describe('serialization', () => {
    it('should serialize to object', () => {
      const entry = new Entry('Salary', 5000, true, 'id-1');
      const obj = entry.toObject();

      expect(obj).toEqual({
        id: 'id-1',
        name: 'Salary',
        amount: 5000,
        paid: true,
      });
    });

    it('should deserialize from object', () => {
      const obj = { id: 'id-1', name: 'Rent', amount: -1000, paid: false };
      const entry = Entry.fromObject(obj);

      expect(entry).toBeInstanceOf(Entry);
      expect(entry.id).toBe('id-1');
      expect(entry.name).toBe('Rent');
    });
  });
});
