document.addEventListener('click', async (e) => {
  const btn = e.target.closest('.buy-btn');
  if(!btn) return;
  const sku = btn.dataset.sku;
  // Simple checkout stub - in prod redirect to Stripe Checkout or Worker endpoint
  alert('Checkout stub: ' + sku + '\nIn production, call /api/checkout to create a Stripe session.');
});
