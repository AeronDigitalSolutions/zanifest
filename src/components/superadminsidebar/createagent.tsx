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
        const res = await axios.get('/api/managers/agentDistrictDropdown'); // Backend endpoint should return { managers: [...] }
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

  type FormField = 'name' | 'email' | 'district' | 'city' | 'state';
  const fields: FormField[] = ['name', 'email', 'district', 'city', 'state'];

  return (
    <div className={styles.container}>
      <h2 className={styles.heading}>Create Agent</h2>
      <form className={styles.form} onSubmit={handleSubmit}>
        {fields.map((field) => (
          <div className={styles.formGroup} key={field}>
            <label htmlFor={field}>{field.charAt(0).toUpperCase() + field.slice(1)}</label>
            <input
              type="text"
              id={field}
              className={styles.input}
              placeholder={`Enter ${field}`}
              value={formData[field]}
              onChange={handleChange}
            />
          </div>
        ))}

        <div className={styles.formGroup}>
          <label htmlFor="password">Password</label>
          <input
            type={showPassword ? 'text' : 'password'}
            id="password"
            className={styles.input}
            placeholder="Enter password"
            value={formData.password}
            onChange={handleChange}
          />
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



// import React, { useState, useEffect } from 'react';
// import styles from '@/styles/components/superadminsidebar/createagent.module.css';
// import axios from 'axios';

// const CreateAgent = () => {
//   const [formData, setFormData] = useState<{
//   name: string;
//   email: string;
//   district: string;
//   city: string;
//   state: string;
//   password: string;
//   assignedTo: string;
// }>({
//   name: '',
//   email: '',
//   district: '',
//   city: '',
//   state: '',
//   password: '',
//   assignedTo: '',
// });

//   const [showPassword, setShowPassword] = useState(false);
//   const [districtManagers, setDistrictManagers] = useState([]);

//   // Fetch district managers
//   useEffect(() => {
//     const fetchManagers = async () => {
//       try {
//         const res = await axios.get('/api/managers/agentDistrictDropdown'); // You’ll create this endpoint
//         setDistrictManagers(res.data.managers);
//       } catch (err) {
//         console.error(err);
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
//       // Clear form fields
// setFormData({
//   name: '',
//   email: '',
//   district: '',
//   city: '',
//   state: '',
//   password: '',
//   assignedTo: '',
// });
//     } 
//     catch (err) {
//       console.error(err);
//       alert('Failed to create agent');
//     }
//   };

//   type FormField = 'name' | 'email' | 'district' | 'city' | 'state';

// const fields: FormField[] = ['name', 'email', 'district', 'city', 'state'];


//   return (
//     <div className={styles.container}>
//       <h2 className={styles.heading}>Create Agent</h2>
//       <form className={styles.form} onSubmit={handleSubmit}>
//        {fields.map((field) => (
//   <div className={styles.formGroup} key={field}>
//     <label htmlFor={field}>{field.charAt(0).toUpperCase() + field.slice(1)}</label>
//     <input
//       type="text"
//       id={field}
//       className={styles.input}
//       placeholder={`Enter ${field}`}
//       value={formData[field]}
//       onChange={handleChange}
//     />
//   </div>
// ))}

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
//           <label htmlFor="assignedTo">Assign to District Manager (ID)</label>
//           <select id="assignedTo" value={formData.assignedTo} onChange={handleChange} className={styles.input}>
//             <option value="">Select Manager</option>
//             {districtManagers.map((manager: any) => (
//               <option key={manager.id} value={manager.id}>
//                 {manager.name} ({manager.id})
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
