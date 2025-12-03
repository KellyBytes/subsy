'use client';
import Loading from '@/components/Loading';
import Login from '@/components/Login';
import SubscriptionForm from '@/components/SubscriptionForm';
import SubscriptionsDisplay from '@/components/SubscriptionsDisplay';
import SubscriptionSummary from '@/components/SubscriptionSummary';
import { useAuth } from '@/context/AuthContext';
import { Suspense, useRef, useState } from 'react';

const blankSubscription = {
  name: '',
  category: 'Entertainment',
  cost: '',
  currency: 'CAD',
  billingFrequency: 'Monthly',
  nextBillingData: '',
  paymentMethod: 'Credit Card',
  startDate: '',
  renewalType: '',
  notes: '',
  status: 'Active',
};

export default function DashboardPage() {
  // const isAuthenticated = true;
  const [isAddEntry, setIsAddEntry] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState(blankSubscription);
  const [editingIndex, setEditingIndex] = useState(null);

  const { handleDeleteSubscription, userData, currentUser, loading } =
    useAuth();

  const formRef = useRef(null);

  const isAuthenticated = !!currentUser; // convert it to boolean

  function handleChangeInput(e) {
    const newData = { ...formData, [e.target.name]: e.target.value };

    setFormData(newData);
  }

  function handleEditSubscription(index) {
    // // to edit, look up subscription at that index and prefill all the values with the entry we are going to edit
    // //
    // const data = userData.subscriptions.find((val, valIndex) => {
    //   return valIndex === index;
    // });
    // setFormData(data);

    // // delete the subscription and add edited one
    // handleDeleteSubscription(index);
    // setIsAddEntry(true);

    // enter edit mode
    const target = userData.subscriptions[index];
    setFormData(target);
    setEditingIndex(index);
    setIsEditing(true);
    setIsAddEntry(true);

    setTimeout(() => {
      formRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, 0);
  }

  function handleResetForm() {
    setFormData(blankSubscription);
  }

  function handleToggleInput(editing = false) {
    setIsAddEntry(!isAddEntry);

    if (!editing) {
      setFormData(blankSubscription);
      setEditingIndex(null);
    } else {
      setIsEditing(true);
    }

    if (!isAddEntry) {
      setTimeout(() => {
        formRef.current?.scrollIntoView({ behavior: 'smooth' }, 0);
      });
    }
  }

  if (loading) {
    return <Loading />;
  }

  if (!isAuthenticated) {
    return (
      <Suspense fallback={<Loading />}>
        <Login />
      </Suspense>
    );
  }

  return (
    <>
      <SubscriptionSummary />
      <SubscriptionsDisplay
        // handleShowInput={isAddEntry ? () => {} : handleToggleInput}
        handleShowInput={() => {
          handleToggleInput(false);
          setIsEditing(false);
        }}
        handleEditSubscription={handleEditSubscription}
      />
      {isAddEntry && (
        <section ref={formRef} style={{ scrollMarginTop: '30px' }}>
          <SubscriptionForm
            // onSubmit={() => {}}
            handleResetForm={handleResetForm}
            closeInput={handleToggleInput}
            formData={formData}
            handleChangeInput={handleChangeInput}
            editingIndex={editingIndex}
            setEditingIndex={setEditingIndex}
            isEditing={isEditing}
          />
        </section>
      )}
    </>
  );
}
