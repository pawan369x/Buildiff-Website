import React, { useState } from 'react';
import {
  X, CheckCircle2, ShieldCheck, QrCode, CreditCard, Building2,
  Banknote, Lock, ArrowLeft, ArrowRight, Printer, Sparkles, AlertCircle, MessageCircle
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { useCart } from '../context/CartContext';

const PaymentModal = () => {
  const {
    cart,
    finalTotal,
    discount,
    deliveryFee,
    subtotal,
    isCheckoutOpen,
    setIsCheckoutOpen,
    clearCart,
    setActiveTab
  } = useCart();

  const [step, setStep] = useState(1); // 1: Shipping, 2: Payment, 3: Processing, 4: Success
  const [selectedMethod, setSelectedMethod] = useState('upi'); // 'upi' | 'card' | 'netbanking' | 'cod'

  // Shipping form state
  const [shippingData, setShippingData] = useState({
    fullName: '',
    phone: '',
    email: '',
    address: '',
    city: '',
    state: 'Delhi',
    pincode: ''
  });

  // Payment method specific states
  const [upiId, setUpiId] = useState('');
  const [cardData, setCardData] = useState({
    number: '',
    name: '',
    expiry: '',
    cvv: ''
  });
  const [selectedBank, setSelectedBank] = useState('HDFC Bank');
  const [codCaptcha, setCodCaptcha] = useState('');
  const [orderSummary, setOrderSummary] = useState(null);
  const [errorMsg, setErrorMsg] = useState('');

  if (!isCheckoutOpen) return null;

  // Auto fill demo data for quick testing
  const handleFillDemoData = () => {
    setShippingData({
      fullName: 'Vikram Sharma',
      phone: '+91 98765 43210',
      email: 'vikram.sharma@example.com',
      address: 'Plot 42, Fitness Enclave, Sector 14',
      city: 'New Delhi',
      state: 'Delhi',
      pincode: '110001'
    });
    setErrorMsg('');
  };

  const handleShippingSubmit = (e) => {
    e.preventDefault();
    if (!shippingData.fullName || !shippingData.phone || !shippingData.address || !shippingData.pincode) {
      setErrorMsg('Please fill in all mandatory address fields.');
      return;
    }
    setErrorMsg('');
    setStep(2);
  };

  const handleCardNumberChange = (e) => {
    let value = e.target.value.replace(/\D/g, '').slice(0, 16);
    let formatted = value.match(/.{1,4}/g)?.join(' ') || value;
    setCardData({ ...cardData, number: formatted });
  };

  const handleCardExpiryChange = (e) => {
    let value = e.target.value.replace(/\D/g, '').slice(0, 4);
    if (value.length >= 2) {
      value = value.slice(0, 2) + '/' + value.slice(2);
    }
    setCardData({ ...cardData, expiry: value });
  };

  const triggerConfetti = () => {
    try {
      confetti({
        particleCount: 120,
        spread: 70,
        origin: { y: 0.6 }
      });
    } catch {
      // fallback safe
    }
  };

  const sendOrderToWhatsApp = (summary) => {
    if (!summary) return;
    const itemsList = summary.items.map((item, idx) => 
      `${idx + 1}. *${item.name}*\n   • Size: ${item.selectedSizeLabel || 'Standard'} | Flavor: ${item.selectedFlavor || 'Standard'}\n   • Qty: ${item.quantity} x ₹${item.price.toLocaleString('en-IN')} = ₹${(item.price * item.quantity).toLocaleString('en-IN')}`
    ).join('\n\n');

    const text = 
`🏋️‍♂️ *NEW ORDER RECEIVED - BUILDIFF NUTRITION* 🏋️‍♂️

🆔 *Order Ref:* ${summary.orderId}
📅 *Date:* ${summary.date}
💳 *Payment Mode:* ${summary.paymentMethod}

👤 *CUSTOMER PERSONAL & SHIPPING DETAILS:*
• *Full Name:* ${summary.shipping.fullName}
• *Phone Number:* ${summary.shipping.phone}
• *Email:* ${summary.shipping.email || 'N/A'}
• *Full Address:* ${summary.shipping.address}
• *City:* ${summary.shipping.city}
• *State:* ${summary.shipping.state}
• *Pincode:* ${summary.shipping.pincode}

🛒 *PURCHASED PRODUCTS:*
${itemsList}

💵 *ORDER AMOUNT BREAKDOWN:*
• Subtotal: ₹${summary.subtotal.toLocaleString('en-IN')}
• Discount: -₹${summary.discount.toLocaleString('en-IN')}
• Delivery Fee: ${summary.deliveryFee === 0 ? 'FREE' : `₹${summary.deliveryFee}`}
• *FINAL AMOUNT PAID:* ₹${summary.total.toLocaleString('en-IN')}

🚚 *Est. Delivery Date:* ${summary.deliveryDate}`;

    const encodedText = encodeURIComponent(text);
    const whatsappUrl = `https://api.whatsapp.com/send?phone=917986014199&text=${encodedText}`;
    window.open(whatsappUrl, '_blank');
  };

  const handleProcessPayment = () => {
    // Validation
    if (selectedMethod === 'upi') {
      if (!upiId || !upiId.includes('@')) {
        setErrorMsg('Please enter a valid UPI ID (e.g., yourname@oksbi / paytm)');
        return;
      }
    } else if (selectedMethod === 'card') {
      if (cardData.number.replace(/\s/g, '').length < 16 || !cardData.name || !cardData.expiry || !cardData.cvv) {
        setErrorMsg('Please complete all credit/debit card details correctly.');
        return;
      }
    } else if (selectedMethod === 'cod') {
      if (codCaptcha !== '7842') {
        setErrorMsg('Please enter the correct verification code (7842) for COD.');
        return;
      }
    }

    setErrorMsg('');
    setStep(3); // Show processing screen

    // Simulate payment gateway delay (2 seconds)
    setTimeout(() => {
      const generatedOrderId = 'TTN-' + Math.floor(100000 + Math.random() * 900000);
      const deliveryDate = new Date();
      deliveryDate.setDate(deliveryDate.getDate() + 3);

      const newSummary = {
        orderId: generatedOrderId,
        date: new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }),
        deliveryDate: deliveryDate.toLocaleDateString('en-IN', { weekday: 'short', day: 'numeric', month: 'short' }),
        items: [...cart],
        subtotal,
        discount,
        deliveryFee,
        total: finalTotal,
        paymentMethod: selectedMethod.toUpperCase(),
        shipping: { ...shippingData }
      };

      setOrderSummary(newSummary);
      setStep(4);
      triggerConfetti();
      clearCart();
      sendOrderToWhatsApp(newSummary);
    }, 2200);
  };

  const handlePrintReceipt = () => {
    window.print();
  };

  const handleClose = () => {
    setIsCheckoutOpen(false);
    setStep(1);
    setErrorMsg('');
  };

  const handleFinishAndShop = () => {
    handleClose();
    setActiveTab('products');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="payment-backdrop" onClick={handleClose}>
      <div className="payment-modal-box" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="payment-modal-header">
          <div className="header-badge-title">
            <Lock size={18} className="text-primary" />
            <h3>Titan Secure Checkout</h3>
          </div>
          {step !== 3 && (
            <button className="btn-icon-close" onClick={handleClose} aria-label="Close Checkout">
              <X size={20} />
            </button>
          )}
        </div>

        {/* Checkout Steps Progress Bar */}
        {step < 4 && (
          <div className="checkout-stepper">
            <div className={`step-item ${step >= 1 ? 'active' : ''}`}>
              <span className="step-circle">1</span>
              <span className="step-label">Delivery Address</span>
            </div>
            <div className="step-line"></div>
            <div className={`step-item ${step >= 2 ? 'active' : ''}`}>
              <span className="step-circle">2</span>
              <span className="step-label">Payment Method</span>
            </div>
            <div className="step-line"></div>
            <div className={`step-item ${step >= 3 ? 'active' : ''}`}>
              <span className="step-circle">3</span>
              <span className="step-label">Receipt</span>
            </div>
          </div>
        )}

        {/* Error Notification */}
        {errorMsg && (
          <div className="checkout-error-banner">
            <AlertCircle size={18} />
            <span>{errorMsg}</span>
          </div>
        )}

        {/* STEP 1: SHIPPING ADDRESS */}
        {step === 1 && (
          <div className="step-content">
            <div className="step-headline-row">
              <div>
                <h4>Where should we deliver your gear?</h4>
                <p>Enter your full delivery address for express pan-India shipping.</p>
              </div>
              <button
                type="button"
                className="btn-demo-fill"
                onClick={handleFillDemoData}
              >
                ⚡ Autofill Demo Details
              </button>
            </div>

            <form onSubmit={handleShippingSubmit} className="shipping-form">
              <div className="form-grid-2">
                <div className="form-group">
                  <label>Full Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Vikram Sharma"
                    value={shippingData.fullName}
                    onChange={(e) => setShippingData({ ...shippingData, fullName: e.target.value })}
                  />
                </div>
                <div className="form-group">
                  <label>Phone Number *</label>
                  <input
                    type="tel"
                    required
                    placeholder="+91 98765 43210"
                    value={shippingData.phone}
                    onChange={(e) => setShippingData({ ...shippingData, phone: e.target.value })}
                  />
                </div>
              </div>

              <div className="form-group">
                <label>Email Address</label>
                <input
                  type="email"
                  placeholder="order-updates@example.com"
                  value={shippingData.email}
                  onChange={(e) => setShippingData({ ...shippingData, email: e.target.value })}
                />
              </div>

              <div className="form-group">
                <label>Street Address / Flat / Gym Center *</label>
                <textarea
                  rows={2}
                  required
                  placeholder="House / Flat No., Street, Landmark"
                  value={shippingData.address}
                  onChange={(e) => setShippingData({ ...shippingData, address: e.target.value })}
                ></textarea>
              </div>

              <div className="form-grid-3">
                <div className="form-group">
                  <label>City *</label>
                  <input
                    type="text"
                    required
                    placeholder="New Delhi"
                    value={shippingData.city}
                    onChange={(e) => setShippingData({ ...shippingData, city: e.target.value })}
                  />
                </div>
                <div className="form-group">
                  <label>State *</label>
                  <input
                    type="text"
                    required
                    placeholder="Delhi"
                    value={shippingData.state}
                    onChange={(e) => setShippingData({ ...shippingData, state: e.target.value })}
                  />
                </div>
                <div className="form-group">
                  <label>PIN Code *</label>
                  <input
                    type="text"
                    required
                    maxLength={6}
                    placeholder="110001"
                    value={shippingData.pincode}
                    onChange={(e) => setShippingData({ ...shippingData, pincode: e.target.value })}
                  />
                </div>
              </div>

              <div className="step-actions">
                <div className="mini-order-total">
                  <span>Payable Total:</span>
                  <strong>₹{finalTotal.toLocaleString('en-IN')}</strong>
                </div>
                <button type="submit" className="btn-primary">
                  <span>Continue to Payment</span>
                  <ArrowRight size={18} />
                </button>
              </div>
            </form>
          </div>
        )}

        {/* STEP 2: PAYMENT METHOD SELECTION */}
        {step === 2 && (
          <div className="step-content">
            <div className="payment-options-layout">
              {/* Payment Methods Sidebar */}
              <div className="payment-tabs-sidebar">
                <button
                  type="button"
                  className={`payment-tab-btn ${selectedMethod === 'upi' ? 'active' : ''}`}
                  onClick={() => setSelectedMethod('upi')}
                >
                  <QrCode size={20} />
                  <div className="tab-btn-text">
                    <span className="tab-title">UPI / QR Code</span>
                    <span className="tab-sub">GPay, PhonePe, Paytm</span>
                  </div>
                </button>

                <button
                  type="button"
                  className={`payment-tab-btn ${selectedMethod === 'card' ? 'active' : ''}`}
                  onClick={() => setSelectedMethod('card')}
                >
                  <CreditCard size={20} />
                  <div className="tab-btn-text">
                    <span className="tab-title">Credit / Debit Card</span>
                    <span className="tab-sub">Visa, Mastercard, RuPay</span>
                  </div>
                </button>

                <button
                  type="button"
                  className={`payment-tab-btn ${selectedMethod === 'netbanking' ? 'active' : ''}`}
                  onClick={() => setSelectedMethod('netbanking')}
                >
                  <Building2 size={20} />
                  <div className="tab-btn-text">
                    <span className="tab-title">Net Banking</span>
                    <span className="tab-sub">All Major Indian Banks</span>
                  </div>
                </button>

                <button
                  type="button"
                  className={`payment-tab-btn ${selectedMethod === 'cod' ? 'active' : ''}`}
                  onClick={() => setSelectedMethod('cod')}
                >
                  <Banknote size={20} />
                  <div className="tab-btn-text">
                    <span className="tab-title">Cash on Delivery</span>
                    <span className="tab-sub">Pay cash when delivered</span>
                  </div>
                </button>
              </div>

              {/* Payment Method Panel Detail */}
              <div className="payment-detail-card">
                {/* 1. UPI Payment Option */}
                {selectedMethod === 'upi' && (
                  <div className="upi-payment-panel">
                    <div className="qr-section">
                      <div className="qr-code-box">
                        <img
                          src={`https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=upi://pay?pa=titanfitness@oksbi&pn=TitanFitness&am=${finalTotal}&cu=INR`}
                          alt="Titan Fitness Payment QR"
                          className="qr-img"
                        />
                        <span className="qr-caption">Scan with ANY UPI App</span>
                      </div>
                      <div className="upi-apps-icons">
                        <span className="app-badge gpay">GPay</span>
                        <span className="app-badge phonepe">PhonePe</span>
                        <span className="app-badge paytm">Paytm</span>
                        <span className="app-badge bhim">BHIM</span>
                      </div>
                    </div>

                    <div className="divider-or"><span>OR ENTER VPA / UPI ID</span></div>

                    <div className="form-group">
                      <label>UPI ID / Virtual Payment Address</label>
                      <div className="input-with-action">
                        <input
                          type="text"
                          placeholder="e.g. yourname@oksbi / 9876543210@paytm"
                          value={upiId}
                          onChange={(e) => setUpiId(e.target.value)}
                        />
                        <button
                          type="button"
                          className="btn-quick-vpa"
                          onClick={() => setUpiId('athlete@oksbi')}
                        >
                          Fill Demo UPI
                        </button>
                      </div>
                    </div>
                  </div>
                )}

                {/* 2. Credit/Debit Card Option */}
                {selectedMethod === 'card' && (
                  <div className="card-payment-panel">
                    {/* Virtual Card Preview */}
                    <div className="virtual-card">
                      <div className="card-top-row">
                        <span className="card-chip"></span>
                        <span className="card-brand">TITAN PAY</span>
                      </div>
                      <div className="card-number-display">
                        {cardData.number || '•••• •••• •••• ••••'}
                      </div>
                      <div className="card-bottom-row">
                        <div>
                          <span className="card-label">CARD HOLDER</span>
                          <span className="card-val">{cardData.name || 'YOUR NAME'}</span>
                        </div>
                        <div>
                          <span className="card-label">EXPIRES</span>
                          <span className="card-val">{cardData.expiry || 'MM/YY'}</span>
                        </div>
                      </div>
                    </div>

                    <div className="card-form-grid">
                      <div className="form-group">
                        <label>Card Number</label>
                        <input
                          type="text"
                          placeholder="1234 5678 9101 1121"
                          value={cardData.number}
                          onChange={handleCardNumberChange}
                        />
                      </div>
                      <div className="form-group">
                        <label>Cardholder Name</label>
                        <input
                          type="text"
                          placeholder="Vikram Sharma"
                          value={cardData.name}
                          onChange={(e) => setCardData({ ...cardData, name: e.target.value })}
                        />
                      </div>
                      <div className="form-grid-2">
                        <div className="form-group">
                          <label>Expiry Date</label>
                          <input
                            type="text"
                            placeholder="MM/YY"
                            value={cardData.expiry}
                            onChange={handleCardExpiryChange}
                          />
                        </div>
                        <div className="form-group">
                          <label>CVV / CVC</label>
                          <input
                            type="password"
                            maxLength={3}
                            placeholder="•••"
                            value={cardData.cvv}
                            onChange={(e) => setCardData({ ...cardData, cvv: e.target.value })}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* 3. Net Banking Option */}
                {selectedMethod === 'netbanking' && (
                  <div className="netbanking-panel">
                    <h4>Select Your Bank</h4>
                    <div className="bank-selection-grid">
                      {['HDFC Bank', 'State Bank of India', 'ICICI Bank', 'Axis Bank', 'Kotak Mahindra', 'Punjab National Bank'].map(bank => (
                        <button
                          key={bank}
                          type="button"
                          className={`bank-tile ${selectedBank === bank ? 'active' : ''}`}
                          onClick={() => setSelectedBank(bank)}
                        >
                          <Building2 size={18} />
                          <span>{bank}</span>
                        </button>
                      ))}
                    </div>
                    <p className="bank-note">You will be securely redirected to {selectedBank} login gateway to complete the payment.</p>
                  </div>
                )}

                {/* 4. Cash on Delivery (COD) Option */}
                {selectedMethod === 'cod' && (
                  <div className="cod-panel">
                    <div className="cod-highlight">
                      <Banknote size={32} className="text-primary" />
                      <div>
                        <h4>Cash on Delivery Available</h4>
                        <p>Pay with cash or UPI to the delivery executive when your package arrives at your gym/home.</p>
                      </div>
                    </div>

                    <div className="cod-captcha-box">
                      <label>Enter Verification Code: <strong className="captcha-code">7842</strong></label>
                      <input
                        type="text"
                        placeholder="Enter 7842 to confirm order"
                        value={codCaptcha}
                        onChange={(e) => setCodCaptcha(e.target.value)}
                        className="captcha-input"
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Bottom Actions for Step 2 */}
            <div className="step-actions payment-step-actions">
              <button
                type="button"
                className="btn-secondary"
                onClick={() => setStep(1)}
              >
                <ArrowLeft size={18} />
                <span>Back to Shipping</span>
              </button>

              <button
                type="button"
                className="btn-pay-now"
                onClick={handleProcessPayment}
              >
                <Lock size={18} />
                <span>Pay ₹{finalTotal.toLocaleString('en-IN')}</span>
              </button>
            </div>
          </div>
        )}

        {/* STEP 3: PROCESSING ANIMATION */}
        {step === 3 && (
          <div className="step-content processing-center">
            <div className="processing-spinner-ring"></div>
            <h3>Securing Your Transaction...</h3>
            <p>Please do not refresh or close this window. Communicating with banking gateway.</p>
            <div className="secure-badge-pill">
              <ShieldCheck size={16} className="text-accent" />
              <span>PCI-DSS Compliant & 256-Bit Encrypted</span>
            </div>
          </div>
        )}

        {/* STEP 4: ORDER CONFIRMATION & RECEIPT */}
        {step === 4 && orderSummary && (
          <div className="step-content success-receipt-view" id="printable-receipt">
            <div className="receipt-header-hero">
              <div className="success-icon-wrap">
                <CheckCircle2 size={54} className="text-accent" />
              </div>
              <h2>Payment Successful!</h2>
              <p className="order-conf-sub">Thank you for your order. Your gym gear is being prepared for dispatch!</p>
              <div className="order-ref-pill">
                <span>Order Reference: <strong>{orderSummary.orderId}</strong></span>
              </div>
            </div>

            {/* Receipt Card */}
            <div className="receipt-summary-box">
              <div className="receipt-meta-grid">
                <div>
                  <span className="meta-label">Order Date</span>
                  <span className="meta-val">{orderSummary.date}</span>
                </div>
                <div>
                  <span className="meta-label">Est. Delivery</span>
                  <span className="meta-val">{orderSummary.deliveryDate}</span>
                </div>
                <div>
                  <span className="meta-label">Payment Method</span>
                  <span className="meta-val">{orderSummary.paymentMethod}</span>
                </div>
                <div>
                  <span className="meta-label">Delivery To</span>
                  <span className="meta-val">{orderSummary.shipping.fullName} ({orderSummary.shipping.city})</span>
                </div>
              </div>

              {/* Purchased Items List */}
              <div className="receipt-items-table">
                <h5>Purchased Items ({orderSummary.items.length})</h5>
                {orderSummary.items.map(item => (
                  <div key={item.id} className="receipt-item-row">
                    <div className="receipt-item-left">
                      <img src={item.image} alt={item.name} className="receipt-thumb" />
                      <div>
                        <span className="receipt-item-name">{item.name}</span>
                        <span className="receipt-item-qty">Qty: {item.quantity}</span>
                      </div>
                    </div>
                    <span className="receipt-item-total">
                      ₹{(item.price * item.quantity).toLocaleString('en-IN')}
                    </span>
                  </div>
                ))}
              </div>

              {/* Price Breakdown in Receipt */}
              <div className="receipt-totals-box">
                <div className="receipt-row">
                  <span>Subtotal:</span>
                  <span>₹{orderSummary.subtotal.toLocaleString('en-IN')}</span>
                </div>
                {orderSummary.discount > 0 && (
                  <div className="receipt-row discount-text">
                    <span>Discount:</span>
                    <span>-₹{orderSummary.discount.toLocaleString('en-IN')}</span>
                  </div>
                )}
                <div className="receipt-row">
                  <span>Delivery Charges:</span>
                  <span>{orderSummary.deliveryFee === 0 ? 'FREE' : `₹${orderSummary.deliveryFee}`}</span>
                </div>
                <div className="receipt-row receipt-grand-total">
                  <span>Amount Paid:</span>
                  <span>₹{orderSummary.total.toLocaleString('en-IN')}</span>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="receipt-actions-row flex-wrap">
              <button
                type="button"
                className="px-4 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white font-black text-xs uppercase tracking-wider flex items-center gap-2 cursor-pointer shadow-[0_0_20px_rgba(16,185,129,0.4)] transition-all"
                onClick={() => sendOrderToWhatsApp(orderSummary)}
              >
                <MessageCircle size={18} />
                <span>Send Order Copy to WhatsApp (+91 7986014199)</span>
              </button>
              <button
                type="button"
                className="btn-secondary"
                onClick={handlePrintReceipt}
              >
                <Printer size={18} />
                <span>Print Invoice</span>
              </button>
              <button
                type="button"
                className="btn-primary"
                onClick={handleFinishAndShop}
              >
                <Sparkles size={18} />
                <span>Continue Shopping</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PaymentModal;
