
import React, { useEffect, useState } from 'react';
import styles from '@/styles/components/superadminsidebar/createmanager.module.css';
import { FiEye, FiEyeOff } from 'react-icons/fi';

const CreateManager = () => {
  const [formData, setFormData] = useState({
    managerId: '',
    name: '',
    email: '',
    password: '',
    district: '',
    state: '',
    category: '',
    assignedTo: '',
  });

  const [assignedToOptions, setAssignedToOptions] = useState([]);
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    const fetchManagers = async () => {
      if (formData.category === 'state') {
        const res = await fetch('/api/manager/byCategory?category=national');
        const data = await res.json();
        setAssignedToOptions(data);
      } else if (formData.category === 'district') {
        const res = await fetch('/api/manager/byCategory?category=state');
        const data = await res.json();
        setAssignedToOptions(data);
      } else {
        setAssignedToOptions([]);
      }
    };

    fetchManagers();
  }, [formData.category]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    let updatedValue = value;
    if (
      (name === 'managerId' || name === 'name' || name === 'state' || name === 'district') &&
      value.length > 0
    ) {
      updatedValue = value.charAt(0).toUpperCase() + value.slice(1);
    }
    setFormData((prev) => ({ ...prev, [name]: updatedValue }));
  };

  const handleRoleChange = (e: React.FormEvent) => {
    const { value } = e.target as HTMLInputElement;
    setFormData((prev) => ({ ...prev, category: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (formData.category !== 'national' && formData.assignedTo === '') {
      alert('State and district managers must be assigned to a manager.');
      return;
    }

    try {
      const payload = {
        name: formData.name,
        email: formData.email,
        password: formData.password,
        state: formData.state,
        district: formData.district,
        managerId: formData.managerId,
        category: formData.category,
        assignedTo: formData.assignedTo,
      };

      const response = await fetch('/api/createmanager', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        console.log('Failed to create manager');
        return;
      }

      alert('Manager created successfully!');
    } catch (err) {
      console.error('Error:', err);
      alert('Error creating manager');
    }
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.heading}>Create Manager</h2>
      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.row}>
          <div className={styles.formGroup}>
            <label htmlFor="managerId">Manager ID</label>
            <input
              type="text"
              name="managerId"
              id="managerId"
              className={styles.input}
              placeholder="Enter manager ID (e.g., NM1, SM1)"
              value={formData.managerId}
              onChange={handleChange}
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="name">Full Name</label>
            <input
              type="text"
              name="name"
              id="name"
              className={styles.input}
              placeholder="Enter full name"
              value={formData.name}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className={styles.row}>
          <div className={styles.formGroup}>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              name="email"
              id="email"
              className={styles.input}
              placeholder="Enter email"
              value={formData.email}
              onChange={handleChange}
              pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
            />
          </div>

          <div className={styles.formGroup} style={{ position: 'relative' }}>
            <label htmlFor="password">Password</label>
            <input
              type={showPassword ? 'text' : 'password'}
              name="password"
              id="password"
              className={styles.input}
              placeholder="Enter password"
              value={formData.password}
              onChange={handleChange}
            />
            <span
              className={styles.eyeIcon}
              onClick={() => setShowPassword(!showPassword)}
              style={{ position: 'absolute', right: 10, top: 38, cursor: 'pointer' }}
            >
              {showPassword ? <FiEyeOff size={16} /> : <FiEye size={16} />}
            </span>
          </div>
        </div>

        <div className={styles.row}>
          <div className={styles.formGroup}>
            <label htmlFor="district">District</label>
            <input
              type="text"
              name="district"
              id="district"
              className={styles.input}
              placeholder="Enter district"
              value={formData.district}
              onChange={handleChange}
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="state">State</label>
            <input
              type="text"
              name="state"
              id="state"
              className={styles.input}
              placeholder="Enter state"
              value={formData.state}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className={`${styles.row} ${styles.radioRow}`}>
          <label className={styles.radioLabel}>
            <input
              type="radio"
              name="managerRole"
              value="national"
              checked={formData.category === 'national'}
              onChange={handleRoleChange}
            />
            National Manager
          </label>
          <label className={styles.radioLabel}>
            <input
              type="radio"
              name="managerRole"
              value="state"
              checked={formData.category === 'state'}
              onChange={handleRoleChange}
            />
            State Manager
          </label>
          <label className={styles.radioLabel}>
            <input
              type="radio"
              name="managerRole"
              value="district"
              checked={formData.category === 'district'}
              onChange={handleRoleChange}
            />
            District Manager
          </label>
        </div>

        {(formData.category === 'state' || formData.category === 'district') && (
          <div className={styles.formGroup}>
            <label htmlFor="assignedTo">Assign To</label>
            <select
              id="assignedTo"
              name="assignedTo"
              value={formData.assignedTo}
              onChange={handleChange}
              className={styles.input}
              required
            >
              <option value="">Select a manager</option>
              {assignedToOptions.map((manager: any) => (
                <option key={manager._id} value={manager._id}>
                  {manager.managerId} - {manager.name}
                </option>
              ))}
            </select>
          </div>
        )}

        <button type="submit" className={styles.submitButton}>
          Create
        </button>
      </form>
    </div>
  );
};

export default CreateManager;
