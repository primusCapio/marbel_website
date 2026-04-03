'use client';

import type { Invoice, InvoiceData } from '@/lib/types';
import { createContext, useContext, useState, useEffect, ReactNode, useCallback } from 'react';
import { useToast } from './use-toast';

interface BillingContextType {
  invoices: Invoice[];
  addInvoice: (invoiceData: InvoiceData) => void;
}

const BillingContext = createContext<BillingContextType | undefined>(undefined);

export function BillingProvider({ children }: { children: ReactNode }) {
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const { toast } = useToast();

  useEffect(() => {
    const storedInvoices = localStorage.getItem('invoices');
    if (storedInvoices) {
      setInvoices(JSON.parse(storedInvoices));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('invoices', JSON.stringify(invoices));
  }, [invoices]);

  const addInvoice = (invoiceData: InvoiceData) => {
    const newInvoice: Invoice = {
      ...invoiceData,
      id: `inv_${Date.now()}`,
      invoiceNumber: `INV-${String(invoices.length + 1).padStart(4, '0')}`,
      date: new Date().toISOString(),
    };

    setInvoices(prevInvoices => [newInvoice, ...prevInvoices]);
    
    toast({
      title: "Invoice Created!",
      description: `Invoice ${newInvoice.invoiceNumber} has been generated.`,
    });
  };
  
  const value = { invoices, addInvoice };

  return <BillingContext.Provider value={value}>{children}</BillingContext.Provider>;
}

export function useBilling() {
  const context = useContext(BillingContext);
  if (context === undefined) {
    throw new Error('useBilling must be used within a BillingProvider');
  }
  return context;
}
