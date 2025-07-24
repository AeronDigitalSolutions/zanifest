import React, { useEffect, useState } from 'react';
import styles from '@/styles/components/superadminsidebar/createmanager.module.css';

const CreateManager = () => {
  // const [selectedRole, setSelectedRole] = useState('');
  
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


  const [showPassword, setShowPassword] = useState(false);
const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
  const { name, value } = e.target;
  setFormData((prev) => ({ ...prev, [name]: value }));
};


  const handleRoleChange = (e: React.FormEvent) => {
    const { value } = e.target as HTMLInputElement;
    setFormData((prev) => ({ ...prev, category: value }));
  };

const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

   if (formData.category !== 'national' && formData.assignedTo===null) {
    alert("State and district managers must be assigned to a manager.");
    return;
  }

  try {
    // let assignedTo = null;

    // if (formData.category === 'district') {
    //   // If assignedTo is stored as a string, no parsing needed
    //   assignedTo = formData.assignedTo?.trim();

    //   if (!assignedTo) {
    //     alert("Please select a valid state manager.");
    //     return;
    //   }
    // }

  const payload = {
    name: formData.name,
    email: formData.email,
    password: formData.password,
    state: formData.state,
    district: formData.district,
    managerId: formData.managerId,
    category: formData.category,
    assignedTo: formData.assignedTo, // ✅ This is now _id (string)
  };

console.log("Assigned to _id:", formData.assignedTo);

  const response = await fetch("/api/createmanager", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    console.log("failed to create manager ")
    return;
    // throw new Error("Failed to create manager");
  }
  alert("Manager created successfully!");
}
 catch (err) {
    console.error("Error:", err);
    alert("Error creating manager");
  }
};



  return (
    <div className={styles.container}>
      <h2 className={styles.heading}>Create Manager</h2>
      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.formGroup}>

         
            <label htmlFor="managerId">Manager ID</label>
            <input
              type="text"
              name='managerId'
              id="managerId"
              className={styles.input}
              placeholder="Enter manager ID (e.g., NM1, SM1)"
              value={formData.managerId}
              onChange={handleChange}
            />


          <label htmlFor="name">Full Name</label>
          <input 
          type="text"
           id="name" 
            name='name'
           className={styles.input} 
           placeholder="Enter full name" 
           value={formData.name} 
           onChange={handleChange} />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="email">Email</label>
          <input 
          type="email" 
          id="email" 
          name='email'
          required
          className={styles.input} 
          placeholder="Enter email" 
          value={formData.email} 
          onChange={handleChange} />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="password">Password</label>
          <input type={showPassword ? 'text' : 'password'} 
          name='password'
          id="password" 
          className={styles.input} 
          placeholder="Enter password" 
          value={formData.password} 
          onChange={handleChange} />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="district">District</label>
          <input type="text" name='district' id="district" className={styles.input} placeholder="Enter district" value={formData.district} onChange={handleChange} />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="state">State</label>
          <input type="text" name='state' id="state" className={styles.input} placeholder="Enter state" value={formData.state} onChange={handleChange} />
        </div>

        <div className={`${styles.row} ${styles.radioRow}`}>
          <label className={styles.radioLabel}>
            <input type="radio" name="managerRole" value="national" checked={formData.category === 'national'} onChange={handleRoleChange} />
            Make National Manager
          </label>
          <label className={styles.radioLabel}>
            <input type="radio" name="managerRole" value="state" checked={formData.category === 'state'} onChange={handleRoleChange} />
            Make State Manager
          </label>
          <label className={styles.radioLabel}>
            <input type="radio" name="managerRole" value="district" checked={formData.category === 'district'} onChange={handleRoleChange} />
            Make District Manager
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


        <div className={styles.checkboxGroup}>
          <label className={styles.checkboxLabel}>
            <input type="checkbox" checked={showPassword} onChange={() => setShowPassword(!showPassword)} />
            Show Password
          </label>
        </div>

        <button type="submit" className={styles.submitButton}>Create</button>
      </form>
    </div>
  );
};

export default CreateManager;
