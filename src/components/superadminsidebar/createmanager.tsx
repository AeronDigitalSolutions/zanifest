

// import React, { useState } from 'react';
// import styles from '@/styles/components/superadminsidebar/createmanager.module.css';

// const CreateManager = () => {
//   const [showPassword, setShowPassword] = useState(false);
//   const [selectedRole, setSelectedRole] = useState('');

//   return (
//     <div className={styles.container}>
//       <h2 className={styles.heading}>Create Manager</h2>
//       <form className={styles.form}>
//         <div className={styles.formGroup}>
//           <label htmlFor="fullName">Full Name</label>
//           <input type="text" id="fullName" className={styles.input} placeholder="Enter full name" />
//         </div>

//         <div className={styles.formGroup}>
//           <label htmlFor="email">Email</label>
//           <input type="email" id="email" className={styles.input} placeholder="Enter email" />
//         </div>

//         <div className={styles.formGroup}>
//           <label htmlFor="password">Password</label>
//           <input
//             type={showPassword ? 'text' : 'password'}
//             id="password"
//             className={styles.input}
//             placeholder="Enter password"
//           />
//         </div>

//         <div className={styles.formGroup}>
//           <label htmlFor="district">District</label>
//           <input type="text" id="district" className={styles.input} placeholder="Enter district" />
//         </div>

//         <div className={styles.formGroup}>
//           <label htmlFor="state">State</label>
//           <input type="text" id="state" className={styles.input} placeholder="Enter state" />
//         </div>

//         <div className={styles.radioGroup}>
//           <label className={styles.radioLabel}>
//             <input
//               type="radio"
//               name="managerRole"
//               value="national"
//               checked={selectedRole === 'national'}
//               onChange={(e) => setSelectedRole(e.target.value)}
//             />
//             Make National Manager
//           </label>

//           <label className={styles.radioLabel}>
//             <input
//               type="radio"
//               name="managerRole"
//               value="state"
//               checked={selectedRole === 'state'}
//               onChange={(e) => setSelectedRole(e.target.value)}
//             />
//             Make State Manager
//           </label>

//           <label className={styles.radioLabel}>
//             <input
//               type="radio"
//               name="managerRole"
//               value="district"
//               checked={selectedRole === 'district'}
//               onChange={(e) => setSelectedRole(e.target.value)}
//             />
//             Make District Manager
//           </label>
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

//         <button type="submit" className={styles.submitButton}>Create</button>
//       </form>
//     </div>
//   );
// };

// export default CreateManager;


// // "use client";
// // import React, { useState } from "react";
// // import styles from "@/styles/components/superadminsidebar/createmanager.module.css";

// // const CreateManager = () => {
// //   const [formData, setFormData] = useState({
// //     name: "",
// //     email: "",
// //     password: "",
// //     confirmPassword: "",
// //     gender: "",
// //     termsAccepted: false,
// //   });

// //   const handleChange = (e) => {
// //     const { name, value, type, checked } = e.target;
// //     setFormData((prev) => ({
// //       ...prev,
// //       [name]: type === "checkbox" ? checked : value,
// //     }));
// //   };

// //   const handleSubmit = (e) => {
// //     e.preventDefault();
// //     console.log("Form Submitted:", formData);
// //     // You can add API call here
// //   };

// //   return (
// //     <div className={styles.wrapper}>
// //       <div className={styles.container}>
// //         <h2 className={styles.heading}>Create Manager</h2>
// //         <form className={styles.form} onSubmit={handleSubmit}>
// //           <div className={styles.formGroup}>
// //             <label htmlFor="name">Name</label>
// //             <input
// //               type="text"
// //               className={styles.input}
// //               id="name"
// //               name="name"
// //               value={formData.name}
// //               onChange={handleChange}
// //               placeholder="Enter full name"
// //               required
// //             />
// //           </div>

// //           <div className={styles.formGroup}>
// //             <label htmlFor="email">Email</label>
// //             <input
// //               type="email"
// //               className={styles.input}
// //               id="email"
// //               name="email"
// //               value={formData.email}
// //               onChange={handleChange}
// //               placeholder="Enter email address"
// //               required
// //             />
// //           </div>

