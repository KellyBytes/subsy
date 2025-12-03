'use client';
import { useAuth } from '@/context/AuthContext';
import { useState } from 'react';

export default function SubscriptionForm(props) {
  const {
    onSubmit,
    closeInput,
    formData,
    handleChangeInput,
    handleResetForm,
    editingIndex,
    setEditingIndex,
    isEditing,
  } = props;

  const { handleAddSubscription, userData, handleUpdateSubscription } =
    useAuth();

  // Move the followings to app/dashboard/page.js
  // const [formData, setFormData] = useState({
  //   name: '',
  //   category: 'Entertainment',
  //   cost: '',
  //   currency: 'CAD',
  //   billingFrequency: 'Monthly',
  //   nextBillingData: '',
  //   paymentMethod: 'Credit Card',
  //   startDate: '',
  //   renewalType: '',
  //   notes: '',
  //   status: 'Active',
  // });

  // function handleChangeInput(e) {
  //   const newData = { ...formData, [e.target.name]: e.target.value };

  //   setFormData(newData);
  // }

  function handleFormSubmit(e) {
    e.preventDefault();
    // onSubmit();

    // handleAddSubscription(formData);

    if (editingIndex !== null) {
      handleUpdateSubscription(editingIndex, formData);
    } else {
      handleAddSubscription(formData);
    }

    handleResetForm();
    closeInput();
  }

  return (
    <section>
      <h2>{isEditing ? 'Edit subscription' : 'Add a new subscription'}</h2>
      <form onSubmit={handleFormSubmit}>
        <label>
          <span>Subscription Name</span>
          <input
            value={formData.name}
            onChange={handleChangeInput}
            type="text"
            name="name"
            placeholder="e.g. Netflix, Spotify, AWS Hosting"
            required
          />
        </label>

        <label>
          <span>Category</span>
          <select
            value={formData.category}
            onChange={handleChangeInput}
            name="category"
          >
            {[
              'Entertainment',
              'Software',
              'Shopping',
              'News',
              'Health & Fitness',
              'Education',
              'Other',
            ].map((cat, catIndex) => {
              return <option key={catIndex}>{cat}</option>;
            })}
          </select>
        </label>

        <label>
          <span>Cost</span>
          <input
            value={formData.cost}
            onChange={handleChangeInput}
            type="number"
            name="cost"
            step="0.01"
            placeholder="e.g. 12.00"
            required
          />
        </label>

        <label>
          <span>Currency</span>
          <select
            value={formData.currency}
            onChange={handleChangeInput}
            name="currency"
          >
            {['CAD', 'USD', 'EUR', 'GBP', 'Other'].map((cur, curIndex) => {
              return <option key={curIndex}>{cur}</option>;
            })}
          </select>
        </label>

        <label>
          <span>Billing Frequency</span>
          <select
            value={formData.billingFrequency}
            onChange={handleChangeInput}
            name="billingFrequency"
          >
            {['Monthly', 'Yearly', 'Quarterly', 'One-time'].map(
              (billing, billingIndex) => {
                return <option key={billingIndex}>{billing}</option>;
              }
            )}
          </select>
        </label>

        <label>
          <span>Payment Method</span>
          <select
            value={formData.paymentMethod}
            onChange={handleChangeInput}
            name="paymentMethod"
          >
            {[
              'Credit Card',
              'Debit Card',
              'Paypal',
              'Bank Transfer',
              'Other',
            ].map((payment, paymentIndex) => {
              return <option key={paymentIndex}>{payment}</option>;
            })}
          </select>
        </label>

        <label>
          <span>Subscription Start Date</span>
          <input
            value={formData.startDate}
            onChange={handleChangeInput}
            type="date"
            name="startDate"
            required
          />
        </label>

        <label>
          <span>Status</span>
          <select
            value={formData.status}
            onChange={handleChangeInput}
            name="status"
          >
            {['Active', 'Paused', 'Cancelled'].map((status, statusIndex) => {
              return <option key={statusIndex}>{status}</option>;
            })}
          </select>
        </label>

        <label className="fat-column">
          <span>Notes</span>
          <textarea
            value={formData.notes}
            onChange={handleChangeInput}
            name="notes"
            placeholder="e.g. Shared with family, includes cloud storage"
          />
        </label>

        <div className="fat-column form-submit-btns">
          <button
            onClick={() => {
              handleResetForm();
              setEditingIndex(null);
              closeInput();
            }}
          >
            Cancel
          </button>
          <button type="submit">
            {isEditing ? 'Update Subscription' : 'Add Subscription'}
          </button>
        </div>
      </form>
    </section>
  );
}
