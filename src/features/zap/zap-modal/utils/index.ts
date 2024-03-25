export const payInvoiceByWebln = async (invoice: string): Promise<boolean> => {
  const { webln } = window as { webln?: any };

  if (webln) {
    try {
      await webln.enable();

      try {
        await webln.sendPayment(invoice);

        return true;
      } catch (_) {
        return false;
      }
    } catch (_) {
      return false;
    }
  } else {
    return false;
  }
};
