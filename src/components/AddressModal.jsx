import React from 'react';

const AddressModal = ({ isOpen, onClose, onSubmit, address, setAddress }) => {
  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAddress(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(); // Call the onSubmit function passed from Profile
  };

  // Check if all fields are empty to determine the button text
  const isAddressPresent = address.state || address.country || address.area || address.contact;

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white p-6 rounded-md shadow-md max-w-md w-full">
        <h2 className="text-xl font-bold mb-4">Edit Address</h2>
        <form onSubmit={handleSubmit}>
          <input
            name="state"
            value={address.state || ''}
            onChange={handleChange}
            placeholder="State"
            className="w-full p-2 border border-gray-300 rounded-md mb-2"
          />
          <input
            name="country"
            value={address.country || ''}
            onChange={handleChange}
            placeholder="Country"
            className="w-full p-2 border border-gray-300 rounded-md mb-2"
          />
          <input
            name="area"
            value={address.area || ''}
            onChange={handleChange}
            placeholder="Area"
            className="w-full p-2 border border-gray-300 rounded-md mb-2"
          />
          <input
            name="contact"
            value={address.contact || ''}
            onChange={handleChange}
            placeholder="Contact"
            className="w-full p-2 border border-gray-300 rounded-md mb-2"
          />
          <div className="mt-4 flex justify-end gap-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-md"
            >
              {isAddressPresent ? 'Update' : 'Save'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddressModal;
