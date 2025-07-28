// import React, { useState, useEffect } from 'react';
// import styles from '@/styles/components/superadminsidebar/createagent.module.css';
// import axios from 'axios';

// const CreateAgent = () => {
//   const [formData, setFormData] = useState({
//     name: '',
//     email: '',
//     district: '',
//     city: '',
//     state: '',
//     password: '',
//     assignedTo: '',
//   });

//   const [showPassword, setShowPassword] = useState(false);
//   const [districtManagers, setDistrictManagers] = useState([]);

//   // Fetch district managers
//   useEffect(() => {
//     const fetchManagers = async () => {
//       try {
//         const res = await axios.get('/api/managers/agentDistrictDropdown'); // Backend endpoint should return { managers: [...] }
//         setDistrictManagers(res.data.managers);
//       } catch (err) {
//         console.error('Error fetching district managers:', err);
//       }
//     };
//     fetchManagers();
//   }, []);

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
//     setFormData({ ...formData, [e.target.id]: e.target.value });
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     try {
//       await axios.post('/api/createagent', formData);
//       console.log('Agent created successfully:', formData);
//       alert('Agent created successfully!');
//       setFormData({
//         name: '',
//         email: '',
//         district: '',
//         city: '',
//         state: '',
//         password: '',
//         assignedTo: '',
//       });
//     } catch (err) {
//       console.error('Error creating agent:', err);
//       alert('Failed to create agent');
//     }
//   };

//   type FormField = 'name' | 'email' | 'district' | 'city' | 'state';
//   const fields: FormField[] = ['name', 'email', 'district', 'city', 'state'];

//   return (
//     <div className={styles.container}>
//       <h2 className={styles.heading}>Create Agent</h2>
//       <form className={styles.form} onSubmit={handleSubmit}>
//         {fields.map((field) => (
//           <div className={styles.formGroup} key={field}>
//             <label htmlFor={field}>{field.charAt(0).toUpperCase() + field.slice(1)}</label>
//             <input
//               type={field === 'email' ? 'email' : 'text'}  // 👈 This line enables email validation
//               id={field}
//               className={styles.input}
//               placeholder={`Enter ${field}`}
//               value={formData[field]}
//               onChange={handleChange}
//               required
//             />
//           </div>
//         ))}

//         <div className={styles.formGroup}>
//           <label htmlFor="password">Password</label>
//           <input
//             type={showPassword ? 'text' : 'password'}
//             id="password"
//             className={styles.input}
//             placeholder="Enter password"
//             value={formData.password}
//             onChange={handleChange}
//           />
//         </div>

//         <div className={styles.checkboxGroup}>
//           <label className={styles.checkboxLabel}>
//             <input
//               type="checkbox"
//               checked={showPassword}
//               onChange={() => setShowPassword(!showPassword)}
//             />
//             Show Password
//           </label>
//         </div>

//         <div className={styles.formGroup}>
//           <label htmlFor="assignedTo">Assign to District Manager</label>
//           <select
//             id="assignedTo"
//             value={formData.assignedTo}
//             onChange={handleChange}
//             className={styles.input}
//           >
//             <option value="">Select Manager</option>
//             {districtManagers.map((manager: any) => (
//               <option key={manager.managerId} value={manager.managerId}>
//                 {manager.name} ({manager.managerId})
//               </option>
//             ))}
//           </select>

//         </div>

//         <button type="submit" className={styles.submitButton}>Create</button>
//       </form>
//     </div>
//   );
// };

// export default CreateAgent;
import React, { useState, useEffect } from 'react';
import styles from '@/styles/components/superadminsidebar/createagent.module.css';
import axios from 'axios';

const CreateAgent = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    district: '',
    city: '',
    state: '',
    password: '',
    assignedTo: '',
  });

  const [showPassword, setShowPassword] = useState(false);
  const [districtManagers, setDistrictManagers] = useState([]);

  // Fetch district managers
  useEffect(() => {
    const fetchManagers = async () => {
      try {
        const res = await axios.get('/api/managers/agentDistrictDropdown');
        setDistrictManagers(res.data.managers);
      } catch (err) {
        console.error('Error fetching district managers:', err);
      }
    };
    fetchManagers();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.post('/api/createagent', formData);
      console.log('Agent created successfully:', formData);
      alert('Agent created successfully!');
      setFormData({
        name: '',
        email: '',
        district: '',
        city: '',
        state: '',
        password: '',
        assignedTo: '',
      });
    } catch (err) {
      console.error('Error creating agent:', err);
      alert('Failed to create agent');
    }
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.heading}>Create Agent</h2>
      <form className={styles.form} onSubmit={handleSubmit}>

        <div className={styles.row}>
          <div className={styles.formGroup}>
            <label htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              className={styles.input}
              placeholder="Enter name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              className={styles.input}
              placeholder="Enter email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <div className={styles.row}>
          <div className={styles.formGroup}>
            <label htmlFor="district">District</label>
            <input
              type="text"
              id="district"
              className={styles.input}
              placeholder="Enter district"
              value={formData.district}
              onChange={handleChange}
              required
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="city">City</label>
            <input
              type="text"
              id="city"
              className={styles.input}
              placeholder="Enter city"
              value={formData.city}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <div className={styles.row}>
          <div className={styles.formGroup}>
            <label htmlFor="state">State</label>
            <input
              type="text"
              id="state"
              className={styles.input}
              placeholder="Enter state"
              value={formData.state}
              onChange={handleChange}
              required
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="password">Password</label>
            <input
              type={showPassword ? 'text' : 'password'}
              id="password"
              className={styles.input}
              placeholder="Enter password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <div className={styles.checkboxGroup}>
          <label className={styles.checkboxLabel}>
            <input
              type="checkbox"
              checked={showPassword}
              onChange={() => setShowPassword(!showPassword)}
            />
            Show Password
          </label>
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="assignedTo">Assign to District Manager</label>
          <select
            id="assignedTo"
            value={formData.assignedTo}
            onChange={handleChange}
            className={styles.input}
            required
          >
            <option value="">Select Manager</option>
            {districtManagers.map((manager: any) => (
              <option key={manager.managerId} value={manager.managerId}>
                {manager.name} ({manager.managerId})
              </option>
            ))}
          </select>
        </div>

        <button type="submit" className={styles.submitButton}>Create</button>
      </form>
    </div>
  );
};

export default CreateAgent;
