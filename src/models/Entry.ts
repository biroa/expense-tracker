import { uid } from 'quasar';
import type { EntryData } from 'src/types/index.ts';
export class Entry implements EntryData {
  id: string;
  name: string;
  amount: number;
  paid: boolean;

  constructor(name: string, amount: number, paid: boolean = false, id?: string) {
    this.id = id ?? uid();
    this.name = name;
    this.amount = amount;
    this.paid = paid;
  }

  // Business logic methods (testable)
  isIncome(): boolean {
    return this.amount > 0;
  }

  isExpense(): boolean {
    return this.amount < 0;
  }

  isZero(): boolean {
    return this.amount === 0;
  }

  togglePaid(): void {
    this.paid = !this.paid;
  }

  //  Omit<EntryData, 'id'> ~ Removes the id property because we do not allow changing the ID
  //  Partial<...> ~ Makes all remaining properties optional:
  update(updates: Partial<Omit<EntryData, 'id'>>): void {
    if (updates.name !== undefined) this.name = updates.name;
    if (updates.amount !== undefined) this.amount = updates.amount;
    if (updates.paid !== undefined) this.paid = updates.paid;
  }

  clone(): Entry {
    return new Entry(this.name, this.amount, this.paid, this.id);
  }

  // Serialization for LocalStorage
  static fromObject(obj: EntryData): Entry {
    return new Entry(obj.name, obj.amount, obj.paid, obj.id);
  }

  toObject(): EntryData {
    return {
      id: this.id,
      name: this.name,
      amount: this.amount,
      paid: this.paid,
    };
  }
}