// //           <div className={styles.formGroup}>
// //             <label htmlFor="password">Password</label>
// //             <input
// //               type="password"
// //               className={styles.input}
// //               id="password"
// //               name="password"
// //               value={formData.password}
// //               onChange={handleChange}
// //               placeholder="Enter password"
// //               required
// //             />
// //           </div>

// //           <div className={styles.formGroup}>
// //             <label htmlFor="confirmPassword">Confirm Password</label>
// //             <input
// //               type="password"
// //               className={styles.input}
// //               id="confirmPassword"
// //               name="confirmPassword"
// //               value={formData.confirmPassword}
// //               onChange={handleChange}
// //               placeholder="Confirm password"
// //               required
// //             />
// //           </div>

// //           <div className={styles.formGroup}>
// //             <label>Gender</label>
// //             <div className={styles.radioGroup}>
// //               <label className={styles.radioLabel}>
// //                 <input
// //                   type="radio"
// //                   name="gender"
// //                   value="male"
// //                   checked={formData.gender === "male"}
// //                   onChange={handleChange}
// //                   required
// //                 />
// //                 Male
// //               </label>
// //               <label className={styles.radioLabel}>
// //                 <input
// //                   type="radio"
// //                   name="gender"
// //                   value="female"
// //                   checked={formData.gender === "female"}
// //                   onChange={handleChange}
// //                 />
// //                 Female
// //               </label>
// //               <label className={styles.radioLabel}>
// //                 <input
// //                   type="radio"
// //                   name="gender"
// //                   value="other"
// //                   checked={formData.gender === "other"}
// //                   onChange={handleChange}
// //                 />
// //                 Other
// //               </label>
// //             </div>
// //           </div>

// //           <div className={styles.formGroup}>
// //             <label className={styles.checkboxLabel}>
// //               <input
// //                 type="checkbox"
// //                 name="termsAccepted"
// //                 checked={formData.termsAccepted}
// //                 onChange={handleChange}
// //                 required
// //               />
// //               I accept the terms and conditions
// //             </label>
// //           </div>

// //           <button type="submit" className={styles.submitButton}>
// //             Create Manager
// //           </button>
// //         </form>
// //       </div>
// //     </div>
// //   );
// // };

// // export default CreateManager;


import React, { useState } from 'react';
import styles from '@/styles/components/superadminsidebar/createmanager.module.css';

const CreateManager = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [selectedRole, setSelectedRole] = useState('');

  return (
    <div className={styles.container}>
      <h2 className={styles.heading}>Create Manager</h2>
      <form className={styles.form}>
        <div className={styles.row}>
          <div className={styles.formGroup}>
            <label htmlFor="firstName">First Name</label>
            <input type="text" id="firstName" className={styles.input} placeholder="Enter first name" />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="lastName">Last Name</label>
            <input type="text" id="lastName" className={styles.input} placeholder="Enter last name" />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="password">Password</label>
            <input
              type={showPassword ? 'text' : 'password'}
              id="password"
              className={styles.input}
              placeholder="Enter password"
            />
          </div>
        </div>

        <div className={styles.row}>
          <div className={styles.formGroup}>
            <label htmlFor="email">Email</label>
            <input type="email" id="email" className={styles.input} placeholder="Enter email" />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="district">District</label>
            <input type="text" id="district" className={styles.input} placeholder="Enter district" />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="state">State</label>
            <input type="text" id="state" className={styles.input} placeholder="Enter state" />
          </div>
        </div>

        <div className={`${styles.row} ${styles.radioRow}`}>
          <label className={styles.radioLabel}>
            <input
              type="radio"
              name="managerRole"
              value="national"
              checked={selectedRole === 'national'}
              onChange={(e) => setSelectedRole(e.target.value)}
            />
            National Manager
          </label>

          <label className={styles.radioLabel}>
            <input
              type="radio"
              name="managerRole"
              value="state"
              checked={selectedRole === 'state'}
              onChange={(e) => setSelectedRole(e.target.value)}
            />
            State Manager
          </label>

          <label className={styles.radioLabel}>
            <input
              type="radio"
              name="managerRole"
              value="district"
              checked={selectedRole === 'district'}
              onChange={(e) => setSelectedRole(e.target.value)}
            />
            District Manager
          </label>
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

        <button type="submit" className={styles.submitButton}>Create</button>
      </form>
    </div>
  );
};

export default CreateManager;
